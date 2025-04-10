import axios from "axios";

const API_URL = "http://localhost:8080/api/leaderboards";

export const getLeaderboard = async (type) => {
  try {
    // Convert type to uppercase as required by the API
    const formattedType = type.toUpperCase();
    
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}`, {
      params: { type: formattedType },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    
    const rawData = response.data.response;

    const formattedData = {
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Leaderboard`,
      ranking: rawData.map(item => ({
        rank: item.rank,
        name: item.name,
        college: item.college,
        proj: item.numProjects,
        points: item.score
      })),
      leaders: rawData.slice(0, 3).map(item => ({
        name: item.name,
        image: item.image ? `data:image/jpeg;base64,${item.image}` : "collegea.png",
        points: item.score,
        wins: item.numProjects,
        tasks: item.numTasks
      })),
      tableHeaders: formattedType === "STUDENT" || formattedType === "PROJECT"
        ? ["Rank", "Name", "Projects", "College", "Points"]
        : ["Rank", "Name", "Projects", "Points"]
    };

    return formattedData;
  } catch (error) {
    console.error("Leaderboard fetch failed", error);
    throw error;
  }
};