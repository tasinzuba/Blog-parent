// src/pages/public/SearchResultsPage.jsx
import { Box, CircularProgress, Container, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

function SearchResultsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q'); // URL থেকে সার্চ কোয়েরি 'q' নেওয়া হচ্ছে

    useEffect(() => {
        if (query) {
            setLoading(true);
            axios.get(`http://localhost:5000/api/posts/search?q=${query}`)
                .then(response => {
                    setPosts(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error searching posts:", error);
                    setLoading(false);
                });
        }
    }, [query]); // যখনই URL-এর 'q' পরিবর্তন হবে, তখনই এই ইফেক্টটি রান করবে

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Search Results for: "{query}"
            </Typography>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>
            ) : posts.length > 0 ? (
                posts.map(post => (
                    <Paper key={post.id} sx={{ p: 2, mb: 2 }}>
                        <Typography variant="h6" component={Link} to={`/post/${post.id}`} sx={{ textDecoration: 'none' }}>
                            {post.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {post.content.replace(/<[^>]*>/g, '').substring(0, 200)}...
                        </Typography>
                    </Paper>
                ))
            ) : (
                <Typography>No results found for your search.</Typography>
            )}
        </Container>
    );
}

export default SearchResultsPage;