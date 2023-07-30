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

export interface Category {
  categoryTitle: string;
  projectId: number;
}

export interface ProjectData {
  name: string;
  categories: Category[];
}

const CreateNewBoard = () => {
  const { open, handleOpen, handleClose } = useModalState(false);
  const [projectData, setProjectData] = useState<ProjectData>({
    name: '',
    categories: [],
  });
  const [newCategory, setNewCategory] = useState('');
  const { name, categories } = projectData;

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
      const { name, categories } = projectData;
      const updatedCategories = [...categories];
      if (newCategory.trim() !== '') {
        updatedCategories.push({ categoryTitle: newCategory, projectId: 0 });
      }
      const updatedProjectData = {
        name: name,
        categories: updatedCategories,
      };

      console.log(updatedProjectData);

      await axios.post(
        'https://kanban-backend.azurewebsites.net/api/v1/Projects',
        updatedProjectData
      );
      console.log('Project created successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleAddColumn = () => {
    if (newCategory.trim() === '') {
      return;
    }
    setProjectData((prevData) => ({
      ...prevData,
      categories: [
        ...prevData.categories,
        { categoryTitle: newCategory, projectId: 0 },
      ],
    }));
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
                onChange={(event) =>
                  setProjectData({ ...projectData, name: event.target.value })
                }
                placeholder="e.g., Web Design"
              />
              <h5>Board Columns</h5>
              {categories.map((category, index) => (
                <BoardColumn key={index}>
                  <TextField
                    id={`column-${index}`}
                    value={category.categoryTitle}
                    onChange={(event) => {
                      const updatedColumns = [...categories];
                      updatedColumns[index] = {
                        ...updatedColumns[index],
                        categoryTitle: event.target.value,
                      };
                      setProjectData((prevData) => ({
                        ...prevData,
                        categories: updatedColumns,
                      }));
                    }}
                  />
                  <DeleteIcon
                    onClick={() => {
                      const updatedColumns = [...categories];
                      updatedColumns.splice(index, 1);
                      setProjectData((prevData) => ({
                        ...prevData,
                        categories: updatedColumns,
                      }));
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
