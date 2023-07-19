import {
  Brand,
  BrandContainer,
  MenuContainer,
  NavigationBar,
  ProfileContainer,
  ProfileIcon,
  // ProjectName,
} from './Navbar.styles';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import ProfileMenu from '../profile/Profile';
import AddNewTask from '../modals/addNewTask/AddNewTask';

const Navbar = () => {
  return (
    <NavigationBar>
      <BrandContainer>
        <Brand>
          <ViewQuiltIcon fontSize="large" />
          KANBAN
        </Brand>
      </BrandContainer>
      <MenuContainer>
        {/* <ProjectName>Project 1</ProjectName> */}
        <AddNewTask />
      </MenuContainer>
      <ProfileContainer>
        <ProfileIcon>
          <ProfileMenu />
        </ProfileIcon>
      </ProfileContainer>
    </NavigationBar>
  );
};

export default Navbar;
