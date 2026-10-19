import { CalendarDays, ChevronDown, Clock3, Plus, Sparkles, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { TaskCategory } from "../../types/task";
import { formatDateInput, formatTimeInput } from "../../utils/dateInputFormatter";
import "./CreateTaskForm.css";


const CATEGORY_OPTIONS: { value: TaskCategory; label: string }[] = [
    { value: "design", label: "Дизайн" },
    { value: "dev", label: "Разработка" },
    { value: "marketing", label: "Маркетинг" },
];

function CreateTaskForm() {
    const location = useLocation();
    const isModal = Boolean(location.state?.backgroundLocation);
    const navigate = useNavigate(); 

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<TaskCategory | "">("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [subtaskTitle, setSubtaskTitle] = useState("");
    const [subtasks, setSubtasks] = useState<string[]>([]);

    const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
    const descLen = description.length;
    const selectedCategory = CATEGORY_OPTIONS.find(option => option.value === category);

    const addSubtask = () => {
        const nextSubtask = subtaskTitle.trim();
        if (!nextSubtask) return;

        setSubtasks(previous => [...previous, nextSubtask]);
        setSubtaskTitle("");
    };

    const content = (

        <div className="CreateTaskForm">
            <header className="CreateTaskForm__header">
                <div className="CreateTaskForm__heading">
                    <span className="CreateTaskForm__headingIcon">
                        <Sparkles size={29} strokeWidth={2.3} />
                    </span>
                    <h2 className="CreateTaskForm__title">Новая задача</h2>
                </div>

                <button
                    className="CreateTaskForm__close"
                    type="button"
                    aria-label="Закрыть форму"
                    onClick={() => navigate(isModal ? -1 : "/" as any)}
                >
                    <X size={26} strokeWidth={1.8} />
                </button>
            </header>

            <form className="CreateTaskForm__form">
                <div className="CreateTaskForm__content">
                    <div className="CreateTaskForm__options">
                        <div className="CreateTaskForm__field">
                            <span className="CreateTaskForm__label">Метка</span>
                            <div className="CreateTaskForm__categoryPicker">
                                <button
                                    className={`CreateTaskForm__control CreateTaskForm__choice ${categoryMenuOpen ? "CreateTaskForm__choice--open" : ""}`}
                                    type="button"
                                    aria-expanded={categoryMenuOpen}
                                    onClick={() => setCategoryMenuOpen(open => !open)}
                                >
                                    {selectedCategory ? (
                                        <span className={`CreateTaskForm__tag CreateTaskForm__tag--${category}`}>
                                            {selectedCategory.label}
                                        </span>
                                    ) : (
                                        <span className="CreateTaskForm__categoryPlaceholder">
                                            Выберите категорию
                                        </span>
                                    )}
                                    <ChevronDown size={20} />
                                </button>

                                {categoryMenuOpen && (
                                    <>
                                        <div
                                            className="CreateTaskForm__categoryBackdrop"
                                            onClick={() => setCategoryMenuOpen(false)}
                                        />
                                        <div className="CreateTaskForm__categoryMenu">
                                            {CATEGORY_OPTIONS.map(option => (
                                                <button
                                                    className="CreateTaskForm__categoryOption"
                                                    type="button"
                                                    key={option.value}
                                                    onClick={() => {
                                                        setCategory(option.value);
                                                        setCategoryMenuOpen(false);
                                                    }}
                                                >
                                                    <span className={`CreateTaskForm__tag CreateTaskForm__tag--${option.value}`}>
                                                        {option.label}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="CreateTaskForm__field">
                            <span className="CreateTaskForm__label">Срок выполнения</span>
                            <span className="CreateTaskForm__dateTime">
                                <span className="CreateTaskForm__dateControl">
                                    <CalendarDays size={18} />
                                    <input
                                        className="CreateTaskForm__control CreateTaskForm__dateInput"
                                        type="text"
                                        inputMode="numeric"
                                        name="date"
                                        placeholder="ДД.ММ.ГГГГ"
                                        maxLength={10}
                                        value={date}
                                        onChange={(event) => setDate(formatDateInput(event.target.value))}
                                    />
                                </span>
                                <span className="CreateTaskForm__dateControl">
                                    <Clock3 size={18} />
                                    <input
                                        className="CreateTaskForm__control CreateTaskForm__dateInput"
                                        type="text"
                                        inputMode="numeric"
                                        name="time"
                                        placeholder="ЧЧ:ММ"
                                        maxLength={5}
                                        value={time}
                                        onChange={(event) => setTime(formatTimeInput(event.target.value))}
                                    />
                                </span>
                            </span>
                        </div>
                    </div>

                    <label className="CreateTaskForm__field">
                        <span className="CreateTaskForm__label">
                            Название 
                        </span>
                        <input
                            className="CreateTaskForm__control"
                            type="text"
                            name="title"
                            placeholder="Введите название"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </label>

                    <label className="CreateTaskForm__field">
                        <span className="CreateTaskForm__label">Описание</span>
                        <span className="CreateTaskForm__textareaWrap">
                            <textarea
                                className="CreateTaskForm__control CreateTaskForm__textarea"
                                name="description"
                                value={description}
                                maxLength={2000}
                                placeholder="Введите описание"
                                onChange={(event) => setDescription(event?.target.value)}
                            />
                            <span className="CreateTaskForm__counter">{descLen}/2000</span>
                        </span>
                    </label>

                    <div className="CreateTaskForm__field">
                        <span className="CreateTaskForm__label">Подзадачи</span>
                        <div className="CreateTaskForm__subtaskCreator">
                            <input
                                className="CreateTaskForm__control CreateTaskForm__subtaskInput"
                                type="text"
                                value={subtaskTitle}
                                placeholder="Добавить подзадачу"
                                onChange={(event) => setSubtaskTitle(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        event.preventDefault();
                                        addSubtask();
                                    }
                                }}
                            />
                            <button
                                className="CreateTaskForm__subtaskAdd"
                                type="button"
                                aria-label="Добавить подзадачу"
                                onClick={addSubtask}
                            >
                                <Plus size={20} />
                            </button>
                        </div>

                        {subtasks.length > 0 && (
                            <ul className="CreateTaskForm__subtaskList">
                                {subtasks.map((subtask, index) => (
                                    <li className="CreateTaskForm__subtask" key={`${subtask}-${index}`}>
                                        <span className="CreateTaskForm__subtaskText">{subtask}</span>
                                        <button
                                            className="CreateTaskForm__subtaskRemove"
                                            type="button"
                                            aria-label={`Удалить подзадачу «${subtask}»`}
                                            onClick={() => setSubtasks(previous => previous.filter((_, itemIndex) => itemIndex !== index))}
                                        >
                                            <X size={17} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                </div>

                <footer className="CreateTaskForm__footer">
                    <button
                        className="CreateTaskForm__button"
                        type="button"
                    >
                        <Plus size={25} />
                        Создать задачу
                    </button>
                </footer>
            </form>
        </div>
    );

    return isModal
        ? <div className="modalBackdrop">{content}</div>
        : content;
}

export default CreateTaskForm;
