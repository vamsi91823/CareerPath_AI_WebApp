import axios from "axios";

const API = "https://careerpathai-api.onrender.com/api/users/profileDetails";

export const getProfile = async (userId) => {
  const res = await axios.get(`${API}/${userId}`);
  return res.data;
};

export const saveProfile = async (userId, data) => {
  const res = await axios.post(API, { userId, ...data });
  return res.data;
};
