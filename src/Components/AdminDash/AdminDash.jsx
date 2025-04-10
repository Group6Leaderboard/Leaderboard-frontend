import React, { useState, useEffect } from 'react';
import { getAllColleges } from '../../services/collegeService';
import { getUsers } from '../../services/userService';
import { getAllProjects } from '../../services/projectService';
import styles from './adminDash.module.css';
import profilePic from '../../assets/mentor.png';
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from 'recharts';
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import { Calendar, Activity, Award } from "lucide-react";
import { PiFlagBanner } from 'react-icons/pi';
 
const AdminDash = ({userD}) => {
  const [stats, setStats] = useState({
    students: 0,
    colleges: 0,
    mentors: 0,
    activeProjects: 0,
    loading: true,
    error: null,
  });
 
  const [importantDates, setImportantDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventName, setEventName] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
 
  const randomColor = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#F7B801', '#A29BFE', '#00B894', '#FAB1A0'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
 
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const collegesData = await getAllColleges();
        const studentsData = await getUsers('STUDENT');
        const mentorsData = await getUsers('MENTOR');
        const projectsData = await getAllProjects();
 
        setStats({
          students: studentsData?.response?.length || 0,
          colleges: collegesData?.response?.length || 0,
          mentors: mentorsData?.response?.length || 0,
          activeProjects: projectsData?.response?.length || 0,
          loading: false,
          error: null,
        });
      } catch (error) {
        setStats((prev) => ({
          ...prev,
          loading: false,
          error: error.message || 'Failed to load dashboard statistics',
        }));
      }
    };
 
    fetchStats();
  }, []);
 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUsers();
        if (res?.status === 200 && res?.response?.length > 0) {
          const admin = res.response.find((user) => user.role === 'ADMIN');
          const selectedUser = admin || res.response[0];
    
          // Load events from cookies BEFORE setting userD
          const cookieKey = `events_${selectedUser.id}`;
          const storedEvents = Cookies.get(cookieKey);
          if (storedEvents) {
            setImportantDates(JSON.parse(storedEvents));
          }
    
          setUserD(selectedUser);
        }
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };
    
 
    fetchUser();
  }, []);
 
  const cards = [
    { title: 'Total Students', value: stats.students, icon: '👨‍🎓', color: 'blue' },
    { title: 'Total Colleges', value: stats.colleges, icon: '🏫', color: 'green' },
    { title: 'Total Mentors', value: stats.mentors, icon: '👨‍🏫', color: 'purple' },
    { title: 'Active Projects', value: stats.activeProjects, icon: '📊', color: 'orange' },
  ];
 
  const pieChartData = [
    { name: 'Students', value: stats.students },
    { name: 'Colleges', value: stats.colleges },
    { name: 'Mentors', value: stats.mentors },
    { name: 'Projects', value: stats.activeProjects },
  ];
 
  const formatDateForDisplay = (date) =>
    date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
 
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
 
  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
    setShowInput(true);
  };
 
  const addImportantDate = () => {
    if (!eventName.trim()) return;
 
    const newEvent = {
      date: selectedDate,
      name: eventName,
      color: randomColor(),
    };
 
    const updatedEvents = [...importantDates, newEvent];
    setImportantDates(updatedEvents);
    setShowInput(false);
    setEventName('');
 
    if (userD?.id) {
      const cookieKey = `events_${userD.id}`;
      Cookies.set(cookieKey, JSON.stringify(updatedEvents), { expires: 30 });
    }
  };
 
  const isImportantDate = (day) => {
    return importantDates.some((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };
 
  const getEventDetails = (day) => {
    return importantDates.find((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };
 
  const changeMonth = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  };
 
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }
 
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday =
      i === new Date().getDate() &&
      currentDate.getMonth() === new Date().getMonth() &&
      currentDate.getFullYear() === new Date().getFullYear();
 
    const eventDetails = getEventDetails(i);
    const isImportant = !!eventDetails;
 
    calendarDays.push(
      <div
      key={`day-${i}`}
      className={`calendar-day ${isToday ? 'today' : ''} ${isImportant ? 'important' : ''}`}
      onClick={() => handleDateClick(i)}
      title={eventDetails?.name || ''}
      style={
        isImportant
          ? {
              '--event-color': eventDetails.color,
            }
          : {}
      }
      onMouseEnter={(e) => {
        if (eventDetails) {
          e.currentTarget.style.backgroundColor = eventDetails.color;
        }
      }}
      onMouseLeave={(e) => {
        if (eventDetails) {
          e.currentTarget.style.backgroundColor = '';
        }
      }}
    >
      {i}
      {isImportant && (
        <div
          className="event-indicator"
          style={{ backgroundColor: eventDetails.color || '#000' }}
        ></div>
      )}
    </div>
    
    );
  }
 
  const studentName = userD?.name?.split(' ')[0] || 'John';
 
  if (stats.loading) return <div className={styles.loading}>Loading dashboard data...</div>;
  if (stats.error) return <div className={styles.error}>Error: {stats.error}</div>;
 
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.headerBanner}>
        <div className="header-content">
          <div className="date">{formatDateForDisplay(new Date())}</div>
          <h2>Welcome back, {studentName}!</h2>
          <p>Always stay updated in your portal</p>
        </div>
        <div className="header-graphics">
          <div className="avatar-container">
            <img src={profilePic} alt="Profile" className="profile-image" />
          </div>
        </div>
      </div>
 
      <div className={styles.statsGrid}>
        {cards.map((card, index) => (
          <div key={index} className={`${styles.statCard} ${styles[card.color]}`}>
            <div className={styles.cardIcon}>{card.icon}</div>
            <div className={styles.cardContent}>
              <h3>{card.title}</h3>
              <div className={styles.statValue}>{card.value}</div>
            </div>
          </div>
        ))}
      </div>
 
      <div className={styles.chartSection}>
        <div className={styles.pieContainer}>
          <h3>Overall Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie dataKey="value" data={pieChartData} cx="50%" cy="50%" outerRadius={100} label>
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#00C49F', '#FFBB28', '#FF8042', '#8884d8'][index % 4]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
 
        <div className="calendar-container">
          <div className="calendar-header-controls">
            <h3>Calendar</h3>
            <div className="month-navigation">
              <button onClick={() => changeMonth(-1)} className="month-nav-button">❮</button>
              <span className="current-month">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <button onClick={() => changeMonth(1)} className="month-nav-button">❯</button>
            </div>
          </div>
          <div className="calendar-header">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
              <div key={i} className="weekday">{d}</div>
            ))}
          </div>
          <div className="calendar-grid">{calendarDays}</div>
 
          {showInput && (
            <div className="event-input">
              <input
                type="text"
                placeholder="Enter event name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
              <div className="event-buttons">
                <button onClick={addImportantDate} className="add-event-button">Add</button>
                <button onClick={() => setShowInput(false)} className="cancel-button">Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
 
      <div className={styles.quickActionsContainer}>
        <h2>Quick Actions</h2>
        <div className={styles.quickActionButtons}>
          <Link to="/admin/students" className={styles.actionButton}>
            <Calendar size={20} />
            Students
          </Link>
          <Link to="/admin/mentors" className={styles.actionButton}>
            <Activity size={20} />
            Mentors
          </Link>
          <Link to="/admin/colleges" className={styles.actionButton}>
            <Award size={20} />
            Colleges
          </Link>
          <Link to="/admin/assign-project" className={styles.actionButton}>
            <Award size={20} />
            Add Projects
          </Link>
        </div>
      </div>
    </div>
  );
};
 
export default AdminDash;