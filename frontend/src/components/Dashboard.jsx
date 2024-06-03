import {Grid, Typography, Card, Modal } from '@mui/joy';
import { useState, useEffect } from 'react';
import ProgressView from './progressView';
import NewGoal from './NewGoal';
import GoalsAndHabits from './GoalsAndHabits';
import Authentication from './Authentication';
import MentorChat from './MentorChat';
export default function Dashboard() {
    var [date,setDate] = useState(new Date());
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

        var timer = setInterval(()=>setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }

    }, [habitId]);


    return (
        <>
        {!isAuthenticated && (
            <Modal open={!isAuthenticated} onClose={() => {}}>
                    <Authentication onAuthenticated={() => {setIsAuthenticated(true);window.location.reload();}} />
            </Modal>
        )}
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
                    <MentorChat habitId={habitId}/>
                </Grid>
            </Grid>
        
        </>
        )
}

