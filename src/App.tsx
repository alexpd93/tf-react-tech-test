// src/App.tsx
// This is your starting point. Build out the UI here.
// You're welcome to split this into multiple components if you'd like!

import { useState, useEffect } from 'react';
import { Task, Priority, ValidationError } from './types';
import { getTasks, createTask, updateTask, deleteTask } from './api';

const priorityConfig = {
  high: { label: 'High', icon: '🔴', className: 'priority-high' },
  medium: { label: 'Medium', icon: '🟡', className: 'priority-medium' },
  low: { label: 'Low', icon: '🟢', className: 'priority-low' },
};

const defaultFilters = {
  priority: 'all' as Priority | 'all',
  completed: 'all' as 'all' | 'true' | 'false'
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>('low');
  const [filters, setFilters] = useState(defaultFilters);
  const [fieldErrors, setFieldErrors] = useState<{ title?: string, priority?: string } | null>(null);

  // Fetch tasks on mount and when filters are applied
  const loadTasks = async () => {
    try {
      if (tasks.length === 0) setLoading(true);
      const priority = filters.priority === 'all' ? undefined : filters.priority;
      const completed = filters.completed === 'all' ? undefined : filters.completed === 'true';
      const data = await getTasks(priority, completed);
      setTasks(data);
    } catch {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [filters]);

  // TODO: Customise this — add priority, due dates, or anything else you like!
  const handleAddTask = async () => {
    setFieldErrors(null);
    setError(null);

    try {
      const task = await createTask({ title: newTaskTitle, priority: newTaskPriority, completed: false });
      setTasks((prev) => [...prev, task]);
      setNewTaskTitle('');
      setNewTaskPriority('low');
    } catch (error) {
      const err = error as ValidationError;
      if (err.title || err.priority) {
        setFieldErrors(err)
      } else {
        setError('Something went wrong')
      }
    }
  };

  // TODO: Expand this if you add extra fields to update
  const handleToggleComplete = async (task: Task) => {
    const updated = await updateTask(task.id, { completed: !task.completed });
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  // TODO: Add a confirmation step, or an undo feature if you like!
  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const updateFilter = (key: keyof typeof filters, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const isFiltered = filters.priority !== defaultFilters.priority || filters.completed !== defaultFilters.completed;

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <h1>Task Manager</h1>

      {/* TODO: Improve this input — add priority, labels, due date, etc. */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add a new task..."
        />
        {/* 2. Show the specific title error message if it exists */}
        {fieldErrors?.title && (
          <span style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
            {fieldErrors.title}
          </span>
        )}
        <select
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(e.target.value as Priority)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {/* 3. Show priority error (rare, but good for completeness) */}
        {fieldErrors?.priority && (
          <span style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
            {fieldErrors.priority}
          </span>
        )}
        <button onClick={handleAddTask}>Add</button>
      </div>

      <div className="filter-controls">
        <label>
          Filter By:
        </label>
        {/* Prioriy filter */}
        <label>
          Priority:
        </label>
        <select
          value={filters.priority}
          onChange={(e) => updateFilter('priority', e.target.value)}
        >
          <option value="all">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        {/* Completion filter */}
        <label>
          Status:
        </label>
        <select
          value={filters.completed}
          onChange={(e) => updateFilter('completed', e.target.value)}
        >
          <option value="all">All</option>
          <option value={'true'}>Completed</option>
          <option value={'false'}>Incomplete</option>
        </select>
        <button onClick={() => setFilters(defaultFilters)}>
          Clear Filters
        </button>
      </div>

      {/* TODO: Style this list — make it your own! */}
      {loading && <p>Loading tasks...</p>}
      {tasks.length === 0 ? (
        isFiltered ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>No tasks match your selected filters.</p>
          </div>
        ) : (
          (
            // 2. If no filters are active, the database is actually empty
            <p>No tasks yet. Add one above!</p>
          )
        )
      ) : (
        < ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map((task) => {
            const priorityInfo = task.priority ? priorityConfig[task.priority] : null;
            return (
              <li key={task.id} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none', flex: 1 }}>
                  {task.title}
                </span>
                {priorityInfo && (
                  <span className={priorityInfo.className}>
                    {priorityInfo.icon} {priorityInfo.label}
                  </span>
                )}
                <button onClick={() => handleToggleComplete(task)}>
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
