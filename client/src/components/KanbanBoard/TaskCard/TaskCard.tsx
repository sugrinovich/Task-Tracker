import { useState, useContext, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { AlarmClock, Calendar, CircleCheck, Ellipsis, Pencil, Pin, SquareCheck, Trash2 } from "lucide-react";

import type { Task } from "../../../types/task";
import { deleteTask } from "../../../api/tasks";
import { TasksContext } from "../../../context/TasksContext";
import { dateFormatter, overdueDays, overdueFormatter } from "../../../utils/dateFormatter";
import CategoryLabel from "../../CategoryLabel/CategoryLabel";
import ProgressBar from "../../ProgressBar/ProgressBar";

import "./TaskCard.css";


// Меню лежит внутри <Link>: без этого клик по меню открывал бы задачу
function stopLink(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
}


type TaskCardProps = {
    task: Task;
};

function TaskCard({ task }: TaskCardProps) {
    const ctx = useContext(TasksContext);
    const [openMenu, setOpenMenu] = useState(false);

    const isDone = task.status === "done";
    const totalSubtasks = task.subtasks.length;
    const completedSubtasks = task.subtasks.filter(subtask => subtask.completed).length;
    const overdue = isDone ? null : overdueDays(task.date);

    async function handleClickDelete() {
        try {
            await deleteTask(task.id);
            ctx?.onTaskDelete(task.id);
        } catch (e) {
            console.error(e);
        } finally {
            setOpenMenu(false);
        }
    }

    return (
        <Link
            className={`taskCard ${isDone ? "taskCard--done" : ""}`}
            to={{ search: `?task=${task.id}` }}
        >
            <div className="taskCard__header">
                <CategoryLabel category={task.category} />

                <div className="menuWrap">
                    <button
                        type="button"
                        className={`iconBtn taskCard__menuBtn ${openMenu ? "taskCard__menuBtn--open" : ""}`}
                        aria-label="Действия с задачей"
                        aria-expanded={openMenu}
                        onClick={(e) => {
                            stopLink(e);
                            setOpenMenu(!openMenu);
                        }}
                    >
                        <Ellipsis size={20} />
                    </button>

                    {openMenu && (
                        <>
                            <div
                                className="menuBackdrop"
                                onClick={(e) => {
                                    stopLink(e);
                                    setOpenMenu(false);
                                }}
                            />
                            <div className="menu">
                                <button
                                    className="menu__btn"
                                    type="button"
                                    onClick={(e) => {
                                        stopLink(e);
                                        setOpenMenu(false);
                                    }}
                                >
                                    <Pin size={18} />
                                    Закрепить
                                </button>
                                <button
                                    className="menu__btn"
                                    type="button"
                                    onClick={(e) => {
                                        stopLink(e);
                                        setOpenMenu(false);
                                    }}
                                >
                                    <Pencil size={18} />
                                    Редактировать
                                </button>
                                <hr className="menu__line" />
                                <button
                                    className="menu__btn menu__btn--danger"
                                    type="button"
                                    onClick={(e) => {
                                        stopLink(e);
                                        handleClickDelete();
                                    }}
                                >
                                    <Trash2 size={18} />
                                    Удалить
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <h3 className="taskCard__title">{task.title}</h3>

            {!isDone && completedSubtasks > 0 && (
                <ProgressBar value={completedSubtasks} max={totalSubtasks} />
            )}

            <div className="taskCard__footer">
                {isDone ? (
                    <span className="taskCard__meta taskCard__meta--done">
                        <CircleCheck size={17} />
                        Завершено
                    </span>
                ) : (
                    <>
                        {overdue !== null ? (
                            <span className="overdueBadge">
                                <AlarmClock size={16} />
                                {overdueFormatter(overdue)}
                            </span>
                        ) : (
                            <span className="taskCard__meta">
                                <Calendar size={17} />
                                {dateFormatter(task.date)}
                            </span>
                        )}

                        {totalSubtasks > 0 && (
                            <span className="taskCard__meta">
                                <SquareCheck size={17} />
                                {completedSubtasks}/{totalSubtasks}
                            </span>
                        )}
                    </>
                )}
            </div>
        </Link>
    );
}

export default TaskCard;
