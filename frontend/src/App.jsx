import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register_2 from "./components/register/register_2.jsx";
import Register_1 from "./components/register/register_1.jsx";
import Landing from "./components/landing/landing.jsx";

import Login from "./components/login/login.jsx";
import Home from "./components/home/home.jsx";

export default function App() {
  const [formData, setFormData] = useState({});

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/register_1" />} /> */}
        <Route path="/" element={<Landing />} />
        //
        <Route
          path="/register_1"
          element={<Register_1 formData={formData} setFormData={setFormData} />}
        />
        <Route
          path="/register_2"
          element={<Register_2 formData={formData} setFormData={setFormData} />}
        />
        <Route
          path="/login"
          element={<Login formData={formData} setFormData={setFormData} />}
        />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}
