import { Task } from "../types";
import '../styles/TaskItem.scss';

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
    const isConfirming = confirmingId === task.id;
    const priorityInfo = task.priority ? priorityConfig[task.priority] : null;

    return (
        <li id={`task-item-${task.id}`} className="task-item">
            {/* 1. Title Container */}
            <span className={`task-item__title ${task.completed ? 'task-item__title--completed' : ''}`}>
                {task.title}
            </span>

            {/* 2. Priority Badge */}
            {priorityInfo && (
                <span className={priorityInfo.className}>
                    {priorityInfo.icon} {priorityInfo.label}
                </span>
            )}

            {/* 3. Action Buttons */}
            <div className="task-item__actions">
                <button
                    id={`toggle-${task.id}`}
                    className="task-item__btn task-item__btn--toggle"
                    aria-label={task.completed ? "Mark task as incomplete" : "Mark task as complete"}
                    onClick={() => onToggle(task)}
                >
                    {task.completed ? 'Undo' : 'Complete'}
                </button>

                <button
                    id={`delete-${task.id}`}
                    className={`task-item__btn task-item__btn--delete ${isConfirming ? 'is-confirming' : ''}`}
                    onMouseLeave={() => setConfirmingId(null)}
                    onClick={() => onDelete(task.id)}
                >
                    {isConfirming ? 'Confirm Delete' : 'Delete'}
                </button>
            </div>
        </li>
    );
};

export default TaskItem;