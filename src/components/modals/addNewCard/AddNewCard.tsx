import {
  Box,
  Checkbox,
  FormControl,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import {
  AddNewTaskButton,
  AddNewTaskContainer,
  ModalButton,
  ModalButtonContainer,
  style,
} from './AddNewCard.styles';
import { SubtasksColumn } from '../addNewTask/AddNewTask.styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { ChangeEvent, useState } from 'react';
import useModalState from '../useModalState';

const AddNewCard = () => {
  const [status, setStatus] = useState('');
  const { open, handleOpen, handleClose } = useModalState(false);
  const [checked, setChecked] = useState(false);

  const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  return (
    <div>
      <AddNewTaskContainer onClick={handleOpen}>
        <AddNewTaskButton>+ Add New Card</AddNewTaskButton>
      </AddNewTaskContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, backgroundColor: 'white' }}>
          <h2 id="parent-modal-title">Add New Card</h2>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': {
                my: 1,
                width: '100%',
              },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="new-column"
                // value={selectedCardData.title}
                // onChange={(event) => setNewCategory(event.target.value)}
                label="CARD NAME"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ my: 1 }}
              />
              <TextField
                id="new-column"
                multiline
                label="DESCRIPTION"
                rows={2}
                fullWidth
                sx={{ my: 1 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div>
                <SubtasksColumn>
                  <TextField
                    id="new-column"
                    // value={selectedCardData.title}
                    // onChange={(event) => setNewCategory(event.target.value)}
                    label="TASK"
                    sx={{ my: 1, width: '100%' }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <DeleteIcon />
                </SubtasksColumn>
                <SubtasksColumn>
                  <Checkbox
                    checked={checked}
                    onChange={handleCheckbox}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                  <TextField
                    id="new-column"
                    multiline
                    label="SUBTASK"
                    rows={1}
                    fullWidth
                    sx={{ my: 1 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </SubtasksColumn>
              </div>
              <ModalButtonContainer>
                <ModalButton>+ Add New Subtask</ModalButton>
              </ModalButtonContainer>
              <h5>Current Status</h5>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  onChange={handleChange}
                >
                  <MenuItem value="Todo">Todo</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
              <ModalButtonContainer>
                <ModalButton>Create Task</ModalButton>
              </ModalButtonContainer>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AddNewCard;
