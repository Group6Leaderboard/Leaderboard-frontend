import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./mentorDashboard.module.css";
import AssignForm from "../Components/AssignForm/AssignForm";
import MentorProjectView from "../Components/MentorProjectView/MentorProjectView";
import { getUsers } from "../services/userService";
import MentorDash from "../Components/MentorDash/MentorDash";
import { getAllProjects } from "../services/projectService";
import MentorTaskView from "../Components/MentorTaskView/MentorTaskView";
import { getAllColleges } from "../services/collegeService";

const MentorDashboard = () => {
  const location = useLocation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userD, setUserD] = useState(null);
  const [collegeMap, setCollegeMap] = useState(null);

  useEffect(() => {
    const fetchProjectsAndColleges = async () => {
      try {
        setLoading(true);

        const [projectRes, collegeRes] = await Promise.all([
          getAllProjects(),
          getAllColleges(),
        ]);

        if (projectRes?.response && collegeRes?.response) {
          const projects = projectRes.response;
          const colleges = collegeRes.response;

          // Save projects
          setProjects(projects);

          // Build college map
          const map = {};
          projects.forEach((project) => {
            const college = colleges.find((col) => col.id === project.collegeId);
            if (college && !map[college.id]) {
              map[college.id] = {
                name: college.name,
                score: college.score || 0,
                place: college.place || "",
              };
            }
          });

          setCollegeMap(map);
        } else {
          throw new Error("Invalid response from project or college API");
        }
      } catch (err) {
        console.error("Error fetching projects/colleges:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsAndColleges();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUsers();
        if (res?.status === 200 && res?.response) {
          setUserD(res.response);
        } else {
          console.error("Invalid user data response", res);
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUser();
  }, []);

  const renderContent = () => {
    if (location.pathname === "/mentor") {
      return (
        <MentorDash
          projects={projects}
          userData={userD}
          college={collegeMap}
          loading={loading}
          error={error}
        />
      );
    } else if (location.pathname === "/mentor/assign-task") {
      return <AssignForm role="mentor" />;
    } else if (location.pathname === "/mentor/task") {
      return <MentorTaskView />;
    } else if (location.pathname === "/mentor/projects") {
      if (loading) {
        return <div className={styles.loadingState}>Loading projects...</div>;
      }

      if (error) {
        return <div className={styles.errorState}>{error}</div>;
      }

      return <MentorProjectView projects={projects} />;
    }

    return <MentorDash />;
  };

  return (
    <div className={styles.dashboardContainer}>
      {renderContent()}
    </div>
  );
};

export default MentorDashboard;
