import axios from 'axios';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (file) {
            formData.append('featureImage', file);
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate('/admin/dashboard');
        } catch (error) {
            console.error("Failed to create post:", error);
            alert("Failed to create post. Please check your inputs.");
        }
    };

    return (
        <div className="form-container">
            <h1>Create a New Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group"><label>Title</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required /></div>
                <div className="form-group"><label>Feature Image</label><input type="file" onChange={(e) => setFile(e.target.files[0])} /></div>
                <div className="form-group"><label>Content</label><ReactQuill theme="snow" value={content} onChange={setContent} /></div>
                <button type="submit" className="btn btn-primary">Publish</button>
            </form>
        </div>
    );
}

export default CreatePost;