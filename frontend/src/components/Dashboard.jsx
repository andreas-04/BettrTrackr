import {Grid, Typography, Card, Textarea, IconButton } from '@mui/joy';
import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import ProgressView from './ProgressView';
import NewGoal from './NewGoal';
import GoalsAndHabits from './GoalsAndHabits';
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import habitApi from '../../habitApi';

export default function Dashboard({habitId}) {
    var [date,setDate] = useState(new Date());
    const [newGoalAdded, setNewGoalAdded] = useState(false);
    const [habitState, setHabitState] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }
    });
    console.log('Rendering Dashboard');
    const handleInputChange = useCallback((event) => {
        const { value } = event.target;
        setInputValue(value);

    }, []); 

    const handleMessageSend = async(event) =>{
        event.preventDefault();
        // Use a functional update to ensure we're working with the latest state
        let lastMessage;

        setMessages(prevMessages => {
            const newMessage = inputValue;
            const updatedMessages = [...prevMessages, newMessage];
            lastMessage = updatedMessages[updatedMessages.length - 1]
            setInputValue(''); // Clear the input field
            return updatedMessages;
        });
        console.log(lastMessage);

        const messageData = {
            "message": lastMessage
        };
        const response = await habitApi.postMessage(habitId, messageData)
        setMessages(prevMessages => {
            const newMessage = response.data;
            const updatedMessages = [...prevMessages, newMessage];
            return updatedMessages;
        });

    }
    return (
        <>
        <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={12} >
                    <Typography  align="left" level="h1" >
                        Mind Sync
                    </Typography>
            </Grid>
                <Grid item xs={6}>
                    <ProgressView habitId={habitId} habitState={habitState}/>
                </Grid>
                <Grid item xs={6}>
                    <Card variant="plain" sx={{height: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography level='h3' sx={{ mt: '-30px' }}>
                            {date.toLocaleTimeString()}
                        </Typography>
                        <Typography level="body-lg">
                            {date.toLocaleDateString()}
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <GoalsAndHabits habitId={habitId} newGoalAdded={newGoalAdded} onHabitState={() => setHabitState(prevState =>!prevState)}/>
                </Grid>
                <Grid item xs={6}>
                    <NewGoal habitId={habitId} onNewGoalAdded={() => setNewGoalAdded(prevState =>!prevState)} />
                </Grid>   
                <Grid item xs={12}>
                    <Card sx={{height: "500px"}}>
                        <Typography align="left" level='h4'>Mentor Chat</Typography>
                        <Card variant="soft" sx={{
                            height: "400px",
                            overflowY: 'auto',
                            border: '1px solid',
                            borderColor: '#CDD7E1',
                            borderRadius: '4px', 

                        }}>
                            {messages.map((message, index) => (
                                (index ) % 2 === 0 ? <>
                               

                                    <Typography key={index} align="left" level='body-lg'> <strong>./msg/neacsu-000{index}/</strong> {message}</Typography>
                                </> : <>
                                    <Typography key={index} align="left" level='body-lg'><strong>./msg/mind-ai-000{index}/</strong> {message}</Typography>
                                </>
                            ))}
                        </Card>
                        <form>
                            <Grid container spacing={1} alignItems="stretch">
                                
                                    <Grid item xs={11.55}>
                                        <Textarea minRows={3} onBlur={(e) => handleInputChange(e)} placeholder={"Send a Message!"} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                                    </Grid>
                                    <Grid item xs={.45}>
                                        <IconButton sx={{height:"87px"}}variant='outlined' onClick={handleMessageSend}><SubdirectoryArrowLeftIcon></SubdirectoryArrowLeftIcon></IconButton>
                                    </Grid>
                                
                            </Grid>
                        </form>

                    </Card>
                </Grid>
            </Grid>
        
        </>
        )
}
Dashboard.propTypes = {
    habitId: PropTypes.number.isRequired,
};
