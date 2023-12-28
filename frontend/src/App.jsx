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
import { Sheet, Typography, Button, Checkbox, Input, Box } from '@mui/joy';

// Define the App component
function App() {
  // Use the useCookies hook to get and set the 'userID' cookie
  const [cookies, setCookie] = useCookies(['userID']);
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [habitId, setHabitId] = useState(null);

  useEffect(() => {
    if (cookies.userID) {
      userApi.getHabitTrackersByUserId(cookies.userID)
        .then(response => {
          if (response.data.length > 0) {
            const habitId = response.data[0].id;
            setHabitId(habitId); // Set habitId state variable
            habitApi.getHabitTrackerTasks(habitId)
              .then(response => {
                setTasks(response.data);
              })
              .catch(error => {
                console.error(error);
              });
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

  const handleAddTask = async (event) => {
    event.preventDefault();
    try {
      console.log(habitId);
      const taskData = {
        name: newTaskName,
        habit_tracker: habitId,
      };
    
      habitApi.addTask(taskData)
        .then(response => {
          setTasks([...tasks, response.data]);
          setNewTaskName('');
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {
      console.error('Error getting habit ID:', error);
    }
  }
  const handleCheckboxChange = (taskID, completed) => {
    const updatedTask = tasks.find(task => task.id === taskID);
  
    updatedTask.completed = completed;
  
    habitApi.updateTask(taskID, updatedTask)
      .then(() => {
        setTasks(tasks.map(task => task.id === taskID ? updatedTask : task));
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  };
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
    <Sheet
      sx={{
        mx: 4,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: 500,
        variant: "outlined",
        '& > div': { p: 2, borderRadius: 'md', display: 'flex' },
      }}
    >
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography
          color="neutral"
          level="h2"
          variant="plain"
        >
          Habit Tracker
        </Typography>
      </div>
  
      {tasks.map((task) => (
        <Sheet variant="outlined" sx={{ height: '30px' }} key={task.id}>
          <div>
            <Checkbox overlay label={task.name} checked={task.completed} onChange={(e) => handleCheckboxChange(task.id, e.target.checked)} sx={{ width: '500px' }} />
          </div>

        </Sheet>
      ))}
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
        <Input
          placeholder="New Task"
          variant="outlined"
          size="md"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <Button startDecorator="+" onClick={handleAddTask}>
          Task
        </Button>
      </Box>
    </Sheet>
  );
}

// Export the App component as the default export
export default App;