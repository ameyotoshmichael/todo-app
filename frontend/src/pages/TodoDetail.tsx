import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTodo, updateTodo, deleteTodo, type Todo } from '../api';

export default function TodoDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    if (id) {
      fetchTodo(id).then(t => {
        setTodo(t);
        setEditTitle(t.title);
      });
    }
  }, [id]);

  const handleUpdate = async () => {
    if (!todo) return;
    const updated = await updateTodo(id!, { title: editTitle });
    setTodo(updated);
  };

  const handleDelete = async () => {
    if (!todo) return;
    await deleteTodo(id!);
    navigate('/');
  };

  if (!todo) return <div>Loading...</div>;

  return (
    <div>
      <h2>Todo Detail</h2>
      <p>ID: {todo.id}</p>
      <p>Created: {todo.created_at}</p>
      <p>Updated: {todo.updated_at}</p>
      <input value={editTitle} onChange={e => setEditTitle(e.target.value)} />
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => navigate('/')}>Back</button>
    </div>
  );
}