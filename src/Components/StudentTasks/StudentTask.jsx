import React, { useState } from "react";
import styles from "./studentTask.module.css";

const StudentTasks = () => {
  const [activeTab, setActiveTab] = useState("submitted");

  // Dummy data for submitted tasks
  const submittedTasks = [
    {
      id: 1,
      taskName: "Design Login Page",
      projectName: "E-Commerce App",
      dueDate: "2025-03-28",
      submittedDate: "2025-03-27",
      fileUrl: "https://example.com/login-page.pdf",
      status: "To Be Reviewed",
      score: null,
    },
    {
      id: 2,
      taskName: "Database Schema Design",
      projectName: "Student Management System",
      dueDate: "2025-04-05",
      submittedDate: "2025-04-04",
      fileUrl: "https://example.com/schema-design.pdf",
      status: "Completed",
      score: 85,
    },
  ];

  // Dummy data for to-be-submitted tasks
  const toBeSubmittedTasks = [
    {
      id: 1,
      taskName: "API Integration",
      projectName: "Online Food Delivery",
      assignedDate: "2025-03-20",
      dueDate: "2025-04-01",
    },
    {
      id: 2,
      taskName: "UI Testing",
      projectName: "Social Media App",
      assignedDate: "2025-03-22",
      dueDate: "2025-04-03",
    },
  ];

  // Function to handle viewing a task
  const handleViewTask = (task) => {
    alert(`Viewing Task: ${task.taskName} for ${task.projectName}`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>STUDENT TASKS</h2>

      {/* Tab buttons */}
      <div className={styles.buttonGroup}>
        <button
          className={`${styles.tabButton} ${activeTab === "submitted" ? styles.active : ""}`}
          onClick={() => setActiveTab("submitted")}
        >
          Submitted
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "toBeSubmitted" ? styles.active : ""}`}
          onClick={() => setActiveTab("toBeSubmitted")}
        >
          To Be Submitted
        </button>
      </div>

      {/* Submitted Tasks Table */}
      {activeTab === "submitted" && (
        <div className={styles.tableContainer}>
          {submittedTasks.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Sl. No</th>
                  <th>Task Name</th>
                  <th>Project Name</th>
                  <th>Due Date</th>
                  <th>Submitted Date</th>
                  <th>File</th>
                  <th>Status</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {submittedTasks.map((task, index) => (
                  <tr key={task.id}>
                    <td>{index + 1}</td>
                    <td>{task.taskName}</td>
                    <td>{task.projectName}</td>
                    <td>{task.dueDate}</td>
                    <td>{task.submittedDate}</td>
                    <td>
                      {task.fileUrl ? (
                        <a href={task.fileUrl} download className={styles.fileLink}>
                          Download
                        </a>
                      ) : (
                        "No file"
                      )}
                    </td>
                    <td className={styles.status}>{task.status}</td>
                    <td>{task.status === "To Be Reviewed" ? "N/A" : task.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className={styles.noData}>No submitted tasks available.</p>
          )}
        </div>
      )}

      {/* To Be Submitted Tasks Table */}
      {activeTab === "toBeSubmitted" && (
        <div className={styles.tableContainer}>
          {toBeSubmittedTasks.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Sl. No</th>
                  <th>Task Name</th>
                  <th>Project Name</th>
                  <th>Assigned Date</th>
                  <th>Due Date</th>
                  <th>Task</th>
                </tr>
              </thead>
              <tbody>
                {toBeSubmittedTasks.map((task, index) => (
                  <tr key={task.id}>
                    <td>{index + 1}</td>
                    <td>{task.taskName}</td>
                    <td>{task.projectName}</td>
                    <td>{task.assignedDate}</td>
                    <td>{task.dueDate}</td>
                    <td>
                      <button className={styles.viewButton} onClick={() => handleViewTask(task)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className={styles.noData}>No pending tasks available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentTasks;
