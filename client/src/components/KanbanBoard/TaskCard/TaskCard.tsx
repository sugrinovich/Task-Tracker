import type { Task, TaskStatus } from "../../../types/task";
import { Calendar, SquareCheck, EllipsisVertical} from "lucide-react";
import { dateFormatter } from "../../../utils/dateFormatter";
import "./TaskCard.css"
import { useState, useContext } from "react";
import { TasksContext } from "../../../context/TasksContext";
import { deleteTask, changeStatusTask } from "../../../api/tasks";
import { useLocation, Link } from "react-router-dom";


type TaskCardsProps = {
    task: Task;
}
const CATEGORY_LABELS = {
    design: "Дизайн",
    dev: "Разработка",
    marketing: "Маркетинг",
};
const BUTTON_CONFIG = {
    todo: { text: "Приступить", nextStatus: "in_progress" as TaskStatus },
    in_progress: { text: "Закончить", nextStatus: "done" as TaskStatus },
    done: { text: "Выполнено", nextStatus: "done" as TaskStatus }
};


function TaskCard({ task }: TaskCardsProps) {
    const [openMenu, setOpenMenu] = useState(false);
    const ctx = useContext(TasksContext)

    async function handleClickDelete() {
        try {
            await deleteTask(task.id);
            ctx?.onDelete(task.id);
        } catch(e) {
            console.error(e)
        } finally {
            setOpenMenu(false);
        }
    }

    async function handleClickChange(status: TaskStatus) {
        try {
            await changeStatusTask(task.id, status)
            ctx?.onStatusChage(task.id, status)
        } catch(e) {
            console.error(e)
        } finally {
            setOpenMenu(false);
        }
    }

    const isDone = task.status === "done";
    const currentBtn = BUTTON_CONFIG[task.status];
    const location = useLocation();
    
    return (
            <Link className={`taskCard taskCard--${task.category}`}
                to={`/tasks/${task.id}`}
                state={{ backgroundLocation: location }}
            >
                <div className="taskCard__header">
                    <span className={`taskCard__tag taskCard__tag--${task.category}`}>
                        {CATEGORY_LABELS[task.category]}
                    </span>
                    <div className="menuWrap">
                        <button type="button" className="taskCard__menu" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setOpenMenu(!openMenu);
                                }}
                            >
                            <EllipsisVertical size={16} />
                        </button> 
                        {openMenu && (
                            <>
                                <div className="menuBackdrop" onClick={(e) => {
                                    setOpenMenu(false);
                                    e.stopPropagation();
                                    e.preventDefault();
                                }}/>
                                <div className="menu">
                                    <button 
                                        className={`menu__btn ${isDone ? "menu__btn--done" : ""}`}
                                        type="button" 
                                        disabled={isDone}
                                        onClick={(e) => {
                                            handleClickChange(currentBtn.nextStatus)
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }}
                                    >
                                        {currentBtn.text}
                                    </button>
                                    <hr className="line"/>
                                    <button className="menu__btn" type="button"
                                        onClick={(e) => {setOpenMenu(false)
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }}
                                    >
                                        Закрепить
                                    </button>
                                    <hr className="line"/>
                                    <button className="menu__btn" type="button"
                                        onClick={(e) => {setOpenMenu(false)
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }}                               
                                    >
                                        Редактировать
                                    </button>
                                    <hr className="line"/>
                                    <button className="menu__btn" type="button"
                                        onClick={(e) => {handleClickDelete()
                                            e.stopPropagation();
                                            e.preventDefault();
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
            </Link>
    );
}

export default TaskCard;