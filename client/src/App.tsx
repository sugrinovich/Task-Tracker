import { useState, useEffect } from "react";
import { getTasks } from "./api/tasks";
import type { Task } from "./types/task";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";
import { TasksContext } from "./context/TasksContext";


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
    setTasks(prev => prev.filter(el => el.id !== id))
  }

  if (loading) {
    return <div className="statusMessage">Загрузка...</div>;
  }

  if (error) {
    return <div className="statusMessage statusMessage--error">Ошибка: {error}</div>;
  }


  return  (
    <TasksContext.Provider value={{ onDelete: handleDelete }}>
      <KanbanBoard tasks={tasks}/>
    </TasksContext.Provider>
    
  )
}

export default App;