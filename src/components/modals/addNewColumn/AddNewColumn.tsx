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

const AddNewColumn = () => {
  const { open, handleOpen, handleClose } = useModalState(false);

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
              <TextField id="outlined" defaultValue="eg. Web Design" />
              <h5>Board Columns</h5>
              <BoardColumn>
                <TextField id="outlined" defaultValue="Todo" />
                <DeleteIcon />
              </BoardColumn>
              <BoardColumn>
                <TextField id="outlined" defaultValue="In Progress" />
                <DeleteIcon />
              </BoardColumn>
              <BoardColumn>
                <TextField id="outlined" defaultValue="Completed" />
                <DeleteIcon />
              </BoardColumn>
              <ModalButtonContainer>
                <ModalButton>+ Add New Column</ModalButton>
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
