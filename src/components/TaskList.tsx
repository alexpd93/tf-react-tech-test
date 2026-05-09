import TaskItem from './TaskItem';
import { Task } from '../types';

interface Props {
    tasks: Task[];
    isFiltered: boolean;
    onToggle: (task: Task) => void;
    onDelete: (id: string) => void;
    confirmingId: string | null;
    setConfirmingId: (id: string | null) => void;
}

const TaskList = ({ tasks, isFiltered, onToggle, onDelete, confirmingId, setConfirmingId }: Props) => {
    // Handle Empty States inside the List component
    if (tasks.length === 0) {
        return isFiltered ? (
            <div id="tasks-empty-filtered" className="empty-state">
                <p>No tasks match your filters.</p>
            </div>
        ) : (
            <p id="tasks-empty-initial" className="empty-state">No tasks yet. Add one above!</p>
        );
    }

    // Handle the actual list rendering
    return (
        <ul id="main-task-list"
            aria-label="Task list"
            style={{ listStyle: 'none', padding: 0 }}>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    confirmingId={confirmingId}
                    setConfirmingId={setConfirmingId}
                />
            ))}
        </ul>
    );
};

export default TaskList;