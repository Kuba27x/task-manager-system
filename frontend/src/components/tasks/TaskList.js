import React, { useContext, useEffect } from 'react';
import { TaskContext } from '../../context/TaskContext';
import TaskItem from './TaskItem';
import { FaExclamationCircle, FaClock, FaCheckCircle } from 'react-icons/fa';

const TaskList = () => {
  const taskContext = useContext(TaskContext);
  const { filteredTasks, getTasks, loading } = taskContext;

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading tasks...</span>
        </div>
        <p className="mt-3">Loading tasks...</p>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="card p-4 text-center">
        <h4>No tasks found</h4>
        <p>Start adding tasks to get organized!</p>
      </div>
    );
  }

  // Group tasks by status
  const pendingTasks = filteredTasks.filter(task => task.status === 'pending');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'in-progress');
  const completedTasks = filteredTasks.filter(task => task.status === 'completed');

  return (
    <div className="task-list">
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-danger text-white d-flex align-items-center">
              <FaExclamationCircle className="me-2" />
              <h5 className="mb-0">Pending ({pendingTasks.length})</h5>
            </div>
            <div className="card-body">
              {pendingTasks.length === 0 ? (
                <p className="text-center text-muted my-3">No pending tasks</p>
              ) : (
                pendingTasks.map(task => (
                  <TaskItem key={task._id} task={task} />
                ))
              )}
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-warning d-flex align-items-center">
              <FaClock className="me-2" />
              <h5 className="mb-0">In Progress ({inProgressTasks.length})</h5>
            </div>
            <div className="card-body">
              {inProgressTasks.length === 0 ? (
                <p className="text-center text-muted my-3">No tasks in progress</p>
              ) : (
                inProgressTasks.map(task => (
                  <TaskItem key={task._id} task={task} />
                ))
              )}
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-success text-white d-flex align-items-center">
              <FaCheckCircle className="me-2" />
              <h5 className="mb-0">Completed ({completedTasks.length})</h5>
            </div>
            <div className="card-body">
              {completedTasks.length === 0 ? (
                <p className="text-center text-muted my-3">No completed tasks</p>
              ) : (
                completedTasks.map(task => (
                  <TaskItem key={task._id} task={task} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;