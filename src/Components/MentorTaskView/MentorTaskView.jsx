import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaEllipsisH,
  FaEdit,
} from "react-icons/fa";
import styles from "./mentorTaskView.module.css";
import { getAllTasks, updateTask } from "../../services/taskService";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import AlertModal from "../AlertModal/AlertModal";

const MentorTaskView = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [scoreInput, setScoreInput] = useState("");
  const [inlineScores, setInlineScores] = useState({});

  const tabs = ["All", "Not Submitted", "To be Reviewed", "Overdue", "Completed"];

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getAllTasks();
      if (response && response.response) {
        setTasks(response.response);
      } else {
        throw new Error("Invalid response format from API");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to load tasks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getFilteredTasks = () => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignedTo?.name?.toLowerCase().includes(searchTerm.toLowerCase());

      const taskStatusNormalized = task.status?.toLowerCase();
      const activeTabNormalized = activeTab.toLowerCase();

      if (activeTab === "All") return matchesSearch;
      return matchesSearch && taskStatusNormalized === activeTabNormalized;
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Not Submitted":
        return <FaClock className={styles.statusIcon} style={{ color: "#FFA500" }} />;
      case "To be Reviewed":
        return <FaFileAlt className={styles.statusIcon} style={{ color: "#3498db" }} />;
      case "Completed":
        return <FaCheckCircle className={styles.statusIcon} style={{ color: "#2ecc71" }} />;
      case "Overdue":
        return <FaExclamationCircle className={styles.statusIcon} style={{ color: "#e74c3c" }} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Submitted":
        return "#FFA500";
      case "To be Reviewed":
        return "#3498db";
      case "Completed":
        return "#2ecc71";
      case "Overdue":
        return "#e74c3c";
      default:
        return "#7f8c8d";
    }
  };

  const handleViewMore = (task) => {
    setSelectedTask(task);
    setScoreInput("");
  };

  const handleCloseDetails = () => {
    setSelectedTask(null);
    setScoreInput("");
  };

  const handleScoreSubmit = async (taskId, scoreValue) => {
    const scoreToSubmit = scoreValue || scoreInput;

    if (scoreToSubmit === "" || isNaN(scoreToSubmit)) {
      alert("Please enter a valid score.");
      return;
    }

    try {
      await updateTask(taskId, { score: parseInt(scoreToSubmit, 10) });
      AlertModal.success("Score submitted successfully");
      setScoreInput("");
      setInlineScores((prev) => ({ ...prev, [taskId]: "" }));
      setSelectedTask(null);
      await fetchTasks();
    } catch (error) {
      console.error("Error updating score:", error);
      AlertModal.error("Failed", "Something went wrong. Try again.");
    }
  };

  const filteredTasks = getFilteredTasks();

  if (loading) return <div className={styles.loadingState}>Loading tasks...</div>;
  if (error) return <div className={styles.errorState}>{error}</div>;

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            <FaFileAlt className={styles.titleIcon} /> TASKS
          </h1>
          <div className={styles.searchBar}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.tabContainer}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.taskListContainer}>
          {filteredTasks.length > 0 ? (
            <div className={styles.taskList}>
              {filteredTasks.map((task) => (
                <div key={task.id} className={styles.taskCard}>
                  <div className={styles.taskHeader}>
                    <h3 className={styles.taskName}>{task.name}</h3>
                    {getStatusIcon(task.status)}
                  </div>

                  {task.description && (
                    <div className={styles.taskDescription}>
                      {task.description.length > 60
                        ? `${task.description.substring(0, 60)}...`
                        : task.description}
                    </div>
                  )}

                  <div className={styles.taskMeta}>
                    {task.dueDate && (
                      <div className={styles.dueDateTopLeft}>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  {task.status?.toLowerCase() === "to be reviewed" && (
                    <div className={styles.inlineScoreSection}>
                      <input
                        type="number"
                        placeholder="Score"
                        className={styles.scoreInput}
                        min={0}
                        max={100}
                        value={inlineScores[task.id] || ""}
                        onChange={(e) =>
                          setInlineScores((prev) => ({
                            ...prev,
                            [task.id]: e.target.value,
                          }))
                        }
                      />
                      <button
                        className={styles.submitScoreButton}
                        onClick={() => handleScoreSubmit(task.id, inlineScores[task.id])}
                      >
                        Submit
                      </button>
                    </div>
                  )}

                  {task.file && (
                    <a
                      href={`data:application/octet-stream;base64,${task.file}`}
                      download={`TaskFile-${task.id}`}
                      className={styles.downloadBottomLeft}
                    >
                      <FaFileAlt /> Download File
                    </a>
                  )}

                  <div className={styles.taskActions}>
                    
                    <button
                      className={styles.viewMoreButton}
                      onClick={() => handleViewMore(task)}
                    >
                      <FaEllipsisH />
                    </button>
                    
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noTasks}>No tasks found in {activeTab}</div>
          )}
        </div>

        {selectedTask && (
          <div className={styles.taskDetailsModal}>
            <div className={styles.modalContent}>
              <button className={styles.closeButton} onClick={handleCloseDetails}>
                &times;
              </button>

              <h2 className={styles.modalTitle}>{selectedTask.name}</h2>
              <p className={styles.modalDescription}>{selectedTask.description}</p>

              <div className={styles.detailSection}>
                <h3 className={styles.detailTitle}>Assigned To</h3>
                <ul className={styles.memberList}>
                  {selectedTask.assignedTo?.members?.map((member) => (
                    <li key={member.id} className={styles.memberItem}>
                      {member.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.detailSection}>
                <h3 className={styles.detailTitle}>Due Date</h3>
                <p>
                  {selectedTask.dueDate
                    ? new Date(selectedTask.dueDate).toLocaleDateString()
                    : "Not set"}
                </p>
              </div>

              <div className={styles.detailSection}>
                <h3 className={styles.detailTitle}>Status</h3>
                <p className={styles[`status${selectedTask.status.replace(/\s+/g, "")}`]}>
                  {selectedTask.status}
                </p>
              </div>

              {selectedTask.file && (
                <div className={styles.detailSection}>
                  <h3 className={styles.detailTitle}>Submitted File</h3>
                  <a
                    href={`data:application/octet-stream;base64,${selectedTask.file}`}
                    download={`TaskFile-${selectedTask.id}`}
                    className={styles.downloadButton}
                  >
                    <FaFileAlt /> Download File
                  </a>
                </div>
              )}

              {selectedTask.status === "To be reviewed" && (
                <div className={styles.scoreSection}>
                  <label className={styles.scoreLabel}>Score:</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className={styles.scoreInput}
                    placeholder="Enter score"
                    value={scoreInput}
                    onChange={(e) => setScoreInput(e.target.value)}
                  />
                  <button
                    className={styles.submitScoreButton}
                    onClick={() => handleScoreSubmit(selectedTask.id)}
                  >
                    Submit Score
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MentorTaskView;
