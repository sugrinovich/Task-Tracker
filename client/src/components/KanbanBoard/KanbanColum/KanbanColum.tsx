import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import type { Task, TaskStatus } from "../../../types/task";
import TaskCard from "../TaskCard/TaskCard";

import "./KanbanColum.css";


const COLUM_STATUS: Record<TaskStatus, string> = {
    todo: "К выполнению",
    in_progress: "В работе",
    done: "Готово",
};


type KanbanColumProps = {
    tasks: Task[];
    status: TaskStatus;
};

function KanbanColum({ tasks, status }: KanbanColumProps) {
    return (
        <section className="KanbanColum">
            <header className="KanbanColum__header">
                <span className={`statusDot statusDot--${status}`} />
                <h2 className="KanbanColum__title">{COLUM_STATUS[status]}</h2>
                <span className="KanbanColum__total">{tasks.length}</span>

                {/* Создавать задачи можно только в «К выполнению» */}
                {status === "todo" && (
                    <Link
                        className="iconBtn KanbanColum__add"
                        to={{ search: "?new" }}
                        aria-label="Добавить задачу"
                        title="Добавить задачу"
                    >
                        <Plus size={22} />
                    </Link>
                )}
            </header>

            <div className="KanbanColum__body">
                {tasks.length === 0 && (
                    <p className="KanbanColum__empty">Задач пока нет</p>
                )}

                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </section>
    );
}

export default KanbanColum;
