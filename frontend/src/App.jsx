import React from "react"
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home/Home"
import './App.css'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Sign-In" element={<Login/>}/>
      <Route path="/Sign-Up" element={<Signup/>}/>
    </Routes>
  )
}

export default App
