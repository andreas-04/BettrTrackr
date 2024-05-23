import {Grid, CircularProgress, Typography, Card} from '@mui/joy';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import habitApi from '../../habitApi';
const ProgressView = ({habitId}) => {
    const [progress, setProgress] = useState({
        daily_completed_percentage: null,
        weekly_completed_percentage: null,
        lifetime_completed_percentage: null
    })
    useEffect(() => {
        const progressData = async() =>{
            const data = await habitApi.getHabitTracker(habitId);
            setProgress({...data.data});
        }
        progressData();
    }, [habitId])
    return(
    <>
        <Card >
            <Grid container spacing={1} alignItems={"stretch"}>
                <Grid item xs={6}>
                    <CircularProgress
                        determinate value={progress.lifetime_completed_percentage}
                        variant='solid'
                        sx={{
                            "--CircularProgress-size": "150px",
                            "--CircularProgress-trackThickness": "16px",
                            "--CircularProgress-progressThickness": "15px"
                        }}
                    >
                        <CircularProgress
                            determinate value={progress.weekly_completed_percentage}
                            variant='solid'
                            sx={{
                                "--CircularProgress-size": "115px",
                                "--CircularProgress-trackThickness": "16px",
                                "--CircularProgress-progressThickness": "15px"
                            }}
                        >
                            <CircularProgress
                                determinate value={progress.daily_completed_percentage}
                                variant='solid'
                                sx={{
                                    "--CircularProgress-size": "80px",
                                    "--CircularProgress-trackThickness": "16px",
                                    "--CircularProgress-progressThickness": "15px"
                                }}
                            >
                                <Typography level="body-xs" sx={{position: 'absolute', top: '50%',left: '50%', transform: 'translate(-20%, -425%)',color: 'Grey', fontWeight: 'bold'}}>
                                L
                                </Typography>
                                <Typography level="body-xs" sx={{position: 'absolute', top: '50%',left: '50%', transform: 'translate(-20%, -325%)',color: 'Grey', fontWeight: 'bold'}}>
                                W
                                </Typography>
                                <Typography level="body-xs" sx={{position: 'absolute', top: '50%',left: '50%', transform: 'translate(-20%, -225%)',color: 'Grey', fontWeight: 'bold'}}>
                                D
                                </Typography>
                            </CircularProgress>
                        </CircularProgress>
                    </CircularProgress>
                </Grid>
                <Grid item xs={6}>
                    <Card>
                        <Typography level="title-lg" align="left" >Progress</Typography>
                        <Typography level="body-md" align="left" >Day: {progress.daily_completed_percentage}%</Typography>
                        <Typography level="body-md" align="left" >Week: {progress.weekly_completed_percentage}%</Typography>
                        <Typography level="body-md" align="left" >Lifetime: {progress.lifetime_completed_percentage}%</Typography>
                    </Card>
                </Grid>
            </Grid>
        </Card>
    </>
    )
}
export default ProgressView;
ProgressView.propTypes = {
    habitId: PropTypes.number.isRequired,
};