import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from '../context/TaskContext';
import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';
import TaskFilter from '../components/tasks/TaskFilter';
import TaskStats from '../components/tasks/TaskStats';
import { FaTachometerAlt } from 'react-icons/fa';

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const taskContext = useContext(TaskContext);
  const { user } = authContext;
  const { tasks, getTasks } = taskContext;

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container my-4">
      <div className="row mb-4">
        <div className="col-md-8">
          <h1 className="display-5">
            <FaTachometerAlt className="me-3" />
            Dashboard
          </h1>
          <p className="lead text-muted">
            Welcome, {user && user.username}! Manage your tasks efficiently.
          </p>
        </div>
        <div className="col-md-4 d-flex align-items-center justify-content-md-end mt-3 mt-md-0">
          <span className="badge bg-primary p-2">
            <span className="fs-6">Today: {new Date().toLocaleDateString()}</span>
          </span>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-4">
          <TaskForm />
          <div className="card mt-4 shadow-sm">
            <div className="card-body">
              <TaskStats tasks={tasks} />
            </div>
          </div>
        </div>
        
        <div className="col-md-8">
          <TaskFilter />
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;