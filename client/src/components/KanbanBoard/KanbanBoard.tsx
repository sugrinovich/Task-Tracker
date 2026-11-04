import type { Task, TaskStatus } from "../../types/task";
import KanbanColum from "./KanbanColum/KanbanColum";

import "./KanbanBoard.css";


const STATUSES: TaskStatus[] = ["todo", "in_progress", "done"];


type KanbanBoardProps = {
    tasks: Task[];
};

function KanbanBoard({ tasks }: KanbanBoardProps) {
    return (
        <div className="KanbanBoard">
            {STATUSES.map(status => (
                <KanbanColum
                    key={status}
                    status={status}
                    tasks={tasks.filter(el => el.status === status)}
                />
            ))}
        </div>
    );
}

export default KanbanBoard;
