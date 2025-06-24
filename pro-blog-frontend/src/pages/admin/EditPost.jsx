// src/pages/admin/EditPost.jsx (MUI দিয়ে নতুন ডিজাইন)

import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';

// MUI কম্পোনেন্ট ইম্পোর্ট
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';

function EditPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [existingImage, setExistingImage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/posts/${id}`)
            .then(res => {
                setTitle(res.data.title);
                setContent(res.data.content);
                setExistingImage(res.data.featureImage);
            }).catch(err => console.error(err));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (file) {
            formData.append('featureImage', file);
        } else {
            formData.append('featureImage', existingImage);
        }

        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/posts/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate('/admin/dashboard');
        } catch (error) {
            console.error("Failed to update post:", error);
            alert("Failed to update post.");
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Edit Post
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
                    <Box sx={{ mb: 3 }}>
                        <Typography>Current Feature Image:</Typography>
                        {existingImage ? 
                            <img src={`http://localhost:5000${existingImage}`} alt="Current" style={{ width: '200px', marginTop: '10px' }} />
                            : <Typography variant='body2'>No feature image.</Typography>
                        }
                    </Box>
                    <Button variant="outlined" component="label" fullWidth sx={{ mb: 3 }}>
                        Upload New Image (Optional)
                        <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
                    </Button>
                    {file && <Typography sx={{ mb: 3 }}>New file selected: {file.name}</Typography>}
                    <Typography variant="h6" sx={{ mb: 1 }}>Content</Typography>
                    <ReactQuill theme="snow" value={content} onChange={setContent} style={{ marginBottom: '24px' }}/>
                    <Button type="submit" variant="contained" endIcon={<SendIcon />} sx={{ mt: 4 }}>
                        Update Post
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default EditPost;