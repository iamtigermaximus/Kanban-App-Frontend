import { AppBar, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const NavigationBar = styled(AppBar)`
  background-color: #2b2c37;
  padding: 10px 24px;
  height: 10vh;
  display: flex;
  flex-direction: row;
`;

export const MenuContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 80%;
`;

export const BrandContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
`;

export const ProfileContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
export const Brand = styled('div')`
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3f51b5;
  letter-spacing: 1px;
`;

export const ProfileIcon = styled('div')`
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const ProjectName = styled('h1')`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 20px;
  letter-spacing: 1px;
`;

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
