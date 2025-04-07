import React, { useState, useEffect } from "react";
import styles from "./mentorProjectView.module.css";
import fallbackImage from "../../assets/fallback.jpg";
import { BsFolder2Open } from "react-icons/bs"; // You can choose any icon you like


const MentorProjectView = ({ projects }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [flippedCard, setFlippedCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 8;
  
  // Filter projects based on search term and filters
  const filteredProjects = projects ? 
    projects.filter(project => {
      // Search filter
      const matchesSearch = 
        !searchTerm || 
        project?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project?.collegeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project?.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = 
        selectedStatus === "All" || 
        project?.status === selectedStatus;
      
      return matchesSearch && matchesStatus;
    }) : [];

  // Calculate pagination values
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  
  // Project statistics
  const totalProjects = filteredProjects.length;
 

  // Function to handle card flip
  const handleCardClick = (projectId) => {
    if (flippedCard === projectId) {
      setFlippedCard(null);
    } else {
      setFlippedCard(projectId);
    }
  };

  // Handle assign task button click
  const handleAssignTask = (projectId, e) => {
    e.stopPropagation();
    console.log(`Assign task for project: ${projectId}`);
    // Implement your assign task functionality here
  };

  // Handle view tasks button click
  const handleViewTasks = (projectId, e) => {
    e.stopPropagation();
    console.log(`View tasks for project: ${projectId}`);
    // Implement your view tasks functionality here
  };

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
<div className={styles.headerMentorContainer}>
  <div className={styles.headermentorContent}>
    <div className={styles.headerMentorType}>
      <BsFolder2Open className={styles.headerIcon} />
      <h2>Projects</h2>
    </div>
    {/* Optional add button if needed in future */}
    {/* <button className={styles.headerAdminAddBtn}>+</button> */}
  </div>
</div>

    <div className={styles.projectsContainer}>
      <div className={styles.projectsHeader}>


        
        <div className={styles.headerRight}>
          <div className={styles.searchBar}>
            <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
        
        </div>
      </div>

      {/* Project Stats */}
      <div className={styles.projectStats}>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Total projects</div>
          <div className={styles.statValue}>{totalProjects}</div>
        </div>
       
      </div>
      
      {/* Projects Grid */}
      <div className={styles.projectsGrid}>
        {currentProjects && currentProjects.length > 0 ? (
          currentProjects.map((project) => {
            if (!project) return null;
            const isFlipped = flippedCard === project.id;
            
            return (
              <div 
                key={project.id} 
                className={`${styles.projectCard} ${isFlipped ? styles.flipped : ''}`}
                onClick={() => handleCardClick(project.id)}
              >
                <div className={styles.cardInner}>
                  {/* Card Front */}
                  <div className={styles.cardFront}>
                    <div className={styles.projectHeader}>
                      <h3 className={styles.projectTitle}>{project.name || "Unnamed Project"}</h3>
                      <div className={styles.projectActions}>
                        <button className={styles.starButton}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                          </svg>
                        </button>
                        <button className={styles.moreButton}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className={styles.projectDescription}>
                      {project.description ? (
                        <p>{project.description.substring(0, 80)}{project.description.length > 80 ? '...' : ''}</p>
                      ) : (
                        <p className={styles.noDescription}>No description available</p>
                      )}
                    </div>
                    
                    <div className={styles.projectMeta}>
                      {project.collegeName && (
                        <div className={styles.projectCollege}>{project.collegeName}</div>
                      )}
                      <div className={styles.projectMembers}>
                        <div className={styles.memberAvatars}>
                          <div className={styles.memberAvatar} style={{ backgroundImage: `url(${fallbackImage})` }}></div>
                          <div className={styles.memberAvatar} style={{ backgroundImage: `url(${fallbackImage})` }}></div>
                          <div className={styles.memberCount}>+3</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.cardActions}>
                      <button 
                        className={`${styles.actionButton} ${styles.primaryButton}`}
                        onClick={(e) => handleAssignTask(project.id, e)}
                      >
                        Assign Task
                      </button>
                      <button 
                        className={styles.actionButton}
                        onClick={(e) => handleViewTasks(project.id, e)}
                      >
                        View Tasks
                      </button>
                    </div>
                  </div>
                  
                  {/* Card Back */}
                  <div className={styles.cardBack}>
                    <div className={styles.backHeader}>
                      <h3>{project.name || "Unnamed Project"}</h3>
                      <button className={styles.closeButton} onClick={(e) => {
                        e.stopPropagation();
                        setFlippedCard(null);
                      }}>×</button>
                    </div>
                    
                    <div className={styles.backContent}>
                      <div className={styles.backSection}>
                        <h4>Description</h4>
                        <p>{project.description || "No description available."}</p>
                      </div>
                      
                      <div className={styles.backSection}>
                        <h4>Team Members</h4>
                        <div className={styles.teamMembersList}>
                          <div className={styles.teamMember}>
                            <div className={styles.memberAvatarLarge} 
                                style={{ backgroundImage: `url(${fallbackImage})`, backgroundSize: 'cover' }}>
                            </div>
                            <div className={styles.memberInfo}>
                              <span className={styles.memberName}>John Doe</span>
                              <span className={styles.memberRole}>Developer</span>
                            </div>
                          </div>
                          <div className={styles.teamMember}>
                            <div className={styles.memberAvatarLarge} 
                                style={{ backgroundImage: `url(${fallbackImage})`, backgroundSize: 'cover' }}>
                            </div>
                            <div className={styles.memberInfo}>
                              <span className={styles.memberName}>Jane Smith</span>
                              <span className={styles.memberRole}>Designer</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className={styles.backSection}>
                        <h4>Timeline</h4>
                        <div className={styles.timelineInfo}>
                          <div className={styles.timelineItem}>
                            <span className={styles.timelineLabel}>Start:</span>
                            <span className={styles.timelineValue}>Jan 15, 2025</span>
                          </div>
                        
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.backFooter}>
                      <button 
                        className={`${styles.backButton} ${styles.primaryButton}`}
                        onClick={(e) => handleAssignTask(project.id, e)}
                      >
                        Assign Task
                      </button>
                      <button 
                        className={styles.backButton}
                        onClick={(e) => handleViewTasks(project.id, e)}
                      >
                        View Tasks
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.noProjects}>
            <div className={styles.emptyStateIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/>
              </svg>
            </div>
            <h3>No projects found</h3>
            <p>Create a new project or adjust your search to see projects</p>
            <button className={styles.createProjectBtn}>Create Project</button>
          </div>
        )}
      </div>
      
      {/* Pagination controls */}
      {filteredProjects.length > projectsPerPage && (
        <div className={styles.pagination}>
          <button 
            className={styles.paginationButton} 
            onClick={goToPrevPage} 
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <div className={styles.pageNumbers}>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show pages around current page
              let pageToShow;
              if (totalPages <= 5) {
                pageToShow = i + 1;
              } else {
                const leftOffset = Math.max(0, Math.min(totalPages - 5, currentPage - 3));
                pageToShow = i + 1 + leftOffset;
              }
              
              return (
                <button
                  key={pageToShow}
                  className={`${styles.pageButton} ${currentPage === pageToShow ? styles.activePage : ''}`}
                  onClick={() => goToPage(pageToShow)}
                >
                  {pageToShow}
                </button>
              );
            })}
          </div>
          
          <button 
            className={styles.paginationButton} 
            onClick={goToNextPage} 
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
    </>
  );

};

export default MentorProjectView;