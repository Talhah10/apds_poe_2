import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; 

const Logo = () => (
  <svg
    width="180" 
    height="180"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="logo"
  >
    <circle cx="50" cy="50" r="50" fill="#3498db" /> {/* Blue Circle */}
    <text x="50%" y="50%" textAnchor="middle" fill="#ffffff" fontSize="50" fontFamily="Arial" dy=".3em">
      HB
    </text>
  </svg>
);

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-content">
        <Logo /> {}
        <h1>Welcome to Hero Bank</h1>
        <p>Your trusted bank for managing your finances.</p>
        
        <p className="contact-support">
          <span>Need Help? </span>
          <a 
            href="#" 
            className="contact-link" 
            onClick={() => navigate('/support')} // Navigate to support page
          >
            Contact Support
          </a>
        </p>

        <div className="button-container">
          <button className="btn-primary" onClick={() => navigate('/register')}>Register</button>
          <button className="btn-secondary" onClick={() => navigate('/login')}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
