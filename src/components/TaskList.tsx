import TaskItem from './TaskItem';
import { Task } from '../types';
import '../styles/TaskList.scss';

interface Props {
    tasks: Task[];
    isFiltered: boolean;
    onToggle: (task: Task) => void;
    onDelete: (id: string) => void;
    confirmingId: string | null;
    setConfirmingId: (id: string | null) => void;
}

const TaskList = ({ tasks, isFiltered, onToggle, onDelete, confirmingId, setConfirmingId }: Props) => {

    if (tasks.length === 0) {
        return isFiltered ? (
            <div id="tasks-empty-filtered" className="empty-state">
                <p>No tasks match your filters.</p>
            </div>
        ) : (
            <div id="tasks-empty-initial" className="empty-state">
                <p>No tasks yet. Add one above!</p>
            </div>
        );
    }

    return (
        <ul
            id="main-task-list"
            className="task-list"
            aria-label="Task list"
        >
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