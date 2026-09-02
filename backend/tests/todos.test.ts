import request from 'supertest';
import app from '../src/app';
import db from '../src/db';

beforeAll(() => {
  db.exec('DELETE FROM todos'); // clean before tests
});

afterAll(() => {
  db.close();
});

describe('Todo API', () => {
  let todoId: number;

  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ title: 'Test Todo' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Test Todo');
    todoId = res.body.id;
  });

  it('should get all todos', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get a todo by id', async () => {
    const res = await request(app).get(`/api/todos/${todoId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(todoId);
  });

  it('should update a todo', async () => {
    const res = await request(app)
      .put(`/api/todos/${todoId}`)
      .send({ completed: true });
    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  it('should delete a todo', async () => {
    const res = await request(app).delete(`/api/todos/${todoId}`);
    expect(res.status).toBe(204);
    const check = await request(app).get(`/api/todos/${todoId}`);
    expect(check.status).toBe(404);
  });
});