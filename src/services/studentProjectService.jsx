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

export const getStudentProjects = async (studentId = null, projectId = null) => {
  try {
    const token = localStorage.getItem("token");
    const params = {};
    if (studentId) params.studentId = studentId;
    if (projectId) params.projectId = projectId;

    const response = await axios.get(API_URL, {
      params,
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
