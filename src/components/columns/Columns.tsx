import { ColumnsProps } from '../../interfaces/Kanban';
import Column from '../column/Column';
import { ColumnsContainer } from './Columns.styles';

const Columns = ({ selectedProject }: ColumnsProps) => {
  if (!selectedProject) {
    return null;
  }
  return (
    <ColumnsContainer>
      <Column selectedProject={selectedProject} />
    </ColumnsContainer>
  );
};

export default Columns;
