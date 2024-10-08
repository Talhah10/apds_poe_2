import React from 'react';
import './SupportPage.css'; 
import BackButton from './BackButton'; // Import BackButton component

const SupportPage = () => {
  return (
    <div className="support-page">
         <BackButton /> {}
      <h1>Contact Support</h1>
      <p>If you have any questions or need assistance, feel free to reach out to us!</p>
      
      <h2>Contact Information</h2>
      <p>Email: support@herobank.com</p>
      <p>Phone: 123-456-7890</p>

      <h2>FAQs</h2>
      <p>Check our <a href="#">Frequently Asked Questions</a> for more help.</p>

      {}
    </div>
  );
};

export default SupportPage;
