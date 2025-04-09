import axios from "axios";

const API_URL = "http://localhost:8080/api/student-projects"; 

export const assignProject = async (studentId, projectId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/students/${studentId}/projects/${projectId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

export const deleteStudentProject = async (studentProjectId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/${studentProjectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

export const getProjectsForStudent = async (studentId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/student-projects/projects`, {
      params: { studentId }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching student projects:", error);
    throw error;
  }
};

export const getMembersForProject = async (projectId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/student-projects/members`, {
      params: { projectId }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching members for project:", error);
    throw error;
  }
};

