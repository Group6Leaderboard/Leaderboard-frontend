import React, { useEffect, useState } from "react";
import styles from "./list.module.css";
import { FaEdit, FaTrash, FaEllipsisH } from "react-icons/fa";
import { getCollegeById, deleteCollege } from "../../services/collegeService";
import { deleteUser } from "../../services/userService";


const List = ({ type = "student", data = [], onDeleteSuccess }) => {
  const [collegeNames, setCollegeNames] = useState({});

  useEffect(() => {
    if (type === "student") {
      const fetchCollegeNames = async () => {
        const newCollegeNames = {};
        for (const student of data) {
          if (student.collegeId && !collegeNames[student.collegeId]) {
            try {
              const response = await getCollegeById(student.collegeId);
              newCollegeNames[student.collegeId] = response.name || "Unknown College";
            } catch (error) {
              newCollegeNames[student.collegeId] = "Error Fetching College";
            }
          }
        }
        setCollegeNames((prev) => ({ ...prev, ...newCollegeNames }));
      };
      fetchCollegeNames();
    }
  }, [data, type]);

  const handleDelete = async (type, userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      if (type === "college") {
        await deleteCollege(userId); 
        alert("User deleted successfully!");

      } else {
        await deleteUser(userId); 
        alert("User deleted successfully!");

      }
    } catch (error) {
      alert("Failed to delete user. Please try again.");
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className={styles.listContainer}>
      {data.length === 0 ? (
        <p className={styles.noData}>No data available</p>
      ) : (
        data.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.profileContainer}>
              <img
                src={item.image || "https://via.placeholder.com/70"}
                alt={item.name}
                className={styles.profilePic}
              />
            </div>

            <div className={styles.detailsContainer}>
              <div className={styles.details}>
                <h3 className={styles.name}>{item.name}</h3>
                <p className={styles.info}>
                  {type === "student" && (item.collegeName || "No info")}
                  {type === "college" && (item.location || "No Location Info")}
                  {type === "mentor" && (item.email || "No Email Info")}
                </p>
              </div>

              <div className={styles.icons}>
                <FaEdit className={styles.icon} title="Edit" />
                <FaTrash className={styles.icon} title="Delete" onClick={() => handleDelete(type, item.id)} />
                <FaEllipsisH className={styles.icon} title="View More" />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default List;
