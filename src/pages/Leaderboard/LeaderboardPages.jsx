import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./LeaderboardStyles.css"; 
import { useMemo } from "react";

const LeaderboardPages = ({ type = "college" }) => {
  const navigate = useNavigate();
  const [showLoginOption, setShowLoginOption] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  
 
  const leaderboardData = {
    college: {
      leaders: [
        { name: "ST Thomas", points: "98", wins: 43, tasks: 167, image: "collegea.png" },
        { name: "Rajadhani", points: "96", wins: 37, tasks: 132, image: "collegea.png" },
        { name: "Christ", points: "92", wins: 32, tasks: 68, image: "collegea.png" },
      ],
      ranking: [
        { rank: 1, name: "ST Thomas", proj: 236, college: "ST Thomas", points: "98" },
        { rank: 2, name: "Rajadhani", proj: 167, college: "Rajadhani", points: "96" },
        { rank: 3, name: "Christ", proj: 146, college: "Christ", points: "92" },
        { rank: 4, name: "Amity", proj: 120, college: "Amity", points: "89" },
        { rank: 5, name: "IIT Bombay", proj: 100, college: "IIT Bombay", points: "85" },
        { rank: 6, name: "IIM Ahmedabad", proj: 95, college: "IIM Ahmedabad", points: "80" },
        { rank: 7, name: "MIT", proj: 90, college: "MIT", points: "78" },
        { rank: 8, name: "NIT Trichy", proj: 85, college: "NIT Trichy", points: "75" },
        { rank: 9, name: "BITS Pilani", proj: 80, college: "BITS Pilani", points: "72" },
        { rank: 10, name: "Delhi University", proj: 75, college: "Delhi University", points: "70" },
      ],
      tableHeaders: ["Rank", "College Name", "No Of Projects", "Total Points"]
    },
    project: {
      leaders: [
        { name: "Project 1", points: "98", wins: 43, tasks: 167, image: "collegea.png" },
        { name: "Project 2", points: "96", wins: 37, tasks: 132, image: "collegea.png" },
        { name: "Project 3", points: "92", wins: 32, tasks: 68, image: "collegea.png" },
      ],
      ranking: [
        { rank: 1, name: "Project 1", proj: 236, college: "ST Thomas", points: "98" },
        { rank: 2, name: "Project 2", proj: 167, college: "Rajadhani", points: "96" },
        { rank: 3, name: "Project 3", proj: 146, college: "Christ", points: "92" },
        { rank: 4, name: "Project 4", proj: 120, college: "Amity", points: "89" },
        { rank: 5, name: "Project 5", proj: 100, college: "IIT Bombay", points: "85" },
        { rank: 6, name: "Project 6", proj: 95, college: "IIM Ahmedabad", points: "80" },
        { rank: 7, name: "Project 7", proj: 90, college: "MIT", points: "78" },
        { rank: 8, name: "Project 8", proj: 85, college: "NIT Trichy", points: "75" },
        { rank: 9, name: "Project 9", proj: 80, college: "BITS Pilani", points: "72" },
        { rank: 10, name: "Project 10", proj: 75, college: "Delhi University", points: "70" },
      ],
      tableHeaders: ["Rank", "Project Name", "College", "Total Points"]
    },
    student: {
      leaders: [
        { name: "Jyothi", points: "98", wins: 43, tasks: 167, image: "j.png" },
        { name: "Aparna KP", points: "96", wins: 37, tasks: 132, image: "aa.png" },
        { name: "Jacob M", points: "92", wins: 32, tasks: 68, image: "v.png" },
      ],
      ranking: [
        { rank: 1, name: "Jyothi ", proj: 236, college: "ST Thomas", points: "98" },
        { rank: 2, name: "Aparna KP", proj: 167, college: "Rajadhani", points: "96" },
        { rank: 3, name: "Jacob M", proj: 146, college: "Christ", points: "92" },
        { rank: 4, name: "Aisha R", proj: 120, college: "Amity", points: "89" },
        { rank: 5, name: "Rahul N", proj: 100, college: "IIT Bombay", points: "85" },
        { rank: 6, name: "Meera S", proj: 95, college: "IIM Ahmedabad", points: "80" },
        { rank: 7, name: "Siddharth L", proj: 90, college: "MIT", points: "78" },
        { rank: 8, name: "Neha P", proj: 85, college: "NIT Trichy", points: "75" },
        { rank: 9, name: "Vikram J", proj: 80, college: "BITS Pilani", points: "72" },
        { rank: 10, name: "Ananya M", proj: 75, college: "Delhi University", points: "70" },
      ],
      tableHeaders: ["Rank", "Student Name", "No Of Projects", "College", "Total Points"]
    }
  };

  const currentData = leaderboardData[type];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const filteredRanking = useMemo(() => {
    return currentData.ranking.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.college && item.college.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, currentData.ranking]);
  // Pagination logic
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filteredRanking.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredRanking.length / itemsPerPage);

  // Reset pagination when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <div className="title-search-container">
          <h1 className="leaderboard-title">{currentData.title}</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <div className="search-icon">
             <img src="/search.png" alt="Search" width="16" height="16" />
           </div>
          </div>
        </div>
        <div className="user-menu">
          <div className="user-icon" onClick={() => setShowLoginOption(!showLoginOption)}>
            <img src="/settings.png" alt="User" />
            <img src="/da.png" className="arrow-icon" alt="Arrow" />
          </div>
          {showLoginOption && (
            <div className="login-dropdown">
              <button onClick={() => navigate("/login")}>Login</button>
            </div>
          )}
        </div>
      </div>

      <div className="navigation-tabs">
        <NavLink to="/leaderboard/projects" className={({ isActive }) => isActive ? "tab active-tab" : "tab"}>
          Projects 
        </NavLink>
        <NavLink to="/leaderboard/students" className={({ isActive }) => isActive ? "tab active-tab" : "tab"}>
          Students
        </NavLink>
        <NavLink to="/leaderboard/colleges" className={({ isActive }) => isActive ? "tab active-tab" : "tab"}>
          Colleges
        </NavLink>
      </div>

      <div className="champions-section">
  <h2 className="section-heading">Champions</h2>
  <div className="leaders-container">
    {currentData.leaders.map((leader, index) => (
      <div key={index} className={`leader-card position-${index + 1}`}>
        <div className="trophy-indicator">
          {index === 0 }
          {index === 1 }
          {index === 2 }
        </div>
        <div className="position-badge">{index + 1}</div> 
        <div className="leader-content">
          <img src={`/${leader.image}`} alt={leader.name} className="leader-avatar" />
          <h3 className="leader-name">{leader.name}</h3>
          <p className="leader-points">{leader.points} points</p>
          <div className="leader-stats">
            <span>Projects: {leader.wins}</span>
            <span>Tasks: {leader.tasks}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


      <div className="ranking-section">
        {/* <h2 className="section-heading">Global Ranking</h2> */}
        <div className="table-container">
          <table className="ranking-table">
            <thead>
              <tr>
                {currentData.tableHeaders.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index} className={`rank-row rank-${item.rank} slanted-border`}>
                  <td className="rank-cell">
                    <span className="rank-number">{item.rank}</span>
                    {item.rank <= 3 && (
                      <img 
                        src={`/${item.rank === 1 ? 'gm' : item.rank === 2 ? 'sm' : 'bm'}.png`} 
                        alt={`Rank ${item.rank}`} 
                        className="small-trophy" 
                      />
                    )}
                  </td>
                  <td>{item.name}</td>
                 {type=== "college" && <td>{item.proj}</td>}
                 {type=== "project" && <td>{item.college}</td>}
                  {type === "student" &&  (
                  <>
                  <td>{item.proj}</td>
                  <td>{item.college}</td>
                  </>
                  )}
                  <td className="points-cell">{item.points}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination-controls">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              <img src="/back-arrow.png" alt="Previous" />
            </button>
            <span className="page-indicator">{currentPage} / {totalPages}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              <img src="/caret.png" alt="Next" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CollegeLeaderboard = () => <LeaderboardPages type="college" />;
export const ProjectLeaderboard = () => <LeaderboardPages type="project" />;
export const StudentLeaderboard = () => <LeaderboardPages type="student" />;

export default LeaderboardPages;