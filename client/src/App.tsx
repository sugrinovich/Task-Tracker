import { useState, useEffect } from "react";
import { getTasks } from "./api/tasks";
import type { Task, TaskStatus } from "./types/task";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";
import { TasksContext } from "./context/TasksContext";
import TaskDetails from "./components/TaskForm/TaskDetails";


function App() {
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
    // <TasksContext.Provider value={{ onDelete: handleDelete, onChage: handleChange }}>
    //   <KanbanBoard tasks={tasks}/>
    // </TasksContext.Provider>
    <TaskDetails task={tasks[1]}/>
  )
}

export default App;