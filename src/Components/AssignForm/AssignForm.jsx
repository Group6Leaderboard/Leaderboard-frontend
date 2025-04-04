import React, { useEffect, useState } from "react";
import styles from "./assignForm.module.css";
import StatsCard from "../RectangleCards/Statscard";
import { createProject, getAllProjects } from "../../services/projectService";
import { getAllColleges } from "../../services/collegeService";
import { getUsers } from "../../services/userService";
import { assignProject } from "../../services/studentProjectService";
import { getAllTasks, createTask } from "../../services/taskService";
import ListModal from "../ListModal/ListModal";

const AssignForm = ({ role }) => {
  const [colleges, setColleges] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedMentor, setSelectedMentor] = useState("");
  const [members, setMembers] = useState([""]);
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
      setMembers([...members, ""]);
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


  const handleCollegeChange = (e) => {
    const selectedCollegeId = e.target.value;
    const selectedCollegeObj = colleges.find(college => college.id === selectedCollegeId);

    if (selectedCollegeObj) {
      setCollegeName(selectedCollegeObj.name);
      setSelectedCollege(selectedCollegeId);

      setFormData(prevData => ({
        ...prevData,
        collegeId: selectedCollegeId,
        collegeName: selectedCollegeObj.name
      }));

      console.log("Selected College:", selectedCollegeObj.name);
    } else {
      setCollegeName('');
      setSelectedCollege('');
    }

    e.target.size = 1;
    e.target.blur();
  };

  const handleProjectSelect = (selectedProject) => {
    setFormData(prevData => ({
      ...prevData,
      projectId: selectedProject.id,
      projectName: selectedProject.name
    }));
    setIsListModal(false);
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
          mentorId: selectedMentor
        };

        const response = await createProject(projectData);
        const projectId = response?.response?.id;

        console.log("Extracted Project ID:", projectId);
        if (projectId) {
          await Promise.all(
            members.map(async (member) => {
              await assignProject(member.id, projectId);
            })
          );

          setAlertTitle("Success");
          setAlertMessage("Project Assigned Successfully");
          setShowAlert(true);
          resetForm();
        } else {
          throw new Error("Project ID not found in response");
        }
      } else if (role === "mentor") {

        const taskData = {
          name: formData.name,
          description: formData.description,
          dueDate: formData.localDateTime,
          assignedTo: formData.projectId
        };
        const response = await createTask(taskData);
        alert("Task Assigned Successfully");
        resetForm();
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertTitle("Error");
      setAlertMessage(error.message || "Something went wrong");
      setShowAlert(true);
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
    setMembers([""]);
    setProjects("");
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
        <h2>{role === "admin" ? "CREATE PROJECT" : "ASSIGN TASK"}</h2>
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
                  <select
                    name="mentorId"
                    value={selectedMentor}
                    onChange={handleMentorChange}
                    className={styles.selectBox}
                    required
                  >
                    <option value="" disabled>Select Mentor</option>
                    {mentors.map((mentor) => (
                      <option
                        key={mentor.id}
                        value={mentor.id}
                        className={styles.optionItem}
                      >
                        {mentor.name} ({mentor.email})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>

                <label>College</label>
                <div className={styles.selectWrapper}>
                  <select
                    name="collegeId"
                    value={selectedCollege}
                    onChange={handleCollegeChange}
                    className={styles.selectBox}
                    required
                    // onFocus={(e) => e.target.size = 4}
                    onBlur={(e) => e.target.size = 1}
                  >
                    <option value="" disabled>Select College</option>
                    {colleges.map((college) => (
                      <option key={college.id} value={college.id} className={styles.optionItem}>
                        {college.name}
                      </option>
                    ))}
                  </select>
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
                <input
                  type="text"
                  className={styles.inputBox}
                  readOnly
                  value={formData.projectName || "Choose a project"}
                  onClick={() => setIsListModal(true)}
                />

                <ListModal
                  isOpen={isListModal}
                  onClose={() => setIsListModal(false)}
                  data={projects}
                  onSelect={handleProjectSelect}
                />
              </div>

              <div className={styles.dueDate}>
                <label>Due Date</label>
                <input
                  type="date"
                  name="lastDate"
                  value={formData.lastDate}
                  onChange={handleChange}
                  className={styles.inputBox}
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
