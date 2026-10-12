import type { Task } from "../types/task";


export async function getTasks(): Promise<Task[]> {
    const res = await fetch("/api/tasks");

    if (!res.ok) {
        throw new Error(`Ошибка загрузки задач: ${res.status}`);
    }

    return res.json();
}

export async function deleteTask(id: string): Promise<void> {
    const res = await fetch(`/api/tasks/${id}`, {method: "DELETE" });

    if (!res.ok) {
        throw new Error(`Ошибка удаления задачи: ${res.status}`);
    }
}