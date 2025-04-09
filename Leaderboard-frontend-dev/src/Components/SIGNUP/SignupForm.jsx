import React, { useState } from "react";
import styles from "./signupForm.module.css";

const SignupForm = ({ role }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    about: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <div className={styles.formContainer}>
      {/* <h2>{`Create ${role.charAt(0).toUpperCase() + role.slice(1)}`}</h2> */}

      <form onSubmit={handleSubmit}>
        {/* Common Fields */}
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.inputBox}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={styles.inputBox}
          required
        />

        {/* Conditional Fields */}
        {(role === "student" || role === "mentor") && (
          <>
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.inputBox}
              required
            />
          </>
        )}

        {role === "student" && (
          <>
            <label>College</label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              className={styles.inputBox}
              required
            />
          </>
        )}

        {role === "college" && (
          <>
            <label>About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              className={styles.textArea}
              required
            />

            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={styles.inputBox}
              required
            />
          </>
        )}

        <button type="submit" className={styles.signupButton}>create
          {/* Create {role.charAt(0).toUpperCase() + role.slice(1)} */}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
