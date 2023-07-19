import { useEffect, useState } from 'react';
import Columns from '../columns/Columns';
import Sidebar from '../sidebar/Sidebar';
import { BoardContainer } from './Board.styles';
import { IProject } from '../../interfaces/Kanban';
import axios from 'axios';

const Board = () => {
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    // Fetch the list of projects and set the first project as the selected project
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5500/api/v1/Projects'
        );
        const projectsData = response.data;
        setProjects(projectsData);
        setSelectedProject(projectsData[0] || null);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <BoardContainer>
      <Sidebar
        projects={projects}
        handleProjectSelect={setSelectedProject}
        defaultSelectedProject={selectedProject}
      />
      <Columns selectedProject={selectedProject} />
    </BoardContainer>
  );
};

export default Board;
