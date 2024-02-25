 import {Grid, Accordion, Typography, Card, Divider, AccordionGroup, Checkbox} from '@mui/joy';
 import Close from '@mui/icons-material/Close';

 //Checkbox, Input, Button,
// import { useState, useEffect } from 'react';
import AccordionDetails, {
    accordionDetailsClasses,
  } from '@mui/joy/AccordionDetails';
  import AccordionSummary, {
    accordionSummaryClasses,
  } from '@mui/joy/AccordionSummary';
export default function UpdateDashboard() {

    return (
        <>
        <Grid container spacing={2} alignItems={"stretch"}>
            <Grid item xs={12} sx={{ paddingTop: '3vh' }}>
            <Card variant="plain" >
                    <Typography  align="left" level="h1" >
                        Mind Sync
                    </Typography>
                    <Divider orientation="horizontal" flexitem="true" sx={{ width: '50%' }} />
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card variant='plain' sx={{ paddingLeft: '30%', paddingRight: '30%'}}>
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
                </Card>
            </Grid>
        </Grid>
        </>
    )
}