import axios from 'axios';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import SocialShare from '../../components/SocialShare';

const API_URL = 'http://localhost:5000/api/posts';

function PostPage() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        window.scrollTo(0, 0);
        axios.get(`${API_URL}/${id}`)
            .then(response => {
                setPost(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching the post:", error);
                setLoading(false);
            });
    }, [id]);

    const createMarkup = (html) => {
        return { __html: DOMPurify.sanitize(html, { ADD_TAGS: ["iframe"] }) };
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!post) {
        return <Container sx={{ mt: 4 }}><Typography>Post not found.</Typography></Container>;
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={5}>
                
                {/* বাম কলাম (পোস্টের কনটেন্ট) */}
                <Grid item xs={12} md={8}>
                    <Box component="article">
                        {post.featureImage && <img src={`http://localhost:5000${post.featureImage}`} alt={post.title} className="post-detail-image" />}
                        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {post.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Published on {new Date(post.createdAt).toLocaleDateString()}
                        </Typography>
                        <div className="post-content" dangerouslySetInnerHTML={createMarkup(post.content)} />
                        
                        <SocialShare postUrl={window.location.href} title={post.title} />
                    </Box>
                </Grid>

                {/* ডান কলাম (সাইডবার) */}
                <Grid item xs={12} md={4}>
                    <Sidebar />
                </Grid>
                
            </Grid>
        </Container>
    );
}

export default PostPage;