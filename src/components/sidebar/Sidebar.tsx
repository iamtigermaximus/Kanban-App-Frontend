import { IProject } from '../../interfaces/Kanban';
import ProjectsList from '../projects-list/ProjectsList';
import { SideBarContainer } from './Sidebar.styles';

type SidebarProps = {
  projects: IProject[];
  handleProjectSelect: (project: IProject | null) => void;
  defaultSelectedProject: IProject | null;
};

const Sidebar = ({ handleProjectSelect }: SidebarProps) => {
  return (
    <SideBarContainer>
      <ProjectsList handleProjectSelect={handleProjectSelect} />
    </SideBarContainer>
  );
};

export default Sidebar;
