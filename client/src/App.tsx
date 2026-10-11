import { useState, useEffect } from "react";
import { getTasks } from "./api/tasks";
import type { Task } from "./types/task";
import TaskCard from "./components/TaskCard/TaskCard";


function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks().then(setTasks)
  }, []);

  return  (
    <div style={{
      backgroundColor: "var(--bg-main)"
    }}>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task}/>
      ))}
    </div>
  )
}

export default App;