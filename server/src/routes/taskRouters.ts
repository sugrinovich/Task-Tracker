import { Router, Request, Response } from "express";
import { tasks } from "../data/mockTasks";
import { Task, TaskCategory, TaskStatus, Subtask } from "../types/task";


const taskRouter = Router();


const STATUSES: string[] = ["todo", "in_progress", "done"];
const CATEGORIES: string[] = ["dev", "design", "marketing"]

taskRouter.get("/", (req: Request, res: Response) => {
    const { status, category } = req.query;

    if (status !== undefined && (typeof status !== "string" || !STATUSES.includes(status))) {
        res.status(400).json({ message: "Invalid status" });
        return;
    }

    if (category !== undefined && (typeof category !== "string" || !CATEGORIES.includes(category))) {
        res.status(400).json({ message: "Invalid category" });
        return; 
    }

    let result = tasks;

    if (status) {
        result = result.filter(t => t.status === status);
    }

    if (category) {
        result = result.filter(t => t.category === category);
    }

    res.json(result);
});


taskRouter.get("/:id", (req: Request, res: Response) => {
    const task = tasks.find(t => t.id === req.params.id);

    if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
    }
    res.json(task)
});


taskRouter.delete("/:id", (req: Request, res: Response) => {
    const task_idx = tasks.findIndex(t => t.id === req.params.id);

    if (task_idx === -1) {
        res.status(404).json({ message: "Task not found" });
        return;
    }
    
    tasks.splice(task_idx, 1);

    res.status(204).send();
})


taskRouter.patch("/:id", (req: Request, res: Response) => {
    const task = tasks.find(t => t.id === req.params.id);

    if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
    }

    const { status } = req.body ?? {};

    if (typeof status !== "string" || !STATUSES.includes(status)) {
        res.status(400).json({ message: "Invalid status"});
        return;
    }

    task.status = status as TaskStatus;

    res.json(task);
})


taskRouter.post("/", (req: Request, res: Response) => {
    const { title, description, category, status, date, subtasks, user } = req.body ?? {};

    if (typeof title !== "string" || !title.trim()) {
        res.status(400).json({ message: "Title is required" });
        return;
    }

    if (typeof category !== "string" || !CATEGORIES.includes(category)) {
        res.status(400).json({ message: "Invalid category" });
        return;
    }

    const taskStatus = status ?? "todo";
    if (typeof taskStatus !== "string" || !STATUSES.includes(taskStatus)) {
        res.status(400).json({ message: "Invalid status" });
        return;
    }

    if (date !== undefined && typeof date !== "string") {
        res.status(400).json({ message: "Invalid date" });
        return;
    }

    if (subtasks !== undefined && !Array.isArray(subtasks)) {
        res.status(400).json({ message: "Invalid subtasks" });
        return;
    }

    const normalizedSubtasks: Subtask[] = (subtasks ?? []).map((subtask: unknown, index: number) => {
        const subtaskTitle = typeof subtask === "string"
            ? subtask
            : (subtask as { title?: unknown })?.title;

        return {
            id: `subtask-${Date.now()}-${index}`,
            title: typeof subtaskTitle === "string" ? subtaskTitle.trim() : "",
            completed: false,
        };
    }).filter((subtask: Task["subtasks"][number]) => subtask.title.length > 0);

    const newTask = {
        id: `task-${Date.now()}`,
        title: title.trim(),
        description: typeof description === "string" ? description.trim() : "",
        category: category as TaskCategory,
        status: taskStatus as TaskStatus,
        date: typeof date === "string" ? date : "",
        subtasks: normalizedSubtasks,
        user: user ?? { name: "", avatar: "AK" },
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
})


taskRouter.patch("/:taskId/subtasks/:subtaskId", (req: Request, res: Response) => {
    const task = tasks.find(t => t.id === req.params.taskId);

    if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
    }

    const subtask = task.subtasks.find(el => el.id === req.params.subtaskId)

    if (!subtask) {
        res.status(404).json({ message: "Subtask not found" });
        return;
    }

    const { completed } = req.body ?? {};

    if (typeof completed !== "boolean") {
        res.status(400).json({ message: "Invalid completed value" });
        return;
    }

    subtask.completed = completed;

    res.json(subtask);
})

export default taskRouter;
