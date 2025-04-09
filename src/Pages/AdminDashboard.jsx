import React, { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import { FaPlus } from "react-icons/fa";
 
import styles from "./adminDashboard.module.css";
import List from "../Components/List/List";
import AddUser from "../Components/AddUser/AddUser";
import HeaderAdmin from "../Components/HeaderAdmin/HeaderAdmin";
import DashboardLayout from "../Layouts/Dashboard/DashboardLayout";
import AdminDash from "../Components/AdminDash/AdminDash";
 
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAddUser, setShowAddUser] = useState(false);
  const [userType, setUserType] = useState("");
  const [userD, setUserD] = useState(null);
 
  const path = window.location.pathname;
 
  // Determine user type based on the URL path
  const type = path.includes("students")
    ? "student"
    : path.includes("colleges")
    ? "college"
    : path.includes("mentors")
    ? "mentor"
    : "";
 
  const isMainAdminRoute = path === "/admin" || type === "";
 
  const fetchUsers = async () => {
    if (!type) return;
    setLoading(true);
    setError("");
    try {
      const roleMap = { student: "STUDENT", college: "COLLEGE", mentor: "MENTOR" };
      const data = await getUsers(roleMap[type]);
      setUsers(data.response);
    } catch (err) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    if (!type) return;
    fetchUsers();
  }, [type]);
 
  const handleToggleAddUser = () => {
    if (showAddUser) {
      fetchUsers();
    }
    setShowAddUser(!showAddUser);
    setUserType(type);
  };
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
  
 
  return (
    <DashboardLayout>
      <div className={styles.dashboardContainer}>
        {isMainAdminRoute ? (
          <AdminDash userD = {userD} />
        ) : (
          <>
            {type && (
              <HeaderAdmin
                type={type}
                totalCount={users.length}
                onAddClick={handleToggleAddUser}
              />
            )}
 
            {showAddUser && (
              <div className={styles.overlay}>
                <div className={styles.addUserCard}>
                  <AddUser type={userType} onClose={handleToggleAddUser} />
                </div>
              </div>
            )}
 
            <div className={styles.contentWrapper}>
              {loading ? (
                <p className={styles.loading}>Loading...</p>
              ) : error ? (
                <p className={styles.error}>{error}</p>
              ) : type ? (
                <div className={styles.listContainer}>
                  <List type={type} data={users} />
                </div>
              ) : (
                <p className={styles.info}>No data available</p>
              )}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};
 
export default AdminDashboard;
 