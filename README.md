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

## Project Structure

```text
todo-app/
├── backend/              # Node.js + Express + TypeScript + SQLite
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── app.ts        # Express app setup
│   │   ├── db.ts         # Database connection and table creation
│   │   ├── server.ts     # Server entry point
│   │   └── types.ts      # Type definitions
│   ├── tests/            # Jest unit tests
│   ├── todos.http        # REST Client file for API testing
│   └── package.json
└── frontend/             # React + Vite + TypeScript
    ├── src/
    │   ├── pages/        # TodoList.tsx and TodoDetail.tsx (MPA pages)
    │   ├── api.ts        # API client
    │   └── App.tsx       # Routing setup
    └── package.json
