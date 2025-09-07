import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import "../../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(
        "http://localhost:5252/api/v1/users/login",
        { email, password }
      );

      localStorage.setItem("accessToken", response.data.data.accessToken);

      window.localStorage.setItem("loggedIn", "true");
      navigate("/home");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", err);
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate("/register_1");
  };

  return (
    <div className="auth-container">
      <div className="auth-left-half">
        <div className="hero-overlay"></div>
        <div className="welcome-section">
          <h1 className="welcome-title">
            Welcome to <span className="text-gradient">Inkspire</span>
          </h1>
          <p className="welcome-tagline">
            Sign in to continue your journey and share your amazing stories.
          </p>
        </div>
      </div>
      <div className="auth-right-half">
        <div className="auth-form-container">
          <div className="login-card glass-effect">
            <h2 className="login-title">Login to your account</h2>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="submit-button">
                Login
              </button>
            </form>
            <div className="switch-auth-link">
              New user? <span onClick={handleRegisterClick}>Register here</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
