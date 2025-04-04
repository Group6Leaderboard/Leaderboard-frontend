import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./taskModal.module.css";
import Calender from "../Calender/Calender";

const TaskModal = ({
  taskName = "Design Login Page",
  taskDescription = "Create a responsive login page using React and Tailwind.",
  dueDate = "2025-01-28",
  mentorName = "John Doe",
  mentorEmail = "john@example.com",
  mentorPhone = "+91 98765 43210",
  onClose
}) => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");
  
  // Check if due date has passed - compare date strings to avoid time zone issues
  const today = new Date().toISOString().split('T')[0];
  const dueDateStr = new Date(dueDate).toISOString().split('T')[0];
  const isDueDatePassed = dueDateStr < today;
  
  // Show overdue alert when component mounts, if applicable
  useEffect(() => {
    if (isDueDatePassed) {
      Swal.fire({
        icon: 'warning',
        title: 'Task Overdue',
        text: `This task was due on ${formatDate(dueDate)}. Late submissions may be penalized.`,
        confirmButtonColor: '#f44336'
      });
    }
  }, []);
  
  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileError("");
  };
  
  // Handle Submit Task Button click
  const handleSubmitTask = () => {
    // Validate file is selected
    if (!selectedFile) {
      setFileError("Please upload a file before submitting");
      return;
    }
    
    // Handle overdue submission with warning
    if (isDueDatePassed) {
      Swal.fire({
        title: 'Submit Late Work?',
        text: 'This task is past the due date. Do you still want to submit?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, submit anyway'
      }).then((result) => {
        if (result.isConfirmed) {
          submitSuccessful();
        }
      });
    } else {
      // Regular submission if not overdue
      submitSuccessful();
    }
  };
  
  // Success submission handler
  const submitSuccessful = () => {
    Swal.fire({
      icon: 'success',
      title: 'Task Submitted',
      text: `Your task "${taskName}" has been submitted successfully!`,
      confirmButtonColor: '#4CAF50'
    }).then(() => {
      // Close the modal after user clicks "OK" on the alert
      onClose();
    });
  };
  
  // Handle Back Button click to navigate to /student/projects
  const handleBackTask = () => {
    onClose();  // Close the modal first
    navigate("/student/projects");  // Navigate to /student/projects
  };
  
  // Format the due date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        {/* Close Button in top right corner */}
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
            <p className={`${styles.text} ${isDueDatePassed ? styles.overdue : ''}`}>
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
            <h3>Due Date Highlight</h3>
            <Calender highlightDate={dueDate} />
          </div>
        </div>
        
        {/* Action Buttons - positioned below the left section */}
        <div className={styles.actionButtons}>
          <button 
            className={`${styles.submitButton} ${isDueDatePassed ? styles.lateSubmit : ''}`} 
            onClick={handleSubmitTask}
          >
            {isDueDatePassed ? 'Submit Late Task' : 'Submit Task'}
          </button>
          <button className={styles.backButton} onClick={handleBackTask}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;