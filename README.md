# Todo Application

A full-stack Todo application built with a React (MPA-style) frontend and a Node.js/Express backend, using TypeScript and SQLite for persistence.

## Features

- **Todo List Page:** Add, delete, mark complete, and view all todos.
- **Todo Detail Page:** View a single todo's details (including created/updated timestamps), update its title, or delete it. Accessed via query parameter (`/todo/:id`).
- **Backend CRUD API:** Complete Create, Read, Update, and Delete operations.
- **Database:** Data is persisted using SQLite (`better-sqlite3`) in a local file.
- **Unit Tests:** Backend routes are tested using Jest and Supertest.
- **REST Client File:** Includes a `.http` file for testing APIs directly in VS Code.

## Tech Stack

- **Frontend:** React, Vite, TypeScript, React Router
- **Backend:** Node.js, Express, TypeScript
- **Database:** SQLite (via better-sqlite3)
- **Testing:** Jest, Supertest, ts-jest
- **API Testing:** VS Code REST Client (.http file)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd todo-app
Install backend dependencies:

bash
cd backend
npm install
Install frontend dependencies:

bash
cd ../frontend
npm install
Running Locally
Open two separate terminals:

Terminal 1 (Backend):

bash
cd backend
npm run dev
Server runs on http://localhost:5000

Terminal 2 (Frontend):

bash
cd frontend
npm run dev
App runs on http://localhost:5173

API Endpoints
Method	Endpoint	Description
GET	/api/todos	Get all todos
GET	/api/todos/:id	Get a single todo
POST	/api/todos	Create a new todo
PUT	/api/todos/:id	Update a todo
DELETE	/api/todos/:id	Delete a todo
Running Tests
bash
cd backend
npm test
Deployment
The application is configured to serve the built frontend from the backend in production mode.

Build the frontend: cd frontend && npm run build

Build the backend: cd backend && npm run build

Run in production: cd backend && npm start

(Recommended host: Render or Vercel + Render).
