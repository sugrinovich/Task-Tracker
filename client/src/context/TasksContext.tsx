import { createContext } from "react";
import type { TaskStatus, Task } from "../types/task";

type TasksContextType = {
    tasks: Task[];
    onDelete: (id: string) => void,
    onStatusChage: (id: string, status: TaskStatus) => void;
};

export const TasksContext = createContext<TasksContextType | null>(null);