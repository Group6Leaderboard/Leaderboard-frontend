import React, { useState } from "react";
import styles from "./studentTask.module.css";

const StudentTasks = () => {
  const [activeTab, setActiveTab] = useState("submitted");
  const [selectedTask, setSelectedTask] = useState(null); // For modal

  const projectTasks = [
    {
      taskName: "UX Improvements",
      projectName: "Update user flows with UX feedback from Session #245",
      dueDate: "2025-12-12",
      submittedDate: "2025-12-11",
      fileUrl: "https://example.com/ux-feedback.pdf",
      status: "To Be Reviewed",
      score: null,
    },
    {
      taskName: "Wireframe Design",
      projectName: "Wireframe splash page for new sales funnel",
      dueDate: "2025-12-12",
      submittedDate: "2025-12-12",
      fileUrl: "https://example.com/wireframe.pdf",
      status: "Completed",
      score: 88,
    },
    {
      taskName: "Q1 Budget Report",
      projectName: "Budget planning for Q1 campaigns",
      dueDate: "2025-02-10",
      assignedDate: "2025-01-05",
      status: "Pending",
    },
    {
      taskName: "Mobile UI Revamp",
      projectName: "Redesign mobile app dashboard",
      dueDate: "2025-04-01",
      assignedDate: "2025-03-01",
      status: "Pending",
    },
  ];

  const submittedTasks = projectTasks.filter(
    (task) => task.status === "To Be Reviewed" || task.status === "Completed"
  );

  const toBeSubmittedTasks = projectTasks.filter(
    (task) => task.status === "Pending"
  );

  const handleViewTask = (task) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>STUDENT TASKS</h2>

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
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{task.taskName}</td>
                    <td>{task.projectName}</td>
                    <td>{task.dueDate}</td>
                    <td>{task.submittedDate || "—"}</td>
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
                    <td>{task.status === "To Be Reviewed" ? "N/A" : task.score ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className={styles.noData}>No submitted tasks available.</p>
          )}
        </div>
      )}

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
                  <tr key={index}>
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

      {/* Modal */}
      {selectedTask && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Task Details</h3>
            <p><strong>Task Name:</strong> {selectedTask.taskName}</p>
            <p><strong>Project Name:</strong> {selectedTask.projectName}</p>
            <p><strong>Assigned Date:</strong> {selectedTask.assignedDate}</p>
            <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>
            <button className={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTasks;
