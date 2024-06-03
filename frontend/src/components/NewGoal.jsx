import { Typography, Card, Input, Button } from '@mui/joy';
import { useState, useCallback } from 'react';
import habitApi from '../../habitApi';
import PropTypes from 'prop-types';

export default function NewGoal({ habitId, onNewGoalAdded }) {
    const [habitsCount, setHabitsCount] = useState(1);
    const [goal, setGoal] = useState("");
    const [tasks, setTasks] = useState([])
    const addHabitInput = () => {
        setHabitsCount(habitsCount + 1);
    };
    const handleSubmit = async(event) => {
        event.preventDefault();
        //post goal, get goal id
        const goalData = {
            name: goal,
            habit_tracker: habitId,
        }
        const returnGoalData = await habitApi.addGoal(goalData);
        const goalId = returnGoalData.data.id
        const taskData = {
            tasks: tasks.map((task) => ({ name: task, goal: goalId, habit_tracker: habitId })),
        }
        for (let i = 0; i < tasks.length; i++) {
            const task = taskData.tasks[i]
            try{
                const response = await habitApi.addTask(task);
                console.log(response);
            }catch(error){
                console.error(`Failed to process task: ${task.name}`, error);
            }
        }
        onNewGoalAdded();
    }
    const handleInputChange = useCallback((event, type) => {
        const { value } = event.target;
        if(type === "goal"){
            setGoal(value);
        }else{
            setTasks(prevTasks => [...prevTasks, value]); 
        }
    }, []);  


    return (
    <>
        <Card>
            <Typography level="h4" align="left">
                New Goal
            </Typography>
                <Input color="neutral" variant="outlined" placeholder='Name The Goal' name='goal' onChange={(e) => handleInputChange(e, "goal")}/>
                <Card>
                    {[...Array(habitsCount)].map((_, index) => (
                        <div key={index}>
                            <Input color="neutral" variant="outlined" placeholder='Attach a Habit' name="task"onBlur={handleInputChange} />
                        </div>
                    ))}   
                    <Button variant="outlined" onClick={addHabitInput}>Another Habit</Button>
                </Card>
                <Button variant="outlined" onClick={handleSubmit}>Add Goal</Button>
        </Card>
    </>
    )
}
NewGoal.propTypes = {
    habitId: PropTypes.number.isRequired,
    onNewGoalAdded: PropTypes.func.isRequired,
};