import * as React from 'react';
import{ Box, Textarea, Sheet, Typography, Button, FormControl } from '@mui/joy';
import PropTypes from 'prop-types';
import habitApi from '../../../habitApi';
//import { useCookies } from 'react-cookie';

function MentorInterface(props) {
    // const [userPrompt, setUserPrompt] = React.useState('');
    
    const handleSystemPrompt = (event) => {
        event.preventDefault();
        habitApi.systemPrompt(props.habitId)
        .then(() => {
            console.log('Sys prompt sent');
        }).catch((error) => {
            console.error('sys prompt failed', error)
        });
    };

    return(
        <>
        <Box>
            <Button 
              startDecorator='systemPrompt'
              onClick={handleSystemPrompt}
            />
        </Box>
        </>
    )
}
MentorInterface.propTypes = {
    habitId: PropTypes.number.isRequired
 };
 export default MentorInterface;