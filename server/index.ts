// server/index.ts
// This Express server is fully wired up and working.
// The four core routes are implemented — run it and the frontend will connect straight away.
//
// TODO: This is where you can get creative!
//   - Add a priority field to tasks (low / medium / high)
//   - Add filtering: GET /api/tasks?priority=high or ?completed=true
//   - Add input validation and better error messages
//   - Anything else you think would make this better!

import express, { Request, Response } from 'express';
import cors from 'cors';
import prisma from './db';
import { Priority, Prisma, Task } from './generated/client'

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ─── Types ────────────────────────────────────────────────────────────────────

type Priority = 'low' | 'medium' | 'high';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  priority?: Priority;
}

// ─── In-memory store ──────────────────────────────────────────────────────────

let tasks: Task[] = [];

// ─── Routes ───────────────────────────────────────────────────────────────────

// GET /api/tasks — return all tasks
app.get('/api/tasks', async (req: Request, res: Response) => {
  const { priority, completed } = req.query;

  try {
    const tasks: Task[] = await prisma.task.findMany({
      where: {
        ...(priority && { priority: priority as Priority }),
        ...(completed !== undefined && { completed: completed === 'true' })
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch tasks' })
  }
});

// POST /api/tasks — create a new task
app.post('/api/tasks', async (req: Request, res: Response) => {
  const { title, priority } = req.body as { title: string; priority: Priority }
  const errors = {
    title: '',
    priority: ''
  }

  if (!title || typeof title !== 'string' || title.trim() === '') {
    errors.title = 'Title is required.'
  }

  if (!priority || !Object.values(Priority).includes(priority as Priority)) {
    errors.priority = 'Invalid or missing priority. Priority must be low, medium or high.'
  }

  if (Object.values(errors).some(error => error !== '')) {
    return res.status(400).json(errors)
  }

  try {
    const newTask: Task = await prisma.task.create({
      data: {
        title: title.trim(),
        priority: priority as Priority,
        completed: false,
      }
    })

    res.status(201).json(newTask)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Failed to create task' })
  }
});

// PATCH /api/tasks/:id — update a task
app.patch('/api/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    res.status(404).json({ error: `Task with id "${id}" not found` });
    return;
  }

  const updates = req.body as Partial<Omit<Task, 'id' | 'createdAt'>>;
  tasks[index] = { ...tasks[index], ...updates };
  res.json(tasks[index]);
});

// DELETE /api/tasks/:id — delete a task
app.delete('/api/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    res.status(404).json({ error: `Task with id "${id}" not found` });
    return;
  }

  tasks = tasks.filter((t) => t.id !== id);
  res.status(204).send();
});

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
