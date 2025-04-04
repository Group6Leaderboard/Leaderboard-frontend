import React, { useState } from "react";
import { Eye, EyeOff, Camera } from "lucide-react";
import styles from "./profileEdit.module.css";

const ProfileEdit = ({ userType, userData }) => {
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    phone: userData?.phone || "",
    about: userData?.about || "",
    location: userData?.location || "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [image, setImage] = useState(userData?.profileImage || "/api/placeholder/150/150");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the API call to update the profile
    console.log("Form submitted:", formData);
    console.log("Image:", image);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Edit Profile</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Profile Image Section */}
        <div className={styles.imageSection}>
          <div className={styles.profileImage}>
            <img src={image} alt="Profile" />
          </div>
          <div className={styles.imageUpload}>
            <label htmlFor="profileImage" className={styles.uploadButton}>
              <Camera size={20} />
              <span>Edit Image</span>
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageUpload}
              className={styles.fileInput}
            />
          </div>
        </div>

        {/* Form Fields based on User Type */}
        <div className={styles.formFields}>
          {/* Name Field - Common for all user types */}
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={styles.inputField}
            />
          </div>

          {/* Fields specific to Student and Mentor */}
          {(userType === "student" || userType === "mentor") && (
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={styles.inputField}
              />
            </div>
          )}

          {/* Fields specific to College */}
          {userType === "college" && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="about">About</label>
                <textarea
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  className={styles.textareaField}
                  rows={4}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={styles.inputField}
                />
              </div>
            </>
          )}

          {/* Password Section - Common for all but expands when clicked */}
          {!showPasswordFields ? (
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <button
                type="button"
                className={styles.passwordButton}
                onClick={() => setShowPasswordFields(true)}
              >
                Change Password
              </button>
            </div>
          ) : (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="oldPassword">Current Password</label>
                <div className={styles.passwordInput}>
                  <input
                    type={passwordVisibility.oldPassword ? "text" : "password"}
                    id="oldPassword"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleInputChange}
                    className={styles.inputField}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("oldPassword")}
                    className={styles.eyeButton}
                  >
                    {passwordVisibility.oldPassword ? (
                      <Eye size={20} />
                    ) : (
                      <EyeOff size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="newPassword">New Password</label>
                <div className={styles.passwordInput}>
                  <input
                    type={passwordVisibility.newPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className={styles.inputField}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("newPassword")}
                    className={styles.eyeButton}
                  >
                    {passwordVisibility.newPassword ? (
                      <Eye size={20} />
                    ) : (
                      <EyeOff size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className={styles.passwordInput}>
                  <input
                    type={passwordVisibility.confirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={styles.inputField}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    className={styles.eyeButton}
                  >
                    {passwordVisibility.confirmPassword ? (
                      <Eye size={20} />
                    ) : (
                      <EyeOff size={20} />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className={styles.formActions}>
            <button type="submit" className={styles.saveButton}>
              Save Changes
            </button>
            {showPasswordFields && (
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => setShowPasswordFields(false)}
              >
                Cancel Password Change
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;