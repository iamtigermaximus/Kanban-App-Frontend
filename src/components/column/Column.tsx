import { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import {
  TaskBoardContainer,
  ColumnTaskContainer,
  ColumnHeader,
  ProjectColumn,
  ProjectColumnCard,
  ProjectBoardHeader,
  CardModalContainer,
} from './Column.styles';
import Card from '../card/Card';
import AddNewCard from '../modals/addNewCard/AddNewCard';
import AddNewColumn from '../modals/addNewColumn/AddNewColumn';
import { SubtasksColumn } from '../modals/addNewTask/AddNewTask.styles';
import {
  ColumnProps,
  ICard,
  IProjectTask,
  ISubtask,
} from '../../interfaces/Kanban';
//import EditCardModal from '../modals/editCardModal/editCardModal';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  p: 4,
};

const Column = ({ selectedProject }: ColumnProps) => {
  const [openCard, setOpenCard] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [checked, setChecked] = useState(true);
  const [selectedCardData, setSelectedCardData] = useState<any | null>(null);

  const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);

    if (selectedCardData) {
      setSelectedCardData((prevCard: ICard | null) => ({
        ...prevCard,
        status: event.target.value as string,
      }));
    }
  };

  const handleOpenCard = (card: ICard) => {
    setSelectedCardData(card);
    setOpenCard(true);
  };
  const handleCloseCard = () => {
    setOpenCard(false);
  };

  useEffect(() => {
    if (selectedCardData && selectedCardData.categoryId) {
      const selectedCategory = selectedProject?.categories.find(
        (category) => category.id === selectedCardData.categoryId
      );

      if (selectedCategory) {
        setStatus(selectedCategory.categoryTitle);
      }
    }
  }, [selectedCardData, selectedProject]);

  return (
    <>
      <TaskBoardContainer>
        <ProjectBoardHeader>{selectedProject?.name}</ProjectBoardHeader>
        <ProjectColumn key={selectedProject?.id}>
          {selectedProject?.categories.map((category) => (
            <ProjectColumnCard key={category.id}>
              <ColumnTaskContainer>
                <ColumnHeader>
                  {category.categoryTitle} ({category.cards.length})
                </ColumnHeader>
                {category.cards.map((card) => (
                  <React.Fragment key={card.id}>
                    <div key={card.id} onClick={() => handleOpenCard(card)}>
                      <Card
                        id={card.id}
                        title={card.title}
                        desc={card.desc}
                        categoryId={card.categoryId}
                        projectTasks={card.projectTasks}
                        subtasks={card.subtasks}
                        createdDateTime={card.createdDateTime}
                        updatedDateTime={card.updatedDateTime}
                        status={card.status}
                        onClick={() => handleOpenCard(card)}
                      />
                    </div>
                  </React.Fragment>
                ))}
              </ColumnTaskContainer>
              <AddNewCard />
            </ProjectColumnCard>
          ))}
          <AddNewColumn selectedProject={selectedProject} />
        </ProjectColumn>
        <Modal
          open={openCard}
          onClose={handleCloseCard}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
          sx={{ height: '100%' }}
        >
          <>
            {selectedCardData && (
              <Box sx={{ ...style, backgroundColor: 'white' }}>
                <CardModalContainer>
                  <TextField
                    id="new-column"
                    value={selectedCardData.title}
                    // onChange={(event) => setNewCategory(event.target.value)}
                    label="CARD NAME"
                    fullWidth
                    sx={{ my: 1 }}
                  />
                  <TextField
                    id="new-column"
                    multiline
                    label="DESCRIPTION"
                    value={selectedCardData.desc}
                    rows={2}
                    fullWidth
                    sx={{ my: 1 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </CardModalContainer>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': {
                      my: 1,
                      width: '100%',
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  {selectedCardData.projectTasks.map((pt: IProjectTask) => (
                    <div key={pt.id}>
                      <SubtasksColumn>
                        <TextField
                          id="new-column"
                          multiline
                          label="CARD TASK"
                          value={pt.text}
                          rows={2}
                          fullWidth
                          sx={{ my: 1 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <DeleteIcon />
                      </SubtasksColumn>

                      {pt.subtasks.map((st: ISubtask) => (
                        <SubtasksColumn key={st.id}>
                          <Checkbox
                            checked={checked}
                            onChange={handleCheckbox}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                          <TextField
                            id="new-column"
                            multiline
                            label="SUBTASK"
                            value={st.text}
                            rows={1}
                            fullWidth
                            sx={{ my: 1 }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          <DeleteIcon />
                        </SubtasksColumn>
                      ))}
                    </div>
                  ))}
                  <div>
                    <InputLabel sx={{ my: 1, fontSize: '12px' }}>
                      CURRENT STATUS
                    </InputLabel>
                    <FormControl fullWidth>
                      <Select
                        id="new-column"
                        value={status} // Set the default value to the card's category title
                        onChange={handleChange}
                      >
                        {selectedProject?.categories.map((category) => (
                          <MenuItem
                            key={category.id}
                            value={category.categoryTitle}
                          >
                            {category.categoryTitle}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </Box>
              </Box>
            )}
          </>
        </Modal>
      </TaskBoardContainer>
    </>
  );
};

export default Column;
