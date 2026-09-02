import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTodos, createTodo, updateTodo, deleteTodo, type Todo } from '../api';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos()
      .then(setTodos)
      .catch(err => console.error('Error fetching:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    try {
      const todo = await createTodo({ title: newTitle });
      // !!! IMPORTANT: Look at your browser console to see if 'title' is here !!!
      console.log('New todo from backend:', todo); 
      
      setTodos([...todos, todo]);
      setNewTitle('');
    } catch (err) {
      console.error('Error creating:', err);
    }
  };

  const handleToggle = async (todo: Todo) => {
    const updated = await updateTodo(String(todo.id), { completed: !todo.completed });
    setTodos(todos.map(t => (t.id === updated.id ? updated : t)));
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(String(id));
    setTodos(todos.filter(t => t.id !== id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={handleCreate}>Add</button>
      </div>
      {/* Removed the bullet dots using listStyle: 'none' */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo)}
            />
            {/* !!! This is where the title is shown !!! */}
            <Link 
              to={`/todo/${todo.id}`} 
              style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none', 
                marginLeft: '10px', 
                marginRight: '10px',
                color: 'blue'
              }}
            >
              {todo.title}
            </Link>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}