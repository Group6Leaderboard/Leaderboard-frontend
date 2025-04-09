import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import profilePic from "../../assets/mentor.png"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Area, AreaChart
} from "recharts";
import {
  Users, BookOpen, CheckCircle, Clock, Star,
  Calendar, Activity, Award, ArrowRight, Award as AwardIcon
} from "lucide-react";
import styles from "./mentorDash.module.css";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";

const MentorDash = ({ projects, userData, college, loading, error }) => {
  
  if (loading) {
    return <div className={styles.loadingState}>Loading dashboard data...</div>;
  }

  if (error) {
    return <div className={styles.errorState}>{error}</div>;
  }
  const formatDateForDisplay = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  // Calculate metrics based on the provided projects data
  const projectCount = projects.length;
  const averageScore = useMemo(() => {
    const totalScore = projects.reduce((total, project) => total + project.score, 0);
    return Math.round((totalScore / projects.length) || 0);
  }, [projects]);

  const completedProjects = projects.filter(project => project.score > 70).length;
  const completionRate = Math.round((completedProjects / projectCount) * 100) || 0;

  
  const getCollegeDistribution = () => {
    const collegeMap = {};
  
    // Count number of projects per collegeId
    projects.forEach(project => {
      if (project.collegeId) {
        collegeMap[project.collegeId] = (collegeMap[project.collegeId] || 0) + 1;
      }
    });
  
    return Object.entries(collegeMap).map(([collegeId, count]) => ({
      name: college[collegeId]?.name || "Unknown College",
      count
    }));
  };
  

  // Project score distribution for bar chart


  const getProjectScoreData = () => {
    const maxScore = 100; // Assuming max score is 100, adjust as needed
    return projects.map(project => ({
      name: project.name.length > 15 ? project.name.substring(0, 15) + '...' : project.name,
      score: project.score,
      total: maxScore // This is for the background bar to set the scale
    }));
  };

  // College distribution for college chart
  const collegeData = getCollegeDistribution();

  return (

    <DashboardLayout>
      <div className={styles.dashboardContainer}>
        <div className="header-banner">
          <div className="header-content">
            <div className="date">{formatDateForDisplay(new Date())}</div>
            <h2>Welcome back, {userData && userData.name
              ? userData.name.split(" ")[0] : "John"}!</h2>
            <p>Always stay updated in your  portal</p>
          </div>
          <div className="header-graphics">
            <div className="avatar-container">
              <img src={profilePic} alt="Profile" className="profile-image" />
            </div>
          </div>
        </div>

        <div className={styles.summaryCards}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <BookOpen size={24} />
            </div>
            <div className={styles.cardContent}>
              <h3>Total Projects</h3>
              <p className={styles.cardValue}>{projectCount}</p>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <Users size={24} />
            </div>
            <div className={styles.cardContent}>
              <h3>Colleges</h3>
              <p className={styles.cardValue}>{collegeData.length}</p>
            </div>
          </div>



          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <Star size={24} />
            </div>
            <div className={styles.cardContent}>
              <h3>Average Score</h3>
              <p className={styles.cardValue}>{averageScore}</p>
            </div>
          </div>
        </div>

        {/* Charts Row - Styled similar to references */}
        <div className={styles.chartsContainer}>
          <div className={styles.chartCard}>
            <h2 className={styles.chartTitle}>
              <span className={styles.chartTitleBar}></span>
              Project Scores
            </h2>
            <div className={styles.barChartWrapper}>
              {projects.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={getProjectScoreData()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                    barSize={20}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eaeaea" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={70}
                      interval={0}
                      tick={{ fill: '#6c757d', fontSize: 12 }}
                      axisLine={{ stroke: '#eaeaea' }}
                    />
                    <YAxis
                      tick={false}
                      axisLine={{ stroke: '#eaeaea' }}
                      tickLine={false}
                      
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e0e0e0',
                        borderRadius: '4px'
                      }}
                    />
                    {/* Background bars - no stacking */}
                    <Bar
                      dataKey="total"
                      className={styles.backgroundBar}
                      fill="#E5E9F2"
                      radius={[4, 4, 4, 4]}
                    />
                    {/* Score bars on top */}
                    <Bar
                      dataKey="score"
                      className={styles.foregroundBar}
                      fill="#101828"
                      radius={[4, 4, 4, 4]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className={styles.noDataMessage}>No project score data available</div>
              )}
            </div>
          </div>

          {/* Area Chart for College Distribution */}
          <div className={styles.chartCard}>
            <h2 className={styles.chartTitle}>
              <span className={styles.chartTitleBar}></span>
              Projects by College
            </h2>
            <div className={styles.lineChartWrapper}>
              {collegeData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart
                    data={collegeData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#5EB5AE" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#5EB5AE" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffff" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={70}
                      interval={0}
                      tick={{ fill: '#6c757d', fontSize: 12 }}
                      axisLine={{ stroke: '#eaeaea' }}
                    />
                    <YAxis
                      tick={{ fill: '#6c757d', fontSize: 12 }}
                      axisLine={{ stroke: '#eaeaea' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e0e0e0',
                        borderRadius: '4px'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="count"
                      className={styles.areaChart}
                      fillOpacity={1}
                      fill="url(#colorCount)"
                      strokeWidth={2}
                      dot={{ className: styles.areaDot }}
                      activeDot={{ className: styles.activeAreaDot }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className={styles.noDataMessage}>No college distribution data available</div>
              )}
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className={styles.recentProjectsContainer}>
          <div className={styles.sectionHeader}>
            <h2>Recent Projects</h2>
            <Link to="/mentor/projects" className={styles.viewAllLink}>
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className={styles.projectsList}>
            {projects.length > 0 ? (
              projects.slice(0, 3).map(project => (
                <div key={project.id} className={styles.projectItem}>
                  <div className={styles.projectHeader}>
                    <h3>{project.name}</h3>
                    <span
                      className={`${styles.projectScore} ${project.score > 70
                        ? styles.scoreHigh
                        : project.score > 0
                          ? styles.scoreMedium
                          : styles.scoreLow
                        }`}
                    >
                      Score: {project.score}
                    </span>
                  </div>
                  <p className={styles.projectDescription}>
                    {project.description?.length > 100
                      ? `${project.description.substring(0, 100)}...`
                      : project.description || "No description available"}
                  </p>
                  <div className={styles.projectMeta}>
                    <span>College: {college[project.collegeId].name || "N/A"}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noDataMessage}>No projects found</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.quickActionsContainer}>
          <h2>Quick Actions</h2>
          <div className={styles.quickActionButtons}>
            <Link to="/mentor/assign-task" className={styles.actionButton}>
              <Calendar size={20} />
              Assign New Task
            </Link>
            <Link to="/mentor/task" className={styles.actionButton}>
              <Activity size={20} />
              Review Tasks
            </Link>
            <Link to="/mentor/projects" className={styles.actionButton}>
              <Award size={20} />
              Evaluate Projects
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MentorDash;