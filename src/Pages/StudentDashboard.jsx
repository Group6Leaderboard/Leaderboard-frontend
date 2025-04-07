import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaUser, FaTasks, FaEnvelope, FaPhone, FaCalendarAlt, FaCheckCircle, FaClock } from "react-icons/fa";
import TaskModal from "../Components/TaskModal/TaskModal";
import StudentDash from "../Components/StudentDash/StudentDash";
import StudentTasks from "../Components/StudentTasks/StudentTask";
import styles from "./studentDashboard.module.css";

const StudentDashboard = () => {
  const location = useLocation();
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("All");

  const projects = [
    {
      id: 1,
      name: "Update user flows with UX feedback from Session #245",
      description: "Implement changes based on user testing feedback from session #245. Focus on improving navigation and form submissions.",
      score: 95,
      members: ["Alice", "Bob", "Charlie"],
      mentor: { name: "Dr. Smith", email: "smith@example.com", phone: "123-456-7890" },
      startDate: "Nov 12",
      endDate: "Dec 12",
      completed: false,
      category: "design",
      taskName: "UX Improvements",
      taskDescription: "Implement all feedback points from the latest user testing session",
      dueDate: "Dec 12, 2025"
    },
    {
      id: 2,
      name: "Wireframe splash page for new sales funnel",
      description: "Create wireframes for the updated sales funnel landing page with improved conversion elements.",
      score: 88,
      members: ["David", "Eve", "Frank"],
      mentor: { name: "Dr. Johnson", email: "johnson@example.com", phone: "987-654-3210" },
      startDate: "Nov 12",
      endDate: "Dec 12",
      completed: false,
      category: "marketing",
      taskName: "Wireframe Design",
      taskDescription: "Complete the wireframe design for new sales funnel pages",
      dueDate: "Dec 12, 2025"
    },
    {
      id: 3,
      name: "Budget planning for Q1 campaigns",
      description: "Prepare a detailed financial plan and breakdown for all marketing campaigns scheduled in Q1.",
      score: 82,
      members: ["Grace", "Hank", "Ivy"],
      mentor: { name: "Dr. Patel", email: "patel@example.com", phone: "321-654-0987" },
      startDate: "Jan 5",
      endDate: "Feb 10",
      completed: true,
      category: "finance",
      taskName: "Q1 Budget Report",
      taskDescription: "Compile the projected budget and expenses for Q1 marketing efforts",
      dueDate: "Feb 10, 2025"
    },
    {
      id: 4,
      name: "Redesign mobile app dashboard",
      description: "Redesign the dashboard for our mobile app to improve user engagement and readability.",
      score: 91,
      members: ["Jack", "Kate", "Leo"],
      mentor: { name: "Dr. Adams", email: "adams@example.com", phone: "555-123-4567" },
      startDate: "Mar 1",
      endDate: "Apr 1",
      completed: false,
      category: "design",
      taskName: "Mobile UI Revamp",
      taskDescription: "Revamp the main dashboard layout with a new user-friendly design",
      dueDate: "Apr 1, 2025"
    }
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'design':
        return <div className={`${styles.categoryIcon} ${styles.designIcon}`}>A</div>;
      case 'marketing':
        return <div className={`${styles.categoryIcon} ${styles.marketingIcon}`}>M</div>;
      case 'finance':
        return <div className={`${styles.categoryIcon} ${styles.financeIcon}`}>$</div>;
      default:
        return <div className={`${styles.categoryIcon} ${styles.defaultIcon}`}>A</div>;
    }
  };

  const getProgressBar = (project) => {
    const progressPercent = project.completed ? 100 : Math.floor(Math.random() * 80) + 10;
    return (
      <div className={styles.progressContainer}>
    
        
      </div>
    );
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filteredCategory === "All" || project.category === filteredCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.dashboardContainer}>
      {selectedTask && (
        <TaskModal
          taskName={selectedTask.taskName}
          taskDescription={selectedTask.taskDescription}
          dueDate={selectedTask.dueDate}
          mentorName={selectedTask.mentor.name}
          mentorEmail={selectedTask.mentor.email}
          mentorPhone={selectedTask.mentor.phone}
          onClose={() => setSelectedTask(null)}
        />
      )}

      {location.pathname === "/student/projects" ? (
        <div className={styles.projectLayout}>
          <header className={styles.dashboardHeader}>
            <h2 className={styles.dashboardTitle}>MY PROJECTS</h2>
            <div className={styles.headerActions}>
              <div className={styles.searchBar}>
                <input 
                  type="text" 
                  placeholder="Search projects..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select 
                className={styles.filterButton} 
                value={filteredCategory} 
                onChange={(e) => setFilteredCategory(e.target.value)}
              >
                <option value="All">All</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                <option value="finance">Finance</option>
              </select>
            </div>
          </header>

          <div className={styles.taskCards}>
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className={`${styles.taskCard} ${project.completed ? styles.completed : ""}`}
              >
                <div className={styles.cardHeader}>
                  {getCategoryIcon(project.category)}
                  <span className={styles.categoryLabel}>
                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                  </span>
                </div>
                
                <h3 className={styles.taskTitle}>{project.name}</h3>
                <p className={styles.description}>{project.description}</p>
                
                {getProgressBar(project)}
            
                
                <div className={styles.scoreSection}>
                  <div className={styles.scoreCircle}>
                    <span className={styles.scoreNumber}>{project.score}</span>
                  </div>
                  <span className={styles.scoreLabel}>Current Score</span>
                </div>
                
                <div className={styles.teamSection}>
                  <h4 className={styles.sectionTitle}>Team Members</h4>
                  <div className={styles.teamMembers}>
                    {project.members.map((member, i) => (
                      <div key={i} className={styles.memberBadge}>
                        <span className={styles.memberInitial}>{member.charAt(0)}</span>
                        <span className={styles.memberName}>{member}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className={styles.mentorSection}>
                  <h4 className={styles.sectionTitle}>Mentor</h4>
                  <div className={styles.mentorInfo}>
                    <div className={styles.mentorDetail}>
                      <FaUser className={styles.icon} />
                      <span>{project.mentor.name}</span>
                    </div>
                    <div className={styles.mentorDetail}>
                      <FaEnvelope className={styles.icon} />
                      <span>{project.mentor.email}</span>
                    </div>
                    <div className={styles.mentorDetail}>
                      <FaPhone className={styles.icon} />
                      <span>{project.mentor.phone}</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles.cardFooter}>
                  <button 
                    className={styles.viewTasksButton} 
                    onClick={() => setSelectedTask(project)}
                  >
                    <FaTasks className={styles.buttonIcon} /> View Tasks
                  </button>
                  
                  {project.completed && (
                    <div className={styles.completedBadge}>
                      <FaCheckCircle className={styles.checkIcon} /> Completed
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : location.pathname === "/student/tasks" ? (
        <StudentTasks />
      ) : (
        <StudentDash />
      )}
    </div>
  );
};

export default StudentDashboard;
