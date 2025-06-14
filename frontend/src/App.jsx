import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import "./App.css";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import MyTrips from "./pages/My-Trips/MyTrips";
import PlannerPage from "./pages/PlannerPage";
import ProfilePage from "./pages/ProfilePages/ProfilePage";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ViewInfo from "./pages/My-Trips/ViewInfo";
import RespondTo from "./pages/My-Trips/RespondTo";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Sign-In" element={<Login />} />
      <Route path="/Sign-Up" element={<Signup />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/my-trips" element={<MyTrips />} />
      <Route path="/planner" element={<PlannerPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/view-info/:tripId" element={<ViewInfo />} />
      <Route path="/respond/:id" element={<RespondTo />} />
    </Routes>
  );
}
export default App;
