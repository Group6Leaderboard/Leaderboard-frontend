import React, { useState } from "react";
import styles from "./studentTask.module.css";

const StudentTasks = ({ projectTasks, projectList }) => {
  const [activeTab, setActiveTab] = useState("submitted");
  const [selectedTask, setSelectedTask] = useState(null); // For modal



  const submittedTasks = projectTasks.filter(
    (task) => task.status === "To be reviewed" || task.status === "Completed"
  );

  const toBeSubmittedTasks = projectTasks.filter(
    (task) => task.status === "Not Submitted"
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
                  {/* <th>Submitted Date</th> */}
                  <th>File</th>
                  <th>Status</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {submittedTasks.map((task, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{task.name}</td>
                    <td>{projectList?.[task.assignedTo] || "N/A"}</td>
                    <td>{task.dueDate?.slice(0, 10)}</td>
                    {/* <td>{task.submittedDate || "—"}</td> */}
                    <td>
                      {task.file ? (
                        <a
                          href={URL.createObjectURL(
                            new Blob([Uint8Array.from(atob(task.file), c => c.charCodeAt(0))], {
                              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                            })
                          )}
                          download={`${task.taskName || "task"}.xlsx`}
                          className={styles.fileLink}
                        >
                          Download
                        </a>
                      ) : (
                        "No file"
                      )}
                    </td>
                    <td className={styles.status}>{task.status}</td>
                    <td>{task.status === "To be reviewed" ? "N/A" : task.score ?? "—"}</td>
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
                  {/* <th>Assigned Date</th> */}
                  <th>Due Date</th>
                  <th>Task</th>
                </tr>
              </thead>
              <tbody>
                {toBeSubmittedTasks.map((task, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{task.name}</td>
                    <td>{projectList?.[task.assignedTo] || "N/A"}</td>
                    {/* <td>{task.assignedDate}</td> */}
                    <td>{task.dueDate?.slice(0, 10)}</td>
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
            <p><strong>Task Name:</strong> {selectedTask.name}</p>
            <p><strong>Project Name:</strong> {projectList?.[selectedTask.assignedTo]}</p>
            {/* <p><strong>Assigned Date:</strong> {selectedTask.assignedDate}</p> */}
            <p><strong>Due Date:</strong> {selectedTask.dueDate?.slice(0, 10)}</p>
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
