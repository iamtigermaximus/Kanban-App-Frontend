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

const CreateNewBoard = () => {
  const [name, setName] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const { open, handleOpen, handleClose } = useModalState(false);
  const [categories, setCategories] = useState<string[]>([]);

  const fetchProjects = async () => {
    try {
      await axios.get(
        'https://kanban-backend.azurewebsites.net/api/v1/Projects'
      );
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async () => {
    try {
      const updatedCategories = [...categories];
      if (newCategory.trim() !== '') {
        updatedCategories.push(newCategory);
      }
      const projectData = {
        name: name,
        categories: updatedCategories.map((category) => ({
          categoryTitle: category,
        })),
      };

      await axios.post(
        'https://kanban-backend.azurewebsites.net/api/v1/Projects',
        projectData
      );

      // Step 2: Optionally, you can reset the form after successful submission
      setName('');
      setCategories([]);
      setNewCategory('');
      fetchProjects();
      window.location.reload();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleAddColumn = () => {
    if (newCategory.trim() === '') {
      return;
    }
    setCategories([...categories, newCategory]);
    setNewCategory('');
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
              {categories.map((category, index) => (
                <BoardColumn key={index}>
                  <TextField
                    id={`column-${index}`}
                    value={category}
                    onChange={(event) => {
                      const updatedColumns = [...categories];
                      updatedColumns[index] = event.target.value;
                      setCategories(updatedColumns);
                    }}
                  />
                  <DeleteIcon
                    onClick={() => {
                      const updatedColumns = [...categories];
                      updatedColumns.splice(index, 1);
                      setCategories(updatedColumns);
                    }}
                  />
                </BoardColumn>
              ))}
              <BoardColumn>
                <TextField
                  id="new-column"
                  value={newCategory}
                  onChange={(event) => setNewCategory(event.target.value)}
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
