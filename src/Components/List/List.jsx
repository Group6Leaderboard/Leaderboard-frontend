import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaEllipsisH, FaSearch, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { getCollegeById, deleteCollege } from "../../services/collegeService";
import { deleteUser } from "../../services/userService";
import fallbackImage from "../../assets/fallback.jpg";
import AlertModal from "../AlertModal/AlertModal";


// CSS styles
const styles = {
  container: {
    backgroundColor: "#f8f8f8",
    padding: "20px",
  },
  content: {
    width: "100%",
    position: "relative",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "25px",
    padding: "10px 20px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
    width: "300px",
  },
  searchInput: {
    border: "none",
    outline: "none",
    marginLeft: "10px",
    width: "100%",
  },
  userGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    margin: "20px 0",
  },
  userCard: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "25px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    position: "relative",
    height: "350px",
  },
  cardContent: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  profileImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "15px",
    border: "2px solid #f0f0f0",
  },
  userName: {
    margin: "5px 0",
    fontWeight: "500",
    fontSize: "25px",
    color: "#5EB5AE",
    textTransform: "uppercase",
  },
  userRole: {
    color: "#000",
    margin: "0 0 15px 0",
    fontSize: "16px",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "10px",
    margin: "0",
    alignItems: "center",
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  infoText: {
    color: "#000",
    fontSize: "14px",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "auto",
    width: "100%",
  },
  viewMoreButton: {
    backgroundColor: "#5EB5AE",
    color: "white",
    border: "none",
    borderRadius: "20px",
    padding: "8px 20px",
    cursor: "pointer",
    flex: 1,
    fontSize: "14px",
  },
  deleteButton: {
    backgroundColor: "#fff",
    color: "#000",
    border: "1px solid #ddd",
    borderRadius: "20px",
    padding: "8px 20px",
    cursor: "pointer",
    flex: 1,
    fontSize: "14px",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  pageButton: {
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 5px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    cursor: "pointer",
  },
  activePage: {
    backgroundColor: "#5EB5AE",
    color: "white",
    border: "none",
  },
  appTitle: {
    Color: "#5EB5AE",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "0",
  },
  appSubtitle: {
    fontSize: "14px",
    color: "#000",
    marginTop: "5px",
  },

  // Modal styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "600px",
    maxHeight: "90vh",
    overflow: "auto",
    position: "relative",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
  },
  modalHeader: {
    padding: "20px",
    backgroundColor: "#f8f8f8",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    position: "relative",
  },
  modalClose: {
    position: "absolute",
    top: "15px",
    right: "15px",
    background: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#666",
  },
  modalProfile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },
  modalProfileImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #fff",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "15px",
  },
  modalName: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    margin: "0",
  },
  modalLocation: {
    fontSize: "14px",
    color: "#666",
    margin: "5px 0 0 0",
  },
  modalContent: {
    padding: "0 20px 20px 20px",
  },
  modalProgressBar: {
    height: "8px",
    backgroundColor: "#eee",
    borderRadius: "4px",
    margin: "20px 0",
    position: "relative",
  },
  modalProgress: {
    position: "absolute",
    height: "100%",
    backgroundColor: "#6bdc9f",
    borderRadius: "4px",
    left: 0,
    top: 0,
  },
  modalInfoSection: {
    marginTop: "20px",
  },
  modalInfoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: "15px",
    margin: "15px 0",
  },
  modalInfoItem: {
    display: "flex",
    alignItems: "center",
  },
  modalInfoIcon: {
    minWidth: "40px",
    height: "40px",
    backgroundColor: "#f0f7ff",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "15px",
    color: "#5EB5AE",
  },
  modalInfoContent: {
    display: "flex",
    flexDirection: "column",
  },
  modalInfoLabel: {
    fontSize: "13px",
    color: "#999",
    marginBottom: "3px",
  },
  modalInfoValue: {
    fontSize: "16px",
    color: "#333",
    fontWeight: "500",
  },
  modalButtons: {
    display: "flex",
    padding: "0 20px 20px 20px",
  },
  modalButton: {
    padding: "10px 15px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "500",
    flex: 1,
    margin: "0 5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  visitButton: {
    backgroundColor: "#5EB5AE",
    color: "#fff",
  },
  scoreDisplay: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    padding: "15px 0",
    borderTop: "1px solid #eee",
    borderBottom: "1px solid #eee",
    margin: "15px 0",
  },
  scoreItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  scoreValue: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#5EB5AE",
  },
  scoreLabel: {
    fontSize: "12px",
    color: "#999",
    marginTop: "5px",
  },
};

// Responsive styles for different screen sizes
const responsiveStyles = {
  userGridTablet: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  userGridMobile: {
    gridTemplateColumns: "repeat(1, 1fr)",
  }
};

const List = ({ type = "student", data = [], onDeleteSuccess, onViewMore }) => {
  const [collegeNames, setCollegeNames] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedItem, setSelectedItem] = useState(null);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);
  

  // Add responsive behavior
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get grid style based on window width
  const getGridStyle = () => {
    if (windowWidth < 768) {
      return { ...styles.userGrid, ...responsiveStyles.userGridMobile };
    } else if (windowWidth < 1200) {
      return { ...styles.userGrid, ...responsiveStyles.userGridTablet };
    }
    return styles.userGrid;
  };

  useEffect(() => {
    if (type === "student") {
      const fetchCollegeNames = async () => {
        const newCollegeNames = {};
        for (const student of data) {
          if (student.collegeName && !collegeNames[student.collegeName]) {
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

  useEffect(() => {
    if (searchTerm.trim() === '') {
      
      setFilteredData(data);
    } else {
      
      setFilteredData(
        data.filter(item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.phone && item.phone.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      );
    }
  }, [data, searchTerm]);

  const handleDelete = (type, id, event) => {
    event.stopPropagation(); 

    AlertModal.confirmDelete(() => {
      deleteItem(type, id).then(() => {
        setSelectedItem(null); 
      });
    });
  };

  const deleteItem = async (type, id) => {
    try {
      if (type === "student" || type === "mentor") {
        await deleteUser(id);
      }
      else if (type === "college") {
        await deleteCollege(id);
      }
      setFilteredData((prevData) => prevData.filter((item) => item.id !== id));
  
      if (onDeleteSuccess) onDeleteSuccess();
  
      AlertModal.success("Deleted!", "The item has been successfully deleted.");
    } catch (error) {
      console.error("Delete failed:", error);
      AlertModal.error("Deletion Failed", "Something went wrong while deleting the item.");
    }
  };


  const getJobTitle = (item) => {
    if (type === "student") return "Student";
    if (type === "college") return "Institution";
    if (type === "mentor") return "Mentor";
    return "User"; // Default
  };

  const handleViewMore = (item, event) => {
    if (event) {
      event.stopPropagation();
    }

    setSelectedItem(item);
    if (onViewMore) {
      onViewMore(item);
    }
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const getTypeTitle = () => {
    switch (type) {
      case "student":
        return "My Students";
      case "mentor":
        return "My Mentors";
      case "college":
        return "My Colleges";
      default:
        return "My Users";
    }
  };

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedItem]);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.appTitle}>{getTypeTitle()}</h1>
            {/* <p style={styles.appSubtitle}>Showing {filteredData.length} of {data.length} profiles</p> */}
            <p style={styles.appSubtitle}>
              Showing {Math.min(currentItems.length, data.length - (currentPage - 1) * itemsPerPage)} of {data.length} contacts
            </p>

          </div>
          <div style={styles.searchBar}>
            <FaSearch color="#aaa" />
            <input
              type="text"
              placeholder="Search here "
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* User Grid */}
        <div style={getGridStyle()}>
          {currentItems.length === 0 ? (
            <p>No contacts found</p>
          ) : (
            currentItems.map((item) => (
              <div key={item.id} style={styles.userCard}>
                <div style={styles.cardContent}>
                  <img
                    src={item.image ? `data:image/jpeg;base64,${item.image}` : fallbackImage}
                    onError={(e) => { e.target.onerror = null; e.target.src = fallbackImage; }}
                    alt={item.name}
                    style={styles.profileImage}
                  />
                  <h3 style={styles.userName}>{item.name}</h3>
                  <p style={styles.userRole}>
                    {type === "student" ? (item.collegeName || "Loading...") : getJobTitle(item)}

                  </p>

                  <div style={styles.infoContainer}>
                    <div style={styles.infoItem}>
                      <FaEnvelope color="#000" />
                      <span style={styles.infoText}>{item.email || "No email available"}</span>
                    </div>

                    {type === "college" ? (
                      <div style={styles.infoItem}>
                        <FaMapMarkerAlt color="#000" />
                        <span style={styles.infoText}>{item.location || "No location available"}</span>
                      </div>
                    ) : (
                      <div style={styles.infoItem}>
                        <FaPhone color="#000" />
                        <span style={styles.infoText}>{item.phone || "No phone available"}</span>
                      </div>
                    )}
                  </div>

                  <div style={styles.buttonContainer}>
                    <button
                      style={styles.viewMoreButton}
                      onClick={(e) => handleViewMore(item, e)}
                    >
                      View More
                    </button>
                    <button
                      style={styles.deleteButton}
                      onClick={(e) => handleDelete(type, item.id, e)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div style={styles.pagination}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <div
                key={page}
                style={{
                  ...styles.pageButton,
                  ...(page === currentPage ? styles.activePage : {})
                }}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </div>
            ))}
          </div>
        )}


        {selectedItem && (
          <div style={styles.modalOverlay} onClick={handleCloseModal}>
            <div style={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <button style={styles.modalClose} onClick={handleCloseModal}>
                  <FaTimes />
                </button>
                <div style={styles.modalProfile}>
                  <img
                    src={selectedItem.image || fallbackImage}
                    onError={(e) => { e.target.onerror = null; e.target.src = fallbackImage; }}
                    alt={selectedItem.name}
                    style={styles.modalProfileImage}
                  />
                  <h2 style={styles.modalName}>{selectedItem.name}</h2>
                  <p style={styles.modalLocation}>
                    {type === "student"
                      ? selectedItem.collegeName || "Unknown College"
                      : (type === "college" ? selectedItem.location : getJobTitle(selectedItem))}
                  </p>
                </div>

                {(type === "student" || type === "college") && (
                  <div style={styles.scoreDisplay}>
                    <div style={styles.scoreItem}>
                      <div style={styles.scoreValue}>{selectedItem.score || "N/A"}</div>
                      <div style={styles.scoreLabel}>Score</div>
                    </div>
                  </div>
                )}
              </div>

              <div style={styles.modalContent}>
                <div style={styles.modalInfoSection}>
                  <div style={styles.modalInfoGrid}>
                    {/* Common: Email */}
                    <div style={styles.modalInfoItem}>
                      <div style={styles.modalInfoIcon}>
                        <FaEnvelope />
                      </div>
                      <div style={styles.modalInfoContent}>
                        <span style={styles.modalInfoLabel}>Email</span>
                        <span style={styles.modalInfoValue}>{selectedItem.email || "No email available"}</span>
                      </div>
                    </div>

                    {/* Student and Mentor: Phone */}
                    {(type === "student" || type === "mentor") && (
                      <div style={styles.modalInfoItem}>
                        <div style={styles.modalInfoIcon}>
                          <FaPhone />
                        </div>
                        <div style={styles.modalInfoContent}>
                          <span style={styles.modalInfoLabel}>Phone</span>
                          <span style={styles.modalInfoValue}>{selectedItem.phone || "No phone available"}</span>
                        </div>
                      </div>
                    )}

                    {/* Student: College */}
                    {type === "student" && (
                      <div style={styles.modalInfoItem}>
                        <div style={styles.modalInfoIcon}>
                          <FaEdit />
                        </div>
                        <div style={styles.modalInfoContent}>
                          <span style={styles.modalInfoLabel}>College</span>
                          <span style={styles.modalInfoValue}>{selectedItem.collegeName || "Unknown College"}</span>
                        </div>
                      </div>
                    )}

                    {/* College: Location */}
                    {type === "college" && (
                      <div style={styles.modalInfoItem}>
                        <div style={styles.modalInfoIcon}>
                          <FaMapMarkerAlt />
                        </div>
                        <div style={styles.modalInfoContent}>
                          <span style={styles.modalInfoLabel}>Location</span>
                          <span style={styles.modalInfoValue}>{selectedItem.location || "No location available"}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div style={styles.modalButtons}>
                <button
                  style={{ ...styles.modalButton, ...styles.visitButton }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent modal from closing immediately
                    AlertModal.confirmDelete(() => {
                      deleteItem(type, selectedItem.id);
                    });
                  }}
                >
                  <FaTrash style={{ marginRight: "8px" }} /> Delete
                </button>


              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    
  );
};

export default List;