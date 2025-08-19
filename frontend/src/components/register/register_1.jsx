// Step1.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import bloggerLogo from "../../assets/blogger.png";

export default function Register_1({ formData, setFormData }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState(formData.email || "");
  const [password, setPassword] = useState(formData.password || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, email, password });
    navigate("/register_2");
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="register-container">
      {/* Logo */}
      <img src={bloggerLogo} alt="Blogger Logo" className="register-logo" />

      <div className="register-card">
        {/* Progress Indicator */}
        <div className="progress-container">
          <div className="progress-steps">
            <div className="step active">1</div>
            <div className="step-connector inactive"></div>
            <div className="step inactive">2</div>
          </div>
          <div className="progress-text">Step 1 of 2</div>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Next
          </button>
        </form>
        <div>Already a User ?</div>
        <form onSubmit={handleLoginSubmit}>
          <button>sign in</button>
        </form>
      </div>
    </div>
  );
}
