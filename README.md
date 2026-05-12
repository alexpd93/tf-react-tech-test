# 🚀 Task Manager - Technical Test Submission

This is a completed full-stack Task Manager application built for the technical test. It features a React/TypeScript frontend and a Node.js/Express backend, now enhanced with a persistent SQLite database using Prisma.

## ✨ Features Implemented

- **Full Persistence**: Moved from in-memory storage to a **SQLite** database via **Prisma ORM**.
- **Task Management**: Create, toggle completion, and delete tasks.
- **Priority System**: Tasks can be assigned `Low`, `Medium`, or `High` priority.
- **Advanced Filtering**: Filter tasks by Priority and Completion status (server-side filtering).
- **Robust Validation**: Field-specific error handling and visual feedback for the user.
- **Modern UI**: Styled with **Sass**, featuring a clean, responsive layout and "Confirm Delete" safety checks.
- **Type Safety**: End-to-end TypeScript implementation.

---

## 🛠️ Technical Stack

- **Frontend**: React (18), TypeScript, Vite, Sass.
- **Backend**: Node.js (22), Express, tsx (for development).
- **Database**: SQLite with Prisma ORM.

---

## 🚀 Getting Started

### 1. Prerequisites

- **Node.js**: Version `22.22.0` (as specified in `.nvmrc`).
- **NVM** (recommended): To switch to the correct Node version.

### 2. Installation

```bash
# 1. Switch to the correct Node version
nvm use

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
```

### 3. Database Setup

To initialise the local database and ensure the client is synchronised with the schema, run the following command:

```bash
# Initialise the SQLite database and generate the Prisma client
npx prisma migrate dev
```

### 4. Running the App

You can run both the frontend and backend concurrently:

```bash
npm start
```

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend**: [http://localhost:3001](http://localhost:3001)

---

## 🗂 Project Structure

```
tf-react-tech-test/
├── prisma/             ← Database schema and migrations
├── server/
│   ├── index.ts        ← Express server & API routes
│   ├── db.ts           ← Prisma client initialization
│   └── generated/      ← Generated Prisma client (ignore)
├── src/
│   ├── components/     ← Modular React components
│   ├── styles/         ← Scoped Sass stylesheets
│   ├── api.ts          ← Typed API helper functions
│   ├── types.ts        ← Shared TypeScript interfaces
│   └── App.tsx         ← Main application shell
├── NOTES.md            ← Detailed development notes and future improvements
└── README.md
```

---

## 📝 Developer Notes

For a detailed breakdown of architectural decisions, challenges faced, and what I would improve with more time, please see [NOTES.md](./NOTES.md).
