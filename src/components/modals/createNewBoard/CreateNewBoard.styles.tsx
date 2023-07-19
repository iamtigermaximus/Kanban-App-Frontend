import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ProjectsListContainer = styled(Box)`
  background-color: #2b2c37;
  height: 100vh;
`;

export const ProjectNameContainer = styled(Box)`
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 10px 20px;

  &:hover {
    background-color: white;
    color: #3f51b5;
  }
`;
export const ProjectName = styled('div')`
  color: #828fa3;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 1px;

  &:hover {
    color: #3f51b5;
  }
`;

export const AddNewBoardButtonContainer = styled(Box)`
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 10px 20px;
`;

export const AddNewBoardButton = styled(Button)`
  background-color: #3f51b5;
  font-size: 10px;
  font-weight: 700;
  cursor: pointer;
  color: white;
  letter-spacing: 1px;

  &:hover {
    background-color: #7986cb;
  }
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

export const BoardColumn = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  jus
`;

export const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  p: 4,
};
