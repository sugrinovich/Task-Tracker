import type { Task, TaskStatus } from "../../../types/task"
import TaskCard from "../TaskCard/TaskCard";
import "./KanbanColum.css" 
import { Link, useLocation } from "react-router-dom";


type KanbanColumProps = {
    tasks: Task[];
    status: TaskStatus;
}
const COLUM_STATUS: Record<TaskStatus, string> = {
    todo: "К выполнению",
    in_progress: "В работе",
    done: "Готово"
}
const STATUS_COLORS: Record<TaskStatus, string> = {
    todo: "#7081D7",
    in_progress: "#F59E0B",
    done: "#22C55E",
};


function KanbanColum({ tasks, status }: KanbanColumProps) {
    const tasks_len = tasks.length;
    const location = useLocation();

    return (
        <div className="KanbanColum">
            <div className="KanbanColum__header">
                <h3 className="KanbanColum__title"
                    style={{ "--dot": STATUS_COLORS[status] } as React.CSSProperties}
                >   
                    {COLUM_STATUS[status]}
                </h3>
                <p className="KanbanColum__total">{tasks_len}</p>
            </div>
            <div className="KanbanColum__body">
                {tasks.length === 0 && (
                    <p className="KanbanColum__empty">Задач пока нет</p>
                )}
                {
                    tasks.map(task => (
                        <TaskCard key={task.id} task={task}/>
                    ))
                }
                <Link
                    className="KanbanColum__btn"
                    to="/tasks/new"
                    state={{ backgroundLocation: location, createStatus: status }}
                >
                    + Добавить задачу
                </Link>
            </div>
        </div>
    )
}

export default KanbanColum;
