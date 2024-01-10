import * as React from 'react';
import{ Textarea, Sheet, Typography, Button, FormControl } from '@mui/joy';
import PropTypes from 'prop-types';
import habitApi from '../../../habitApi';
import { useCookies } from 'react-cookie'; // Importing the useCookies hook from 'react-cookie' for managing cookies
// import { useState, useEffect } from 'react';
// import habitApi from '../../habitApi'; // Importing the habitApi module
// import { CircularProgress } from '@mui/material';


function Journal(props) {
    const [journalData, setJournalData] = React.useState('');
    const [cookies] = useCookies(['userID']);

    const handleSubmit = (event) => {
        event.preventDefault();
        const userId = cookies.userID;
        const journal = {
            user: userId,
            journal_entry: journalData
        }
        console.log(journal);
        const habitId = props.habitId;
        console.log(habitId);
        habitApi.updateJournal(journal, habitId).then(() => {
            console.log('Journal update was successful');
        }).catch((error) => {
            console.error('Journal update failed', error);
        });
    };

    const handleInput = (event) =>{
        setJournalData(event.target.value);
    };

    return(
        <>
            <Sheet sx={{ width: '632px', height: '30vh' }}>
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <Typography>
                            Journal Entry
                        </Typography>
                        <Textarea required value={journalData} onChange={handleInput} minRows={5} size="md" />
                        <Button type="submit">Summon</Button>
                    </FormControl>
                    
                </form>
            </Sheet>
        </>
    );
}
Journal.propTypes = {
    habitId: PropTypes.number.isRequired
 };
export default Journal;