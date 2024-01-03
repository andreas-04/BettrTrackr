import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import habitApi from '../../../habitApi';
import PropTypes from 'prop-types';

export default function MentorPrompt({ habitId }) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
   };

  const handleSubmit = (event) => {
    event.preventDefault();
    const mentorPromptData = {
        MentorPrompt: inputValue
    }
    habitApi.updateMentorPrompt(mentorPromptData, habitId).then(() => {
        // Handle success here
        console.log('Mentor prompt updated successfully');
    }).catch((error) => {
        // Handle error here
        console.error('Failed to update mentor prompt', error);
    });
   };

  return (
    <>
    <React.Fragment>
    <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
        <DialogTitle>Welcome to MindSync, your personal growth companion! 🌟 Before we dive in, we&apos;d love to know who your ideal mentor is. This could be anyone from a historical figure to Darth Vader. Briefly describe your mentor, and we&apos;ll use this to tailor prompts and insights just for you. </DialogTitle>
        <form onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel>Description</FormLabel>
                <Input required value={inputValue} onChange={handleInputChange} />
            </FormControl>
            <Button type="submit">Summon</Button>
        </form>
        </ModalDialog>
    </Modal>
    </React.Fragment>
    </>
  );
}

MentorPrompt.propTypes = {
    habitId: PropTypes.number.isRequired, // or whatever type habitId is supposed to be
 };
