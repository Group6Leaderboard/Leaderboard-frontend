import axios from "axios";

const API_URL = "http://localhost:8080/api/colleges"; // Base URL for College API


export const getCollegeById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data.response;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

export const updateCollege = async (id, collegeData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/${id}`, collegeData, {
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

export const deleteCollege = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/${id}`, {
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

export const getAllColleges = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: "Network Error" };
    }
  };
