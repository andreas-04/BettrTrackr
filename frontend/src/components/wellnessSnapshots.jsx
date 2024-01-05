import { useState, useEffect } from 'react';
import { Sheet, Typography, Button, Input, Box, LinearProgress, ButtonGroup} from '@mui/joy';
import  habitApi  from '../../../habitApi';
import { PropTypes } from 'prop-types';

function WellnessSnapshots( props ) {
    const [snapshot, setSnapshot] = useState([]);
    const [newSnapshotName, setNewSnapshotName] = useState('');
    
    useEffect(() => {
        habitApi.getSnapshots(props.habitId)
        .then(response => {
            setSnapshot(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, [props.habitId]);

    const handleAddSnap = async (event) => {
        event.preventDefault();
        try {
            const snapData = {
                name: newSnapshotName,
                score: 0,
                habit_tracker: props.habitId
            };
            habitApi.addSnapshot(snapData)
            .then( response => {
                setSnapshot([...snapshot, response.data]);
                setNewSnapshotName('');
            })
            .catch(error => {
                console.error(error);
            });
        } catch (error){
            console.error("Error Adding Snapshot")
        }
    };

    const handlePlusButton = (snapId) => {
        const updatedSnap = snapshot.find(snapshot => snapshot.id === snapId);
        updatedSnap.score += 1;
        const snapData = {
            id: snapId,
            name: updatedSnap.name,
            score: updatedSnap.score,
            habit_tracker: props.habitId,

        };
        habitApi.updateSnapshot(snapId, snapData )
        .then(() => {
            setSnapshot(snapshot.map(snapshot => snapshot.id === snapId ? updatedSnap : snapshot));
        })
        .catch((error) => {
            console.error('Error updating snapshot:', error);
        });
    };

    const handleMinusButton = (snapId) => {
        const updatedSnap = snapshot.find(snapshot => snapshot.id === snapId);
        updatedSnap.score -= 1;
        const snapData = {
            id: snapId,
            name: updatedSnap.name,
            score: updatedSnap.score,
            habit_tracker: props.habitId,
        };
        habitApi.updateSnapshot(snapId, snapData )
        .then(() => {
            setSnapshot(snapshot.map(snapshot => snapshot.id === snapId ? updatedSnap : snapshot));
        })
        .catch((error) => {
            console.error('Error updating snapshot:', error);
        });
    };

    return (
        <>
        <Sheet>
            {snapshot.map((snapshot) => (
                <Box variant="outlined" key={snapshot.id}>
                    <Typography>{snapshot.name}</Typography>
                    <LinearProgress determinate value={(snapshot.score / 5) * 100} thickness={20} />
                    <ButtonGroup aria-label="outlined primary button group">
                        <Button onClick={(e) => handleMinusButton(snapshot.id, e.target.score)}>-</Button>
                        <Button onClick={(e) => handlePlusButton(snapshot.id, e.target.score)}>+</Button>
                    </ButtonGroup>
                </Box>
            ))}
            <Box>
                <Input
                    placeholder='New Snapshot'
                    size='md'
                    value={newSnapshotName}
                    onChange={(e) => setNewSnapshotName(e.target.value)}
                />
                <Button startDecorator="+" onClick={handleAddSnap}/>
            </Box>
        </Sheet>
        </>
    )
}
WellnessSnapshots.propTypes = {
    habitId: PropTypes.number.isRequired
};
export default WellnessSnapshots;
