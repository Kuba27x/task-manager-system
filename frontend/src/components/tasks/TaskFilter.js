import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { FaFilter, FaSearch, FaTimes } from 'react-icons/fa';

const TaskFilter = () => {
  const taskContext = useContext(TaskContext);
  const { tasks, filteredTasks, filter, setFilter } = taskContext;
  
  const onChange = e => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    });
  };

  const clearFilters = () => {
    setFilter({
      status: 'all',
      priority: 'all',
      search: ''
    });
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-secondary text-white">
        <h4 className="mb-0">
          <FaFilter className="me-2" />
          Filter Tasks
        </h4>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-4">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              id="status"
              name="status"
              className="form-select"
              value={filter.status}
              onChange={onChange}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div className="col-md-4">
            <label htmlFor="priority" className="form-label">Priority</label>
            <select
              id="priority"
              name="priority"
              className="form-select"
              value={filter.priority}
              onChange={onChange}
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          
          <div className="col-md-4">
            <label htmlFor="search" className="form-label">
              <FaSearch className="me-2" />
              Search
            </label>
            <input
              type="text"
              id="search"
              name="search"
              className="form-control"
              placeholder="Search tasks..."
              value={filter.search}
              onChange={onChange}
            />
          </div>
        </div>
        
        <div className="d-flex justify-content-between mt-3">
          <div className="text-muted">
            Showing {filteredTasks.length} of {tasks.length} tasks
          </div>
          
          <button 
            onClick={clearFilters}
            className="btn btn-outline-secondary btn-sm"
          >
            <FaTimes className="me-1" />
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;