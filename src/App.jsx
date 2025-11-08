import HomePage from "./components/HomePage"
import { Routes, Route } from "react-router-dom";
import Builder from "./components/BuilderPage";
import UserProfile from "./components/userProfile";


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/builder" element={<Builder />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
    </>
  )
}

export default App
