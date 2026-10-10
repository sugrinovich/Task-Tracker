import { Router, Request, Response } from "express";
import { tasks } from "../data/mockTasks";


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




export default taskRouter;