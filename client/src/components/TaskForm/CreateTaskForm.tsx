import { useContext, useState } from "react";
import { CalendarDays, CircleAlert, Plus, Sparkles, X } from "lucide-react";

import type { TaskCategory } from "../../types/task";
import { createNewTask } from "../../api/tasks";
import { TasksContext } from "../../context/TasksContext";
import { useCloseModal } from "../../hooks/useCloseModal";
import { formatDateInput, parseDateInput, toDateInput } from "../../utils/dateInputFormatter";
import CategoryLabel from "../CategoryLabel/CategoryLabel";

import "./CreateTaskForm.css";


const CATEGORIES: TaskCategory[] = ["dev", "design", "marketing"];


const DATE_SHORTCUTS = [
    { label: "Сегодня", days: 0 },
    { label: "Завтра", days: 1 },
    { label: "Через неделю", days: 7 },
];

const DESCRIPTION_MAX = 2000;


type FormField = "title" | "category" | "date";
type FormErrors = Partial<Record<FormField, string>>;

function shortcutDate(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return toDateInput(date);
}

function validateDate(value: string): string | undefined {
    if (!value) return "Укажите срок";

    const date = parseDateInput(value);
    if (!date) return "Введите дату в формате ДД.ММ.ГГГГ";

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return "Срок не может быть в прошлом";

    return undefined;
}

function FieldError({ message }: { message?: string }) {
    if (!message) return null;

    return (
        <p className="CreateTaskForm__error">
            <CircleAlert size={18} />
            {message}
        </p>
    );
}


// Новая задача всегда создаётся в «К выполнению»
function CreateTaskForm() {
    const ctx = useContext(TasksContext);
    const handleClose = useCloseModal("new");

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState<TaskCategory | null>(null);
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [subtaskTitle, setSubtaskTitle] = useState("");
    const [subtasks, setSubtasks] = useState<string[]>([]);
    const [errors, setErrors] = useState<FormErrors>({});

    const invalidClass = (field: FormField) =>
        errors[field] ? "CreateTaskForm__control--invalid" : "";

    const clearError = (field: FormField) => {
        setErrors(previous => {
            if (!previous[field]) return previous;

            const updated = { ...previous };
            delete updated[field];
            return updated;
        });
    };

    const changeDate = (value: string) => {
        setDate(value);
        clearError("date");
    };

    const addSubtask = () => {
        const nextSubtask = subtaskTitle.trim();
        if (!nextSubtask) return;

        setSubtasks(previous => [...previous, nextSubtask]);
        setSubtaskTitle("");
    };

    const removeSubtask = (index: number) => {
        setSubtasks(previous => previous.filter((_, itemIndex) => itemIndex !== index));
    };

    const handleSubmit = async () => {
        const nextErrors: FormErrors = {};
        if (!title.trim()) nextErrors.title = "Введите название";
        if (!category) nextErrors.category = "Выберите метку";
        const dateError = validateDate(date);
        if (dateError) nextErrors.date = dateError;
        setErrors(nextErrors);

        const deadline = parseDateInput(date);
        if (Object.keys(nextErrors).length > 0 || !category || !deadline) return;

        // Срок — до конца выбранного дня
        deadline.setHours(23, 59, 59, 999);

        try {
            await createNewTask(title, description, category, deadline.toISOString(), subtasks);
            ctx?.onAddTask();
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="modalBackdrop">
            <div
                className="modal CreateTaskForm"
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-task-title"
            >
                <header className="CreateTaskForm__header">
                    <span className="CreateTaskForm__headingIcon">
                        <Sparkles size={26} />
                    </span>
                    <div className="CreateTaskForm__heading">
                        <h2 className="CreateTaskForm__title" id="create-task-title">Новая задача</h2>
                        <p className="CreateTaskForm__column">
                            в колонку
                            <span className="CreateTaskForm__columnName">
                                <span className="statusDot statusDot--todo" />
                                К выполнению
                            </span>
                        </p>
                    </div>

                    <button
                        className="iconBtn CreateTaskForm__close"
                        type="button"
                        aria-label="Закрыть форму"
                        onClick={handleClose}
                    >
                        <X size={24} />
                    </button>
                </header>

                <form className="CreateTaskForm__form" onSubmit={(event) => event.preventDefault()}>
                    <div className="CreateTaskForm__content">
                        {/* ---------- Название ---------- */}
                        <div className="CreateTaskForm__field">
                            <label className="CreateTaskForm__label" htmlFor="task-title">
                                Название <span className="CreateTaskForm__required">*</span>
                            </label>
                            <input
                                id="task-title"
                                autoComplete="off"
                                className={`CreateTaskForm__control ${invalidClass("title")}`}
                                type="text"
                                placeholder="Например, подготовить релиз 1.2"
                                value={title}
                                onChange={(event) => {
                                    setTitle(event.target.value);
                                    clearError("title");
                                }}
                            />
                            <FieldError message={errors.title} />
                        </div>

                        {/* ---------- Метка ---------- */}
                        <div className="CreateTaskForm__field">
                            <span className="CreateTaskForm__label">
                                Метка <span className="CreateTaskForm__required">*</span>
                            </span>
                            <div className="CreateTaskForm__chips">
                                {CATEGORIES.map(option => (
                                    <button
                                        key={option}
                                        type="button"
                                        className={[
                                            "CreateTaskForm__chip",
                                            `CreateTaskForm__chip--${option}`,
                                            category === option ? "CreateTaskForm__chip--selected" : "",
                                            errors.category ? "CreateTaskForm__chip--invalid" : "",
                                        ].filter(Boolean).join(" ")}
                                        aria-pressed={category === option}
                                        onClick={() => {
                                            setCategory(option);
                                            clearError("category");
                                        }}
                                    >
                                        <CategoryLabel category={option} />
                                    </button>
                                ))}
                            </div>
                            <FieldError message={errors.category} />
                        </div>

                        {/* ---------- Срок ---------- */}
                        <div className="CreateTaskForm__field">
                            <label className="CreateTaskForm__label" htmlFor="task-date">
                                Срок <span className="CreateTaskForm__required">*</span>
                            </label>
                            <div className="CreateTaskForm__dateRow">
                                <span className={`CreateTaskForm__control CreateTaskForm__dateControl ${invalidClass("date")}`}>
                                    <CalendarDays size={20} />
                                    <input
                                        id="task-date"
                                        autoComplete="off"
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="ДД.ММ.ГГГГ"
                                        maxLength={10}
                                        value={date}
                                        onChange={(event) => changeDate(formatDateInput(event.target.value))}
                                    />
                                </span>

                                {DATE_SHORTCUTS.map(shortcut => {
                                    const value = shortcutDate(shortcut.days);

                                    return (
                                        <button
                                            key={shortcut.label}
                                            type="button"
                                            className={`CreateTaskForm__chip ${date === value ? "CreateTaskForm__chip--active" : ""}`}
                                            onClick={() => changeDate(value)}
                                        >
                                            {shortcut.label}
                                        </button>
                                    );
                                })}
                            </div>
                            {errors.date
                                ? <FieldError message={errors.date} />
                                : <p className="CreateTaskForm__hint">Задача должна быть готова до конца этого дня</p>}
                        </div>

                        {/* ---------- Описание ---------- */}
                        <div className="CreateTaskForm__field">
                            <label className="CreateTaskForm__label" htmlFor="task-description">
                                Описание <span className="CreateTaskForm__optional">необязательно</span>
                            </label>
                            <span className="CreateTaskForm__textareaWrap">
                                <textarea
                                    id="task-description"
                                    autoComplete="off"
                                    className="CreateTaskForm__control CreateTaskForm__textarea"
                                    value={description}
                                    maxLength={DESCRIPTION_MAX}
                                    placeholder="Что нужно сделать и зачем"
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                                <span className="CreateTaskForm__counter">
                                    {description.length}/{DESCRIPTION_MAX}
                                </span>
                            </span>
                        </div>

                        {/* ---------- Подзадачи ---------- */}
                        <div className="CreateTaskForm__field">
                            <label className="CreateTaskForm__label" htmlFor="task-subtask">
                                Подзадачи <span className="CreateTaskForm__optional">необязательно</span>
                            </label>

                            {subtasks.length > 0 && (
                                <ol className="CreateTaskForm__subtaskList">
                                    {subtasks.map((subtask, index) => (
                                        <li className="CreateTaskForm__subtask" key={`${subtask}-${index}`}>
                                            <span className="CreateTaskForm__subtaskText">{subtask}</span>
                                            <button
                                                className="iconBtn"
                                                type="button"
                                                aria-label={`Удалить подзадачу «${subtask}»`}
                                                onClick={() => removeSubtask(index)}
                                            >
                                                <X size={20} />
                                            </button>
                                        </li>
                                    ))}
                                </ol>
                            )}

                            <div className="CreateTaskForm__subtaskCreator">
                                <input
                                    id="task-subtask"
                                    autoComplete="off"
                                    className="CreateTaskForm__control CreateTaskForm__subtaskInput"
                                    type="text"
                                    value={subtaskTitle}
                                    placeholder="Новая подзадача, Enter чтобы добавить"
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
                                    <Plus size={22} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <footer className="CreateTaskForm__footer">
                        <button className="btn btn--secondary" type="button" onClick={handleClose}>
                            Отмена
                        </button>
                        <button className="btn btn--primary" type="button" onClick={handleSubmit}>
                            <Plus size={20} />
                            Создать задачу
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
}

export default CreateTaskForm;
