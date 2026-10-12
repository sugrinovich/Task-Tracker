import { createContext } from "react";
import type { TaskStatus } from "../types/task";

type TasksContextType = {
    onDelete: (id: string) => void,
    onChage: (id: string, status: TaskStatus) => void;
};

export const TasksContext = createContext<TasksContextType | null>(null);