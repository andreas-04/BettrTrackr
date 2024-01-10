import { useState, useEffect } from 'react';
import { Sheet, Button, Checkbox, Input, Box } from '@mui/joy';
import habitApi from '../../../habitApi'; // Importing the habitApi module
import PropTypes from 'prop-types';

function TaskList({ habitId }){
    const [tasks, setTasks] = useState([]);
    const [newTaskName, setNewTaskName] = useState('');

    useEffect(() => {
        habitApi.getHabitTrackerTasks(habitId)
        .then(response => {
            setTasks(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, [habitId]);

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
    return (
        <Sheet
          sx={{
            // mx: 4,
            // p: 3,
            // display: 'flex',
            // flexDirection: 'column',
            // gap: 2,
            // width: 500,
            // variant: "outlined",
            // '& > div': { p: 2, borderRadius: 'md', display: 'flex' },
          }}
        >

      
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

TaskList.propTypes = {
    habitId: PropTypes.number.isRequired, // or whatever type habitId is supposed to be
 };

export default TaskList