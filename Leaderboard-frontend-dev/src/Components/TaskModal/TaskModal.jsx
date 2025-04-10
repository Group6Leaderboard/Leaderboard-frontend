import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Swal from "sweetalert2";
import styles from "./taskModal.module.css";
import Calender from "../Calender/Calender";
import { updateTask } from "../../services/taskService";
import AlertModal from "../AlertModal/AlertModal";

const TaskModal = ({
  taskName,
  taskDescription,
  dueDate,
  mentorName,
  mentorEmail,
  mentorPhone,
  onClose,
  onNext,
  onPrev,
  showArrows = false,
  taskId
}) => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const dueDateStr = dueDate ? new Date(dueDate).toISOString().split("T")[0] : "";
  const isDueDatePassed = dueDateStr < today;

  useEffect(() => {
    if (isDueDatePassed) {
      Swal.fire({
        icon: "warning",
        title: "Task Overdue",
        text: `This task was due on ${formatDate(dueDate)}. Late submissions may be penalized.`,
        confirmButtonColor: "#f44336",
      });
    }
  }, [dueDate, isDueDatePassed]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileError("");
  };

  const handleSubmitTask = () => {
    if (!selectedFile) {
      setFileError("Please upload a file before submitting");
      return;
    }

    if (isDueDatePassed) {
      Swal.fire({
        title: "Submit Late Work?",
        text: "This task is past the due date. You cant submit",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          return;
        }
      });
    } else {
      uploadTaskFile();
    }
  };
  const uploadTaskFile = async () => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await updateTask(taskId, { file: selectedFile });

      // ✅ Check if task was actually updated
      if (
        response?.status === 200 ||
        response?.data?.message?.toLowerCase().includes("updated")
      ) {
        submitSuccessful(); // Show success alert
      } else {
        throw new Error(response?.data?.message || "Failed to submit task");
      }
    } catch (error) {
      console.error("Error submitting task:", error);
      // ❌ Only show error if it's really an error
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "There was an error submitting your task. Please try again.",
        confirmButtonColor: "#f44336",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  const submitSuccessful = () => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Task submitted successfully!",
      confirmButtonColor: "#4CAF50",
    });
  };


  const handleBackTask = () => {
    onClose();
    navigate("/student/projects");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date specified";

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>

        {/* Left Section */}
        <div className={styles.leftSection}>
          <div className={styles.field}>
            <label>Task Name</label>
            <p className={styles.text}>{taskName}</p>
          </div>

          <div className={styles.field}>
            <label>Task Description</label>
            <p className={styles.text}>{taskDescription}</p>
          </div>

          <div className={styles.field}>
            <label>Due Date</label>
            <p className={`${styles.text} ${isDueDatePassed ? styles.overdue : ""}`}>
              {formatDate(dueDate)}
              {isDueDatePassed && <span className={styles.overdueTag}> (Overdue)</span>}
            </p>
          </div>

          <div className={styles.field}>
            <label>
              Upload File
              {isDueDatePassed && <span className={styles.overdueTag}> (Late submission)</span>}
            </label>
            <input
              type="file"
              className={styles.upload}
              onChange={handleFileChange}
              disabled={isSubmitting}
            />
            {fileError && <p className={styles.errorMessage}>{fileError}</p>}
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>
          <div className={styles.mentorInfo}>
            <h3>Mentor Details</h3>
            <p><strong>Name:</strong> {mentorName}</p>
            <p><strong>Email:</strong> {mentorEmail}</p>
            <p><strong>Phone:</strong> {mentorPhone}</p>
          </div>

          <div className={styles.calendarSection}>
            <h3>Due Date Highlight </h3>
            <Calender
              highlightDate={new Date(dueDate)}
              key={dueDate} // Add this line
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button
            className={`${styles.submitButton} ${isDueDatePassed ? styles.lateSubmit : ""}`}
            onClick={handleSubmitTask}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : isDueDatePassed ? "Submit Late Task" : "Submit Task"}
          </button>
          <button
            className={styles.backButton}
            onClick={handleBackTask}
            disabled={isSubmitting}
          >
            Back
          </button>
        </div>

        {/* Arrows to switch between tasks */}
        {showArrows && (
          <div className={styles.arrowControls}>
            <>
              <button
                onClick={onPrev}
                className={`${styles.arrowBtn} ${styles.leftArrow}`}
                disabled={isSubmitting}
              >
                <HiChevronLeft size={20} />
              </button>

              <button
                onClick={onNext}
                className={`${styles.arrowBtn} ${styles.rightArrow}`}
                disabled={isSubmitting}
              >
                <HiChevronRight size={20} />
              </button>
            </>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskModal;