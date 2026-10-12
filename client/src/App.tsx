import { useState, useEffect } from "react";
import { getTasks } from "./api/tasks";
import type { Task } from "./types/task";
import KanbanColum from "./components/KanbanColum/KanbanColum";


function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks().then(setTasks)
  }, []);

  return  (
    <div style={{
      backgroundColor: "var(--bg-main)"
    }}>
      <KanbanColum status="todo" tasks={tasks}/>
    </div>
  )
}

export default App;