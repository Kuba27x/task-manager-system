import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { FaChartPie, FaTasks, FaRegClock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskStats = ({ tasks }) => {
  const [chartData, setChartData] = useState({
    status: {
      datasets: []
    },
    priority: {
      datasets: []
    }
  });

  useEffect(() => {
    if (tasks.length > 0) {
      // Count tasks by status
      const pendingCount = tasks.filter(task => task.status === 'pending').length;
      const inProgressCount = tasks.filter(task => task.status === 'in-progress').length;
      const completedCount = tasks.filter(task => task.status === 'completed').length;

      // Count tasks by priority
      const highPriorityCount = tasks.filter(task => task.priority === 'high').length;
      const mediumPriorityCount = tasks.filter(task => task.priority === 'medium').length;
      const lowPriorityCount = tasks.filter(task => task.priority === 'low').length;

      // Chart data for status
      const statusData = {
        labels: ['Pending', 'In Progress', 'Completed'],
        datasets: [
          {
            data: [pendingCount, inProgressCount, completedCount],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }
        ]
      };

      // Chart data for priority
      const priorityData = {
        labels: ['High', 'Medium', 'Low'],
        datasets: [
          {
            data: [highPriorityCount, mediumPriorityCount, lowPriorityCount],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(54, 162, 235, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
          }
        ]
      };

      setChartData({ status: statusData, priority: priorityData });
    }
  }, [tasks]);

  // Calculate counts
  const pendingCount = tasks.filter(task => task.status === 'pending').length;
  const inProgressCount = tasks.filter(task => task.status === 'in-progress').length;
  const completedCount = tasks.filter(task => task.status === 'completed').length;
  const totalCount = tasks.length;

  // Upcoming tasks (due in the next 7 days)
  const now = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(now.getDate() + 7);
  
  const upcomingTasks = tasks.filter(task => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    return dueDate >= now && dueDate <= nextWeek && task.status !== 'completed';
  }).length;

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      }
    }
  };

  return (
    <div className="task-stats">
      <h4 className="mb-3 d-flex align-items-center">
        <FaChartPie className="me-2" />
        Task Statistics
      </h4>
      
      {tasks.length === 0 ? (
        <div className="text-center text-muted my-4">
          <p>No tasks available to display statistics</p>
        </div>
      ) : (
        <>
          <div className="mb-4" style={{ height: '200px' }}>
            <h5 className="text-center mb-3">By Status</h5>
            <Pie data={chartData.status} options={chartOptions} />
          </div>
          
          <div className="mb-4" style={{ height: '200px' }}>
            <h5 className="text-center mb-3">By Priority</h5>
            <Pie data={chartData.priority} options={chartOptions} />
          </div>
          
          <div className="task-summary">
            <div className="list-group">
              <div className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <FaTasks className="me-2 text-primary" />
                  Total Tasks
                </span>
                <span className="badge bg-primary rounded-pill">{totalCount}</span>
              </div>
              
              <div className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <FaExclamationCircle className="me-2 text-danger" />
                  Pending
                </span>
                <span className="badge bg-danger rounded-pill">{pendingCount}</span>
              </div>
              
              <div className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <FaRegClock className="me-2 text-warning" />
                  In Progress
                </span>
                <span className="badge bg-warning rounded-pill">{inProgressCount}</span>
              </div>
              
              <div className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <FaCheckCircle className="me-2 text-success" />
                  Completed
                </span>
                <span className="badge bg-success rounded-pill">{completedCount}</span>
              </div>
              
              <div className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <FaRegClock className="me-2 text-info" />
                  Due This Week
                </span>
                <span className="badge bg-info rounded-pill">{upcomingTasks}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskStats;