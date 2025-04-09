import React, { useState, useEffect } from "react";
import { signup } from "../../services/authService";
import { getAllColleges } from "../../services/collegeService";
import styles from "./addUser.module.css";
import AlertModal from "../AlertModal/AlertModal";
import Select from "react-select";

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    padding: "6px 10px",
    marginBottom: "15px",
    border: "1px solid",
    borderColor: state.isFocused ? "#000" : "#ddd",
    borderRadius: "5px",
    fontSize: "14px",
    width: "95%", 
    backgroundColor: "#fff",
    boxShadow: "none",
    cursor: "pointer",
    minHeight: "38px",
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#5eb5ae"
      : state.isFocused
      ? "#e6f5f4"
      : "#fff",
    color: state.isSelected || state.isFocused ? "#000" : "#333",
    fontSize: "14px",
    padding: "10px 15px",
    cursor: "pointer",
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "#888",
    fontSize: "14px",
  }),

  singleValue: (provided) => ({
    ...provided,
    color: "#333",
    fontSize: "14px",
  }),

  menu: (provided) => ({
    ...provided,
    borderRadius: "5px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    zIndex: 20,
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#5eb5ae",
    padding: "0 8px",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),
};


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
    if(type === "studnet") {
      if (!formData.collegeId) {
        AlertModal.error("College required...Failed to add user");
        return;
      }
    }
    setLoading(true);
    setError("");

    try {
      let finalData = { ...formData, role: type.toUpperCase() };
      await signup(finalData);

  
      AlertModal.success(
        `${type.charAt(0).toUpperCase() + type.slice(1)} Added`,
        `${type.charAt(0).toUpperCase() + type.slice(1)} has been added successfully!`
      );

      onClose(); 
    } catch (err) {
      setError(err.message || "Failed to add user.");

   
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
              <Select
                name="collegeId"
                options={colleges.map((college) => ({
                  value: college.id,
                  label: college.name,
                }))}
                value={colleges
                  .map((college) => ({
                    value: college.id,
                    label: college.name,
                  }))
                  .find((option) => option.value === formData.collegeId)}
                onChange={(selectedOption) =>
                  handleChange({
                    target: {
                      name: "collegeId",
                      value: selectedOption ? selectedOption.value : "",
                    },
                  })
                }
                styles={customSelectStyles}
                placeholder="Select a college"
              />
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
