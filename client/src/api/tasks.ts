import type { Task, Subtask } from "../types/task";


export async function getTasks(): Promise<Task[]> {
    const res = await fetch("/api/tasks");

    if (!res.ok) {
        throw new Error(`Ошибка загрузки задач: ${res.status}`);
    }

    return res.json();
}

export async function deleteTask(id: string): Promise<void> {
    const res = await fetch(`/api/tasks/${id}`, 
                            {method: "DELETE" }
    );

    if (!res.ok) {
        throw new Error(`Ошибка удаления задачи: ${res.status}`);
    }
}

export async function changeStatusTask(id: string, status: string): Promise<Task> {
    const res = await fetch(`/api/tasks/${id}`,
                            {method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ status })
    });

    if (!res.ok) {
        throw new Error(`Ошибка изменения статуса задачи: ${res.status}`);
    }

    return res.json();
}


export async function changeStatusSubtask(taskID: string, subtaskId: string, completed: boolean): Promise<Subtask> {
    const res = await fetch(`/api/tasks/${taskID}/subtasks/${subtaskId}`,
                            {method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ completed })
    });

    if (!res.ok) {
        throw new Error(`Ошибка изменения статуса подзадачи: ${res.status}`);
    }

    return res.json();
}