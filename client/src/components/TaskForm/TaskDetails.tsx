import { useContext, useState } from "react";
import { AlarmClock, Check, FileText, ListChecks, Play, X } from "lucide-react";

import type { Subtask, TaskStatus } from "../../types/task";
import { changeStatusSubtask, changeStatusTask } from "../../api/tasks";
import { TasksContext } from "../../context/TasksContext";
import { useCloseModal } from "../../hooks/useCloseModal";
import { datePartFormatter } from "../../utils/dateTimeFormatter";
import { overdueDays, overdueFormatter } from "../../utils/dateFormatter";
import CategoryLabel from "../CategoryLabel/CategoryLabel";
import ProgressBar from "../ProgressBar/ProgressBar";

import "./TaskDetails.css";


const COLUM_STATUS: Record<TaskStatus, string> = {
    todo: "К выполнению",
    in_progress: "В работе",
    done: "Готово",
};

const BUTTON_CONFIG = {
    todo: { text: "Приступить", Icon: Play, nextStatus: "in_progress" as TaskStatus },
    in_progress: { text: "Закончить", Icon: Check, nextStatus: "done" as TaskStatus },
    done: { text: "Выполнено", Icon: Check, nextStatus: "done" as TaskStatus },
};


type TaskDetailsProps = {
    taskId: string;
};

function TaskDetails({ taskId }: TaskDetailsProps) {
    const ctx = useContext(TasksContext);
    const handleClose = useCloseModal("task");
    const [highlightedSubtasks, setHighlightedSubtasks] = useState<Set<string>>(
        () => new Set()
    );

    const task = ctx?.tasks.find(task => task.id === taskId);

    // Все хуки — выше этой строки: после раннего return хуки вызывать нельзя
    if (!task) return null;

    const isDone = task.status === "done";
    const totalSubtasks = task.subtasks.length;
    const completedSubtasks = task.subtasks.filter(subtask => subtask.completed).length;
    const overdue = isDone ? null : overdueDays(task.date);
    const currentBtn = BUTTON_CONFIG[task.status];

    const clearSubtaskHighlight = (subtaskId: string) => {
        setHighlightedSubtasks(previous => {
            if (!previous.has(subtaskId)) return previous;

            const updated = new Set(previous);
            updated.delete(subtaskId);
            return updated;
        });
    };

    const handleClickChange = async (status: TaskStatus) => {
        try {
            await changeStatusTask(task.id, status);
            ctx?.onTaskChage(task.id, status);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubtaskToggle = async (subtask: Subtask) => {
        const completed = !subtask.completed;

        try {
            await changeStatusSubtask(task.id, subtask.id, completed);
            ctx?.onSubtaskChange(task.id, subtask.id, completed);
        } catch (error) {
            console.error(error);
        }
    };

    const handleStatusButtonClick = () => {
        const isFinishing = currentBtn.nextStatus === "done";
        const incompleteSubtasks = task.subtasks.filter(subtask => !subtask.completed);

        if (isFinishing && incompleteSubtasks.length > 0) {
            setHighlightedSubtasks(new Set(incompleteSubtasks.map(subtask => subtask.id)));
            return;
        }

        setHighlightedSubtasks(new Set());
        handleClickChange(currentBtn.nextStatus);
    };

    return (
        <div className="modalBackdrop">
            <div
                className="modal TaskDetails"
                role="dialog"
                aria-modal="true"
                aria-labelledby="task-details-title"
            >
                <div className="TaskDetails__scroll">
                    <header className="TaskDetails__header">
                        <div className="TaskDetails__labels">
                            <CategoryLabel category={task.category} />
                            <span className="TaskDetails__status">
                                <span className={`statusDot statusDot--${task.status}`} />
                                {COLUM_STATUS[task.status]}
                            </span>
                        </div>

                        <button
                            className="iconBtn TaskDetails__close"
                            type="button"
                            aria-label="Закрыть"
                            onClick={handleClose}
                        >
                            <X size={24} />
                        </button>
                    </header>

                    <h2 className="TaskDetails__title" id="task-details-title">
                        {task.title}
                    </h2>

                    <div className="TaskDetails__meta">
                        <div className="TaskDetails__metaItem">
                            <span className="TaskDetails__metaLabel">Срок</span>
                            <span>до {datePartFormatter(task.date)}</span>
                            {overdue !== null && (
                                <span className="overdueBadge">
                                    <AlarmClock size={16} />
                                    {overdueFormatter(overdue)}
                                </span>
                            )}
                        </div>

                    </div>

                    <section className="TaskDetails__section">
                        <h3 className="TaskDetails__sectionTitle">
                            <FileText size={20} />
                            Описание
                        </h3>
                        <p className={`TaskDetails__description ${!task.description ? "TaskDetails__description--empty" : ""}`}>
                            {task.description || "Описание отсутствует"}
                        </p>
                    </section>

                    {totalSubtasks > 0 && (
                        <section className="TaskDetails__section">
                            <div className="TaskDetails__sectionHeader">
                                <h3 className="TaskDetails__sectionTitle">
                                    <ListChecks size={20} />
                                    Подзадачи
                                </h3>
                                <span className="TaskDetails__counter">
                                    {completedSubtasks} из {totalSubtasks}
                                </span>
                            </div>

                            <ProgressBar value={completedSubtasks} max={totalSubtasks} />

                            <ul className="TaskDetails__subtasks">
                                {task.subtasks.map(subtask => (
                                    <li key={subtask.id}>
                                        <label
                                            className={[
                                                "TaskDetails__subtask",
                                                subtask.completed ? "TaskDetails__subtask--completed" : "",
                                                highlightedSubtasks.has(subtask.id) && !subtask.completed
                                                    ? "TaskDetails__subtask--error"
                                                    : "",
                                            ].filter(Boolean).join(" ")}
                                            onMouseEnter={() => clearSubtaskHighlight(subtask.id)}
                                        >
                                            <input
                                                type="checkbox"
                                                className="visuallyHidden"
                                                checked={subtask.completed}
                                                onChange={() => handleSubtaskToggle(subtask)}
                                            />
                                            <span className="TaskDetails__checkbox" aria-hidden="true">
                                                <Check size={16} strokeWidth={3} />
                                            </span>
                                            <span className="TaskDetails__subtaskText">{subtask.title}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>

                <footer className="TaskDetails__footer">
                    <span className="TaskDetails__created">
                        {task.createdAt && `Создана ${datePartFormatter(task.createdAt)}`}
                    </span>

                    <button
                        className={`btn ${isDone ? "btn--secondary" : "btn--primary"}`}
                        type="button"
                        disabled={isDone}
                        onClick={handleStatusButtonClick}
                    >
                        <currentBtn.Icon size={20} />
                        {currentBtn.text}
                    </button>
                </footer>
            </div>
        </div>
    );
}

export default TaskDetails;
