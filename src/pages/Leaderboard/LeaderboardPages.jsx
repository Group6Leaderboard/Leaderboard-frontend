import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./LeaderboardStyles.css";
import { getLeaderboard } from "../../services/leaderboardService";

const LeaderboardPages = ({ type = "college" }) => {
  const navigate = useNavigate();
  const [showLoginOption, setShowLoginOption] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [leaderboardData, setLeaderboardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getLeaderboard(type);
        setLeaderboardData(prev => ({
          ...prev,
          [type]: data
        }));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching leaderboard data:", err);
        setError("Failed to load leaderboard.");
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!leaderboardData[type]) return null;

  const currentData = leaderboardData[type];

  const filteredRanking = currentData.ranking.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.college && item.college.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filteredRanking.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredRanking.length / itemsPerPage);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <div className="title-search-container">
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
          {(currentData.leaders || []).map((leader, index) => (
            <div key={index} className={`leader-card position-${index + 1}`}>
              <div className="trophy-indicator"></div>
              <div className="position-badge">{index + 1}</div>
              <div className="leader-content">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="leader-avatar"
                  onError={(e) => {
                    if (type === "project") {
                      e.target.src = "/project.png";
                    } else if (type === "college") {
                      e.target.src = "/fallback.webp";
                    } else {
                      e.target.src = "/tudent.png";
                    }
                  }}
                />
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
        <div className="table-container">
          <table className="ranking-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                {type !== "project" && <th>Projects</th>}
                {(type === "student" || type === "project") && <th>College</th>}
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index} className={`rank-row rank-${item.rank} slanted-border`}>
                  <td className="rank-cell">
                    <span className="rank-number">{item.rank}</span>
                    {item.rank <= 3 && (
                      <img
                        src={`/${item.rank === 1 ? 'tg' : item.rank === 2 ? 'ts' : 'brons'}.png`}
                        alt={`Rank ${item.rank}`}
                        className="small-trophy"
                        onError={(e) => (e.target.src = "/fallback_medal.png")}
                      />
                    )}
                  </td>
                  <td>{item.name}</td>
                  {type !== "project" && <td>{item.proj}</td>}
                  {(type === "student" || type === "project") && <td>{item.college}</td>}
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
