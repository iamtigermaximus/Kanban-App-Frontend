import { ICard } from '../../interfaces/Kanban';
import { CardSubtitle, CardTitle, ColumnTask } from './Card.styles';

const Card = ({ title, desc }: ICard) => {
  return (
    <ColumnTask>
      <CardTitle>{title}</CardTitle>
      <CardSubtitle>{desc}</CardSubtitle>
    </ColumnTask>
  );
};

export default Card;
