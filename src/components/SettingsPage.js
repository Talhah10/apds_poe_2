import React, { useState, useEffect } from 'react';
import './SettingsPage.css'; // Import corresponding CSS file
import BackButton from './BackButton'; // Import BackButton component

const SettingsPage = () => {
  const [userData, setUserData] = useState({
    username: 'currentUsername', // Fetch current username from API
    email: 'currentEmail@example.com', // Fetch current email from API
  });

  const [newPassword, setNewPassword] = useState('');
  const [limit, setLimit] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [language, setLanguage] = useState('English');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch user data from API on component mount
    // Simulating fetching user data
    setUserData({
      username: 'LubnahO123',
      email: 'LubnahO123@gmail.com',
    });
    // Set initial values for limit and other settings if necessary
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
  };

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const validateForm = () => {
    let formErrors = {};
    
    if (newPassword.length < 8) {
      formErrors.password = 'Password must be at least 8 characters long';
    }

    if (limit < 0) {
      formErrors.limit = 'Limit cannot be negative';
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      //  API call to update user data
      const response = await fetch('http://localhost:5000/api/users/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...userData, newPassword, limit, notificationsEnabled, twoFactorEnabled, language }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Profile updated successfully!');
      } else {
        setErrors(data.errors || { general: 'Failed to update profile' });
      }
    } catch (error) {
      console.error("Error during update:", error);
      setErrors({ general: 'An error occurred. Please try again later.' });
    }
  };

  return (
    <div className="settings-container">
      <BackButton /> {}
      <h1>Profile & Settings</h1>
      <p>This is where you can update your profile and settings.</p>

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={handlePasswordChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label>Set Spending Limit (ZAR)</label>
          <input
            type="number"
            value={limit}
            onChange={handleLimitChange}
            required
          />
          {errors.limit && <span className="error">{errors.limit}</span>}
        </div>

        <div className="form-group">
          <label>Manage Notifications</label>
          <div className="toggle-container">
            <span>Enable Notifications</span>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={handleNotificationToggle}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Two-Factor Authentication</label>
          <div className="toggle-container">
            <span>{twoFactorEnabled ? 'Disable' : 'Enable'} Two-Factor Authentication</span>
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={handleTwoFactorToggle}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Language Preference</label>
          <select value={language} onChange={handleLanguageChange}>
            <option value="English">English</option>
            <option value="Afrikaans">Afrikaans</option>
            <option value="Zulu">Zulu</option>
            <option value="Xhosa">Xhosa</option>
            {/* Add more languages as needed */}
          </select>
        </div>

        {errors.general && <div className="error general-error">{errors.general}</div>}
        {message && <div className="success">{message}</div>}
        <button type="submit" className="btn-primary">Update Settings</button>
      </form>
    </div>
  );
};

export default SettingsPage;
