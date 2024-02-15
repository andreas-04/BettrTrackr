 import {Grid, Accordion, Typography, Card, Divider, AccordionGroup } from '@mui/joy';

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
                <Card variant='plain' sx={{ paddingLeft: '20%', paddingRight: '20%'}}>
                    <Card>
                        <Typography align="left" level='h4'>Daily Log</Typography>
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
                                <AccordionSummary>Habit #1</AccordionSummary>
                                <AccordionDetails variant="soft">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary>Habit #2</AccordionSummary>
                                <AccordionDetails variant="soft">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary>Habit #3</AccordionSummary>
                                <AccordionDetails variant="soft">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua.
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