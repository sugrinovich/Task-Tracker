import { useState, useEffect } from "react";
import { getTasks } from "./api/tasks";
import type { Task, TaskStatus } from "./types/task";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";
import { TasksContext } from "./context/TasksContext";
import TaskDetails from "./components/TaskForm/TaskDetails";
import { useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";


function App() {
  const backgroundLocation = useLocation();

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

    setTasks(prev => prev.filter(el => el.id !== id))

    getTasks()
      .then(setTasks)
      .catch((e) => {
        setError(e.message),
        setTasks(originalTasks)
      }) 
  }
  function handleChange(id: string, status: TaskStatus) {
    const originalTasks = [...tasks];

    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, status: status} : task
    ));

    getTasks()
      .then(setTasks)
      .catch((e) => {
        setError(e.message),
        setTasks(originalTasks)
      }) 
  }

  if (loading) {
    return <div className="statusMessage">Загрузка...</div>;
  }

  if (error) {
    return <div className="statusMessage statusMessage--error">Ошибка: {error}</div>;
  }


  return  (
    <TasksContext.Provider value={{ tasks: tasks, onDelete: handleDelete, onStatusChage: handleChange }}> 
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<KanbanBoard tasks={tasks} />} />
        <Route path="/tasks/:id" element={<KanbanBoard tasks={tasks} />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
            <Route path="/tasks/:id" element={<TaskDetails />} />
        </Routes>
      )}
    </TasksContext.Provider>
  )
}

export default App;