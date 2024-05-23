import { Sheet } from '@mui/joy';
import Dashboard from './Dashboard';
import { Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';


  
  export default function Root({habitId}) {
    return (


            <Sheet
            variant='outlined'
            sx={{ borderRadius: '20px', padding: '20px'}}>
                <Routes>
                  <Route path="/" element={<Dashboard habitId={habitId}/>} />
                </Routes>
            </Sheet>

    );
    
  }
  Root.propTypes = {
    habitId: PropTypes.number.isRequired,
   };

  