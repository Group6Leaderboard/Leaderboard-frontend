import React, { useState } from "react";
import { Eye, EyeOff, Camera } from "lucide-react";
import styles from "./profileEdit.module.css";
import { toast } from "react-toastify";
import { updateUser } from "../../services/userService";
const ProfileEdit = (props) => {
 
  const { userType, userData, refreshUserData,onUpdate,onClose } = props;
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
  const [uploadedImageFile, setUploadedImageFile] = useState(null);
  const [image, setImage] = useState(
    userData?.image ? `data:image/jpeg;base64,${userData.image}` : "/api/placeholder/150/150"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    
    // Clear any status messages when editing
    if (statusMessage.text) {
      setStatusMessage({ text: "", type: "" });
    }
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
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setStatusMessage({
          text: "Image size should be less than 5MB",
          type: "error"
        });
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      setUploadedImageFile(file); // for backend API
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result); // for preview
      };
      reader.readAsDataURL(file);
    }
  };
 
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Basic validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    // if (userType !== "college" && formData.phone) {
    //   // Simple phone validation (adjust based on your requirements)
    //   if (!/^\d{10}$/.test(formData.phone)) {  
    //     newErrors.phone = "Enter a valid 10-digit phone number";
    //   }
    // }
    
    
    // Password validation
    if (showPasswordFields) {
      if (!formData.oldPassword) {
        newErrors.oldPassword = "Current password is required";
      }
      
      if (!formData.newPassword) {
        newErrors.newPassword = "New password is required";
      } else if (formData.newPassword.length < 8) {
        newErrors.newPassword = "Password must be at least 8 characters";
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  console.log("userData:", userData);

 
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setStatusMessage({ text: "", type: "" });
  
    if (!validateForm()) {
      console.log(errors);
      setStatusMessage({
        text: "Please fix the errors before submitting",
        type: "error"
      });
      toast.error("Please fix the errors before submitting");
      return;
    }
  
    setIsLoading(true);
  

  
    // const userDto = {
    //   id: userData.id,
    //   name: formData.name,
    //   phone: userType !== "college" ? formData.phone : undefined,
    //   about: userType === "college" ? formData.about : undefined,
    //   location: userType === "college" ? formData.location : undefined,
    // };
    const userDto = {
      id: userData.id,
      name: formData.name,
      phone: (userType === "student" || userType === "mentor" ||userType === "admin") ? formData.phone : undefined,
      about: userType === "college" ? formData.about : undefined,
      location: userType === "college" ? formData.location : undefined,
    };
  
    if (showPasswordFields) {
      userDto.oldPassword = formData.oldPassword;
      userDto.newPassword = formData.newPassword;
      userDto.confirmPassword = formData.confirmPassword;
    }
  
    try {
      const response = await updateUser(userDto, uploadedImageFile);
      console.log("Update success:", response);
  
      setStatusMessage({
        text: "Profile updated successfully",
        type: "success"
      });
      toast.success("Profile updated successfully");
  
      if (showPasswordFields) {
        setFormData(prev => ({
          ...prev,
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        }));
        setShowPasswordFields(false);
      }
  
      if (typeof onUpdate === 'function') {
        onUpdate();
      } else if (typeof refreshUserData === 'function') {
        refreshUserData();
      } else if (typeof userData.updateUserData === 'function') {
        userData.updateUserData();
      }
  
      if (typeof onClose === 'function') {
        setTimeout(() => {
          onClose();
        }, 1500);
      }
  
    } catch (err) {
      console.log("Update failed:", err);
      
      if (err.errors && typeof err.errors === 'object') {
        const backendErrors = {};
        Object.entries(err.errors).forEach(([key, value]) => {
          backendErrors[key] = value;
        });
        setErrors(backendErrors);
        setStatusMessage({
          text: "Please fix the highlighted errors",
          type: "error"
        });
        toast.error("Please fix the highlighted errors");
      } else if (err.message) {
        if (err.message.includes("Current password is incorrect")) {
          setErrors(prev => ({ ...prev, oldPassword: "Current password is incorrect" }));
        } else if (err.message.includes("Password must be at least 8 characters")) {
          setErrors(prev => ({ ...prev, newPassword: "Password must be at least 8 characters" }));
        } else if (err.message.includes("do not match")) {
          setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
        } else {
          setStatusMessage({
            text: err.message,
            type: "error"
          });
          toast.error(err.message);
        }
      } else {
        setStatusMessage({
          text: "Failed to update profile",
          type: "error"
        });
        toast.error("Failed to update profile");
      }
    } finally {
      setIsLoading(false);
    }
  };
  ;
 
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Edit Profile</h2>
      
      {/* Status Message */}
      {statusMessage.text && (
        <div className={`${styles.statusMessage} ${styles[statusMessage.type]}`}>
          {statusMessage.text}
        </div>
      )}
      
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
              className={`${styles.inputField} ${errors.name ? styles.inputError : ""}`}
            />
            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
          </div>
 
          {/* Fields specific to Student and Mentor */}
          {(userType === "student" || userType === "mentor"|| userType === "admin") && (
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`${styles.inputField} ${errors.phone ? styles.inputError : ""}`}
                placeholder="10-digit phone number"
              />
              {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
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
                  className={`${styles.textareaField} ${errors.about ? styles.inputError : ""}`}
                  rows={4}
                />
                {errors.about && <span className={styles.errorText}>{errors.about}</span>}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`${styles.inputField} ${errors.location ? styles.inputError : ""}`}
                />
                {errors.location && <span className={styles.errorText}>{errors.location}</span>}
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
                    className={`${styles.inputField} ${errors.oldPassword ? styles.inputError : ""}`}
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
                {errors.oldPassword && <span className={styles.errorText}>{errors.oldPassword}</span>}
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
                    className={`${styles.inputField} ${errors.newPassword ? styles.inputError : ""}`}
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
                {errors.newPassword && <span className={styles.errorText}>{errors.newPassword}</span>}
                <small className={styles.passwordHint}>
                  Password must be at least 8 characters
                </small>
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
                    className={`${styles.inputField} ${errors.confirmPassword ? styles.inputError : ""}`}
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
                {errors.confirmPassword && (
                  <span className={styles.errorText}>{errors.confirmPassword}</span>
                )}
              </div>
            </>
          )}
 
          {/* Submit Button */}
          <div className={styles.formActions}>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
            {showPasswordFields && (
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => {
                  setShowPasswordFields(false);
                  setFormData(prev => ({
                    ...prev,
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                  }));
                  setErrors(prev => ({
                    ...prev,
                    oldPassword: null,
                    newPassword: null,
                    confirmPassword: null
                  }));
                }}
                disabled={isLoading}
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
 