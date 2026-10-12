import express from 'express';
import taskRouter from './routes/taskRouters';

const app = express();

app.use(express.json());
app.use("/api/tasks", taskRouter)

app.listen(3000, () => {
  console.log('Server: http://localhost:3000');
});