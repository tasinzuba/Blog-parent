// src/components/Sidebar.jsx (আপডেটেড)

import { Box, Button, List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    const [recentPosts, setRecentPosts] = useState([]);

    useEffect(() => {
        // সাম্প্রতিক ৫টি পোস্ট আনার জন্য API কল
        axios.get('http://localhost:5000/api/posts?limit=5') // আমরা পরে limit যোগ করতে পারি, আপাতত সব আসবে
            .then(response => {
                setRecentPosts(response.data.slice(0, 5)); // প্রথম ৫টি পোস্ট নেওয়া হলো
            })
            .catch(error => console.error("Error fetching recent posts:", error));
    }, []);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message! (This is a demo form)');
    };

    return (
        <Box component="aside">
            {/* Recent Posts Widget */}
            <Paper elevation={2} sx={{ p: 2, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Recent Posts
                </Typography>
                <List component="nav" aria-label="recent posts">
                    {recentPosts.map(post => (
                        <ListItem key={post.id} button component={Link} to={`/post/${post.id}`}>
                            <ListItemText primary={post.title} />
                        </ListItem>
                    ))}
                </List>
            </Paper>

            {/* Contact Form Widget */}
            <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Contact Us
                </Typography>
                <Box component="form" noValidate autoComplete="off" onSubmit={handleContactSubmit}>
                    <TextField label="Your Name" variant="outlined" fullWidth size="small" sx={{ mb: 2 }}/>
                    <TextField label="Your Email" variant="outlined" fullWidth size="small" sx={{ mb: 2 }}/>
                    <TextField label="Message" variant="outlined" fullWidth multiline rows={4} sx={{ mb: 2 }}/>
                    <Button variant="contained" type="submit" fullWidth>
                        Send Message
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default Sidebar;