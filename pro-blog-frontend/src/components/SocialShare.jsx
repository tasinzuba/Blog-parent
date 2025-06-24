// src/components/SocialShare.jsx

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, IconButton, Typography } from '@mui/material';

function SocialShare({ postUrl, title }) {
    const encodedUrl = encodeURIComponent(postUrl);
    const encodedTitle = encodeURIComponent(title);

    return (
        <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" component="p" gutterBottom>
                Share this post
            </Typography>
            <Box>
                <IconButton 
                    aria-label="share on facebook" 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FacebookIcon />
                </IconButton>
                <IconButton 
                    aria-label="share on twitter"
                    href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <TwitterIcon />
                </IconButton>
                <IconButton 
                    aria-label="share on linkedin"
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <LinkedInIcon />
                </IconButton>
            </Box>
        </Box>
    );
}

export default SocialShare;