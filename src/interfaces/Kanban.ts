export interface ITask {
  id: number;
  completed: boolean;
  text: string;
}

export type ColumnProps = {
  selectedProject: IProject | null; // Replace 'IProject' with the appropriate type for your project object
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
}

export interface IProjectTask {
  id: number;
  title: string;
  completed: boolean;
  subtask: ISubtask[];
}

export interface ISubtask {
  id: number;
  title: string;
  completed: boolean;
}
