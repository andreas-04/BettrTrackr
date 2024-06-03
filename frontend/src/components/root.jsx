import { Sheet } from '@mui/joy';
import Dashboard from './Dashboard';
import { Route, Routes } from 'react-router-dom';
export default function Root() {
  return (
    <Sheet
      variant='outlined'
      sx={{ borderRadius: '20px', padding: '20px'}}>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
        </Routes>
    </Sheet>
  );
  
}
