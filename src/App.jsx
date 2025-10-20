import HomePage from "./components/HomePage"
import { Routes, Route } from "react-router-dom";
import Builder from "./components/BuilderPage";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/builder" element={<Builder />} />
    </Routes>
    {/* <Footer/> */}
    </>
  )
}

export default App
