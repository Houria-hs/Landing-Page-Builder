import axios from "axios";

// const API_URL = "http://localhost:5000/api/projects";

export const getProjects = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get("https://landing-page-builder-backend.onrender.com/api/projects", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

export const createProject = async (projectData) => {
  const token = localStorage.getItem("token");

  const res = await axios.post("https://landing-page-builder-backend.onrender.com/api/projects", projectData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};



