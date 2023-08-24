import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Welcome from '../components/pages/welcome'; 
import { loginUser, registerUser } from '../redux/actions/userActions'; 

const WelcomeContainer = () => {
    const [login, showLogin] = useState(false);
    const dispatch = useDispatch();

    const toggleShowLogin = () => {
        showLogin(!login);
    };

    const handleLogin = (userId, password) => {
        dispatch(loginUser(userId, password));
    };

    const handleRegistration = (userData) => {
        dispatch(registerUser(userData));
    };

    return (
        <Welcome
            login={login}
            toggleShowLogin={toggleShowLogin}
            handleLogin={handleLogin}
            handleRegistration={handleRegistration}
        />
    );
};

export default WelcomeContainer;