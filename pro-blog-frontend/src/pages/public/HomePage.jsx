import { Box, Button, CircularProgress, Container, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/Hero';
import Sidebar from '../../components/Sidebar';

const API_URL = 'http://localhost:5000/api/posts';

function HomePage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                setPosts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Hero />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Latest Posts
                        </Typography>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                <CircularProgress />
                            </Box>
                        ) : posts.length > 0 ? (
                            posts.map(post => (
                                <Paper key={post.id} elevation={2} sx={{ display: 'flex', mb: 3, overflow: 'hidden', flexDirection: { xs: 'column', sm: 'row' } }}>
                                    {post.featureImage && (
                                        <Box sx={{ width: { xs: '100%', sm: '35%' } }}>
                                            <Link to={`/post/${post.id}`}>
                                                <img 
                                                    src={`http://localhost:5000${post.featureImage}`} 
                                                    alt={post.title} 
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                                />
                                            </Link>
                                        </Box>
                                    )}
                                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        <Typography variant="h6" component={Link} to={`/post/${post.id}`} sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: 'primary.main'} }}>
                                            {post.title}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 1 }}>
                                            {post.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                                        </Typography>
                                        <Link to={`/post/${post.id}`} style={{ textDecoration: 'none', marginTop: 'auto', alignSelf: 'flex-start' }}>
                                            <Button size="small">Read More</Button>
                                        </Link>
                                    </Box>
                                </Paper>
                            ))
                        ) : (
                            <Typography>No posts yet. Please check back later!</Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Sidebar />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default HomePage;