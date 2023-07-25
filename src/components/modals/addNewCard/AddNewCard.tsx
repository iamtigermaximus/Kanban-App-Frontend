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
  const [cardName, setCardName] = useState('');
  const [cardDescription, setCardDescription] = useState('');
  const [tasks, setTasks] = useState([
    {
      taskName: '',
      subtaskName: '',
      completed: false,
    },
  ]);

  const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
  };

  const handleTaskNameChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].taskName = event.target.value;
    setTasks(updatedTasks);
  };

  const handleSubtaskNameChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].subtaskName = event.target.value;
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    setTasks([...tasks, { taskName: '', subtaskName: '', completed: false }]);
  };

  const handleRemoveTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const handleCreateTask = () => {
    const newCard = {
      title: cardName,
      desc: cardDescription,
      projectTasks: tasks.map((task) => ({
        completed: task.completed,
        text: task.taskName,
        subtasks: [
          {
            completed: task.completed,
            text: task.subtaskName,
          },
        ],
      })),
    };

    console.log(newCard); // This will contain the data for the new card with tasks and subtasks

    // You can further process the newCard data here (e.g., submit it to the server, update state, etc.).

    // Close the modal
    handleClose();
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
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
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
                value={cardDescription}
                onChange={(e) => setCardDescription(e.target.value)}
              />
              <div>
                <SubtasksColumn>
                  <TextField
                    id="new-column"
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
