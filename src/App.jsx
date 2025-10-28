import HomePage from "./components/HomePage"
import { Routes, Route } from "react-router-dom";
import Builder from "./components/BuilderPage";


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/builder" element={<Builder />} />
    </Routes>
    </>
  )
}

export default App
