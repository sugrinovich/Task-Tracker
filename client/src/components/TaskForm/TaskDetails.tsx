import { useContext, useState } from "react";
import { Calendar, Clock3, SquareCheck, FileText, X } from "lucide-react";

import type { Subtask, TaskStatus } from "../../types/task";
import { changeStatusSubtask, changeStatusTask } from "../../api/tasks";
import { TasksContext } from "../../context/TasksContext";
import { useCloseModal } from "../../hooks/useCloseModal";
import { datePartFormatter, timePartFormatter } from "../../utils/dateTimeFormatter";

import "./TaskDetails.css";


const CATEGORY_LABELS = {
    design: "Дизайн",
    dev: "Разработка",
    marketing: "Маркетинг",
};

const COLUM_STATUS: Record<TaskStatus, string> = {
    todo: "К выполнению",
    in_progress: "В работе",
    done: "Готово",
};

const BUTTON_CONFIG = {
    todo: { text: "Приступить", nextStatus: "in_progress" as TaskStatus },
    in_progress: { text: "Закончить", nextStatus: "done" as TaskStatus },
    done: { text: "Выполнено", nextStatus: "done" as TaskStatus },
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

    const completedSubtasks = task.subtasks.filter(subtask => subtask.completed).length;
    const isDone = task.status === "done";
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
            <div className="TaskDetails">
                <button
                    className="TaskDetails__close"
                    type="button"
                    aria-label="Закрыть"
                    onClick={handleClose}
                >
                    <X size={20} />
                </button>

                <div className="TaskDetails__header">
                    <h2 className="TaskDetails__title">
                        {task.title.length > 30 ? `${task.title.slice(0, 30)}...` : task.title}
                    </h2>
                    <span className={`TaskDetails__status TaskDetails__status--${task.status}`}>
                        {COLUM_STATUS[task.status]}
                    </span>
                </div>

                <div className="TaskDetails__content">
                    <div className="TaskDetails__info">
                        <span className={`TaskDetails__tag TaskDetails__tag--${task.category}`}>
                            {CATEGORY_LABELS[task.category]}
                        </span>

                        <p className="TaskDetails__date">
                            <span className="TaskDetails__datePart">
                                <Calendar size={18} />
                                {datePartFormatter(task.date)}
                            </span>
                            <span className="TaskDetails__datePart">
                                <Clock3 size={18} />
                                {timePartFormatter(task.date)}
                            </span>
                        </p>

                        <div className="TaskDetails__avatar">
                            <span className="TaskDetails__initials">{task.user.avatar}</span>
                            <p className="TaskDetails__username">{task.user.name}</p>
                        </div>
                    </div>

                    <section className="TaskDetails__description">
                        <h3 className="TaskDetails__descriptionTitle">
                            <FileText size={18} />
                            Описание
                        </h3>
                        <p className={`TaskDetails__descriptionText ${!task.description ? "TaskDetails__descriptionText--empty" : ""}`}>
                            {task.description || "Описание отсутствует"}
                        </p>
                    </section>

                    <section className="TaskDetails__checklist">
                        <h3 className="TaskDetails__checklistTitle">
                            <SquareCheck size={18} />
                            Подзадачи
                            <span className="TaskDetails__checklistInfo">
                                ({completedSubtasks}/{task.subtasks.length})
                            </span>
                        </h3>

                        {task.subtasks.map(subtask => (
                            <label
                                key={subtask.id}
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
                                    className="TaskDetails__checklistInput"
                                    checked={subtask.completed}
                                    onChange={() => handleSubtaskToggle(subtask)}
                                />
                                <span className="TaskDetails__subtaskText">{subtask.title}</span>
                            </label>
                        ))}
                    </section>
                </div>

                <div className="TaskDetails__footer">
                    <button
                        className="TaskDetails__btn TaskDetails__btn--primary"
                        type="button"
                        disabled={isDone}
                        onClick={handleStatusButtonClick}
                    >
                        {currentBtn.text}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskDetails;
