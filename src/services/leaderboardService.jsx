import axios from "axios";

const API_URL = "http://localhost:8080/api/leaderboards"; 

export const getLeaderboard = async (type) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_URL, {
      params: { type },
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
