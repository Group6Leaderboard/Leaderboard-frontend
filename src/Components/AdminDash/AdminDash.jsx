import React, { useState } from "react";
import styles from "./adminDash.module.css";

const AdminDash = () => {
  const [selectedTab, setSelectedTab] = useState("college");

  const tabs = [
    { id: "college", label: "College" },
    { id: "student", label: "Student" },
    { id: "project", label: "Project" },
  ];

  const cardData = {
    college: [
      { id: 1, title: "Total Colleges", value: "30" },
      { id: 2, title: "Accredited Colleges", value: "20" },
      { id: 3, title: "Pending Approval", value: "10" },
    ],
    student: [
      { id: 1, title: "Total Students", value: "5000" },
      { id: 2, title: "Top Scorers", value: "200" },
      { id: 3, title: "New Registrations", value: "300" },
    ],
    project: [
      { id: 1, title: "Total Projects", value: "100" },
      { id: 2, title: "Completed Projects", value: "60" },
      { id: 3, title: "Ongoing Projects", value: "40" },
    ],
  };

  return (
    <div className={styles.adminDash}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.navButton} ${
              selectedTab === tab.id ? styles.activeTab : ""
            }`}
            onClick={() => setSelectedTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Position Numbers */}
      <div className={styles.positionContainer}>
        <span className={styles.position}>2</span>
        <span className={styles.position}>1</span>
        <span className={styles.position}>3</span>
      </div>

      {/* Three Cards Layout */}
      <div className={styles.cardContainer}>
        <div className={`${styles.card} ${styles.leftCard}`}>
          <h3>{cardData[selectedTab][0].value}</h3>
          <p>{cardData[selectedTab][0].title}</p>
        </div>
        <div className={`${styles.card} ${styles.middleCard}`}>
          <h3>{cardData[selectedTab][1].value}</h3>
          <p>{cardData[selectedTab][1].title}</p>
        </div>
        <div className={`${styles.card} ${styles.rightCard}`}>
          <h3>{cardData[selectedTab][2].value}</h3>
          <p>{cardData[selectedTab][2].title}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
