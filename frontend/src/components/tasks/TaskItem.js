import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { FaEdit, FaTrash, FaClock, FaFlag } from 'react-icons/fa';

const TaskItem = ({ task }) => {
  const taskContext = useContext(TaskContext);
  const { deleteTask, setCurrentTask, clearCurrent } = taskContext;

  const { _id, title, description, status, priority, dueDate } = task;

  const onEdit = () => {
    setCurrentTask(task);
  };

  const onDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(_id);
      clearCurrent();
    }
  };

  // Format date
  const formatDate = date => {
    return date ? new Date(date).toLocaleDateString() : 'No due date';
  };

  // Get appropriate status badge class
  const getStatusBadgeClass = status => {
    switch (status) {
      case 'completed':
        return 'bg-success';
      case 'in-progress':
        return 'bg-warning';
      case 'pending':
      default:
        return 'bg-danger';
    }
  };

  // Get appropriate priority badge class
  const getPriorityBadgeClass = priority => {
    switch (priority) {
      case 'high':
        return 'bg-danger';
      case 'medium':
        return 'bg-warning';
      case 'low':
      default:
        return 'bg-info';
    }
  };

  return (
    <div className={`card mb-3 task-item task-${status}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title mb-0">{title}</h5>
          <div>
            <span className={`badge ${getStatusBadgeClass(status)} me-2`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
            <span className={`badge ${getPriorityBadgeClass(priority)}`}>
              <FaFlag className="me-1" />
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
          </div>
        </div>
        
        {description && (
          <p className="card-text">{description}</p>
        )}
        
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="text-muted small">
            <FaClock className="me-1" />
            {formatDate(dueDate)}
          </div>
          
          <div>
            <button 
              onClick={onEdit} 
              className="btn btn-sm btn-outline-primary me-2"
              title="Edit task"
            >
              <FaEdit />
            </button>
            <button 
              onClick={onDelete} 
              className="btn btn-sm btn-outline-danger"
              title="Delete task"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;