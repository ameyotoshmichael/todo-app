import { Router } from 'express';
import db from '../db';
import { Todo } from '../types';

const router = Router();

// GET /api/todos - list all
router.get('/', (req, res) => {
  const todos = db.prepare('SELECT * FROM todos ORDER BY created_at DESC').all();
  res.json(todos);
});

// GET /api/todos/:id - get one
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(id) as Todo | undefined;
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
});

// POST /api/todos - create
router.post('/', (req, res) => {
  const { title, completed } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  // FIXED: Convert boolean to 1 or 0 for SQLite
  const info = db.prepare(
    'INSERT INTO todos (title, completed) VALUES (?, ?)'
  ).run(title, completed ? 1 : 0);

  const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(info.lastInsertRowid) as Todo;
  res.status(201).json(todo);
});

// PUT /api/todos/:id - update
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const existing = db.prepare('SELECT * FROM todos WHERE id = ?').get(id) as Todo | undefined;
  if (!existing) return res.status(404).json({ error: 'Todo not found' });

  const { title, completed } = req.body;
  const newTitle = title ?? existing.title;

  // FIXED: Convert boolean to 1 or 0, and handle undefined correctly
  const newCompleted = completed !== undefined ? (completed ? 1 : 0) : existing.completed;

  db.prepare(
    'UPDATE todos SET title = ?, completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).run(newTitle, newCompleted, id);

  const updated = db.prepare('SELECT * FROM todos WHERE id = ?').get(id) as Todo;
  res.json(updated);
});

// DELETE /api/todos/:id - delete
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const info = db.prepare('DELETE FROM todos WHERE id = ?').run(id);
  if (info.changes === 0) return res.status(404).json({ error: 'Todo not found' });
  res.status(204).send();
});

export default router;