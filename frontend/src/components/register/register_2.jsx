import { useState } from "react";
import axios from "axios";
import "./register.css";
import "../../App.css";

export default function Register_2({ formData, setFormData }) {
  const [username, setUsername] = useState(formData.username || "");
  const [fullName, setFullName] = useState(formData.fullName || "");
  const [bio, setBio] = useState(formData.bio || "");
  const [avatar, setavatar] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setavatar(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = { ...formData, username, fullName, bio, avatar };
    console.log("Final Registration Data:", updatedData);

    // Save it in the main form state
    setFormData(updatedData);

    const form = new FormData();
    for (let key in updatedData) {
      form.append(key, updatedData[key]);
    }

    try {
      const res = await axios.post(
        "http://localhost:5252/api/v1/users/register", // your backend endpoint
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Response from backend: ", res.data);
      alert("Registration successful!");
    } catch (error) {
      console.error("Error sending registration:", error);
      alert("Registration failed!");
    }
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
                <div className="step completed">1</div>
                <div className="step-connector active"></div>
                <div className="step active">2</div>
              </div>
              <div className="progress-text">Step 2 of 2</div>
            </div>

            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Choose a unique username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Bio</label>
                <textarea
                  className="form-input form-textarea"
                  placeholder="Tell us a bit about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label className="form-label">Profile Picture</label>
                <div className="file-upload-container">
                  <div className="file-input-wrapper">
                    <input
                      type="file"
                      id="avatar-upload"
                      className="file-input"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                    <label htmlFor="avatar-upload" className="file-input-label">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      {avatar ? avatar.name : "Choose an image"}
                    </label>
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="image-preview"
                      />
                    )}
                  </div>
                </div>
              </div>

              <button type="submit" className="submit-button">
                Complete Registration
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
