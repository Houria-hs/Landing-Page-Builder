import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const register = async (data) => {
  const res = await axios.post(`${API_URL}/register`, data);
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));
  return res.data.user;
};

export const login = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));
  return res.data.user;
};


export const getProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};



export const updateProfile = async (data) => {
  const token = localStorage.getItem("token");

  const res = await axios.put(
    "http://localhost:5000/api/users/update",
    data,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  // update localStorage with new data
  localStorage.setItem("user", JSON.stringify(res.data));

  return res.data;
};
