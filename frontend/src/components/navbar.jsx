import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';
import Settings from '@mui/icons-material/Settings';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';

export default function Navbar() {
  return (
    <ButtonGroup
      aria-label="radius button group"
      sx={{ '--ButtonGroup-radius': '20px',
            paddingTop: '50px'
      }}
      orientation='vertical'
    >
        <IconButton>
            <HomeOutlinedIcon/>
        </IconButton>
        <IconButton>
            <ChecklistOutlinedIcon/>
        </IconButton>
        <IconButton>
            <TimelineOutlinedIcon/>
        </IconButton>
        <IconButton>
            <Settings />
        </IconButton>
    </ButtonGroup>
  );
}