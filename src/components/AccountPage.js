import React from 'react';
import './AccountPage.css'; // Import the CSS file
import BackButton from './BackButton'; // Import BackButton component

const AccountPage = () => {
  return (
    <div className="account-container">
      <BackButton /> {}
      <h1>Your HeroBank Account Overview</h1>

      {/* Account Summary */}
      <div className="account-summary">
        <h2>Account Summary</h2>
        <p>Account Holder: Talhah Motala</p>
        <p>Account Number: 123456789</p>
        <p>Account Type: Cheque Account</p>
        <p>Branch: Johannesburg Central</p>
        <p>Branch Code: 250655</p>
        <p>Balance: R75,000</p> {/* Updated to Rands */}
      </div>

      {/* Recent Transactions */}
      <div className="recent-transactions">
        <h2>Recent Transactions</h2>
        <p>1. R1,500 debit for Online Shopping - 5th October 2024</p>
        <p>2. R350 debit for Groceries - 3rd October 2024</p>
        <p>3. R2,000 credit from Salary Deposit - 1st October 2024</p>
      </div>

      {/* Upcoming Payments */}
      <div className="upcoming-payments">
        <h2>Upcoming Payments</h2>
        <p>1. R2,000 debit for Car Loan - 15th October 2024</p>
        <p>2. R800 debit for Electricity Bill - 18th October 2024</p>
        <p>3. R600 debit for Mobile Contract - 22nd October 2024</p>
      </div>

      {/* Additional Info */}
      <div className="additional-info">
        <h2>Additional Information</h2>
        <p>Monthly Account Fees: R120</p>
        <p>Interest Earned: R50 for September 2024</p>
        <p>Card Status: Active</p>
        <p>Online Banking: Enabled</p>
      </div>
    </div>
  );
};

export default AccountPage;
