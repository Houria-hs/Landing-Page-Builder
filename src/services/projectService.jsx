import axios from "axios";

// const API_URL = "http://localhost:5000/api/projects";

export const getProjects = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get("http://localhost:5000/api/projects", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

export const createProject = async (projectData) => {
  const token = localStorage.getItem("token");

  const res = await axios.post("http://localhost:5000/api/projects", projectData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};



