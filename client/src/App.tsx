import { useState, useEffect } from "react";
import { getTasks } from "./api/tasks";
import type { Task } from "./types/task";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";


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


  if (loading) {
    return <div className="statusMessage">Загрузка...</div>;
  }

  if (error) {
    return <div className="statusMessage statusMessage--error">Ошибка: {error}</div>;
  }


  return  (
    <KanbanBoard tasks={tasks}/>
  )
}

export default App;