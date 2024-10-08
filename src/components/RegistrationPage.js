import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegistrationPage.css';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        let formErrors = {};
        
        if (!formData.username.match(/^[a-zA-Z0-9_]{3,20}$/)) {
            formErrors.username = 'Username must be 3-20 characters long and can only contain letters, numbers, and underscores';
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = 'Invalid email format';
        }

        if (formData.password.length < 8) {
            formErrors.password = 'Password must be at least 8 characters long';
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
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                navigate('/login');
            } else {
                setErrors(data.errors || { general: 'Registration failed' });
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setErrors({ general: 'An error occurred during registration. Please try again later.' });
        }
    };

    return (
        <div className="registration-page">
            <div className="registration-content">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            name="username"
                            placeholder="Username" 
                            value={formData.username} 
                            onChange={handleChange} 
                            required 
                        />
                        {errors.username && <span className="error">{errors.username}</span>}
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            name="password"
                            placeholder="Password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                        />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                    {errors.general && <div className="error general-error">{errors.general}</div>}
                    <button type="submit" className="btn-primary">Register</button>
                </form>
                <div className="login-link">
                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;