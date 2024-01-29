 import {Grid, CircularProgress, Typography, Card, Divider, Checkbox, Input, Button } from '@mui/joy';
// import { useState, useEffect } from 'react';

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
                <Card>
                    
                </Card>
            </Grid>
        </Grid>
        </>
    )
}