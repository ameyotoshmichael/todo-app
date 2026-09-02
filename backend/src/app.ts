import express from 'express';
import cors from 'cors';
import todosRouter from './routes/todos';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/todos', todosRouter);

// Global error handler (returns JSON instead of HTML)
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

export default app;