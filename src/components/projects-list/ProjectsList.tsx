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

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://kanban-backend.azurewebsites.net/api/v1/Projects'
      ); // Replace with your API endpoint
      setProjects(response.data); // Handle the retrieved data
      setProjectCount(response.data.length); // Set the project count based on the fetched data
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(); // Call the function when the component mounts
  }, []);

  const selectProject = (project: IProject) => {
    handleProjectSelect(project);
  };
  return (
    <ProjectsListContainer>
      <SideBarHeader>All Boards ({projectCount})</SideBarHeader>
      {projects.map((project) => (
        <ProjectNameContainer
          key={project.id}
          onClick={() => selectProject(project)}
        >
          <ProjectName>{project.name}</ProjectName>
        </ProjectNameContainer>
      ))}
      <CreateNewBoard />
    </ProjectsListContainer>
  );
};

export default ProjectsList;
