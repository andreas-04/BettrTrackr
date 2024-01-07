import { useState, useEffect } from 'react';
import { Sheet, Button, Input, Box, Typography } from '@mui/joy';
import habitApi from '../../../habitApi'; 
import PropTypes from 'prop-types';

function GoalView(props) {
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState('');

    useEffect(() => {
        habitApi.getGoals(props.habitId)
        .then(response => {
            setGoals(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, [props.habitId]);

    const handleAddGoal = async (event) => {
        event.preventDefault();
        try {
          const goalData = {
            name: newGoal,
            habit_tracker: props.habitId,
          };
        
          habitApi.addGoal(goalData)
            .then(response => {
              setGoals([...goals, response.data]);
              setNewGoal('');
            })
            .catch(error => {
              console.error(error);
            });
        } catch (error) {
          console.error('Error getting habit ID:', error);
        }
    };
    return (
        <>
        <Sheet>
            {goals.map((goal) => (
                <Box key={goal.id}>
                    <Typography>{goal.name}</Typography>
                </Box>
            ))}
            <Box>
                <Input 
                placeholder="New Goal"
                variant="outlined"
                size="md"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                />
                <Button
                startDecorator='+'
                onClick={handleAddGoal}
                />
            </Box>
        </Sheet>
        </>
    )




}
GoalView.propTypes = {
    habitId: PropTypes.number.isRequired
 };
export default GoalView;