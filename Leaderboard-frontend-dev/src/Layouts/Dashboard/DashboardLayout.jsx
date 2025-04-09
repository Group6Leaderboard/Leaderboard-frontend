import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./dashboardLayout.module.css";
const DashboardLayout = ({ children, role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true); 

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar role={role} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className={`${styles.mainContent} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
        
        <Navbar role={role} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        
        <div className={styles.pageContent}>
          {children}
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;
