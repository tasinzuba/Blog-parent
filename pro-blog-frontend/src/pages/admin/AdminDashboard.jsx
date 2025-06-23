import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/posts');
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        // টোকেন চেক করার লজিক পরে যোগ করা হবে
        fetchPosts();
    }, []);

    const deletePost = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:5000/api/posts/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchPosts();
            } catch (error) {
                console.error("Failed to delete post:", error);
                alert('Failed to delete post. You may not be authorized.');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    return (
        <div className="admin-dashboard container">
            <div className="page-header">
                <h1>Admin Dashboard</h1>
                <div>
                    <Link to="/admin/create-post" className="btn btn-primary">Create New Post</Link>
                    <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr key={post.id}>
                            <td>{post.title}</td>
                            <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                            <td>
                                <Link to={`/post/${post.id}`} className="btn btn-secondary">View</Link>
                                <Link to={`/admin/edit-post/${post.id}`} className="btn btn-secondary">Edit</Link>
                                <button onClick={() => deletePost(post.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboard;