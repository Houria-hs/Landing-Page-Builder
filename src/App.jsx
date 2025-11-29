import HomePage from "./components/HomePage"
import { Routes, Route } from "react-router-dom";
import Builder from "./components/BuilderPage";
import UserProfile from "./components/userProfile";
import Register from "./Authentications/register";
import Login from "./Authentications/Login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectsPage from "./components/projects";
import { ThemeGenerator } from "./AI/ThemGenerator";


function App() {

   const [user , setUser] = useState(null);

const navigate = useNavigate();

const handleRegister = (user) => {
  console.log("User registered:", user);
  setUser(user);
  navigate("/builder");
};
   const handleLogin = (user) => {
    console.log("User Loged in:", user);
    setUser(user)
    navigate("/builder");
  };
 
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/builder" element={<Builder />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/register" element={<Register  onRegister={handleRegister} />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/AI" element={<ThemeGenerator />} />
    </Routes>
    </>
  )
}

export default App
