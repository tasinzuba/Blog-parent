// src/components/Hero.jsx

import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Hero() {
    return (
        // Box কম্পোনেন্টটি একটি কন্টেইনার হিসেবে কাজ করছে যার ব্যাকগ্রাউন্ড এবং প্যাডিং আমরা দিয়েছি
        <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 8, // padding-top
                pb: 6, // padding-bottom
                borderBottom: '1px solid',
                borderColor: 'divider'
            }}
        >
            <Container maxWidth="sm">
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    World of Words
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Discover insightful articles, creative ideas, and personal journeys shared by our passionate community of writers.
                </Typography>
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                    <Button component={Link} to="/admin/create-post" variant="contained">
                        Start Writing
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

export default Hero;