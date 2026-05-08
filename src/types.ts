// src/types.ts
// These are your core types. Feel free to extend them as needed!

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  priority: Priority;
}

// Used when creating a new task (no id or createdAt yet)
export type NewTask = Omit<Task, 'id' | 'createdAt'>;

// Used when updating a task
export type UpdateTask = Partial<NewTask>;

export interface ValidationError {
  title?: string;
  priority?: string;
}
