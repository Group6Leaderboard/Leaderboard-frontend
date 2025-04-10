import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import './studentDash.css';
import profilePic from '/yy.png';
import { getUsers } from '../../services/userService';
import Cookies from 'js-cookie';

const StudentDash = ({ projects }) => {
  const navigate = useNavigate();

  const handleRedirect = (path) => {
    navigate(path);
  };


  const studentProgressData = projects && projects.length > 0
    ? projects.map((project, index) => ({
      name: project.name || `Project ${index + 1}`,
      score: project.score || 0,
      tasksAssigned: project.tasksAssigned || 0,
      tasksCompleted: project.tasksCompleted || 0
    }))
    : [
      { name: 'Project 1', score: 85, tasksAssigned: 12, tasksCompleted: 10 },
      { name: 'Project 2', score: 92, tasksAssigned: 8, tasksCompleted: 8 },
      { name: 'Project 3', score: 78, tasksAssigned: 15, tasksCompleted: 11 },
      { name: 'Project 4', score: 90, tasksAssigned: 10, tasksCompleted: 7 }
    ];

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const [importantDates, setImportantDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventName, setEventName] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [userD, setUserD] = useState(null);

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
    if (!userD?.id) return;

    const cookieKey = `events_${userD.id}`;
    const storedEvents = Cookies.get(cookieKey);

    if (storedEvents) {
      setImportantDates(JSON.parse(storedEvents));
    }
  }, [userD?.id]);
  const formatDateForDisplay = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
    setShowInput(true);
  };

  const addImportantDate = () => {
    if (!eventName.trim()) return;

    const newEvent = { date: selectedDate, name: eventName };
    const updatedEvents = [...importantDates, newEvent];

    setImportantDates(updatedEvents);
    setShowInput(false);
    setEventName("");

    const cookieKey = `events_${userD.id}`;
    Cookies.set(cookieKey, JSON.stringify(updatedEvents), { expires: 30 });


  };


  const isImportantDate = (day) => {
    return importantDates.some(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const getEventName = (day) => {
    const event = importantDates.find(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear();
    });
    return event ? event.name : '';
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
    const isToday = i === new Date().getDate() &&
      currentDate.getMonth() === new Date().getMonth() &&
      currentDate.getFullYear() === new Date().getFullYear();
    const isImportant = isImportantDate(i);
    const eventTitle = isImportant ? getEventName(i) : '';

    calendarDays.push(
      <div
        key={`day-${i}`}
        className={`calendar-day ${isToday ? 'today' : ''} ${isImportant ? 'important' : ''}`}
        onClick={() => handleDateClick(i)}
        title={eventTitle}
      >
        {i}
        {isImportant && <div className="event-indicator"></div>}
      </div>
    );
  }

  const studentName = userD && userD.name
    ? userD.name.split(" ")[0]
    : "John";
    const handleRemoveEvent = (eventIndex, date) => {
      const updatedEvents = importantDates.filter((event, idx) => {
        const eventDate = new Date(event.date);
        return !(idx === eventIndex && eventDate.toDateString() === date.toDateString());
      });
    
      setImportantDates(updatedEvents);
    
      const cookieKey = `events_${userD.id}`;
      Cookies.set(cookieKey, JSON.stringify(updatedEvents), { expires: 30 });
    };
    
  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="header-banner">
        <div className="header-content">
          <div className="date">{formatDateForDisplay(new Date())}</div>
          <h1>Welcome back, {studentName}!</h1>
          <p>Always stay updated in your student portal</p>
        </div>
        <div className="header-graphics">
          <div className="avatar-container">
            <img src={profilePic} alt="Profile" className="profile-image" />
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="cards-row">
        <div className="action-card" onClick={() => handleRedirect('/student/projects')}>
          <div className="action-icon">📂</div>
          <div className="action-title">Projects</div>
        </div>
        <div className="action-card" onClick={() => handleRedirect('/student/tasks')}>
          <div className="action-icon">✓</div>
          <div className="action-title">Tasks</div>
        </div>
        <div className="action-card" onClick={() => handleRedirect('/leaderboard/students')}>
          <div className="action-icon">🏆</div>
          <div className="action-title">Leaderboard</div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        {/* Calendar */}
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
          <div className="calendar-grid">
            {calendarDays}
          </div>
          {selectedDate && (
  <div className="event-list">
    <h4>Events on {formatDateForDisplay(selectedDate)}:</h4>
    <ul>
      {importantDates
        .filter(event => {
          const eventDate = new Date(event.date);
          return eventDate.toDateString() === selectedDate.toDateString();
        })
        .map((event, index) => (
          <li key={index} className="event-item">
            {event.name}
            <button
              className="remove-button"
              onClick={() => handleRemoveEvent(index, selectedDate)}
              title="Remove event"
            >
              ❌
            </button>
          </li>
        ))}
    </ul>
  </div>
)}


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

        {/* Graph */}
        {userD && (
          <div className="graph-container">
            <h3 className="sub-heading">Projects & Score Overview</h3>

            <div className="total-score-box">
              Total Score: {userD.score}
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={studentProgressData.map(project => ({
                    name: project.name,
                    value: userD.score > 0 ? (project.score / userD.score) * 100 : 0,
                  }))}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ value }) => `${Math.round(value)}%`}
                >
                  {studentProgressData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${Math.round(value)}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

      </div>
    </div>
  );
};

export default StudentDash;