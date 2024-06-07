import { useState } from 'react';
import { Card, Input, Typography, Button } from '@mui/joy';
import axios from 'axios';
import PropTypes from 'prop-types';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/user_api',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
});

const Authentication = ({ onAuthenticated }) => {
    const [view, setView] = useState('login'); // Default view is login
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (view === 'login') {
                await apiClient.post(`/login/`, {
                    username,
                    password,
                });
                onAuthenticated();
            } else {
                await apiClient.post(`/register/`, {
                    username,
                    email,
                    password,
                })
                onAuthenticated();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card sx={{ width:"25%", display: 'flex', flexDirection: 'column', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            <Typography level='h2' color='primary' align='left'>{view.charAt(0).toUpperCase() + view.slice(1)}</Typography>
            {view === 'login' ? (
                <>
                    <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username'/>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password'/>
                </>
            ) : (
                <>
                    <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username'/>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email'/>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password'/>
                </>
            )}
            <Button onClick={handleSubmit}>Submit</Button>
            <Button variant="plain" color="neutral" onClick={() => setView(view === 'login' ? 'register' : 'login')}>{view === 'login' ? 'Dont have an account yet? ' : 'Already have an account?'}</Button>

        </Card>
    );
};

Authentication.propTypes = {
    onAuthenticated: PropTypes.func.isRequired,
};

export default Authentication;
