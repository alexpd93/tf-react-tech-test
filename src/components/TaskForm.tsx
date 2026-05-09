import { Priority, ValidationError } from "../types";
import '../styles/TaskForm.scss';

interface TaskFormProps {
    title: string;
    setTitle: (val: string) => void;
    priority: Priority;
    setPriority: (p: Priority) => void;
    onAdd: () => void;
    errors: ValidationError | null;
}

const TaskForm = ({ title, setTitle, priority, setPriority, onAdd, errors }: TaskFormProps) => {
    return (
        <div className="task-form">
            <div className="task-form__row">

                {/* 1. Task Title Section */}
                <div className="task-form__group">
                    <label htmlFor="task-title-input">Task Title</label>
                    <input
                        className={errors?.title ? 'is-invalid' : ''}
                        id="task-title-input"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Add a new task..."
                        aria-invalid={!!errors?.title}
                        aria-describedby={errors?.title ? "task-title-error" : undefined}
                    />
                    {errors?.title && (
                        <span
                            className="error-message"
                            id="task-title-error"
                        >
                            {errors.title}
                        </span>
                    )}
                </div>

                {/* 2. Priority Selector Section */}
                <div className="task-form__group task-form__group--small">
                    <label htmlFor="task-priority-select">Priority</label>
                    <select
                        className={errors?.priority ? 'is-invalid' : ''}
                        id="task-priority-select"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as Priority)}
                        aria-invalid={!!errors?.priority}
                        aria-describedby={errors?.priority ? "task-priority-error" : undefined}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    {errors?.priority && (
                        <span
                            className="error-message"
                            id="task-priority-error"
                        >
                            {errors.priority}
                        </span>
                    )}
                </div>

                {/* 3. The Submit Button */}
                <button id="add-task-btn" className="add-btn" onClick={onAdd}>
                    Add
                </button>
            </div>
        </div >
    );
};

export default TaskForm;