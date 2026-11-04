import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";

import type { Task, TaskStatus } from "./types/task";
import { getTasks } from "./api/tasks";
import { TasksContext } from "./context/TasksContext";

import KanbanBoard from "./components/KanbanBoard/KanbanBoard";
import TaskDetails from "./components/TaskForm/TaskDetails";
import CreateTaskForm from "./components/TaskForm/CreateTaskForm";


function App() {
  const [searchParams] = useSearchParams();
  const openedTaskId = searchParams.get("task");
  const isCreating = searchParams.has("new");

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  function handleDelete(id: string) {
    const originalTasks = [...tasks];

    setTasks(prev => prev.filter(el => el.id !== id));

    getTasks()
      .then(setTasks)
      .catch((e) => {
        setError(e.message);
        setTasks(originalTasks);
      });
  }

  function handleChangeTaskStatus(id: string, status: TaskStatus) {
    const originalTasks = [...tasks];

    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, status } : task
    ));

    getTasks()
      .then(setTasks)
      .catch((e) => {
        setError(e.message);
        setTasks(originalTasks);
      });
  }

  function handleChangeSubtaskStatus(taskId: string, subtaskId: string, completed: boolean) {
    const originalTasks = [...tasks];

    setTasks(prev => prev.map(task =>
      task.id !== taskId ? task : {
        ...task,
        subtasks: task.subtasks.map(sub =>
          sub.id !== subtaskId ? sub : { ...sub, completed }
        ),
      }
    ));

    getTasks()
      .then(setTasks)
      .catch((e) => {
        setError(e.message);
        setTasks(originalTasks);
      });
  }

  function handleAddTask() {
    getTasks()
      .then(setTasks)
      .catch((e) => setError(e.message));
  }

  if (loading) {
    return <div className="statusMessage">Загрузка...</div>;
  }

  if (error) {
    return <div className="statusMessage statusMessage--error">Ошибка: {error}</div>;
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        onTaskDelete: handleDelete,
        onTaskChage: handleChangeTaskStatus,
        onSubtaskChange: handleChangeSubtaskStatus,
        onAddTask: handleAddTask,
      }}
    >
      <Routes>
        <Route path="/" element={<KanbanBoard tasks={tasks} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {openedTaskId && <TaskDetails taskId={openedTaskId} />}
      {isCreating && <CreateTaskForm />}
    </TasksContext.Provider>
  );
}

export default App;
