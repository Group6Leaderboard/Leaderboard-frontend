import React, { useState, useEffect } from "react";
import { FaSearch, FaFileAlt, FaClock, FaCheckCircle, FaExclamationCircle, FaEllipsisH, FaPlus, FaEdit } from "react-icons/fa";
import styles from "./mentorTaskView.module.css";
import { getAllTasks } from "../../services/taskService"; // Adjust the path as needed
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";

const MentorTaskView = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const tabs = ["All", "Not Submitted", "To be Reviewed", "Overdue", "Completed"];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await getAllTasks();
        
        if (response && response.response) {
          setTasks(response.response);
        } else {
          throw new Error("Invalid response format from API");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to load tasks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchTasks();
  }, []);

  const getFilteredTasks = () => {
    return tasks.filter(task => {
      const matchesSearch = 
        task.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignedTo?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (activeTab === "All") {
        return matchesSearch;
      } else {
        return matchesSearch && task.status === activeTab;
      }
    });
  };

  const calculateDaysLeft = (dueDate) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} days left` : `Overdue by ${Math.abs(diffDays)} days`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Not Submitted":
        return <FaClock className={styles.statusIcon} style={{ color: "#FFA500" }} />;
      case "To be Reviewed":
        return <FaFileAlt className={styles.statusIcon} style={{ color: "#3498db" }} />;
      case "Completed":
        return <FaCheckCircle className={styles.statusIcon} style={{ color: "#2ecc71" }} />;
      case "Overdue":
        return <FaExclamationCircle className={styles.statusIcon} style={{ color: "#e74c3c" }} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Submitted":
        return "#FFA500";
      case "To be Reviewed":
        return "#3498db";
      case "Completed":
        return "#2ecc71";
      case "Overdue":
        return "#e74c3c";
      default:
        return "#7f8c8d";
    }
  };

  const handleViewMore = (task) => {
    setSelectedTask(task);
  };

  const handleCloseDetails = () => {
    setSelectedTask(null);
  };

  if (loading) {
    return <div className={styles.loadingState}>Loading tasks...</div>;
  }

  if (error) {
    return <div className={styles.errorState}>{error}</div>;
  }

  const filteredTasks = getFilteredTasks();

  return (
    <DashboardLayout>
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <FaFileAlt className={styles.titleIcon} /> TASKS
        </h1>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.tabContainer}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.taskListContainer}>
        {filteredTasks.length > 0 ? (
          <div className={styles.taskList}>
            {filteredTasks.map((task) => (
           <div 
           key={task.id} 
           className={styles.taskCard}
         >
         
                <div className={styles.taskHeader}>
                  <h3 className={styles.taskName}>{task.name}</h3>
                  {getStatusIcon(task.status)}
                </div>
              
                
                {task.description && (
                  <div className={styles.taskDescription}>
                    {task.description.length > 60 
                      ? `${task.description.substring(0, 60)}...` 
                      : task.description}
                  </div>
                )}
                
                <div className={styles.taskMeta}>
                  <div className={styles.memberContainer}>
                    {task.assignedTo?.members?.map((member, index) => (
                      index < 3 && (
                        <div 
                          key={member.id} 
                          className={styles.memberAvatar}
                          style={{ 
                            zIndex: task.assignedTo.members.length - index,
                            left: `${index * 20}px`
                          }}
                        >
                          {member.name.charAt(0)}
                        </div>
                      )
                    ))}
                    {task.assignedTo?.members?.length > 3 && (
                      <div 
                        className={styles.memberAvatarMore}
                        style={{ 
                          zIndex: 1,
                          left: `${3 * 20}px`
                        }}
                      >
                        +{task.assignedTo.members.length - 3}
                      </div>
                    )}
                    <span className={styles.memberCount}>
                      {task.assignedTo?.members?.length || 0} members
                    </span>
                  </div>
                  
                  {task.dueDate && (
  <div className={styles.daysLeft}>
    {calculateDaysLeft(task.dueDate)}
  </div>
)}
 
                </div>
                
                <div className={styles.taskActions} ><FaEdit  className={`${styles.editIcon}`}/>
                  <button 
                    className={styles.viewMoreButton}
                    onClick={() => handleViewMore(task)}
                  >
                    <FaEllipsisH />
                  </button>
                  <div 
                    className={styles.statusIndicator} 
                    style={{ backgroundColor: getStatusColor(task.status) }}
                  ></div>
                </div>
              </div>
            ))}
            
         
          </div>
        ) : (
          <div className={styles.noTasks}>No tasks found in {activeTab}</div>
        )}
      </div>

      {selectedTask && (
        <div className={styles.taskDetailsModal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={handleCloseDetails}>
              &times;
            </button>
            
            <h2 className={styles.modalTitle}>{selectedTask.name}</h2>
            <p className={styles.modalDescription}>{selectedTask.description}</p>
            
            <div className={styles.detailSection}>
              <h3 className={styles.detailTitle}>Assigned To</h3>
              <ul className={styles.memberList}>
                {selectedTask.assignedTo?.members?.map(member => (
                  <li key={member.id} className={styles.memberItem}>
                    {member.name}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className={styles.detailSection}>
              <h3 className={styles.detailTitle}>Due Date</h3>
              <p>{selectedTask.dueDate ? new Date(selectedTask.dueDate).toLocaleDateString() : "Not set"}</p>
            </div>
            
            <div className={styles.detailSection}>
              <h3 className={styles.detailTitle}>Status</h3>
              <p className={styles[`status${selectedTask.status.replace(/\s+/g, '')}`]}>
                {selectedTask.status}
              </p>
            </div>
            
            {selectedTask.file && (
              <div className={styles.detailSection}>
                <h3 className={styles.detailTitle}>Submitted File</h3>
                <button className={styles.downloadButton}>
                  <FaFileAlt /> Download File
                </button>
              </div>
            )}
            
            {selectedTask.status === "To be Reviewed" && (
              <div className={styles.scoreSection}>
                <label className={styles.scoreLabel}>Score:</label>
                <input 
                  type="number" 
                  min="0" 
                  max="100" 
                  className={styles.scoreInput}
                  placeholder="Enter score"
                />
                <button className={styles.submitScoreButton}>Submit Score</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    </DashboardLayout>
  );
};

export default MentorTaskView;



// import React, { useState, useEffect } from "react";
// import { FaSearch, FaFileAlt, FaClock, FaCheckCircle, FaExclamationCircle, FaEllipsisH, FaPlus } from "react-icons/fa";
// import styles from "./mentorTaskView.module.css";
// import { getAllTasks } from "../../services/taskService"; // Adjust the path as needed

// const MentorTaskView = () => {
//   const [tasks, setTasks] = useState([]);
//   const [activeTab, setActiveTab] = useState("To Do");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedTask, setSelectedTask] = useState(null);

//   const tabs = ["To Do", "On Going", "Complete"];

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         setLoading(true);
//         const response = await getAllTasks();
        
//         if (response && response.response) {
//           setTasks(response.response);
//         } else {
//           throw new Error("Invalid response format from API");
//         }
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//         setError("Failed to load tasks. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchTasks();
//   }, []);

//   const getFilteredTasks = () => {
//     return tasks.filter(task => {
//       const matchesSearch = 
//         task.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         task.assignedTo?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      
//       if (activeTab === "All") {
//         return matchesSearch;
//       } else {
//         // Map our new tab names to the existing status values
//         const statusMap = {
//           "To Do": "Not Submitted",
//           "On Going": "To be Reviewed",
//           "Complete": "Completed"
//         };
//         return matchesSearch && task.status === statusMap[activeTab];
//       }
//     });
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Not Submitted":
//         return "#2ecc71"; // Green for To Do
//       case "To be Reviewed":
//         return "#3498db"; // Blue for On Going
//       case "Completed":
//         return "#e74c3c"; // Red for Complete
//       case "Overdue":
//         return "#e74c3c"; // Red
//       default:
//         return "#7f8c8d"; // Gray default
//     }
//   };

//   const handleViewMore = (task) => {
//     setSelectedTask(task);
//   };

//   const handleCloseDetails = () => {
//     setSelectedTask(null);
//   };

//   if (loading) {
//     return <div className={styles.loadingState}>Loading tasks...</div>;
//   }

//   if (error) {
//     return <div className={styles.errorState}>{error}</div>;
//   }

//   const filteredTasks = getFilteredTasks();

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1 className={styles.title}>Project</h1>
//         <div className={styles.searchBar}>
//           <FaSearch className={styles.searchIcon} />
//           <input
//             type="text"
//             placeholder="Search here"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className={styles.tabContainer}>
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ''}`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//         <button className={styles.addNewButton}>
//           <FaPlus /> Add New
//         </button>
//       </div>

//       <div className={styles.taskListContainer}>
//         {filteredTasks.length > 0 ? (
//           <div className={styles.taskGrid}>
//             {filteredTasks.map((task) => (
//               <div 
//                 key={task.id} 
//                 className={styles.taskCard}
//               >
//                 <div className={styles.taskHeader}>
//                   <h3 className={styles.taskName}>{task.name}</h3>
//                   <div className={styles.taskMenu}>
//                     <FaEllipsisH />
//                   </div>
//                 </div>
                
//                 <div className={styles.timeInfo}>
//                   <span>2 Weeks Left, 7pm</span>
//                 </div>
                
//                 <div className={styles.memberAvatarRow}>
//                   {task.assignedTo?.members?.map((member, index) => (
//                     index < 3 && (
//                       <div 
//                         key={member.id} 
//                         className={styles.memberAvatar}
//                       >
//                         {member.name.charAt(0)}
//                       </div>
//                     )
//                   ))}
//                   {task.assignedTo?.members?.length > 3 && (
//                     <div className={styles.memberAvatarMore}>
//                       +{task.assignedTo.members.length - 3}
//                     </div>
//                   )}
//                   <div className={styles.addMemberButton}>
//                     <FaPlus />
//                   </div>
//                 </div>
                
//                 <div className={styles.taskFooter}>
//                   <div 
//                     className={styles.statusIndicator} 
//                     style={{ backgroundColor: getStatusColor(task.status) }}
//                   ></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className={styles.noTasks}>No tasks found in {activeTab}</div>
//         )}
//       </div>

//       {selectedTask && (
//         <div className={styles.taskDetailsModal}>
//           <div className={styles.modalContent}>
//             <button className={styles.closeButton} onClick={handleCloseDetails}>
//               &times;
//             </button>
            
//             <h2 className={styles.modalTitle}>{selectedTask.name}</h2>
//             <p className={styles.modalDescription}>{selectedTask.description}</p>
            
//             <div className={styles.detailSection}>
//               <h3 className={styles.detailTitle}>Assigned To</h3>
//               <div className={styles.memberList}>
//                 {selectedTask.assignedTo?.members?.map(member => (
//                   <div key={member.id} className={styles.memberItem}>
//                     <div className={styles.memberAvatar}>{member.name.charAt(0)}</div>
//                     <span>{member.name}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <div className={styles.detailSection}>
//               <h3 className={styles.detailTitle}>Due Date</h3>
//               <p>2 Weeks Left, 7pm</p>
//             </div>
            
//             <div className={styles.detailSection}>
//               <h3 className={styles.detailTitle}>Status</h3>
//               <div className={styles.statusBadge} style={{ backgroundColor: getStatusColor(selectedTask.status) }}>
//                 {selectedTask.status}
//               </div>
//             </div>
            
//             {selectedTask.file && (
//               <div className={styles.detailSection}>
//                 <h3 className={styles.detailTitle}>Submitted File</h3>
//                 <button className={styles.downloadButton}>
//                   <FaFileAlt /> Download File
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MentorTaskView;