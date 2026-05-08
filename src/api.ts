// src/api.ts
// These functions connect your React frontend to the Express backend.
// They are already wired up and working — you can focus on the UI and server logic.
// TODO: If you add new endpoints to the server, add matching functions here.

import type { Task, NewTask, UpdateTask, Priority } from './types';

const BASE_URL = 'http://localhost:3001/api';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw errorBody;
  }
  return res.json() as Promise<T>;
}

export const getTasks = async (priority?: Priority, completed?: boolean): Promise<Task[]> => {
  const params = new URLSearchParams();

  if (priority) params.append('priority', priority);
  if (completed !== undefined) params.append('completed', completed.toString());

  const res = await fetch(`${BASE_URL}/tasks?${params.toString()}`);
  return handleResponse<Task[]>(res);
};

export const createTask = async (task: NewTask): Promise<Task> => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return handleResponse<Task>(res);
};

export const updateTask = async (id: string, updates: UpdateTask): Promise<Task> => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  return handleResponse<Task>(res);
};

export const deleteTask = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const message = await res.text().catch(() => 'Unknown error');
    throw new Error(`API error ${res.status}: ${message}`);
  }
};
