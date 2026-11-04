import { createContext } from "react";
import type { Task, TaskStatus } from "../types/task";


type TasksContextType = {
    tasks: Task[];
    onTaskDelete: (id: string) => void;
    onTaskChage: (id: string, status: TaskStatus) => void;
    onSubtaskChange: (taskId: string, subtaskId: string, completed: boolean) => void;
    onAddTask: () => void;
};

export const TasksContext = createContext<TasksContextType | null>(null);
