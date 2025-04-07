import React, { useState } from 'react';
import './studentDash.css';
import profilePic from '/yy.png';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const StudentDashboard = () => {
  const handleRedirect = (path) => {
    window.location.href = path;
  };

  const studentProgressData = [
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
    if (eventName.trim() && selectedDate) {
      const newEvent = { date: selectedDate, name: eventName };
      setImportantDates([...importantDates, newEvent]);
      setEventName('');
      setShowInput(false);
    }
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

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="header-banner">
        <div className="header-content">
          <div className="date">{formatDateForDisplay(new Date())}</div>
          <h1>Welcome back, John!</h1>
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
        <div className="graph-container">
          <h3 className="sub-heading">Projects & Tasks Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={studentProgressData.map(project => ({
                  name: project.name,
                  value: project.tasksAssigned === 0 ? 0 : (project.tasksCompleted / project.tasksAssigned) * 100,
                }))}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({  value }) => ` ${Math.round(value)}%`}
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
      </div>
    </div>
  );
};

export default StudentDashboard;
