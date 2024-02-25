import {Grid, CircularProgress, Typography, Card, Divider, Checkbox, Input, Button, Accordion, AccordionGroup } from '@mui/joy';
import { useState, useEffect } from 'react';
import Close from '@mui/icons-material/Close';
import AccordionDetails, {
    accordionDetailsClasses,
  } from '@mui/joy/AccordionDetails';
  import AccordionSummary, {
    accordionSummaryClasses,
  } from '@mui/joy/AccordionSummary';

export default function Dashboard() {
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
            <Grid item xs={12} sx={{ paddingTop: '3vh' }}>
                <Card variant="plain" >
                    <Typography  align="left" level="h1" >
                        Mind Sync
                    </Typography>
                    <Divider orientation="horizontal" flexitem="true" sx={{ width: '50%' }} />
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <Grid container spacing={1} alignItems={"stretch"}>
                        <Grid item xs={6}>
                            <CircularProgress
                                determinate value={25}
                                variant='solid'
                                sx={{
                                    "--CircularProgress-size": "150px",
                                    "--CircularProgress-trackThickness": "16px",
                                    "--CircularProgress-progressThickness": "15px"
                                }}
                            >
                                <CircularProgress
                                    determinate value={50}
                                    variant='solid'
                                    sx={{
                                        "--CircularProgress-size": "115px",
                                        "--CircularProgress-trackThickness": "16px",
                                        "--CircularProgress-progressThickness": "15px"
                                    }}
                                >
                                    <CircularProgress
                                        determinate value={75}
                                        variant='solid'
                                        sx={{
                                            "--CircularProgress-size": "80px",
                                            "--CircularProgress-trackThickness": "16px",
                                            "--CircularProgress-progressThickness": "15px"
                                        }}
                                    >
                                        <Typography level="body-xs" sx={{position: 'absolute', top: '50%',left: '50%', transform: 'translate(-20%, -425%)',color: 'White', fontWeight: 'bold'}}>
                                        D
                                        </Typography>
                                        <Typography level="body-xs" sx={{position: 'absolute', top: '50%',left: '50%', transform: 'translate(-20%, -325%)',color: 'White', fontWeight: 'bold'}}>
                                        M
                                        </Typography>
                                        <Typography level="body-xs" sx={{position: 'absolute', top: '50%',left: '50%', transform: 'translate(-20%, -225%)',color: 'White', fontWeight: 'bold'}}>
                                        Y
                                        </Typography>
                                    </CircularProgress>
                                </CircularProgress>
                            </CircularProgress>
                        </Grid>
                        <Grid item xs={6}>
                            <Card>
                                <Typography level="title-lg" align="left" >Progress</Typography>
                                <Typography level="body-md" align="left" >Day: 25%</Typography>
                                <Typography level="body-sm" align="left" >Month: 50%</Typography>
                                <Typography level="body-sm" align="left" >Year: 75%</Typography>
                            </Card>
                        </Grid>
                    </Grid>
                </Card>
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
                <Card>
                        <Typography align="left" level='h4'>Goals and Habits</Typography>
                        <Card variant="plain" sx={{ paddingLeft: '10%', paddingRight: '10%'}}>
                            <AccordionGroup
                            variant="outlined"
                            transition="0.2s"
                            sx={{
                                maxWidth: 400,
                                borderRadius: 'lg',
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
                            <Accordion defaultExpanded>
                                <AccordionSummary>Reading</AccordionSummary>
                                <AccordionDetails variant="soft">
                                    <Typography align="left">
                                    <Checkbox
                                    variant="soft"
                                    uncheckedIcon={<Close />}
                                    label="25 pages non-fiction"

                                    />
                                    </Typography>
                                    <Typography align="left">
                                    <Checkbox
                                    variant="soft"
                                    uncheckedIcon={<Close />}
                                    label="25 pages fiction"
                                    />
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary>Fitness</AccordionSummary>
                                <AccordionDetails variant="soft">
                                    <Typography align="left">
                                        <Checkbox
                                        variant="soft"
                                        uncheckedIcon={<Close />}
                                        label="weightlifting"
                        
                                        />
                                    </Typography>
                                    <Typography align="left">
                                        <Checkbox
                                        variant="soft"
                                        uncheckedIcon={<Close />}
                                        label="steady state cardio"
                                        />
                                    </Typography>
                                    <Typography align="left">
                                        <Checkbox
                                        variant="soft"
                                        uncheckedIcon={<Close />}
                                        label="heavy-bag training"
                                        />
                                    </Typography>
                                    <Typography align="left">
                                        <Checkbox
                                        variant="soft"
                                        uncheckedIcon={<Close />}
                                        label="sparring"
                                        />
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary>Mindfulness </AccordionSummary>
                                <AccordionDetails variant="soft">
                                <Typography align="left">
                                        <Checkbox
                                        variant="soft"
                                        uncheckedIcon={<Close />}
                                        label="10 minute meditation"

                                        />
                                </Typography>
                                <Typography align="left">
                                        <Checkbox
                                        variant="soft"
                                        uncheckedIcon={<Close />}
                                        label="journal"
     
                                        />
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            </AccordionGroup>
                        </Card>
                    </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <Typography level="h3" align="left">
                        New Goal
                    </Typography>
                    <Divider sx={{width: "20%", marginLeft: "1px"}}></Divider>
                        <Input color="neutral" variant="outlined" placeholder='Create a Goal'/>
                        <Card>
                            <Input color="neutral" variant="outlined" placeholder='Create a Habit'/>
                            <Input color="neutral" variant="outlined" placeholder='Create a Habit'/>
                        </Card>
                        <Button variant="outlined">Add a Habit</Button>

                </Card>
            </Grid>
        </Grid>
        </>
        )
}
