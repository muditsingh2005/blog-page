// Step1.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import "../../App.css";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton";

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
    <div className="auth-container">
      <div className="auth-left-half">
        <div className="hero-overlay"></div>
        <div className="welcome-section">
          <h1 className="welcome-title">
            Join <span className="text-gradient">Inkspire</span>
          </h1>
          <p className="welcome-tagline">
            Share your stories, connect with readers, and explore a world of
            creativity.
          </p>
        </div>
      </div>
      <div className="auth-right-half">
        <div className="auth-form-container">
          <div className="register-card glass-effect">
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
            <GoogleLoginButton />

            <div className="switch-auth-link">
              Already a User? <span onClick={handleLoginSubmit}>Sign In</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
