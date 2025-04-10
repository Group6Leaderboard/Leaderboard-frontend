import axios from "axios";
 
const API_URL = "http://localhost:8080/api/users";
 
 
export const getUsers = async (role, email, id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_URL, {
      params: { role, email, id },
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
 
// export const updateUser = async (userDto, image) => {
//   try {
//     const token = localStorage.getItem("token");
//     const formData = new FormData();
//     if (userDto) formData.append("userDto", JSON.stringify(userDto));
//     if (image) formData.append("image", image);
 
//     const response = await axios.put(API_URL, formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : { message: "Network Error" };
//   }
// };
 
export const updateUser = async (userDto, image) => {
  try {
    const token = localStorage.getItem("token");
 
    const formData = new FormData();
    if (userDto) {
      formData.append("userDto", new Blob([JSON.stringify(userDto)], { type: "application/json" }));
    }
    if (image) {
      formData.append("image", image);
    }
 
    const response = await axios.put("http://localhost:8080/api/users", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't manually set Content-Type — let Axios set it with the correct boundary
      },
    });
 
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};
 
 
export const deleteUser = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};
 
 
 