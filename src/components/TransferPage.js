import React from 'react';
import './TransferPage.css'; // Import the CSS file
import BackButton from './BackButton'; // Import BackButton component

const TransferPage = () => {
  return (
    <div className="transfer-container">
        <BackButton /> {}
      <h1>Money Transfers</h1>

      {/* Transfer Summary */}
      <div className="transfer-summary">
        <h2>Transfer Overview</h2>
        <p>Total Incoming Transfers (this month): R15,000</p>
        <p>Total Outgoing Transfers (this month): R10,500</p>
        <p>Next Transfer Limit Reset: 31st October 2024</p>
      </div>

      {/* Recent Incoming Transfers */}
      <div className="recent-transfers incoming-transfers">
        <h2>Recent Incoming Transfers</h2>
        <p className="incoming">1. R5,000 credit from XYZ Ltd. - 4th October 2024</p>
        <p className="incoming">2. R7,500 credit from ABC Ltd. - 1st October 2024</p>
        <p className="incoming">3. R2,500 credit from John Doe - 28th September 2024</p>
      </div>

      {/* Recent Outgoing Transfers */}
      <div className="recent-transfers outgoing-transfers">
        <h2>Recent Outgoing Transfers</h2>
        <p className="outgoing">1. R1,200 debit to Electric Company - 5th October 2024</p>
        <p className="outgoing">2. R4,300 debit to School Fees - 3rd October 2024</p>
        <p className="outgoing">3. R5,000 debit to Rent - 1st October 2024</p>
      </div>

      {/* Transfer Actions */}
      <div className="transfer-actions">
        <h2>Transfer Actions</h2>
        <button className="transfer-btn">Initiate New Transfer</button>
        <button className="transfer-btn">View Transfer History</button>
      </div>
    </div>
  );
};

export default TransferPage;
