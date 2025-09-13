import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Register_2 from "./components/register/register_2.jsx";
import Register_1 from "./components/register/register_1.jsx";
import Landing from "./components/landing/landing.jsx";

import Login from "./components/login/login.jsx";
import Home from "./components/home/home.jsx";

import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import UserProfile from "./components/userProfile/userProfile.jsx";
import CreatePost from "./components/createPost/createPost.jsx";
import Logout from "./components/logout/logout.jsx";

export default function App() {
  const [formData, setFormData] = useState({});
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  return (
    <Router>
      <Routes>
        {!isLoggedIn && (
          <>
            <Route
              path="/register_1"
              element={
                <Register_1 formData={formData} setFormData={setFormData} />
              }
            />
            <Route
              path="/register_2"
              element={
                <Register_2 formData={formData} setFormData={setFormData} />
              }
            />
            <Route
              path="/login"
              element={<Login formData={formData} setFormData={setFormData} />}
            />
            <Route path="/" element={<Landing />} />
          </>
        )}
        <Route path="/" element={<Landing />} />
        //protected routes
        <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/register_1" element={<Navigate to="/" />} />
          <Route path="/register_2" element={<Navigate to="/" />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </Router>
  );
}
