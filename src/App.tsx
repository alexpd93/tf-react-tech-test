import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskFilters from './components//TaskFilters';
import TaskList from './components/TaskList';
import { Task, Priority, ValidationError } from './types';
import { getTasks, createTask, updateTask, deleteTask } from './api';
import './styles/App.scss';

export const defaultFilters = {
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
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

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

  const handleAddTask = async () => {
    setFieldErrors(null);
    setError(null);

    try {
      const task = await createTask({ title: newTaskTitle, priority: newTaskPriority, completed: false });
      setTasks((prev) => [task, ...prev]);
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

  const handleToggleComplete = async (task: Task) => {
    const updated = await updateTask(task.id, { completed: !task.completed });
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleDeleteTask = async (id: string) => {
    if (confirmingId !== id) {
      setConfirmingId(id);
      return;
    }

    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      setConfirmingId(null)
    } catch (error) {
      setError('Failed to delete task.')
    }

  };

  const updateFilter = (key: keyof typeof filters, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const isFiltered = filters.priority !== defaultFilters.priority || filters.completed !== defaultFilters.completed;

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="app-wrapper">
      <main className="app-container">

        <header className="app-container__header">
          <h1>Task Manager</h1>
        </header>

        <TaskForm
          title={newTaskTitle}
          setTitle={setNewTaskTitle}
          onAdd={handleAddTask}
          errors={fieldErrors}
          priority={newTaskPriority}
          setPriority={setNewTaskPriority}
        />

        <TaskFilters
          filters={filters}
          onUpdate={updateFilter}
          onClear={() => setFilters(defaultFilters)}
        />

        {loading && <p>Loading...</p>}

        <TaskList
          tasks={tasks}
          isFiltered={isFiltered}
          confirmingId={confirmingId}
          setConfirmingId={setConfirmingId}
          onToggle={handleToggleComplete}
          onDelete={handleDeleteTask}
        />
      </main>
    </div>
  );
}

export default App;
