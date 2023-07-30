import {
  ProjectName,
  ProjectNameContainer,
  ProjectsListContainer,
  SideBarHeader,
} from './ProjectsList.styles';
import CreateNewBoard from '../modals/createNewBoard/CreateNewBoard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IProject, ProjectsListProps } from '../../interfaces/Kanban';

const ProjectsList = ({ handleProjectSelect }: ProjectsListProps) => {
  const [projects, setProjects] = useState<IProject[]>([]); // State variable to store the fetched projects
  const [projectCount, setProjectCount] = useState(0);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://kanban-backend.azurewebsites.net/api/v1/Projects'
      );
      const fetchedProjects = response.data;
      setProjects(fetchedProjects);
      setProjectCount(fetchedProjects.length);

      // Set the first project as the default and selected project
      if (fetchedProjects.length > 0) {
        setSelectedProject(fetchedProjects[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectProject = (project: IProject) => {
    handleProjectSelect(project);
    setSelectedProject(project);
  };
  return (
    <ProjectsListContainer>
      <SideBarHeader>All Boards ({projectCount})</SideBarHeader>
      {projects.map((project) => (
        <ProjectNameContainer
          key={project.id}
          onClick={() => selectProject(project)}
          style={{
            backgroundColor:
              selectedProject === project ? '#20212c' : 'transparent',
          }}
        >
          <ProjectName>{project.name}</ProjectName>
        </ProjectNameContainer>
      ))}
      <CreateNewBoard />
    </ProjectsListContainer>
  );
};

export default ProjectsList;
