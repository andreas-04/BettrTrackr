import { useState, useCallback } from 'react';
import {Grid, Typography, Card, Textarea, IconButton } from '@mui/joy';
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import habitApi from '../../habitApi';
import PropTypes from 'prop-types';

export default function MentorChat({habitId}){
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);

    const handleInputChange = useCallback((event) => {
        const { value } = event.target;
        setInputValue(value);
    }, []); 
    const handleMessageSend = async(event) =>{
        event.preventDefault();
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
                            <Typography key={index} align="left" level='body-lg'><strong>./msg/mind-sync-000{index}/</strong> {message}</Typography>
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
        </>
    )
}
MentorChat.propTypes = {
    habitId: PropTypes.number.isRequired,
};