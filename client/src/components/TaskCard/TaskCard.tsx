import type { Task } from "../../types/task";
import { Calendar, SquareCheck, EllipsisVertical } from "lucide-react";
import { dateFormatter } from "../../utils/dateFormatter";
import "./TaskCard.css"


type TaskCardsProps = {
    task: Task;
}


const CATEGORY_LABELS = {
    design: "Дизайн",
    dev: "Разработка",
    marketing: "Маркетинг",
};

function TaskCard({ task }: TaskCardsProps) {
    return (
        <div className={`taskCard taskCard--${task.category}`}>
            <div className="taskCard__header">
                <span className={`taskCard__tag taskCard__tag--${task.category}`}>
                    {CATEGORY_LABELS[task.category]}
                </span>
                <button type="button" className="taskCard__menu">
                    <EllipsisVertical size={16} />
                </button>
            </div>

            <div className="taskCard__body">
                <h3 className="taskCard__title">{task.title}</h3>
                {/* {task.description && (
                    <p className="taskCard__description">{task.description}</p>
                )} */}
            </div>

            <div className="taskCard__footer">
                <p className="taskCard__date">
                    <Calendar size={16} />
                    {dateFormatter(task.date)}
                </p>
                {(task.checklist_progress) ? (
                    <p className="taskCard__progress">
                        <SquareCheck size={16} />
                        {task.checklist_progress.completed}/{task.checklist_progress.total}
                    </p>
                ) : (
                    <p className="taskCard__progress">
                        <SquareCheck size={16} />
                        None
                    </p>   
                )}
                <div className="taskCard__avatar">{task.user.avatar}</div>
            </div>
        </div>
    );
}

export default TaskCard;