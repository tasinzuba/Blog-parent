import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [existingImage, setExistingImage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/posts/${id}`)
            .then(res => {
                setTitle(res.data.title);
                setContent(res.data.content);
                setExistingImage(res.data.featureImage);
            }).catch(err => console.error(err));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (file) {
            formData.append('featureImage', file);
        } else {
            formData.append('featureImage', existingImage);
        }

        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/posts/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate('/admin/dashboard');
        } catch (error) {
            console.error("Failed to update post:", error);
            alert("Failed to update post.");
        }
    };

    return (
        <div className="form-container">
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group"><label>Title</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required /></div>
                <div className="form-group">
                    <label>Feature Image</label>
                    {existingImage && <img src={`http://localhost:5000${existingImage}`} alt="Current" style={{ width: '200px', marginBottom: '10px' }} />}
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <div className="form-group"><label>Content</label><ReactQuill theme="snow" value={content} onChange={setContent} /></div>
                <button type="submit" className="btn btn-primary">Update Post</button>
            </form>
        </div>
    );
}

export default EditPost;