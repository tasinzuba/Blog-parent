// src/pages/public/PostPage.jsx

import axios from 'axios';
import DOMPurify from 'dompurify'; // নিরাপত্তা জন্য
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/posts';

function PostPage() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); // URL থেকে পোস্টের ID নেওয়ার জন্য

    useEffect(() => {
        axios.get(`${API_URL}/${id}`)
            .then(response => {
                setPost(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching the post:", error);
                setLoading(false);
            });
    }, [id]); // id পরিবর্তন হলে এই useEffect আবার রান করবে

    // HTML কনটেন্টকে সুরক্ষিতভাবে রেন্ডার করার জন্য
    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html, { ADD_TAGS: ["iframe"] }) // iframe ট্যাগকে অনুমতি দেওয়া হলো ভিডিওর জন্য
        }
    };

    if (loading) {
        return <div className="container"><p>Loading post...</p></div>;
    }

    if (!post) {
        return <div className="container"><p>Post not found.</p></div>;
    }

    return (
        <div className="post-detail-page container">
            <h1 className="post-detail-title">{post.title}</h1>
            <div className="post-meta">
                <span>Published on {new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            {post.featureImage && <img src={`http://localhost:5000${post.featureImage}`} alt={post.title} className="post-detail-image" />}
            
            {/* Rich Text Editor থেকে আসা HTML কনটেন্ট এখানে দেখানো হচ্ছে */}
            <div className="post-content" dangerouslySetInnerHTML={createMarkup(post.content)} />
        </div>
    );
}

export default PostPage;