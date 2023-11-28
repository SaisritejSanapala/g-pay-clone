import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [phoneNum, setPhoneNum] = useState('');
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:4000/login', {
                phoneNum,
            });
            localStorage.setItem("user", phoneNum)
            navigate('/home');

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <label>
                Phone Number:
                <input
                    type="text"
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                />
            </label>
            <button onClick={handleLogin}>Log In</button>
        </div>
    );
};

export default Login;
