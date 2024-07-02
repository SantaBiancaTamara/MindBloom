import React from 'react';
import {useNavigate} from 'react-router-dom';
import '../styles/StartPage.css';

const StartPage = () => {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register');
    }

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="container">
            <h1 className="title">Mind Bloom</h1>
            <p className="app-subtitle">From Mood Tracking to Emotional Blooming</p>
            <div className="buttonContainer">
                <button onClick={handleRegister} className="button">Register</button>
                <button onClick={handleLogin} className="button">Login</button>
            </div>
        </div>
    );
};


export default StartPage;

