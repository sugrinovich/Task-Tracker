import "./TaskDetails.css"
import type { TaskStatus } from "../../types/task";
import { Calendar, SquareCheck, FileText } from "lucide-react";
import { dateTimeFormatter } from "../../utils/dateTimeFormatter";
import { useParams, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useContext } from "react";
import { TasksContext } from "../../context/TasksContext";


const CATEGORY_LABELS = {
    design: "Дизайн",
    dev: "Разработка",
    marketing: "Маркетинг",
};
const COLUM_STATUS: Record<TaskStatus, string> = {
    todo: "К выполнению",
    in_progress: "В работе",
    done: "Готово"
}


function TaskDetails() {
    const { id } = useParams();
    const ctx = useContext(TasksContext)
    const navigate = useNavigate();
    const location = useLocation();

    const task = ctx?.tasks.find(task => task.id === id);
    const isModal = Boolean(location.state?.backgroundLocation);

    if (!task) return <Navigate to="/" replace />;
    
    const content = (
        <div className="TaskDetails">
            <div className="TaskDetails__header">
                <div className="TaskDetails__tags">
                    <span className={`TaskDetails__tag TaskDetails__tag--${task.category}`}>{CATEGORY_LABELS[task?.category]}</span>
                    <span className="TaskDetails__status">{COLUM_STATUS[task.status]}</span>
                </div>
                <h2 className="TaskDetails__title">{task.title}</h2>
                <div className="TaskDetails__info">
                    <p className="TaskDetails__date">
                        <Calendar size={18}/>
                        {dateTimeFormatter(task.date)}
                    </p>
                    <div className="TaskDetails__avatar">
                        <span className="TaskDetails__initials">{task.user.avatar}</span>
                        <p className="TaskDetails__username">{task.user.name}</p>
                    </div>                   
                </div>

            </div>

            <section className="TaskDetails__description">
                <h3 className="TaskDetails__descriptionTitle">
                    <FileText size={18}/>
                    Описание
                </h3>
                <p className="TaskDetails__descriptionText">{task.description}</p>
            </section>

            <section className="TaskDetails__checklist">
                <h3 className="TaskDetails__checklistTitle">
                    <SquareCheck size={18}/>
                    Подзадачи
                    {task.checklist_progress && (
                        <span className="TaskDetails__checklistInfo">
                            ({task.checklist_progress.completed}/{task.checklist_progress.total})
                        </span>
                    )}
                </h3>
                {/* тут потом будет список подзадач */}
            </section>

            <button className="TaskDetails__btn"
                onClick={() => navigate(isModal ? -1 : "/" as any)}>
                Закрыть
            </button>
        </div>
    );

    return isModal ? <div className="modalBackdrop">{content}</div> : content;
}

export default TaskDetails;