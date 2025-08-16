import React, { useEffect, useState } from "react";
import "./landing.css";
import "../../App.css";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetStarted = (e) => {
    e.preventDefault();
    navigate("/register_1");
  };

  const handleLearnMore = (e) => {
    e.preventDefault();
    // Smooth scroll to features section
    document.getElementById("features").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="landing">
      <section className="hero">
        {/* Background Hero Image */}
        <div className="hero-bg-image">
          <div className="hero-overlay"></div>
        </div>

        {/* Parallax Background Elements */}
        <div className="parallax-bg">
          <div
            className="parallax-shape"
            style={{
              transform: `translateY(${scrollY * 0.1}px) rotate(${
                scrollY * 0.05
              }deg)`,
            }}
          ></div>
          <div
            className="parallax-shape"
            style={{
              transform: `translateY(${scrollY * -0.15}px) rotate(${
                scrollY * -0.08
              }deg)`,
            }}
          ></div>
          <div
            className="parallax-shape"
            style={{
              transform: `translateY(${scrollY * 0.2}px) rotate(${
                scrollY * 0.12
              }deg)`,
            }}
          ></div>
          <div
            className="parallax-shape"
            style={{
              transform: `translateY(${scrollY * -0.1}px) rotate(${
                scrollY * -0.06
              }deg)`,
            }}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="hero-content glass-effect">
          <h1 className="hero-title">
            Welcome to <span className="text-gradient">BlogSpace</span>
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
            <button className="btn btn-secondary" onClick={handleLearnMore}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose BlogSpace?</h2>
            <p>
              Discover the features that make us the perfect platform for your
              blogging journey
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✍️</div>
              <h3>Easy Writing</h3>
              <p>
                Intuitive editor with rich formatting options and real-time
                preview
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3>Global Reach</h3>
              <p>Share your thoughts with readers from around the world</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Community</h3>
              <p>
                Engage with fellow writers and readers through comments and
                discussions
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Write and read on any device, anywhere, anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>What Our Users Say</h2>
            <p>Join thousands of satisfied bloggers who found their voice</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "BlogSpace helped me find my writing voice. The community is
                  incredibly supportive!"
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👩‍💻</div>
                <div className="author-info">
                  <h4>Sarah Johnson</h4>
                  <span>Tech Blogger</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "The best platform I've used for sharing my travel
                  experiences. Highly recommended!"
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">🧳</div>
                <div className="author-info">
                  <h4>Mike Chen</h4>
                  <span>Travel Writer</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "Clean interface, great features, and an amazing community.
                  Perfect for beginners!"
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">📚</div>
                <div className="author-info">
                  <h4>Emma Davis</h4>
                  <span>Book Reviewer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Active Writers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Published Posts</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100K+</div>
              <div className="stat-label">Monthly Readers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Blogging Journey?</h2>
            <p>
              Join thousands of writers who are already sharing their stories
              with the world
            </p>
            <button
              className="btn btn-primary btn-large"
              onClick={handleGetStarted}
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
