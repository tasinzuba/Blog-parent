// src/pages/public/HomePage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Hero কম্পোনেন্টটি আমরা পরে তৈরি করব, আপাতত কমেন্ট করে রাখছি
// import Hero from '../../components/Hero'; 

const API_URL = 'http://localhost:5000/api/posts';

function HomePage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // লোডিং স্টেট যোগ করা হলো

    useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                setPosts(response.data);
                setLoading(false); // ডেটা লোড হলে লোডিং স্টেট ফলস হবে
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
                setLoading(false); // এরর হলেও লোডিং স্টেট ফলস হবে
            });
    }, []); // খালি dependency array মানে এটি শুধু প্রথমবার রেন্ডার হওয়ার সময় রান করবে

    if (loading) {
        return <div className="container"><p>Loading posts...</p></div>;
    }

    return (
        <>
            {/* <Hero /> */}
            <div className="home-page-content container">
                <div className="page-header">
                    <h1>Latest Posts</h1>
                </div>
                <div className="post-list">
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <div key={post.id} className="post-item">
                                {post.featureImage && 
                                    <Link to={`/post/${post.id}`}>
                                        {/* ছবির সম্পূর্ণ URL তৈরি করা হচ্ছে */}
                                        <img src={`http://localhost:5000${post.featureImage}`} alt={post.title} className="post-item-image" />
                                    </Link>
                                }
                                <div className="post-item-content">
                                    <h2>
                                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                                    </h2>
                                    {/* HTML ট্যাগ বাদ দিয়ে শুধুমাত্র টেক্সট দেখানোর জন্য */}
                                    <p className="post-excerpt">{post.content.replace(/<[^>]*>/g, '').substring(0, 150)}...</p>
                                    <div className="post-meta">
                                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No posts yet. Please check back later!</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default HomePage;