export interface ITask {
  id: number;
  completed: boolean;
  text: string;
}

export type ColumnProps = {
  selectedProject: IProject | null;
};

export type ColumnsProps = {
  selectedProject: IProject | null;
};

export type ProjectsListProps = {
  handleProjectSelect: (project: IProject) => void;
};

export interface IProject {
  id: number;
  name: string;
  categories: ICategory[];
  createdDateTime: string;
  updatedDateTime: string;
}

export interface ICategory {
  id: number;
  categoryTitle: string;
  projectId: number;
  cards: ICard[];
  createdDateTime: string;
  updatedDateTime: string;
}

export interface ICard {
  id: number;
  title: string;
  desc: string;
  categoryId: number;
  projectTasks: IProjectTask[];
  createdDateTime: string;
  updatedDateTime: string;
  subtasks: ISubtask[];
  status: string;
  onClick: () => void;
}

export interface IProjectTask {
  completed: boolean;
  text: string;
  cardId: number;
  subtasks: ISubtask[];
  id: number;
  createdDateTime: string;
  updatedDateTime: string;
}

export interface ISubtask {
  completed: boolean;
  text: string;
  projectTaskId: number;
  id: number;
  createdDateTime: string;
  updatedDateTime: string;
}
