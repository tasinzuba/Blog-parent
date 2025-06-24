// src/pages/admin/CreatePost.jsx (MUI দিয়ে নতুন ডিজাইন)

import axios from 'axios';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

// MUI কম্পোনেন্ট ইম্পোর্ট
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (file) {
            formData.append('featureImage', file);
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate('/admin/dashboard');
        } catch (error) {
            console.error("Failed to create post:", error);
            alert("Failed to create post. Please check your inputs.");
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Create a New Post
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Post Title"
                        variant="outlined"
                        fullWidth
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ mb: 3 }}
                    />

                    <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        sx={{ mb: 3 }}
                    >
                        Upload Feature Image
                        <input
                            type="file"
                            hidden
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </Button>
                    {file && <Typography sx={{ mb: 3 }}>Selected file: {file.name}</Typography>}

                    <Typography variant="h6" sx={{ mb: 1 }}>Content</Typography>
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        style={{ marginBottom: '24px' }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                         <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/admin/dashboard')}
                        >
                            Back to Dashboard
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            endIcon={<SendIcon />}
                        >
                            Publish Post
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default CreatePost;