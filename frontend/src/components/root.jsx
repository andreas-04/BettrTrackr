import { styled, Sheet, Grid } from '@mui/joy';
import Dashboard from './Dashboard';
import { Route, Routes } from 'react-router-dom';

import Navbar from './navbar'
import UpdateDashboard from './updateDashboard';
const Item = styled(Sheet)(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
    ...theme.typography['body-sm'],
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: 4,
    color: theme.vars.palette.text.secondary,
  }));
  
  export default function Root() {
    return (
      <Grid 
      container 
      spacing={2}
      sx={{ flexGrow: 1 }}
      alignItems="stretch"
      >
        <Grid item xs={.5}>
            <Navbar/>
        </Grid>
        <Grid item xs={11.5} sx={{padding: "25px"}}>
            <Sheet
            variant='outlined'
            sx={{ borderRadius: '20px', padding: '20px'}}>
                {/* <UpdateDashboard/> */}
                <Routes>
                  <Route path="/" element={<Dashboard/>} />
                  <Route path="/habits" element={<UpdateDashboard/>} />
                </Routes>
                

            </Sheet>
        </Grid>

      </Grid>
    );
  }