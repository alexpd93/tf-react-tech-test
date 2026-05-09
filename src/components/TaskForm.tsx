import { Priority, ValidationError } from "../types";

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
        <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>

                {/* 1. Task Title Section */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label htmlFor="task-title-input" style={{ fontSize: '12px' }}>Task Title</label>
                    <input
                        id="task-title-input"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Add a new task..."
                        aria-invalid={!!errors?.title}
                        aria-describedby={errors?.title ? "task-title-error" : undefined}
                        style={{ padding: '8px', border: errors?.title ? '2px solid red' : '1px solid #ccc' }}
                    />
                    {errors?.title && (
                        <span
                            id="task-title-error"
                            style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}
                        >
                            {errors.title}
                        </span>
                    )}
                </div>

                {/* 2. Priority Selector Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label htmlFor="task-priority-select" style={{ fontSize: '12px' }}>Priority</label>
                    <select
                        id="task-priority-select"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as Priority)}
                        aria-invalid={!!errors?.priority}
                        aria-describedby={errors?.priority ? "task-priority-error" : undefined}
                        style={{ padding: '8px', border: errors?.priority ? '2px solid red' : '1px solid #ccc' }}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    {errors?.priority && (
                        <span
                            id="task-priority-error"
                            style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}
                        >
                            {errors.priority}
                        </span>
                    )}
                </div>

                {/* 3. The Submit Button */}
                <button
                    id="add-task-btn"
                    onClick={onAdd}
                    style={{ padding: '8px 16px', height: '38px', marginTop: '18px' }}
                >
                    Add
                </button>
            </div>
        </div>
    );
};

export default TaskForm;