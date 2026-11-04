import { useState, useContext, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Calendar, SquareCheck, EllipsisVertical } from "lucide-react";

import type { Task } from "../../../types/task";
import { deleteTask } from "../../../api/tasks";
import { TasksContext } from "../../../context/TasksContext";
import { dateFormatter, isOverdueDate } from "../../../utils/dateFormatter";

import "./TaskCard.css";


const CATEGORY_LABELS = {
    design: "Дизайн",
    dev: "Разработка",
    marketing: "Маркетинг",
};

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

    const completedSubtasks = task.subtasks.filter(subtask => subtask.completed).length;

    const dateClassName = task.status === "done"
        ? "taskCard__date--completed"
        : isOverdueDate(task.date)
            ? "taskCard__date--overdue"
            : "taskCard__date--default";

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
            className={`taskCard taskCard--${task.category}`}
            to={{ search: `?task=${task.id}` }}
        >
            <div className="taskCard__header">
                <span className={`taskCard__tag taskCard__tag--${task.category}`}>
                    {CATEGORY_LABELS[task.category]}
                </span>

                <div className="menuWrap">
                    <button
                        type="button"
                        className="taskCard__menu"
                        onClick={(e) => {
                            stopLink(e);
                            setOpenMenu(!openMenu);
                        }}
                    >
                        <EllipsisVertical size={16} />
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
                                    Закрепить
                                </button>
                                <hr className="line" />
                                <button
                                    className="menu__btn"
                                    type="button"
                                    onClick={(e) => {
                                        stopLink(e);
                                        setOpenMenu(false);
                                    }}
                                >
                                    Редактировать
                                </button>
                                <hr className="line" />
                                <button
                                    className="menu__btn menu__btn--danger"
                                    type="button"
                                    onClick={(e) => {
                                        stopLink(e);
                                        handleClickDelete();
                                    }}
                                >
                                    Удалить
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="taskCard__body">
                <h3 className="taskCard__title">
                    {task.title.length > 30 ? `${task.title.slice(0, 30)}...` : task.title}
                </h3>
            </div>

            <div className="taskCard__footer">
                <p className="taskCard__date">
                    <span className={dateClassName}>
                        <Calendar size={16} />
                        {dateFormatter(task.date)}
                    </span>
                </p>
                <p className="taskCard__progress">
                    <SquareCheck size={16} />
                    {completedSubtasks}/{task.subtasks.length}
                </p>
                <div className="taskCard__avatar">{task.user.avatar}</div>
            </div>
        </Link>
    );
}

export default TaskCard;
