// StudentDashboard.jsx (Main Controller Component)
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaUser, FaTasks, FaEnvelope, FaPhone, FaCheckCircle } from "react-icons/fa";
import TaskModal from "../Components/TaskModal/TaskModal";
import StudentDash from "../Components/StudentDash/StudentDash";
import StudentTasks from "../Components/StudentTasks/StudentTask";
import styles from "./studentDashboard.module.css";
import { getAllProjects } from "../services/projectService";
import { getMembersForProject } from "../services/studentProjectService";
import DashboardLayout from "../Layouts/Dashboard/DashboardLayout";
import { getUsers } from "../services/userService";
import { getAllTasks } from "../services/taskService";
import AlertModal from "../Components/AlertModal/AlertModal";

const StudentDashboard = () => {
  const location = useLocation();
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [projects, setProjects] = useState([]);
  const [projectMembers, setProjectMembers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [mentorDetails, setMentorDetails] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [activeProjectTasks, setActiveProjectTasks] = useState([]);
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);
  const [activeProject, setActiveProject] = useState(null); 
  const [projectList, setProjectList] = useState({});



  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const data = await getAllProjects();
        setProjects(data.response);
        const projectMap = {};
        data.response.forEach((proj) => {
          projectMap[proj.id] = proj.name;
        });
        setProjectList(projectMap);

        const membersPromises = data.response.map(project =>
          getMembersForProject(project.id).then(members => ({
            projectId: project.id,
            members: members.response
          }))
        );

        const membersResults = await Promise.all(membersPromises);
        const membersMap = {};
        membersResults.forEach(result => {
          membersMap[result.projectId] = result.members;
        });

        setProjectMembers(membersMap);
      } catch (err) {
        console.error("Failed to load projects:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

console.log(projectList);
  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const data = await getAllTasks();
        setTasks(data.response);


      } catch (err) {
        console.error("Failed to load tasks:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchMentorDetails = async () => {
      if (!projects || !projects.length) return;

      try {
        const mentorIds = [...new Set(
          projects
            .map(p => p.mentorId)
            .filter(Boolean)
        )];

        const mentorPromises = mentorIds.map(id =>
          getUsers(null, null, id).then(res => ({ id, data: res.response }))
        );

        const mentorResults = await Promise.all(mentorPromises);

        const mentorMap = {};
        mentorResults.forEach(({ id, data }) => {
          mentorMap[id] = data;
        });

        setMentorDetails(mentorMap);
      } catch (err) {
        console.error("Error fetching mentor details", err);
      }
    };

    fetchMentorDetails();
  }, [projects]);

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
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className={styles.progressPercent}>{progressPercent}%</span>
      </div>
    );
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filteredCategory === "All" || project.category === filteredCategory;
    return matchesSearch && matchesCategory;
  });

  // Prepare the data for StudentDash
  const projectsWithMembers = projects.map(project => ({
    ...project,
    members: projectMembers[project.id] || [],
    tasksAssigned: 0, // You might want to fetch this from an API
    tasksCompleted: 0  // You might want to fetch this from an API
  }));

  // Determine which view to render based on the current path
  const renderView = () => {
    if (location.pathname === "/student/projects") {
      return renderProjectsView();
    } else if (location.pathname === "/student/tasks") {
      return <StudentTasks projectTasks={tasks} projectList={projectList}/>;
    } else {
      return <StudentDash projects={projectsWithMembers} />;
    }
  };

  const renderProjectsView = () => {
    return (
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

          </div>
        </header>

        {isLoading ? (
          <div className={styles.loadingState}>Loading projects...</div>
        ) : (
          <div className={styles.taskCards}>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`${styles.taskCard} ${project.completed ? styles.completed : ""}`}
              >
                <div className={styles.cardHeader}>
                  {getCategoryIcon(project.category)}
                  <span className={styles.categoryLabel}>
                    {project.category?.charAt(0).toUpperCase() + project.category?.slice(1) || "Project"}
                  </span>
                </div>

                <h3 className={styles.taskTitle}>{project.name}</h3>
                <p className={styles.description}>{project.description}</p>


                <div className={styles.scoreSection}>
                  <div className={styles.scoreCircle}>
                    <span className={styles.scoreNumber}>{project.score || 0}</span>
                  </div>
                  <span className={styles.scoreLabel}>Current Score</span>
                </div>

                <div className={styles.teamSection}>
                  <h4 className={styles.sectionTitle}>Team Members</h4>
                  <div className={styles.teamMembers}>
                    {projectMembers[project.id]?.map((member, i) => (
                      <div key={i} className={styles.memberBadge}>
                        <span className={styles.memberInitial}>{member.name?.charAt(0) || "U"}</span>
                        <span className={styles.memberName}>{member.name || "Unknown"}</span>
                      </div>
                    ))}
                    {(!projectMembers[project.id] || projectMembers[project.id].length === 0) && (
                      <div className={styles.noMembers}>No members found</div>
                    )}
                  </div>
                </div>

                <div className={styles.mentorSection}>
                  <h4 className={styles.sectionTitle}>Mentor</h4>
                  <div className={styles.mentorInfo}>
                    <div className={styles.mentorDetail}>
                      <FaUser className={styles.icon} />
                      <span>{mentorDetails?.[project.mentorId]?.name || "Not assigned"}</span>
                    </div>
                    <div className={styles.mentorDetail}>
                      <FaEnvelope className={styles.icon} />
                      <span>{mentorDetails?.[project.mentorId]?.email || "Not available"}</span>
                    </div>
                    <div className={styles.mentorDetail}>
                      <FaPhone className={styles.icon} />
                      <span>{mentorDetails?.[project.mentorId]?.phone || "Not available"}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <button
                    className={styles.viewTasksButton}
                    onClick={() => {
                      const matchingTasks = tasks.filter((t) => {
                        const dueDate = new Date(t.dueDate);
                        const now = new Date();
                      
                        return (
                          t.assignedTo === project.id &&
                          (t.status === "Not Submitted" || t.status === "To be reviewed") &&
                          dueDate > now
                        );
                      });
                      console.log(matchingTasks);
                      if (matchingTasks.length > 0) {
                        setActiveProjectTasks(matchingTasks);
                        setActiveTaskIndex(0);
                        setActiveProject(project); // Save reference to current project
                      } else {
                        AlertModal.success("No Pending Tasks", "All tasks are submitted!");
                      }
                    }}
                  >
                    <FaTasks className={styles.buttonIcon} /> View Tasks
                  </button>
                    
 

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
    );
    
  };

  return (
    <DashboardLayout>
      <div className={styles.dashboardContainer}>
        {activeProjectTasks.length > 0 && (
          <TaskModal
            taskName={activeProjectTasks[activeTaskIndex].name}
            taskDescription={activeProjectTasks[activeTaskIndex].description}
            dueDate={activeProjectTasks[activeTaskIndex].dueDate}
            mentorName={activeProject && mentorDetails?.[activeProject.mentorId]?.name || "Not assigned"}
            mentorEmail={activeProject && mentorDetails?.[activeProject.mentorId]?.email || "Not available"}
            mentorPhone={activeProject && mentorDetails?.[activeProject.mentorId]?.phone || "Not available"}
            onClose={() => {
              setActiveProjectTasks([]);
              setActiveTaskIndex(0);
              setActiveProject(null); // Clear active project
            }}
            onNext={() => setActiveTaskIndex((prev) => (prev + 1) % activeProjectTasks.length)}
            onPrev={() => setActiveTaskIndex((prev) => (prev - 1 + activeProjectTasks.length) % activeProjectTasks.length)}
            showArrows={activeProjectTasks.length > 1}
            taskId={activeProjectTasks[activeTaskIndex].id}
          />
        )}


        {renderView()}
      </div>

    </DashboardLayout>
  );
};

export default StudentDashboard;