import type { Task, TaskStatus } from "../../../types/task";
import { Calendar, SquareCheck, EllipsisVertical} from "lucide-react";
import { dateFormatter } from "../../../utils/dateFormatter";
import "./TaskCard.css"
import { useState } from "react";
import { useContext } from "react";
import { TasksContext } from "../../../context/TasksContext";
import { deleteTask, changeStatusTask } from "../../../api/tasks";


type TaskCardsProps = {
    task: Task;
}


const CATEGORY_LABELS = {
    design: "Дизайн",
    dev: "Разработка",
    marketing: "Маркетинг",
};


function TaskCard({ task }: TaskCardsProps) {
    const [open, setOpen] = useState(false);
    const ctx = useContext(TasksContext)

    async function handleClickDelete() {
        try {
            await deleteTask(task.id);
            ctx?.onDelete(task.id);
        } catch(e) {
            console.error(e)
        } finally {
            setOpen(false);
        }
    }

    async function handleClickChange(status: TaskStatus) {
        try {
            await changeStatusTask(task.id, "in_progress")
            ctx?.onChage(task.id, status)
        } catch(e) {
            console.error(e)
        } finally {
            setOpen(false);
        }
    }
    
    return (
        <div className={`taskCard taskCard--${task.category}`}>
            <div className="taskCard__header">
                <span className={`taskCard__tag taskCard__tag--${task.category}`}>
                    {CATEGORY_LABELS[task.category]}
                </span>
                <div className="menuWrap">
                    <button type="button" className="taskCard__menu" onClick={() => setOpen(!open)}>
                        <EllipsisVertical size={16} />
                    </button>

                    {open && (
                        <>
                            <div className="menuBackdrop" onClick={() => setOpen(false)} />
                            <div className="menu">
                                <button className="menu__btn" type="button"
                                    onClick={() => handleClickChange("in_progress")}
                                >
                                    Приступить
                                </button>
                                <hr className="line"/>
                                <button className="menu__btn" type="button"
                                    onClick={() => setOpen(false)}
                                >
                                    Закрепить
                                </button>
                                <hr className="line"/>
                                <button className="menu__btn" type="button"
                                    onClick={() => setOpen(false)}
                                >
                                    Редактировать
                                </button>
                                <hr className="line"/>
                                <button className="menu__btn" type="button"
                                    onClick={() => handleClickDelete()}
                                >
                                    Удалить
                                </button>
                            </div>                        
                        </>

                    )}
                </div>
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