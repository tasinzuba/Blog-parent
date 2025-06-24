// src/components/Header.jsx (আপডেটেড)
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar'; // SearchBar ইম্পোর্ট করুন

function Header() {
    return (
        <AppBar position="static" color="default" elevation={1}>
            <Toolbar>
                <Typography variant="h6" component={NavLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                    ProBlog
                </Typography>

                {/* সার্চ বার এখানে যোগ করা হলো */}
                <SearchBar />

                <Box sx={{ ml: 2 }}>
                    <Button color="inherit" component={NavLink} to="/">Home</Button>
                    <Button color="inherit" component={NavLink} to="/admin/login">Admin Login</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;