import React from "react";
import "./taskHistory.css";
import { FaClock, FaExclamationCircle, FaCheckCircle, FaHourglass } from 'react-icons/fa';

const TaskHistory = ({ tasks }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <FaCheckCircle className="status-icon completed" />;
      case 'to be reviewed':
        return <FaHourglass className="status-icon review" />;
      case 'not submitted':
        return <FaExclamationCircle className="status-icon pending" />;
      default:
        return <FaClock className="status-icon" />;
    }
  };

  return (
    <div className="task-history">
      <div className="task-history-header">
        <h2>Recent Task Activity</h2>
        <p>Latest tasks assigned to projects</p>
      </div>

      <div className="task-list">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div className="task-item" key={task.id}>
              <div className="task-status">
                {getStatusIcon(task.status)}
              </div>
              <div className="task-details">
                <h3>{task.name}</h3>
                <p className="task-description">{task.description}</p>
                <div className="task-meta">
                  <span className="task-date">Created: {formatDate(task.createdAt)}</span>
                  <span className={`task-status-tag ${task.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {task.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No recent tasks found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskHistory;