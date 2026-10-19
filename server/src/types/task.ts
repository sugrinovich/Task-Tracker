export type TaskCategory = 'design' | 'dev' | 'marketing';
export type TaskStatus = 'todo' | 'in_progress' | 'done';


export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}


export interface Task {
    id: string,
    status: TaskStatus,
    category: TaskCategory,
    title: string,
    description?: string | null,
    date: string,
    subtasks: Subtask[],
    user: {
        name: string,
        avatar: string,
    },
};