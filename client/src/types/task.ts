export type TaskCategory = 'design' | 'dev' | 'marketing';
export type TaskStatus = 'todo' | 'in_progress' | 'done';


export interface Task {
    id: string,
    status: TaskStatus,
    category: TaskCategory,
    title: string,
    description?: string | null,
    date: string,
    checklist_progress?: {
        total: number,
        completed: number,
    },
    user: {
        name: string,
        avatar: string,
    },
};