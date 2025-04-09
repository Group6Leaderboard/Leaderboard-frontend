import React, { useEffect, useState } from "react";
import "./assignForm.css";
import StatsCard from "../RectangleCards/Statscard/";
import TaskHistory from "../TaskHistory/TaskHistory";
import ProjectHistory from "../ProjectHistory/ProjectHistory";
import { getAllProjects, createProject } from "../../services/projectService";
import { getAllColleges } from "../../services/collegeService";
import { getUsers } from "../../services/userService";
import { assignProject } from "../../services/studentProjectService";
import { getAllTasks, createTask } from "../../services/taskService";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation } from "react-router-dom";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaClipboardList,
  FaExclamationTriangle,
  FaCheckCircle,
  FaUsers,
  FaProjectDiagram,
  FaClock,
  FaFlag,
  FaUniversity,
  FaPlus,
  FaTimes,
  FaEye
} from 'react-icons/fa';

const AssignForm = ({ role }) => {
  // State management
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    submittedTasks: 0,
    toBeReviewedTasks: 0,
    totalProjects: 0,
    activeProjects: 0,
    totalMentors: 0,
    totalStudents: 0
  });
  const [recentItems, setRecentItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [viewAll, setViewAll] = useState(false);

  // Student selection
  const [selectedCollege, setSelectedCollege] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [members, setMembers] = useState([{ name: "" }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMemberIndex, setCurrentMemberIndex] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dueDate: "",
    projectId: "",
    mentorId: "",
    collegeId: "",
    priority: "medium",
    estimatedHours: 2,
    members: []
  });

  const location = useLocation();
  const passedProject = location.state?.projectId;

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);

        if (role === "mentor") {
          const [tasksRes, projectsRes] = await Promise.all([
            getAllTasks(),
            getAllProjects()
          ]);

          setProjects(projectsRes.response);
          setStats({
            totalTasks: tasksRes.response.length,
            submittedTasks: tasksRes.response.filter(t => t.status === "Not Submitted").length,
            toBeReviewedTasks: tasksRes.response.filter(t => t.status === "To be Reviewed").length,
            totalProjects: projectsRes.response.length,
            activeProjects: projectsRes.response.filter(p => !p.isCompleted).length
          });

          const sortedTasks = [...tasksRes.response]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          setRecentItems(sortedTasks);
          setDisplayedItems(sortedTasks.slice(0, 4)); // Initially show only 4 items
        }
        else if (role === "admin") {
          const [mentorsRes, studentsRes, projectsRes, collegesRes] = await Promise.all([
            getUsers("MENTOR"),
            getUsers("STUDENT"),
            getAllProjects(),
            getAllColleges()
          ]);

          setMentors(mentorsRes.response);
          setStudents(studentsRes.response);
          setProjects(projectsRes.response);
          setColleges(collegesRes.response || []);

          setStats({
            totalProjects: projectsRes.response.length,
            activeProjects: projectsRes.response.filter(p => !p.isCompleted).length,
            totalMentors: mentorsRes.response.length,
            totalStudents: studentsRes.response.length
          });

          const sortedProjects = [...projectsRes.response]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          setRecentItems(sortedProjects);
          setDisplayedItems(sortedProjects.slice(0, 4)); // Initially show only 4 items
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("Failed to load initial data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [role]);

  // Handle view all toggle
  const toggleViewAll = () => {
    if (viewAll) {
      // Show only the first 4 items
      setDisplayedItems(recentItems.slice(0, 4));
    } else {
      // Show all items
      setDisplayedItems(recentItems);
    }
    setViewAll(!viewAll);
  };

  // Filter students when college is selected
  useEffect(() => {
    if (collegeName) {
      const collegeStudents = students.filter(student => student.collegeName === collegeName);
      setFilteredStudents(collegeStudents);
    } else {
      setFilteredStudents([]);
    }
  }, [collegeName, students]);

  // Handle passed project from navigation
  useEffect(() => {
    if (passedProject && projects.length > 0) {
      const project = projects.find(p => p.id === passedProject);
      if (project) {
        setFormData(prev => ({
          ...prev,
          projectId: project.id
        }));
      }
    }
  }, [passedProject, projects]);

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      dueDate: date ? date.toISOString() : ''
    }));
  };

  const handleSelectChange = (selectedOption, field) => {
    if (!selectedOption) {
      setFormData(prev => ({ ...prev, [field]: "" }));
      return;
    }
    setFormData(prev => ({
      ...prev,
      [field]: selectedOption.value
    }));
  };

  const handleMultiSelectChange = (selectedOptions, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: selectedOptions ? selectedOptions.map(opt => opt.value) : []
    }));
  };

  const handleCollegeChange = (selectedOption) => {
    if (!selectedOption) {
      setSelectedCollege("");
      setCollegeName("");
      setFilteredStudents([]);
      setFormData(prev => ({
        ...prev,
        collegeId: ""
      }));
      return;
    }

    const selectedCollegeId = selectedOption.value;
    const selectedCollegeObj = colleges.find(college => college.id === selectedCollegeId);

    if (selectedCollegeObj) {
      setSelectedCollege(selectedCollegeId);
      setCollegeName(selectedCollegeObj.name);

      setFormData(prev => ({
        ...prev,
        collegeId: selectedCollegeId
      }));

      // Reset member selection
      setMembers([{ name: "" }]);
    }
  };

  // Handle member selection
  const handleMemberClick = (index) => {
    if (!selectedCollege) {
      setErrorMessage("Please select a college first");
      return;
    }

    setCurrentMemberIndex(index);
    setIsModalOpen(true);
  };

  const handleStudentSelect = (student) => {
    // Update members list
    setMembers(prevMembers => {
      const newMembers = [...prevMembers];
      newMembers[currentMemberIndex] = student;
      return newMembers;
    });

    // Update form data
    setFormData(prev => {
      const currentMembers = [...prev.members];
      // If this is a new member
      if (!currentMembers.includes(student.id)) {
        currentMembers[currentMemberIndex] = student.id;
      }
      return {
        ...prev,
        members: currentMembers
      };
    });

    // Remove selected student from filtered list
    setFilteredStudents(prevFiltered =>
      prevFiltered.filter(s => s.id !== student.id)
    );

    setIsModalOpen(false);
  };

  const addMember = () => {
    if (members.length < 4) {
      setMembers([...members, { name: "" }]);
    }
  };

  const removeMember = (index) => {
    setMembers(prevMembers => {
      const removedMember = prevMembers[index];
      const updatedMembers = prevMembers.filter((_, i) => i !== index);

      // Add removed student back to filtered list
      if (removedMember?.id) {
        setFilteredStudents(prevFiltered => [...prevFiltered, removedMember]);

        // Also remove from form data
        setFormData(prev => {
          const updatedFormMembers = prev.members.filter((_, i) => i !== index);
          return {
            ...prev,
            members: updatedFormMembers
          };
        });
      }

      return updatedMembers;
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      dueDate: "",
      projectId: "",
      mentorId: "",
      collegeId: "",
      priority: "medium",
      estimatedHours: 2,
      members: []
    });

    setSelectedCollege("");
    setCollegeName("");

    setFilteredStudents([]);
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      if (role === "mentor") {
        // Task submission
        await createTask({
          name: formData.name,
          description: formData.description,
          dueDate: formData.dueDate,
          assignedTo: formData.projectId,
          priority: formData.priority,
          estimatedHours: formData.estimatedHours
        });
        setSuccessMessage("Task assigned successfully!");
      }
      else if (role === "admin") {
        // Project submission
        const projectData = {
          name: formData.name,
          description: formData.description,
          collegeId: selectedCollege,
          mentorId: formData.mentorId
        };

        const response = await createProject(projectData);
        const projectId = response?.response?.id;

        if (projectId) {
          // Assign students to project
          const memberIds = members
            .filter(member => member.id) // Filter out empty slots
            .map(member => member.id);

          await Promise.all(
            memberIds.map(memberId => assignProject(memberId, projectId))
          );

          setSuccessMessage("Project assigned successfully!");
        } else {
          throw new Error("Project ID not found in response");
        }
      }

      // Reset form
      resetForm();

      // Refresh data
      const refreshData = async () => {
        if (role === "mentor") {
          const tasksRes = await getAllTasks();
          const sortedTasks = [...tasksRes.response]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          setRecentItems(sortedTasks);
          setDisplayedItems(viewAll ? sortedTasks : sortedTasks.slice(0, 4));

          setStats(prev => ({
            ...prev,
            totalTasks: tasksRes.response.length,
            submittedTasks: tasksRes.response.filter(t => t.status === "Not Submitted").length,
            toBeReviewedTasks: tasksRes.response.filter(t => t.status === "To be Reviewed").length
          }));
        } else {
          const projectsRes = await getAllProjects();
          const sortedProjects = [...projectsRes.response]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          setRecentItems(sortedProjects);
          setDisplayedItems(viewAll ? sortedProjects : sortedProjects.slice(0, 4));

          setStats(prev => ({
            ...prev,
            totalProjects: projectsRes.response.length,
            activeProjects: projectsRes.response.filter(p => !p.isCompleted).length
          }));
        }
      };
      await refreshData();

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage(error.message || "Submission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Select options
  const projectOptions = projects.map(p => ({ value: p.id, label: p.name }));
  const mentorOptions = mentors.map(m => ({ value: m.id, label: m.name }));
  const collegeOptions = colleges.map(c => ({ value: c.id, label: c.name }));
  const studentOptions = filteredStudents.map(s => ({ value: s.id, label: s.name }));
  // Custom select styles
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: '42px',
      borderColor: '#ddd',
      '&:hover': { borderColor: '#5eb5ae' },
      backgroundColor: '#fafafa',
      padding: '0.2rem',
      borderRadius: '8px',
      boxShadow: 'none'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#5eb5ae' : state.isFocused ? '#e6f7f5' : 'white',
      color: state.isSelected ? 'white' : '#333',
      padding: '0.75rem 1rem',
      cursor: 'pointer'
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      zIndex: 9999
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#888',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#5eb5ae',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    })
  };

  return (
    <DashboardLayout>
      <div className="assign-container">
        <div className="assign-header">
          <h1 className="assign-title">
            {role === "mentor" ? (
              <>
                <FaClipboardList className="assign-icon" /> TASKS MANAGEMENT
              </>
            ) : (
              <>
                <FaProjectDiagram className="assign-icon" /> PROJECTS MANAGEMENT
              </>
            )}
          </h1>
        </div>

        {/* Stats Cards Section */}


        <div className="content-layout">
          {/* Form Section */}
          <div className="form-container">
            <div className="form-header">
              <h2>
                {role === "mentor" ? "Assign New Task" : "Create New Project"}
              </h2>
              <p>
                {role === "mentor"
                  ? "Create a new task for project teams"
                  : "Setup a new project with mentor and students"}
              </p>
            </div>

            {/* Status Messages */}
            {successMessage && (
              <div className="alert success">
                <FaCheckCircle /> {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="alert error">
                <FaExclamationTriangle /> {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Common Fields */}
              <div className="form-group">
                <label>{role === "mentor" ? "Task Name" : "Project Name"}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={role === "mentor"
                    ? "Enter task name"
                    : "Enter project name"}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Provide detailed description"
                  rows="4"
                  className="form-control"
                />
              </div>

              {/* Role-specific fields */}
              {role === "mentor" ? (
                <>
                  <div className="form-row">
                    <div className="form-group half">
                      <label>Due Date</label>
                      <div className="date-picker-container">
                        <DatePicker
                          selected={formData.dueDate ? new Date(formData.dueDate) : null}
                          onChange={handleDateChange}
                          minDate={new Date()}
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Select due date"
                          required
                          className="form-control date-picker"
                        />
                        <FaCalendarAlt className="calendar-icon" />
                      </div>
                    </div>

                    <div className="form-group half">
                      <label>Project</label>
                      <Select
                        options={projectOptions}
                        onChange={(opt) => handleSelectChange(opt, 'projectId')}
                        value={projectOptions.find(opt => opt.value === formData.projectId) || null}
                        placeholder="Select project"
                        styles={customSelectStyles}
                        isClearable
                        required
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group half">
                      <label>Priority</label>
                      <div className="select-container">
                        <select
                          name="priority"
                          value={formData.priority}
                          onChange={handleChange}
                          required
                          className="form-control"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                        <FaFlag className="select-icon" />
                      </div>
                    </div>
                    <div className="form-group half">
                      <label>Estimated Hours</label>
                      <div className="input-with-icon">
                        <input
                          type="number"
                          name="estimatedHours"
                          value={formData.estimatedHours}
                          onChange={handleChange}
                          min="1"
                          required
                          className="form-control"
                        />
                        <FaClock className="input-icon" />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-row">
                    <div className="form-group half">
                      <label>College</label>
                      <Select
                        options={collegeOptions}
                        onChange={handleCollegeChange}
                        value={collegeOptions.find(opt => opt.value === selectedCollege) || null}
                        placeholder="Select college"
                        styles={customSelectStyles}
                        isClearable
                        required
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    </div>

                    <div className="form-group half">
                      <label>Mentor</label>
                      <Select
                        options={mentorOptions}
                        onChange={(opt) => handleSelectChange(opt, 'mentorId')}
                        value={mentorOptions.find(opt => opt.value === formData.mentorId) || null}
                        placeholder="Select mentor"
                        styles={customSelectStyles}
                        isClearable
                        required
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Team Members</label>
                    <Select
                      options={studentOptions}
                      onChange={(opt) => handleMultiSelectChange(opt, 'members')}
                      value={studentOptions.filter(opt => formData.members.includes(opt.value))}
                      isMulti
                      placeholder="Select team members"
                      styles={customSelectStyles}
                      required
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </div>
                </>
              )}

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={resetForm}
                  disabled={isLoading}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : (
                    role === "mentor" ? "Assign Task" : "Create Project"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* History Section */}
          <div className="history-container">
            <div className="history-header">

              <button
                className="view-all-btn"
                onClick={toggleViewAll}
              >
                <FaEye className="view-icon" /> {viewAll ? "Show Less" : "View All"}
              </button>
            </div>

            {displayedItems.length === 0 ? (
              <div className="no-data-message">
                <p>No {role === "mentor" ? "tasks" : "projects"} available yet.</p>
              </div>
            ) : (
              role === "mentor" ? (
                <TaskHistory tasks={displayedItems} />
              ) : (
                <ProjectHistory projects={displayedItems} />
              )
            )}
          </div>
        </div>

        {/* Student Selection Modal */}
        {isModalOpen && (
          <div className="modal-backdrop">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Select a Student</h3>
                <button
                  type="button"
                  className="close-modal"
                  onClick={() => setIsModalOpen(false)}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="modal-body">
                {filteredStudents.length > 0 ? (
                  <ul className="student-list">
                    {filteredStudents.map((student) => (
                      <li
                        key={student.id}
                        className="student-item"
                        onClick={() => handleStudentSelect(student)}
                      >
                        <FaUsers className="student-icon" /> {student.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-students-message">
                    {collegeName ?
                      "No available students found for this college." :
                      "Please select a college first to view students."}
                  </p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AssignForm;