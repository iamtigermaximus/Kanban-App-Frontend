import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const NewTaskContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NewTaskButton = styled(Button)`
  background-color: #3f51b5;
  border: none;
  border-radius: 20px;
  padding: 5px 20px;
  color: white;
  letter-spacing: 1px;

  &:hover {
    background-color: #7986cb;
  }
`;
export const SubtasksColumn = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const NewTaskMenuContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MoreVertIconContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const ModalButtonContainer = styled(Box)`
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 10px 0;
  width: 100%;
`;

export const ModalButton = styled(Button)`
  background-color: #3f51b5;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  color: white;
  letter-spacing: 1px;
  width: 100%;
  padding: 20px;

  &:hover {
    background-color: #7986cb;
  }
`;
export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  p: 4,
};
