import {Grid, Typography, Modal, IconButton, Stack } from '@mui/joy';
import { useState, useEffect } from 'react';
import ProgressView from './ProgressView';
import NewGoal from './NewGoal';
import GoalsAndHabits from './GoalsAndHabits';
import Authentication from './Authentication';
import MentorChat from './MentorChat';
import LogoutIcon from '@mui/icons-material/Logout';
import userApi from '../../userApi'

export default function Dashboard() {

    const [newGoalAdded, setNewGoalAdded] = useState(false);
    const [habitState, setHabitState] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [habitId, setHabitId] = useState(0)

    useEffect(() => {
        const sessionId = document.cookie.split('; ').find(row => row.startsWith('sessionid='));
        const habitID = document.cookie.split('; ').find(row => row.startsWith('habitId='));
        if (sessionId || habitID) {
            setIsAuthenticated(true);
            setHabitId(habitID.split('=')[1]);
        }
    }, [habitId]);

    const  handleLogout = async() => {
        await userApi.logout()
        .then(() => {
          window.location.reload();
        })
        .catch(error => {
           console.error('Error logging out:', error);
        });
    };
    console.log(habitId, )
    return (
        <>
        {!isAuthenticated && (
            <Modal open={!isAuthenticated} onClose={() => {}}>
                    <Authentication onAuthenticated={() => {setIsAuthenticated(true);window.location.reload();}} />
            </Modal>
        )}
  
            <Grid container spacing={2} alignItems="stretch">
                <Grid item xs={11.5} >
                        <Typography  align="left" level="h1" >
                            Mind Sync
                        </Typography>
                </Grid>
                <Grid item xs={.5}>
                    <IconButton onClick={(e) => handleLogout(e)}><LogoutIcon></LogoutIcon></IconButton>
                </Grid>
                    <Grid item xs={6}>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="stretch"
                            spacing={2}
                        >
                            <ProgressView habitId={habitId} habitState={habitState}/>
                            <NewGoal habitId={habitId} onNewGoalAdded={() => setNewGoalAdded(prevState =>!prevState)} />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <GoalsAndHabits habitId={habitId} newGoalAdded={newGoalAdded} onHabitState={() => setHabitState(prevState =>!prevState)}/>
                    </Grid>
                <Grid item xs={12}>
                    <MentorChat habitId={habitId}/>
                </Grid>
            </Grid>
        </>
        )
}

