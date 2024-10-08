
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css'; 

const BackButton = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <button onClick={handleBackClick} className="back-button">
            Back
        </button>
    );
};

export default BackButton;
