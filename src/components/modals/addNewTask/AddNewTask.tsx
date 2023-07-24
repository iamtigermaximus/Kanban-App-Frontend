import {
  Box,
  FormControl,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import {
  ModalButton,
  ModalButtonContainer,
  MoreVertIconContainer,
  NewTaskButton,
  NewTaskContainer,
  NewTaskMenuContainer,
  SubtasksColumn,
  style,
} from './AddNewTask.styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditBoardModal from '../editBoard/EditBoardModal';
import useModalState from '../useModalState';

const AddNewTask = () => {
  const { open, handleOpen, handleClose } = useModalState(false);
  const [status, setStatus] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };
  return (
    <>
      <NewTaskMenuContainer>
        <NewTaskContainer onClick={handleOpen}>
          <NewTaskButton>+ ADD NEW TASK</NewTaskButton>
        </NewTaskContainer>
        <MoreVertIconContainer>
          <EditBoardModal />
        </MoreVertIconContainer>
      </NewTaskMenuContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, backgroundColor: 'white' }}>
          <h2 id="parent-modal-title">Add New Task</h2>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { my: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <h5>Task Name</h5>
              <TextField
                id="outlined"
                defaultValue="e.g. Remove Console logs"
              />
              <h5>Description</h5>
              <TextField id="outlined-multiline-static" multiline rows={4} />
              <h5>Subtasks</h5>
              <SubtasksColumn>
                <TextField id="outlined" />
                <DeleteIcon />
              </SubtasksColumn>
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
    </>
  );
};

export default AddNewTask;
