
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const Logo = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="logo"
  >
    <circle cx="50" cy="50" r="50" fill="#3498db" /> {/* Blue Circle */}
    <text x="50%" y="50%" textAnchor="middle" fill="#ffffff" fontSize="40" fontFamily="Arial" dy=".3em">
      HB
    </text>
  </svg>
);

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <header>
        <Logo /> {}
        <h1>Welcome To Your HeroBank Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>

      <div className="dashboard-content">
        <p>Manage your account, transfers, payments, and more from here:</p>

        <div className="dashboard-sections">
          <button onClick={() => navigate('/account')} className="dashboard-btn">
            Account Overview
          </button>
          <button onClick={() => navigate('/transfer')} className="dashboard-btn">
            Money Transfers
          </button>
          <button onClick={() => navigate('/payment')} className="dashboard-btn">
            Payments
          </button>
          <button onClick={() => navigate('/international-payments')} className="international-payment-btn">
            International Payments
          </button>
          <button onClick={() => navigate('/notifications')} className="dashboard-btn">
            Notifications
          </button>
        </div>

        <div className="profile-settings-container">
          <button onClick={() => navigate('/settings')} className="dashboard-btn">
            Profile & Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

