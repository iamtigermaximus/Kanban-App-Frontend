import { useEffect, useState } from 'react';
import { Modal, Box, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { style } from '../addNewCard/AddNewCard.styles';
import {
  AddNewBoardButton,
  AddNewBoardButtonContainer,
  BoardColumn,
  ModalButton,
  ModalButtonContainer,
} from './CreateNewBoard.styles';
import useModalState from '../useModalState';
import axios from 'axios';
import { IProject } from '../../../interfaces/Kanban';

const CreateNewBoard = () => {
  const [name, setName] = useState('');
  const [newColumn, setNewColumn] = useState('');
  const { open, handleOpen, handleClose } = useModalState(false);
  const [columns, setColumns] = useState<string[]>([
    'Todo',
    'In Progress',
    'Completed',
  ]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [projects, setProjects] = useState<IProject[]>([]);
  const [projectCount, setProjectCount] = useState(0);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5500/api/v1/Projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async () => {
    try {
      const newColumns = columns.map((column) => ({
        categoryTitle: column,
        cards: [],
      }));

      const newProject = {
        name,
        data: newColumns,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.post(
        'http://localhost:5500/api/v1/Projects',
        newProject
      );
      setName('');
      handleClose();
      fetchProjects();
      window.location.reload();

      const projectsResponse = await axios.get(
        'http://localhost:5500/api/v1/Projects'
      );
      setProjects(projectsResponse.data);
      setProjectCount(projectCount + 1);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleAddColumn = () => {
    if (newColumn.trim() === '') {
      return;
    }

    setColumns([...columns, newColumn]);
    setNewColumn('');
  };

  return (
    <div>
      <AddNewBoardButtonContainer onClick={handleOpen}>
        <AddNewBoardButton>+ Create New Board</AddNewBoardButton>
      </AddNewBoardButtonContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, backgroundColor: 'white' }}>
          <h2 id="parent-modal-title">Add new board</h2>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { my: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <h5>Board Name</h5>
              <TextField
                id="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g., Web Design"
              />
              <h5>Board Columns</h5>
              {columns.map((column, index) => (
                <BoardColumn key={index}>
                  <TextField
                    id={`column-${index}`}
                    value={column}
                    onChange={(event) => {
                      const updatedColumns = [...columns];
                      updatedColumns[index] = event.target.value;
                      setColumns(updatedColumns);
                    }}
                  />
                  <DeleteIcon
                    onClick={() => {
                      const updatedColumns = [...columns];
                      updatedColumns.splice(index, 1);
                      setColumns(updatedColumns);
                    }}
                  />
                </BoardColumn>
              ))}
              <BoardColumn>
                <TextField
                  id="new-column"
                  value={newColumn}
                  onChange={(event) => setNewColumn(event.target.value)}
                  placeholder="New Category"
                />
                <DeleteIcon />
              </BoardColumn>
              <ModalButtonContainer>
                <ModalButton onClick={handleAddColumn}>
                  + Add New Column
                </ModalButton>
              </ModalButtonContainer>
              <ModalButtonContainer>
                <ModalButton onClick={handleCreateProject}>
                  Create New Board
                </ModalButton>
              </ModalButtonContainer>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default CreateNewBoard;
