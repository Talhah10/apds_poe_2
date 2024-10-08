import React, { useState } from 'react';
import './NotificationsPage.css';
import BackButton from './BackButton'; // Import BackButton component

const NotificationsPage = () => {
  const [filter, setFilter] = useState('all'); // State to manage filtering
  const [sortOrder, setSortOrder] = useState('recent'); // State for sorting order

  // Sample notifications with more detail
  const notifications = [
    { id: 1, type: 'payment', message: 'Paid R500 to John Doe for services rendered', date: '2024-10-07', time: '10:30 AM' },
    { id: 2, type: 'transfer', message: 'Received R1,200 from XYZ Ltd. for project payment', date: '2024-10-06', time: '11:00 AM' },
    { id: 3, type: 'outgoing', message: 'Transferred R300 to FNB for rent payment', date: '2024-10-05', time: '9:45 AM' },
    { id: 4, type: 'incoming', message: 'Deposit of R2,000 from Capitec Bank for salary', date: '2024-10-04', time: '1:15 PM' },
    { id: 5, type: 'statement', message: 'Your account statement for September is available.', date: '2024-10-01', time: '3:00 PM' },
    { id: 6, type: 'update', message: 'Your password was updated successfully on 2024-09-30.', date: '2024-09-30', time: '8:00 AM' },
    { id: 7, type: 'payment', message: 'Paid R1,500 to ABC Corp for consulting services', date: '2024-09-29', time: '2:00 PM' },
    { id: 8, type: 'incoming', message: 'Received R1,000 from John Smith for loan repayment', date: '2024-09-28', time: '4:00 PM' },
    { id: 9, type: 'transfer', message: 'Transferred R800 to Standard Bank for utility bills', date: '2024-09-27', time: '10:00 AM' },
    { id: 10, type: 'statement', message: 'Your account statement for August is available.', date: '2024-09-26', time: '3:00 PM' },
  ];

  // Sort notifications based on the selected order
  const sortedNotifications = [...notifications].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return sortOrder === 'recent' ? dateB - dateA : dateA - dateB;
  });

  // Filter notifications based on the selected filter
  const filteredNotifications = sortedNotifications.filter(notification => 
    filter === 'all' || notification.type === filter
  );

  return (
    <div className="notifications-container">
      <BackButton /> {/* Add Back Button here */}
      <h1>Notifications</h1>
      <div className="filter-sort-options">
        <div className="filter-options">
          <span>Filter by:</span>
          {['all', 'payment', 'transfer', 'outgoing', 'incoming', 'statement'].map(option => (
            <button 
              key={option} 
              className={`filter-button ${filter === option ? 'active' : ''}`} 
              onClick={() => setFilter(option)}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
        <div className="sort-options">
          <span>Sort by:</span>
          {['recent', 'oldest'].map(order => (
            <button 
              key={order} 
              className={`sort-button ${sortOrder === order ? 'active' : ''}`} 
              onClick={() => setSortOrder(order)}
            >
              {order === 'recent' ? 'Most Recent' : 'Oldest'}
            </button>
          ))}
        </div>
      </div>
      <div className="notification-list">
        {filteredNotifications.length === 0 ? (
          <p>No notifications to display.</p>
        ) : (
          <ul>
            {filteredNotifications.map(notification => (
              <li key={notification.id} className={`notification ${notification.type}`}>
                <div className="notification-message">
                  <span>{notification.message}</span>
                  <span className="notification-time">{`${notification.date} - ${notification.time}`}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
