import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaUserCircle, FaCaretDown, FaSignOutAlt, FaUser, FaBars } from "react-icons/fa";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import styles from "./navbar.module.css";
import { getUsers } from "../../services/userService";
import { logout } from "../../services/authService";

const Navbar = ({ userType, userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userD, setUserD] = useState(null);

  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const modalRef = useRef(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUsers();
        if (res?.status === 200 && res?.response) {
          setUserD(res.response);
          console.log(userD);
        } else {
          console.error("Invalid user data", res);
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsProfileModalOpen(false);
      }
    };

    if (isOpen || isProfileModalOpen || isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isMobileMenuOpen, isProfileModalOpen]);

  const handleLogout = async () => {
    try {
      const response = await logout(); 

      localStorage.removeItem("token");
      localStorage.removeItem("role");

      navigate("/leaderboard/colleges", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      localStorage.clear();
      navigate("/leaderboard/colleges", { replace: true });
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}></div>

        <div className={styles.desktopRightSection}>

          <div className={styles.userSection}>
            {userD?.image ? (
              <img src={`data:image/jpeg;base64,${userD.image}`} alt="Profile" className={styles.profileImage} />
            ) : (
              <FaUserCircle className={styles.profileIcon} />
            )}
            <span className={styles.username}>{userD?.name || "Loading..."}</span>
            <div
              className={styles.dropdown}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              ref={dropdownRef}
            >
              <FaCaretDown className={styles.dropdownIcon} />
              {isOpen && (
                <ul className={styles.dropdownMenu}>
                  <li onClick={() => setIsProfileModalOpen(true)}>
                    <FaUser className={styles.menuIcon} /> Profile
                  </li>
                  <li onClick={handleLogout}>
                    <FaSignOutAlt className={styles.menuIcon} />
                    Logout
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className={styles.mobileTopBar}>
          <div className={styles.mobileUserInfo} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {userD?.image ? (
              <img src={`data:image/jpeg;base64,${userD.image}`} alt="Profile" className={styles.profileImage} />
            ) : (
              <FaUserCircle className={styles.mobileProfileIcon} />
            )}
            <span className={styles.mobileUsername}>{userD?.name || "Loading..."}</span>
            <FaCaretDown className={styles.dropdownIcon} />
          </div>

          {isOpen && (
            <ul className={styles.mobileDropdownMenu} ref={dropdownRef}>
              <li onClick={() => setIsProfileModalOpen(true)}>
                <FaUser className={styles.menuIcon} /> Profile
              </li>
              <li onClick={handleLogout}>
                <FaSignOutAlt className={styles.menuIcon} /> Logout
              </li>
            </ul>
          )}
        </div>


        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <ul className={styles.mobileDropdownMenu} ref={mobileMenuRef}>
            <li onClick={() => setIsProfileModalOpen(true)}>
              <FaUser className={styles.menuIcon} /> Profile
            </li>
            <li onClick={handleLogout}>
              <FaSignOutAlt className={styles.menuIcon} /> Logout
            </li>
          </ul>
        )}
      </nav>

      {isProfileModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} ref={modalRef}>
            <button className={styles.closeButton} onClick={() => setIsProfileModalOpen(false)}>
              ✖
            </button>
            <ProfileEdit userType={userType} userData={userData} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
