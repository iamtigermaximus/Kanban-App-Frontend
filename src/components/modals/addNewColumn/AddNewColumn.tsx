import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Modal, TextField } from '@mui/material';
import {
  AddNewTaskButton,
  BoardColumn,
  ColumnHeader,
  ColumnTaskContainer,
  ModalButton,
  ModalButtonContainer,
  style,
} from './AddNewColumn.styles';
import useModalState from '../useModalState';
import { IProject } from '../../../interfaces/Kanban';
import { useState } from 'react';

export type ColumnProps = {
  selectedProject: IProject | null; // Replace 'IProject' with the appropriate type for your project object
};

const AddNewColumn = ({ selectedProject }: ColumnProps) => {
  const [newCategory, setNewCategory] = useState('');
  const { open, handleOpen, handleClose } = useModalState(false);
  const [categories, setCategories] = useState<string[]>([]);

  const handleAddColumn = () => {
    if (newCategory.trim() === '') {
      return;
    }
    setCategories([...categories, newCategory]);
    setNewCategory('');
  };
  return (
    <div>
      <ColumnTaskContainer onClick={handleOpen}>
        <ColumnHeader>
          <AddNewTaskButton>+ Add New Column</AddNewTaskButton>
        </ColumnHeader>
      </ColumnTaskContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, backgroundColor: 'white' }}>
          <h2 id="parent-modal-title">Edit board</h2>
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
              <TextField id="outlined" value={selectedProject?.name} />
              <h5>Board Columns</h5>
              {selectedProject?.categories.map((category) => (
                <BoardColumn key={category.id}>
                  <TextField id="outlined" value={category.categoryTitle} />
                  <DeleteIcon />
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
                <ModalButton>Save Changes</ModalButton>
              </ModalButtonContainer>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AddNewColumn;
