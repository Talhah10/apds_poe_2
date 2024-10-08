import React, { useState } from 'react';
import './PaymentPage.css';
import BackButton from './BackButton'; // Import BackButton component


const PaymentPage = () => {
  const [recipientName, setRecipientName] = useState('');
  const [recipientAccount, setRecipientAccount] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState('HeroBank');
  const [branchNumber, setBranchNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [existingRecipient, setExistingRecipient] = useState('');
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [recipients, setRecipients] = useState([
    { name: 'John Doe', account: '123456789', reference: 'REF123', bank: 'FNB', branch: '12345' },
    { name: 'XYZ Ltd.', account: '987654321', reference: 'REF456', bank: 'Standard Bank', branch: '67890' },
  ]);

  const handleAddRecipient = () => {
    const newRecipient = { 
      name: recipientName, 
      account: recipientAccount, 
      reference: referenceNumber, 
      bank: selectedBank, 
      branch: branchNumber 
    };
    setRecipients([...recipients, newRecipient]);
    setRecipientName('');
    setRecipientAccount('');
    setReferenceNumber('');
    setSelectedBank('HeroBank');
    setBranchNumber('');
  };

  const handlePayment = () => {
    const payment = {
      recipient: existingRecipient || recipientName,
      amount: amount, // Just store the amount without "R"
      date: new Date().toLocaleDateString(),
      reference: referenceNumber
    };
    setPaymentHistory([payment, ...paymentHistory]);
    setAmount('');
    setReferenceNumber('');
  };

  return (
    <div className="payment-container">
        <BackButton /> {}
      <h1>Payments</h1>

      {/* Add New Recipient */}
      <div className="add-recipient">
        <h2>Add New Recipient</h2>
        <input
          type="text"
          placeholder="Recipient Name"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Recipient Account Number"
          value={recipientAccount}
          onChange={(e) => setRecipientAccount(e.target.value)}
        />

        {/* Select Bank */}
        <select value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)}>
          <option value="HeroBank">HeroBank</option>
          <option value="FNB">FNB</option>
          <option value="Standard Bank">Standard Bank</option>
          <option value="ABSA">ABSA</option>
          <option value="Capitec">Capitec</option>
          <option value="Nedbank">Nedbank</option>
        </select>
        
        <input
          type="text"
          placeholder="Branch Number"
          value={branchNumber}
          onChange={(e) => setBranchNumber(e.target.value)}
        />
        
        <button onClick={handleAddRecipient}>Add Recipient</button>
      </div>

      {/* Pay Existing Recipient */}
      <div className="pay-existing">
        <h2>Pay Existing Recipient</h2>
        <select
          value={existingRecipient}
          onChange={(e) => setExistingRecipient(e.target.value)}
        >
          <option value="">Select Recipient</option>
          {recipients.map((recipient, index) => (
            <option key={index} value={recipient.name}>
              {recipient.name} - {recipient.account} ({recipient.bank} - Branch: {recipient.branch})
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Amount (Rands)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Reference Number"
          value={referenceNumber}
          onChange={(e) => setReferenceNumber(e.target.value)}
        />
        <button onClick={handlePayment}>Pay</button>
      </div>

      {/* Payment History */}
      <div className="payment-history">
        <h2>Payment History</h2>
        {paymentHistory.length === 0 ? (
          <p>No payments yet.</p>
        ) : (
          <ul>
            {paymentHistory.map((payment, index) => (
              <li key={index}>
                {payment.date} - Paid R{payment.amount} to {payment.recipient} (Ref: {payment.reference})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
