import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./submittedTask.module.css";

const submissions = [
  { id: 1, projectName: "AI Chatbot", assignedDate: "2024-02-15", submittedDate: "2024-03-01", document: "chatbot_report.pdf", score: 0, status: "Not Submitted" },
  { id: 2, projectName: "E-commerce Platform", assignedDate: "2024-02-10", submittedDate: "2024-03-05", document: "ecommerce_doc.pdf", score: 90, status: "To Be Reviewed" },
  { id: 3, projectName: "Smart Attendance System", assignedDate: "2024-02-20", submittedDate: "2024-03-08", document: "attendance_system.pdf", score: 78, status: "Completed" },
  { id: 4, projectName: "Healthcare App", assignedDate: "2024-02-18", submittedDate: "2024-03-07", document: "healthcare_app.pdf", score: 85, status: "Completed" },
  { id: 5, projectName: "Weather Forecasting System", assignedDate: "2024-02-12", submittedDate: "2024-03-06", document: "weather_forecast.pdf", score: 92, status: "To Be Reviewed" },
  { id: 6, projectName: "Inventory Management System", assignedDate: "2024-02-05", submittedDate: "2024-02-28", document: "inventory_system.pdf", score: 76, status: "Completed" },
  { id: 7, projectName: "Online Quiz Platform", assignedDate: "2024-02-07", submittedDate: "2024-03-02", document: "quiz_platform.pdf", score: 88, status: "Completed" },
  { id: 8, projectName: "Fitness Tracker App", assignedDate: "2024-02-14", submittedDate: "2024-03-09", document: "fitness_tracker.pdf", score: 95, status: "To Be Reviewed" },
  { id: 9, projectName: "Blockchain Voting System", assignedDate: "2024-02-09", submittedDate: "2024-03-03", document: "blockchain_voting.pdf", score: 81, status: "Completed" },
  { id: 10, projectName: "AI Image Recognition", assignedDate: "2024-02-16", submittedDate: "2024-03-10", document: "ai_image_recognition.pdf", score: 0, status: "Not Submitted" },
];

const statusClass = {
  "Not Submitted": styles.statusNotSubmitted,
  "To Be Reviewed": styles.statusToBeReviewed,
  "Completed": styles.statusCompleted
};

const SubmittedTask = () => {
  const navigate = useNavigate();

  return (
    <div className={`container ${styles.submittedTask}`}>
      <h2 className="my-4 text-center">Tasks</h2>

      {/* Scrollable Table Wrapper */}
      <div className={styles.tableWrapper}>
        <table className={`table table-hover table-striped`}>
          <thead className={styles.theadDark}>
            <tr>
              <th>Project Name</th>
              <th>Assigned Date</th>
              <th>Submitted Date</th>
              <th>Document</th>
              <th>Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td>{submission.projectName}</td>
                <td>{submission.assignedDate}</td>
                <td>{submission.submittedDate}</td>
                <td>
                  <a
                    href={`/documents/${submission.document}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.docLink}
                  >
                    {submission.document}
                  </a>
                </td>
                <td>{submission.score}</td>
                <td className={`${styles.status} ${statusClass[submission.status] || ""}`}>
                  {submission.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmittedTask;
