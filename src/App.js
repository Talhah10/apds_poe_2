
import React from 'react'; 
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SupportPage from './components/SupportPage';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import AccountPage from './components/AccountPage'; // Import AccountPage
import TransferPage from './components/TransferPage'; // Import TransferPage
import PaymentPage from './components/PaymentPage'; // Import PaymentPage
import NotificationsPage from './components/NotificationsPage'; // Import NotificationsPage
import SettingsPage from './components/SettingsPage'; // Import SettingsPage
import InternationalPayments from './components/InternationalPayments'; // Import InternationalPayments

// Function to check if the token is valid
const isTokenValid = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    // Decode the token to get the expiration time
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp < Date.now() / 1000) {
      // Token has expired
      localStorage.removeItem('token');
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
};

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  return isTokenValid() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/home" 
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/account" 
        element={
          <PrivateRoute>
            <AccountPage />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/transfer" 
        element={
          <PrivateRoute>
            <TransferPage />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/payment" 
        element={
          <PrivateRoute>
            <PaymentPage />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/international-payments" 
        element={
          <PrivateRoute>
            <InternationalPayments />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/notifications" 
        element={
          <PrivateRoute>
            <NotificationsPage />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <PrivateRoute>
            <SettingsPage />
          </PrivateRoute>
        } 
      />
      {}
    </Routes>
  );
}

export default App;
