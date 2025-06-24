// src/pages/admin/AdminDashboard.jsx (MUI দিয়ে নতুন ডিজাইন)

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth';

// --- MUI কম্পোনেন্টগুলো ইম্পোর্ট করা হচ্ছে ---
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import {
    Box,
    Button,
    Container,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
// -----------------------------------------

function AdminDashboard() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/posts');
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin/login');
        } else {
            fetchPosts();
        }
    }, [navigate]);

    const deletePost = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:5000/api/posts/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchPosts();
            } catch (error) {
                console.error("Failed to delete post:", error);
                alert('Failed to delete post. You may not be authorized.');
            }
        }
    };

    const handleLogout = () => {
        logout(); // utils/auth.js থেকে আসা ফাংশন
        navigate('/admin/login');
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* পেজের হেডার অংশ */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1">
                    Admin Dashboard
                </Typography>
                <Box>
                    <Button 
                        variant="contained" 
                        component={Link} 
                        to="/admin/create-post"
                        startIcon={<AddCircleOutlineIcon />}
                        sx={{ mr: 2 }}
                    >
                        Create New Post
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="error" 
                        onClick={handleLogout}
                        startIcon={<LogoutIcon />}
                    >
                        Logout
                    </Button>
                </Box>
            </Box>

            {/* পোস্টের তালিকা দেখানোর জন্য টেবিল */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="right">Created At</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.map((post) => (
                            <TableRow
                                key={post.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {post.title}
                                </TableCell>
                                <TableCell align="right">{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell align="center">
                                    {/* এডিট এবং ডিলেট করার জন্য আইকন বাটন */}
                                    <IconButton component={Link} to={`/admin/edit-post/${post.id}`} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => deletePost(post.id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default AdminDashboard;