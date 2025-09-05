import "./landing.css";
import "../../App.css";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  const handleGetStarted = (e) => {
    e.preventDefault();
    // navigate("/register_1");
    if (isLoggedIn === "true") {
      navigate("/home");
    } else {
      navigate("/register_1");
    }
  };
  const handleGetStarted_home = (e) => {
    e.preventDefault();
    // navigate("/home");
    if (isLoggedIn === "true") {
      navigate("/home");
    } else {
      navigate("/register_1");
    }
  };

  return (
    <div className="landing">
      <section className="hero">
        {/* Background Hero Image */}
        <div className="hero-bg-image">
          <div className="hero-overlay"></div>
        </div>

        {/* Hero Content */}
        <div className="hero-content glass-effect">
          <h1 className="hero-title">
            Welcome to <span className="text-gradient">Inkspire</span>
          </h1>
          <p className="hero-subtitle">
            Create, share, and discover amazing stories. Join our community of
            writers and readers who are passionate about sharing knowledge and
            experiences.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={handleGetStarted}>
              Get Started
            </button>

            <button className="btn btn-primary" onClick={handleGetStarted_home}>
              Home
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
