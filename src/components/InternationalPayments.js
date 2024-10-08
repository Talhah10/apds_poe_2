import React, { useState } from 'react';
import './InternationalPayments.css';
import BackButton from './BackButton'; // Import BackButton component

const InternationalPayments = () => {
  const [recipient, setRecipient] = useState(''); // New state for recipient
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [provider, setProvider] = useState('PayPal');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};

    // Validate Recipient (must not be empty)
    if (!recipient.trim()) {
      formErrors.recipient = 'Recipient name is required.';
    }

    // Validate Amount (non-negative)
    if (amount <= 0) {
      formErrors.amount = 'Amount must be greater than zero.';
    }

    // Validate Card Number (15 or 16 digits)
    if (!/^\d{15,16}$/.test(cardNumber)) {
      formErrors.cardNumber = 'Card number must be 15 or 16 digits.';
    }

    // Validate Expiry Date (MM/YY format and future date)
    const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!expiryRegex.test(expiryDate)) {
      formErrors.expiryDate = 'Invalid expiry date format (MM/YY).';
    } else {
      const [month, year] = expiryDate.split('/');
      const currentDate = new Date();
      const inputDate = new Date(`20${year}`, month - 1);
      if (inputDate <= currentDate) {
        formErrors.expiryDate = 'Expiry date must be in the future.';
      }
    }

    // Validate CVV (3 or 4 digits)
    if (!/^\d{3,4}$/.test(cvv)) {
      formErrors.cvv = 'CVV must be 3 or 4 digits.';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Payment Details:', {
        recipient,
        amount,
        currency,
        provider,
        cardNumber,
        expiryDate,
        cvv,
      });
      alert('International payment processed!');
    }
  };

  return (
    <div className="int-payments-container">
      <BackButton />
      <h2>Secure International Payment</h2>
      <form onSubmit={handleSubmit} className="int-payments-form">
        
        {/* New recipient section */}
        <div className="form-group">
          <label>Recipient:</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
          {errors.recipient && <span className="error-message">{errors.recipient}</span>}
        </div>

        {/* Existing form elements */}
        <div className="form-group">
          <label>Amount :</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          {errors.amount && <span className="error-message">{errors.amount}</span>}
        </div>
        <div className="form-group">
          <label>Currency:</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="ZAR">ZAR</option>
          </select>
        </div>
        <div className="form-group">
          <label>Provider:</label>
          <select value={provider} onChange={(e) => setProvider(e.target.value)}>
            <option value="PayPal">PayPal</option>
            <option value="SWIFT">SWIFT</option>
            <option value="Western Union">Western Union</option>
            <option value="Visa">Visa</option>
            <option value="MasterCard">MasterCard</option>
          </select>
        </div>
        <div className="form-group">
          <label>Card Number:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
          {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
        </div>
        <div className="form-group">
          <label>Expiry Date (MM/YY):</label>
          <input
            type="text"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
          {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
        </div>
        <div className="form-group">
          <label>CVV:</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
          {errors.cvv && <span className="error-message">{errors.cvv}</span>}
        </div>
        <button type="submit" className="int-payments-btn">
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default InternationalPayments;
