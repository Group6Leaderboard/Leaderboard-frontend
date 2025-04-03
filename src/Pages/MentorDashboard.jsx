import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import styles from "./mentorDashboard.module.css";
import AssignForm from "../Components/AssignForm/AssignForm";
import MentorProjectCard from "../Components/MentorProjectCard/MentorProjectCard";
import MentorProjectDescriptionCard from "../Components/MentorprojectDescription/MentorProjectDescription";
import { getAllProjects } from "../services/projectService";
import SubmittedTask from "../Components/MentorProject/SubmittedTask";
import MentorDash from "../Components/MentorDash/MentorDash";

const MentorDashboard = () => {
  const location = useLocation();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllProjects();
        setProjects(response.response);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return ( 
    <div className={styles.dashboardContainer}>
      {location.pathname === "/mentor" ? ( <MentorDash /> ) 
      : location.pathname === "/mentor/assign-task" ? (
        <AssignForm role="mentor" />
      ) : location.pathname === "/mentor/task" ? (
        <SubmittedTask />
      ) : (

        <div className={styles.projectLayout}>
      
          <div className={styles.projectList}>
            {projects.map((project) => (
              <div className={styles.projectCardContainer} key={project.id} onClick={() => setSelectedProject(project)}>
                <MentorProjectCard project={project} />
              </div>
            ))}
          </div>
          
          <div className={styles.projectDetails}>
            <MentorProjectDescriptionCard project={selectedProject} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorDashboard;


          {/* <div className={styles.pieChartContainer}>
            <h3>Mentor Assignment Status</h3>
            <PieChart width={300} height={300}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#02414B"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div> */}
