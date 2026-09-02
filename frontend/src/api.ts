const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch(`${API_URL}/todos`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

export const fetchTodo = async (id: string): Promise<Todo> => {
  const res = await fetch(`${API_URL}/todos/${id}`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

export const createTodo = async (data: { title: string; completed?: boolean }) => {
  const res = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateTodo = async (id: string, data: { title?: string; completed?: boolean }) => {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteTodo = async (id: string) => {
  const res = await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
  if (res.status !== 204) throw new Error('Delete failed');
};