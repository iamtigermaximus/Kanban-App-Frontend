import { Box } from '@mui/material';
import { ICard } from '../../interfaces/Kanban';
import { CardSubtitle, CardTitle, ColumnTask } from './Card.styles';
import DeleteIcon from '@mui/icons-material/Delete';

const Card = ({ id, title, desc, projectTasks, subtasks, onClick }: ICard) => {
  return (
    <ColumnTask>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'column' }}
          onClick={onClick}
        >
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>{desc}</CardSubtitle>
        </Box>
        <DeleteIcon />
      </Box>
    </ColumnTask>
  );
};

export default Card;
