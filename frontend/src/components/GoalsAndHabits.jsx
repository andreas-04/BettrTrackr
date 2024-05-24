import { Typography, Card, Checkbox, Accordion, AccordionGroup } from '@mui/joy';
import { useState, useEffect } from 'react';
import Close from '@mui/icons-material/Close';
import AccordionDetails, {
    accordionDetailsClasses,
  } from '@mui/joy/AccordionDetails';
  import AccordionSummary, {
    accordionSummaryClasses,
  } from '@mui/joy/AccordionSummary';
import habitApi from '../../habitApi';
import PropTypes from 'prop-types';

const GoalsAndHabits = ({ habitId, newGoalAdded, onHabitState }) => {
    const [goals, setGoals] = useState([]);
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        const fetchGoalsAndHabits = async() => {
            const goalData = await habitApi.getGoals(habitId);
            const habitData = await habitApi.getTasks(habitId);
            setGoals(goalData.data);
            setHabits(habitData.data);

        };
        fetchGoalsAndHabits();
    }, [habitId, newGoalAdded])
    const handleCheckChange = (event, habitId) => {
        event.preventDefault
        const updatedHabits = habits.map(habit => 
            habit.id === habitId? {...habit, completed:!habit.completed} : habit
        );
        setHabits(updatedHabits);
    
        // Assuming updateTask expects a boolean value for the completed status
        habitApi.updateTask(habitId, {completed: updatedHabits.find(habit => habit.id === habitId).completed})
           .then(response => {
                console.log('Update response:', response);
                // Handle success case, e.g., show a notification or update UI accordingly
            })
           .catch(error => {
                console.error('Error updating habit:', error);
                // Handle error case, e.g., show an error message
            });
        onHabitState()
    };

    return (<>
        <Card sx={{
        // height:'257px',
        maxHeight: '257px', // Set the maximum height of the card
        overflowY: 'auto', // Enable vertical scrolling if content overflows
        borderRadius: 'md',

        }}>
            <Typography align="left" level='h4'>Goals and Habits</Typography>
                <AccordionGroup
                variant="outlined"
                transition=".5s"
                size='lg'
                sx={{
                    // maxWidth: 400,
                    borderRadius: 'md',
                    [`& .${accordionSummaryClasses.button}:hover`]: {
                    bgcolor: 'transparent',
                    },
                    [`& .${accordionDetailsClasses.content}`]: {
                    boxShadow: (theme) => `inset 0 1px ${theme.vars.palette.divider}`,
                    [`&.${accordionDetailsClasses.expanded}`]: {
                        paddingBlock: '0.75rem',
                    },
                    },
                }}
                >
                    {goals.map((goal) => (
                        <Accordion key={goal.id}>
                            <AccordionSummary>{goal.name}</AccordionSummary>
                            <AccordionDetails variant="soft">
                                {habits.filter(habit => habit.goal === goal.id).map(habit => (
                                    <div key={habit.id}>
                                        <Typography align="left">
                                        <Checkbox
                                            variant="soft"
                                            uncheckedIcon={<Close />}
                                            label={habit.name}
                                            checked={habit.completed}
                                            onChange={(e) => handleCheckChange(e, habit.id)}
                                        />
                                        </Typography>
                                    </div>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </AccordionGroup>
        </Card>
    </>)
}
export default GoalsAndHabits;
GoalsAndHabits.propTypes = {
    habitId: PropTypes.number.isRequired,
    newGoalAdded: PropTypes.bool.isRequired,
    onHabitState: PropTypes.func.isRequired,
};