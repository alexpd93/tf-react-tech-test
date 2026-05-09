import { defaultFilters } from "../App";

interface Props {
    filters: typeof defaultFilters;
    onUpdate: (key: keyof typeof defaultFilters, value: string) => void;
    onClear: (filters: typeof defaultFilters) => void;
}

const TaskFilters = ({ filters, onUpdate, onClear }: Props) => {
    return (
        <div className="filter-controls">
            {/* 1. Category Indicator */}
            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>
                Filter By:
            </span>

            {/* 2. Priority Filter Section */}
            <label htmlFor="priority-filter-select">
                Priority:
            </label>
            <select
                id="priority-filter-select"
                value={filters.priority}
                onChange={(e) => onUpdate('priority', e.target.value)}
            >
                <option value="all">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>

            {/* 3. Completion Filter Section */}
            <label htmlFor="status-filter-select">
                Status:
            </label>
            <select
                id="status-filter-select"
                value={filters.completed}
                onChange={(e) => onUpdate('completed', e.target.value)}
            >
                <option value="all">All</option>
                <option value='true'>Completed</option>
                <option value='false'>Incomplete</option>
            </select>

            {/* 4. Clear Button */}
            <button
                id="clear-filters-btn"
                onClick={() => onClear(defaultFilters)}
            >
                Clear Filters
            </button>
        </div>
    );
};

export default TaskFilters;
