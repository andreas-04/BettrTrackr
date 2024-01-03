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

// Define the App component
function App() {
  // Use the useCookies hook to get and set the 'userID' cookie
  const [cookies, setCookie] = useCookies(['userID']);
  // const [tasks, setTasks] = useState([]);
  // const [newTaskName, setNewTaskName] = useState('');
  const [habitId, setHabitId] = useState(null);
  const [mentorPrompt, setMentorPrompt] = useState(null);

  useEffect(() => {
    if (cookies.userID) {
      userApi.getHabitTrackersByUserId(cookies.userID)
        .then(response => {
          if (response.data.length > 0) {
            const habitId = response.data[0].id;
            setHabitId(habitId); // Set habitId state variable
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
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [cookies.userID]);


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

  // Render the App component
  return (
  <>
    <TaskList habitId={habitId} />
    {mentorPrompt === null && <MentorPrompt habitId={habitId} />}
  </>
  );
}

// Export the App component as the default export
export default App;