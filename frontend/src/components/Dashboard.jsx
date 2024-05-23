import {Grid, Typography, Card } from '@mui/joy';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProgressView from './progressView';
import NewGoal from './NewGoal';
import GoalsAndHabits from './GoalsAndHabits';

export default function Dashboard({habitId}) {
    var [date,setDate] = useState(new Date());
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }
    });
    
    return (
        <>
        <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={12} >
                    <Typography  align="left" level="h1" >
                        Mind Sync
                    </Typography>
            </Grid>
            <Grid item xs={6}>
                <ProgressView habitId={habitId}/>
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
                <GoalsAndHabits/>
            </Grid>
            <Grid item xs={6}>
                <NewGoal habitId={habitId}/>
            </Grid>
        </Grid>
        </>
        )
}
Dashboard.propTypes = {
    habitId: PropTypes.number.isRequired,
};
