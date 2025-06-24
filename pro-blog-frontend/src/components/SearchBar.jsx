// src/components/SearchBar.jsx
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputBase, Paper } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${searchTerm.trim()}`);
            setSearchTerm('');
        }
    };

    return (
        <Paper
            component="form"
            onSubmit={handleSearch}
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250, borderRadius: '20px' }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}

export default SearchBar;