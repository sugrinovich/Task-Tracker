import type { Task, TaskStatus } from "../../types/task";
import "./KanbanBoard.css"
import KanbanColum from "./KanbanColum/KanbanColum";


type KanbanBoardProps = {
    tasks: Task[];
}
const STATUSES: TaskStatus[] = ["todo", "in_progress", "done"];

function KanbanBoard({ tasks }: KanbanBoardProps) {

    return (
        <div className="KanbanBoard">
            {
                STATUSES.map(status => (
                    <KanbanColum
                        key={status}
                        status={status}
                        tasks={tasks.filter(el => el.status === status)}
                    />
                ))
            }         
        </div>

    )
}

export default KanbanBoard;