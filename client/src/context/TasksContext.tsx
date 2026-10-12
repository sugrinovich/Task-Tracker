import { createContext } from "react";

type TasksContextType = {
    onDelete: (id: string) => void;
};

export const TasksContext = createContext<TasksContextType | null>(null);