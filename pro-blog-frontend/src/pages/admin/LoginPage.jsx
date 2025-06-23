// src/pages/admin/LoginPage.jsx (MUI দিয়ে নতুন ডিজাইন)

import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../utils/auth';

// MUI কম্পোনেন্টগুলো ইম্পোর্ট করা হচ্ছে
import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            setAuthToken(response.data.token);
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Invalid email or password. Please try again.');
            console.error('Login failed:', err);
        }
    };

    return (
        // Container কম্পোনেন্ট পেজটিকে একটি নির্দিষ্ট প্রস্থ দেয় এবং মাঝখানে নিয়ে আসে
        <Container component="main" maxWidth="xs">
            {/* Box کمپوننٹটি একটি ডিভের মতো কাজ করে এবং স্টাইলিং-এর জন্য ব্যবহৃত হয় */}
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/* Typography কম্পোনেন্ট টেক্সট দেখানোর জন্য ব্যবহৃত হয় */}
                <Typography component="h1" variant="h5">
                    Admin Login
                </Typography>
                
                {/* সাধারণ <form> এর পরিবর্তে Box ব্যবহার করা হচ্ছে */}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    {/* সাধারণ <input> এর পরিবর্তে TextField কম্পোনেন্ট */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                    {/* এরর দেখানোর জন্য Alert কম্পোনেন্ট */}
                    {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                    
                    {/* সাধারণ <button> এর পরিবর্তে Button কম্পোনেন্ট */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained" // 'contained' স্টাইলটি বাটনটিকে সুন্দর করে
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default LoginPage;