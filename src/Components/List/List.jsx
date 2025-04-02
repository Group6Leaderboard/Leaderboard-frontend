import React, { useEffect, useState } from "react";
import styles from "./list.module.css";
import { FaEdit, FaTrash, FaEllipsisH } from "react-icons/fa";
import { getCollegeById, deleteCollege } from "../../services/collegeService";
import { deleteUser } from "../../services/userService";

// Modal component
const AlertModal = ({ isOpen, title, message, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className={styles.modalActions}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

const List = ({ type = "student", data = [], onDeleteSuccess }) => {
  const [collegeNames, setCollegeNames] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null); // Track item to be deleted

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

  const handleDeleteConfirmation = (type, userId) => {
    setModalTitle("Delete Confirmation");
    setModalMessage("Are you sure you want to delete this item?");
    setPendingDelete({ type, userId });
    setShowModal(true); // Show confirmation modal
  };

  const handleDelete = async () => {
    if (!pendingDelete) return;

    const { type, userId } = pendingDelete;

    try {
      if (type === "college") {
        await deleteCollege(userId); // Make sure this is the correct function
        setModalTitle("Success");
        setModalMessage("College deleted successfully!");
      } else {
        await deleteUser(userId);
        setModalTitle("Success");
        setModalMessage("User deleted successfully!");
      }
      setShowModal(true); // Show modal on success
      onDeleteSuccess && onDeleteSuccess(); // Callback on delete success if any
    } catch (error) {
      setModalTitle("Error");
      setModalMessage("Failed to delete user. Please try again.");
      setShowModal(true); // Show modal on error
      console.error("Error deleting user:", error);
    } finally {
      setPendingDelete(null); // Reset pending delete
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
                  {type === "student" && (collegeNames[item.collegeId] || "Fetching...")}
                  {type === "college" && (item.location || "No Location Info")}
                  {type === "mentor" && (item.email || "No Email Info")}
                </p>
              </div>

              <div className={styles.icons}>
                <FaEdit className={styles.icon} title="Edit" />
                <FaTrash className={styles.icon} title="Delete" onClick={() => handleDeleteConfirmation(type, item.id)} />
                <FaEllipsisH className={styles.icon} title="View More" />
              </div>
            </div>
          </div>
        ))
      )}

      {/* Custom Alert Modal */}
      <AlertModal
        isOpen={showModal}
        title={modalTitle}
        message={modalMessage}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default List;
