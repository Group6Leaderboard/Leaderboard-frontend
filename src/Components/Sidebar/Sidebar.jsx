import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUsers,
  FaProjectDiagram,
  FaTasks,
  FaChevronRight,
  FaBars,
  FaTimes
} from "react-icons/fa";
import {
  MdDashboard,
  MdAssignmentAdd,
  MdLeaderboard
} from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { GoProjectRoadmap } from "react-icons/go";
import { IoSchool } from "react-icons/io5";
import styles from "../Sidebar/sidebar.module.css";
import logo from "../../assets/inspiro-logo.png"; // Ensure this file exists

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarItems = [
    {
      role: "/admin",
      items: [
        { name: "Dashboard", path: "/admin", icon: <MdDashboard /> },
        { name: "Students", path: "/admin/students", icon: <PiStudentFill /> },
        { name: "Mentors", path: "/admin/mentors", icon: <FaUsers /> },
        { name: "Colleges", path: "/admin/colleges", icon: <IoSchool /> },
        { name: "Assign Projects", path: "/admin/assign-project", icon: <FaProjectDiagram /> }
      ]
    },
    {
      role: "/mentor",
      items: [
        { name: "Dashboard", path: "/mentor", icon: <MdDashboard /> },
        { name: "Projects", path: "/mentor/projects", icon: <GoProjectRoadmap /> },
        { name: "Assign Task", path: "/mentor/assign-task", icon: <MdAssignmentAdd /> },
        { name: "Tasks", path: "/mentor/task", icon: <FaTasks /> }
      ]
    },
    {
      role: "/student",
      items: [
        { name: "Dashboard", path: "/student", icon: <MdDashboard /> },
        { name: "Projects", path: "/student/projects", icon: <GoProjectRoadmap /> },
        { name: "Tasks", path: "/student/tasks", icon: <FaTasks /> }
      ]
    },
    {
      role: "/college",
      items: [
        { name: "Dashboard", path: "/college", icon: <MdDashboard /> },
        { name: "Projects", path: "/college/projects", icon: <GoProjectRoadmap /> },
        { name: "Students", path: "/college/students", icon: <PiStudentFill /> },
        { name: "Leaderboard", path: "/college/leaderboard", icon: <MdLeaderboard /> }
      ]
    }
  ];

  const currentRole = sidebarItems.find((role) =>
    location.pathname.startsWith(role.role)
  );

  return (
    <>
      <button className={styles.hamburger} onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

    
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.logoContainer}>
          {logo ? <img src={logo} alt="Logo" className={styles.logo} /> : <h3>Inspiro</h3>}
        </div>

        <ul className="nav flex-column">
          {currentRole?.items.map((item, index) => (
            <li key={index} className="navItem">
              <Link
                to={item.path}
                className={`nav-link d-flex align-items-center justify-content-between ${styles.navLink} ${
                  location.pathname === item.path ? styles.active : ""
                }`}
                onClick={() => setIsOpen(false)} 
              >
                <div className="d-flex align-items-center">
                  {item.icon} <span className="ms-2">{item.name}</span>
                </div>
                {location.pathname === item.path && <FaChevronRight className={styles.arrowIcon} />}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
