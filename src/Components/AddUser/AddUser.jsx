import React, { useState, useEffect } from "react";
import { signup } from "../../services/authService";
import { getAllColleges } from "../../services/collegeService"; 
import styles from "./addUser.module.css";
import AlertModal from "../AlertModal/AlertModal";


const AddUser = ({ type, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    collegeId: "", 
  });
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (type === "student") {
      const fetchColleges = async () => {
        try {
          const response = await getAllColleges();
          setColleges(response.response);
        } catch (err) {
          setError("Failed to fetch colleges");
        }
      };
      fetchColleges();
    }
  }, [type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      let finalData = { ...formData, role: type.toUpperCase() };
      await signup(finalData);
  
      // Show success alert
      AlertModal.success(
        `${type.charAt(0).toUpperCase() + type.slice(1)} Added`,
        `${type.charAt(0).toUpperCase() + type.slice(1)} has been added successfully!`
      );
  
      onClose(); // Close the AddUser card after success
    } catch (err) {
      setError(err.message || "Failed to add user.");
  
      // Show error alert
      AlertModal.error("Failed to Add User", err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className={styles.addUserContainer}>
      <div className={styles.card}>
        <button className={styles.closeButton} onClick={onClose}> ✕ </button>

        <h2 className={styles.title}>Add New {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
        {error && <p className={styles.error}>{error}</p>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className={styles.input} />

          <label className={styles.label}>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className={styles.input} />

          {type !== "college" && (
            <>
              <label className={styles.label}>Phone:</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} required className={styles.input} />
            </>
          )}

          {type === "student" && (
            <>
              <label className={styles.label}>College:</label>
              <select name="collegeId" value={formData.collegeId} onChange={handleChange} required className={styles.input}>
                <option value="">Select a college</option>
                {colleges.map((college) => (
                  <option key={college.id} value={college.id}>
                    {college.name}
                  </option>
                ))}
              </select>
            </>
          )}

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Adding..." : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
