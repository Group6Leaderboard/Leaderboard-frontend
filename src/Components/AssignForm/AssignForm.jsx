import React, { useEffect, useState } from "react";
import styles from "./assignForm.module.css";
import StatsCard from "../RectangleCards/Statscard";
import { createProject, getAllProjects } from "../../services/projectService";
import { getAllColleges } from "../../services/collegeService";
import { getUsers } from "../../services/userService";
import { assignProject } from "../../services/studentProjectService";
import { getAllTasks, createTask } from "../../services/taskService";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AlertModal from "../AlertModal/AlertModal";


const AssignForm = ({ role }) => {
  const [colleges, setColleges] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedMentor, setSelectedMentor] = useState("");
  const [members, setMembers] = useState([{ name: "" }]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListModal, setIsListModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [currentMemberIndex, setCurrentMemberIndex] = useState(null);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalMentors, setTotalMentors] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [submittedTasks, setSubmittedTasks] = useState(0);
  const [toBeReviewedTasks, setToBeReviewedTasks] = useState(0);
  const [projects, setProjects] = useState([]);
  const [collegename, setCollegeName] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);


  const [formData, setFormData] = useState({
    name: "",
    description: "",
    collegeId: "",
    mentorId: "",
    members: [],
    collegeName: "",
    lastDate: "",
    localDateTime: "",
    projectId: "",
    projectName: ""
  });

  const mentorOptions = mentors.map((mentor) => ({
    value: mentor.id,
    label: `${mentor.name}`,
  }));
  const collegeOptions = colleges.map((college) => ({
    value: college.id,
    label: college.name,
  }));
  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      lastDate: date ? date.toISOString().split("T")[0] : '',
    }));
  };
  const projectOptions = (projects || []).map((project) => ({
    value: project.id,
    label: project.name,
  }));
  
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      padding: "0.7rem",
      backgroundColor: "#fafafa",
      border: "1px solid #ccc",
      borderColor: state.isFocused ? "#5eb5ae" : "#ccc",
      borderRadius: "8px",
      fontSize: "1rem",
      transition: "all 0.3s ease",
      boxShadow: state.isFocused ? "0 0 5px rgba(94, 181, 174, 0.3)" : "none",
      cursor: "pointer",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "#5eb5ae"
        : "#fff",
      color: state.isFocused ? "#fff" : "#333",
      fontSize: "1rem",
      padding: "0.75rem 1rem",
      cursor: "pointer",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#888",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#333",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      zIndex: 20,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#5eb5ae",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };


  useEffect(() => {
    if (collegename) {
      const collegeStudents = students.filter(student => student.collegeName === collegename);
      console.log("Filtered Students:", collegeStudents);
      setFilteredStudents(collegeStudents);
    } else {
      setFilteredStudents([]);
    }
  }, [collegename, students]);


  useEffect(() => {


    const fetchStats = async () => {
      try {

        const tasks = await getAllTasks();
        setTotalTasks(tasks.response.length);

        const submittedCount = tasks.response.filter(task => task.status === "Not Submitted").length;
        const toBeReviewedCount = tasks.response.filter(task => task.status.toLowerCase() === "to be reviewed").length;

        setSubmittedTasks(submittedCount);
        setToBeReviewedTasks(toBeReviewedCount);



      } catch (error) {
        console.error("Error fetching stats", error);
      }
    };

    const fetchStatsAdmin = async () => {
      try {
        const projects = await getAllProjects();
        setTotalProjects(projects.response.length);

        const studentsResponse = await getUsers("STUDENT");
        setStudents(studentsResponse.response);
        setTotalStudents(studentsResponse.response.length);


      } catch (error) {
        console.error("Error fetching stats", error);
      }
    }

    const fetchProjects = async () => {
      try {

        const projects = await getAllProjects();

        setProjects(projects.response);

      } catch (error) {
        console.error("Error fetching stats", error);
      }
    }
    const fetchColleges = async () => {
      try {
        const response = await getAllColleges();
        setColleges(response.response || []);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };

    const fetchMentors = async () => {
      try {
        const response = await getUsers("MENTOR");
        setTotalMentors(response.response.length);
        setMentors(response.response || []);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    if (role === "admin") {
      fetchColleges();
      fetchMentors();
      fetchStatsAdmin();
    } else {
      fetchStats();
      fetchProjects();
    }
  }, [role]);

  const fetchStudentsByCollege = async (collegename) => {
    console.log("Fetching students forhghhghcgf:", collegename);

    if (!collegename) {
      setAlertTitle("Error");
      setAlertMessage("Please select a college first");
      setShowAlert(true);
      return [];
    }

    try {
      const filteredStudents = students.filter(student => student.collegeName === collegename);
      console.log("Filtered Students:", filteredStudents);
      return filteredStudents;
    } catch (error) {
      console.error("Error fetching students:", error);
      setAlertTitle("Error");
      setAlertMessage("Error fetching students");
      setShowAlert(true);
      return [];
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "lastDate") {
      const localDateTime = `${value}T00:00:00`;

      setFormData((prevData) => ({
        ...prevData,
        lastDate: value,
        localDateTime: localDateTime,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  const handleMemberClick = (index) => {
    if (!selectedCollege) {
      setAlertTitle("Error");
      setAlertMessage("Please select a college first");
      setShowAlert(true);
      return;
    }

    setCurrentMemberIndex(index);
    setIsModalOpen(true);
  };

  const handleStudentSelect = (student) => {
    setMembers((prevMembers) => {
      const newMembers = [...prevMembers];
      newMembers[currentMemberIndex] = student;
      return newMembers;
    });

    setFilteredStudents((prevFiltered) =>
      prevFiltered.filter((s) => s.id !== student.id)
    );

    setIsModalOpen(false);
  };

  const addMember = () => {
    if (members.length < 4) {
      setMembers([...members, { name: "" }]);
    }
  };

  const removeMember = (index) => {
    setMembers((prevMembers) => {
      const removedMember = prevMembers[index];
      const updatedMembers = prevMembers.filter((_, i) => i !== index);

      if (removedMember) {
        setFilteredStudents((prevFiltered) => [...prevFiltered, removedMember]);
      }

      return updatedMembers;
    });
  };

  const handleCollegeChange = (selectedCollegeId) => {
    const selectedCollegeObj = colleges.find(college => college.id === selectedCollegeId);

    if (selectedCollegeObj) {
      setCollegeName(selectedCollegeObj.name);
      setSelectedCollege(selectedCollegeId);

      setFormData(prevData => ({
        ...prevData,
        collegeId: selectedCollegeId,
        collegeName: selectedCollegeObj.name
      }));

      setMembers([{ name: "" }]);
      setFilteredStudents([]);
    } else {
      setCollegeName('');
      setSelectedCollege('');
    }
  };

  const handleProjectSelect = (selectedOption) => {
    const selectedProject = projects.find(p => p.id === selectedOption.value);

    if (selectedProject) {
      setFormData(prevData => ({
        ...prevData,
        projectId: selectedProject.id,
        projectName: selectedProject.name
      }));
    }
  };


  const handleMentorChange = (e) => {
    const selectedMentorId = e.target.value;
    const selectedMentorObj = mentors.find(mentor => mentor.id === selectedMentorId);

    setSelectedMentor(selectedMentorId);
    setFormData(prevData => ({
      ...prevData,
      mentorId: selectedMentorId,
      mentorName: selectedMentorObj ? `${selectedMentorObj.name} (${selectedMentorObj.email})` : ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (role === "admin") {
        const projectData = {
          name: formData.name,
          description: formData.description,
          collegeId: selectedCollege,
          mentorId: selectedMentor,
        };

        const response = await createProject(projectData);
        const projectId = response?.response?.id;

        if (projectId) {
          await Promise.all(
            members.map((member) => assignProject(member.id, projectId))
          );

          AlertModal.success("Success", "Project Assigned Successfully!");
          resetForm();
        } else {
          throw new Error("Project ID not found in response");
        }
      } else if (role === "mentor") {
        const taskData = {
          name: formData.name,
          description: formData.description,
          dueDate: formData.localDateTime,
          assignedTo: formData.projectId,
        };

        await createTask(taskData);
        AlertModal.success("Success", "Task Assigned Successfully!");
        resetForm();
      }
    } catch (error) {
      console.error("Error:", error);
      AlertModal.error("Error", error.message || "Something went wrong!");
    }
  };


  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      collegeId: "",
      mentorId: "",
      members: "",
      collegeName: "",
      mentorName: "",
      lastDate: "",
      localDateTime: "",
      projectId: "",
      projectName: "",
    });
    setSelectedCollege("");
    setSelectedMentor("");
    setMembers([{ name: "" }]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.statsContainer}>
        {role === "admin" ? (
          <>
            <StatsCard title="Total Projects" value={totalProjects} titleClass={styles.statsTitle} valueClass={styles.statsValue} />
            <StatsCard title="Total Students" value={totalStudents} titleClass={styles.statsTitle} valueClass={styles.statsValue} />
            <StatsCard title="Total Mentors" value={totalMentors} titleClass={styles.statsTitle} valueClass={styles.statsValue} />
          </>
        ) : (
          <>
            <StatsCard title="Total Tasks" value={totalTasks} titleClass={styles.statsTitle} valueClass={styles.statsValue} />
            <StatsCard title="Not Submitted" value={submittedTasks} titleClass={styles.statsTitle} valueClass={styles.statsValue} />
            <StatsCard title="To Be Reviewed" value={toBeReviewedTasks} titleClass={styles.statsTitle} valueClass={styles.statsValue} />
          </>
        )}
      </div>

      <div className={styles.formContainer}>
        <h2>{role === "admin" ? "ASSIGN NEW PROJECT" : "ASSIGN TASK"}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.inputBox}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={styles.inputBox}
              rows="3"
              required
            />
          </div>

          {role === "admin" ? (
            <>
              <div className={styles.formGroup}>
                <label>Mentor</label>
                <div className={styles.selectWrapper}>
                  <Select
                    options={mentorOptions}
                    onChange={(selected) => {
                      setSelectedMentor(selected.value);
                      setFormData(prevData => ({
                        ...prevData,
                        mentorId: selected.value
                      }));
                    }}
                    placeholder="Select Mentor"
                    styles={customSelectStyles}
                    className={styles.customDropdown}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>

                <label>College</label>
                <div className={styles.selectWrapper}>
                  <Select
                    options={collegeOptions}
                    onChange={(selected) => handleCollegeChange(selected?.value)}
                    placeholder="Select College"
                    styles={customSelectStyles}
                    className={styles.customDropdown}
                  />

                </div>
              </div>


              <div className={styles.formGroup}>
                <label>Members</label>
                <div className={styles.memberContainer}>
                  {members.map((member, index) => (
                    <div key={index} className={styles.memberInputWrapper}>
                      <input
                        type="text"
                        value={member.name}
                        onClick={() => handleMemberClick(index)}
                        readOnly
                        className={styles.inputBox}
                        placeholder="Click to select a student"
                      />
                      <button
                        type="button"
                        onClick={() => removeMember(index)}
                        className={styles.removeButton}
                        style={{ display: members.length > 1 ? "flex" : "none" }}
                      >
                        ❌
                      </button>
                    </div>
                  ))}

                  {members.length < 4 && (
                    <div className={styles.lastInputWrapper}>
                      <button type="button" onClick={addMember} className={styles.addButton}
                        style={{ flex: "0 0 auto" }}
                      >
                        ➕
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </>
          ) : (
            <>
              <div className={styles.dropdownContainer}>
                <label className={styles.dropdownLabel}>Select Project</label>
                <Select
                  options={projectOptions}
                  onChange={handleProjectSelect}
                  value={
                    formData.projectId
                      ? { value: formData.projectId, label: formData.projectName }
                      : null
                  }
                  placeholder="Choose a project"
                  styles={customSelectStyles}
                  className={styles.customDropdown}
                />

              </div>

              <div className={styles.formGroup}>
                <label>Due Date</label>
                <DatePicker
                  selected={formData.lastDate ? new Date(formData.lastDate) : null}
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select a due date"
                  className={styles.dateInput}
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className={styles.submitButton}>
            {role === "admin" ? "Assign Project" : "Assign Task"}
          </button>
        </form>
      </div>
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Select a Student</h3>
            {filteredStudents.length > 0 ? (
              <ul>
                {filteredStudents.map((student) => (
                  <li key={student.id} onClick={() => handleStudentSelect(student)}>
                    {student.name} {/* ✅ Corrected this line */}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No students found for this college.</p>
            )}
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}



    </div>
  );
};

export default AssignForm;
