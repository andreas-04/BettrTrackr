import { Typography, Card, Checkbox, Accordion, AccordionGroup } from '@mui/joy';
// import { useState, useEffect } from 'react';
import Close from '@mui/icons-material/Close';
import AccordionDetails, {
    accordionDetailsClasses,
  } from '@mui/joy/AccordionDetails';
  import AccordionSummary, {
    accordionSummaryClasses,
  } from '@mui/joy/AccordionSummary';
const GoalsAndHabits = () => {

    return (<>
        <Card>
            <Typography align="left" level='h4'>Goals and Habits</Typography>
            <Card variant="plain" >
                <AccordionGroup
                variant="outlined"
                transition=".5s"
                size='lg'
                sx={{
                    // maxWidth: 400,
                    borderRadius: 'md',
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
                        <Typography align="left" >
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
    </>)
}
export default GoalsAndHabits;