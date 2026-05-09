import { Task } from "../types";

interface Props {
    task: Task;
    onToggle: (task: Task) => void;
    onDelete: (id: string) => void;
    confirmingId: string | null;
    setConfirmingId: (id: string | null) => void;
}

const priorityConfig = {
    high: { label: 'High', icon: '🔴', className: 'priority-high' },
    medium: { label: 'Medium', icon: '🟡', className: 'priority-medium' },
    low: { label: 'Low', icon: '🟢', className: 'priority-low' },
};

const TaskItem = ({ task, onToggle, onDelete, confirmingId, setConfirmingId }: Props) => {
    const priorityInfo = task.priority ? priorityConfig[task.priority] : null;

    return (
        <li key={task.id} id={`task-item-${task.id}`} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }
        }>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none', flex: 1 }}>
                {task.title}
            </span>
            {priorityInfo && (
                <span className={priorityInfo.className}>
                    {priorityInfo.icon} {priorityInfo.label}
                </span>
            )}
            <button id={`toggle-${task.id}`}
                aria-label={task.completed ? "Mark task as incomplete" : "Mark task as complete"}
                onClick={() => onToggle(task)}>
                {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button
                id={`delete-${task.id}`} style={{
                    backgroundColor: confirmingId === task.id ? '#e53e3e' : '',
                    color: confirmingId === task.id ? 'white' : ''
                }}
                onMouseLeave={() => setConfirmingId(null)}
                onClick={() => onDelete(task.id)}>{confirmingId === task.id ? 'Confirm Delete' : 'Delete'}</button>
        </li >
    );
};

export default TaskItem