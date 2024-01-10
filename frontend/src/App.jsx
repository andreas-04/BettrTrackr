/*/
 * App.jsx
 * This is the main component of the application. It uses the 'react-cookie' library to manage cookies,
 * specifically a 'userID' cookie. If the 'userID' cookie does not exist, it generates a random username
 * and calls the 'createUser' function from the 'userApi' module to create a new user. The user's ID is then
 * stored in the 'userID' cookie.
 * 
 * The component renders a div that displays the user's ID if the 'userID' cookie exists. If the 'userID' 
 * cookie does not exist, it displays a message saying that the 'userID' cookie was not found.
/*/
// Import the necessary modules
import { useState, useEffect } from 'react';
import './App.css' // Importing the CSS for the App component
import { useCookies } from 'react-cookie'; // Importing the useCookies hook from 'react-cookie' for managing cookies
import userApi from '../../userApi' // Importing the userApi module
import habitApi from '../../habitApi'; // Importing the habitApi module
import TaskList from './components/taskList';
import MentorPrompt from './components/mentorPrompt';
import { CircularProgress } from '@mui/material';
import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary } from '@mui/joy'
// import { Button } from '@mui/joy';
import Journal from './components/journal';
import WellnessSnapshots from './components/wellnessSnapshots';
import GoalView from './components/goalView';
import MentorInterface from './components/mentorInterface';
// Define the App component
function App() {
  // Use the useCookies hook to get and set the 'userID' cookie
  const [cookies, setCookie] = useCookies(['userID']);
  const [habitId, setHabitId] = useState(null);
  const [mentorPrompt, setMentorPrompt] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if the 'userID' cookie exists 
  if (!cookies.userID) {
    // If the 'userID' cookie doesn't exist, create a new user

    // Generate a random username
    const username = 'user' + Math.floor(Math.random() * 1000000);

    // Call the createUser function from the userApi module
    userApi.createUser({ username: username })
      .then(response => {
        // If the user is successfully created, set the 'userID' cookie with the user's ID
        setCookie('userID', response.data.id, { path: '/' });
      })
      .catch(error => {
        // If there's an error, log it to the console
        console.error(error);
      });
  }
  useEffect(() => {
    if (cookies.userID) {
      userApi.getHabitTrackersByUserId(cookies.userID)
        .then(response => {
          if (response.data.length > 0) {
            const habitId = response.data[0].id;
            setHabitId(habitId); // Set habitId state variable
            console.log(habitId);
            setMentorPrompt(response.data[0].mentorPrompt); // Set mentorPrompt state variable
          } else {
            habitApi.postHabitTracker({ user: cookies.userID })
              .then(response => {
                console.log('Habit tracker created:', response.data);
              })
              .catch(error => {
                console.error(error);
              });
          }
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [cookies.userID]);
 
  if (loading) {
    return <CircularProgress />;
  }




  // Render the App component
  // console.log("mentorPrompt:", mentorPrompt);
  return (
    <>
        {mentorPrompt == null && <MentorPrompt habitId={habitId}/>}
        <AccordionGroup sx={{ maxWidth: 600 }}>

          <Accordion>
            <AccordionSummary>Task List </AccordionSummary>
            <AccordionDetails>
            <TaskList habitId={habitId} /> 
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary>Goals</AccordionSummary>
            <AccordionDetails>
              <GoalView habitId={habitId}/>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary>Daily Metrics</AccordionSummary>
            <AccordionDetails>
              <WellnessSnapshots habitId={habitId} />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary>Journal</AccordionSummary>
            <AccordionDetails>
              <Journal habitId={habitId}/>
            </AccordionDetails>
          </Accordion>

        </AccordionGroup>
        <MentorInterface habitId={habitId}/>
    </>
   );
}

// Export the App component as the default export
export default App;