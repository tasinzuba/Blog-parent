// routes/posts.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // ফাইল সিস্টেম মডিউল, ছবি ডিলেট করার জন্য

// Sequelize থেকে Op (Operators) ইম্পোর্ট করা হচ্ছে
const { Op } = require('sequelize');

// Middleware ইম্পোর্ট করা হচ্ছে
const authMiddleware = require('../middleware/authMiddleware');

// Multer স্টোরেজ কনফিগারেশন
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = (Post) => {

    // --- পাবলিক রুট (সবার জন্য উন্মুক্ত) ---

    // GET: সব পোস্ট পাওয়ার জন্য
    router.get('/', async (req, res) => {
        try {
            const posts = await Post.findAll({ order: [['createdAt', 'DESC']] });
            res.json(posts);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching posts' });
        }
    });

    // --- নতুন সার্চ রুট এখানে যোগ করা হলো ---
    // GET: /api/posts/search?q=... - পোস্ট সার্চ করার জন্য
    router.get('/search', async (req, res) => {
        try {
            const { q } = req.query; // URL থেকে সার্চ কোয়েরি 'q' নেওয়া হচ্ছে

            if (!q) {
                return res.status(400).json({ message: 'Search query is required' });
            }

            const posts = await Post.findAll({
                where: {
                    [Op.or]: [ // title অথবা content যেকোনো একটিতে মিল খুঁজবে
                        {
                            title: {
                                [Op.like]: `%${q}%` // সার্চ করা শব্দের মতো টাইটেল খুঁজবে
                            }
                        },
                        {
                            content: {
                                [Op.like]: `%${q}%` // সার্চ করা শব্দের মতো কনটেন্ট খুঁজবে
                            }
                        }
                    ]
                },
                order: [['createdAt', 'DESC']]
            });

            res.json(posts);

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error searching posts' });
        }
    });
    // ------------------------------------


    // GET: একটি নির্দিষ্ট পোস্ট পাওয়ার জন্য
    router.get('/:id', async (req, res) => {
        try {
            const post = await Post.findByPk(req.params.id);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.json(post);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching post' });
        }
    });


    // --- সুরক্ষিত রুট (শুধুমাত্র লগইন করা অ্যাডমিনদের জন্য) ---

    // POST: নতুন পোস্ট তৈরি করার জন্য
    router.post('/', authMiddleware, upload.single('featureImage'), async (req, res) => {
        const { title, content } = req.body;
        const featureImage = req.file ? `/uploads/${req.file.filename}` : null;

        try {
            const newPost = await Post.create({ title, content, featureImage });
            res.status(201).json(newPost);
        } catch (err) {
            console.error('Database save failed:', err);
            res.status(400).json({ message: 'Failed to create post.' });
        }
    });

    // PUT: একটি নির্দিষ্ট পোস্ট আপডেট করার জন্য
    router.put('/:id', authMiddleware, upload.single('featureImage'), async (req, res) => {
        const { title, content } = req.body;
        let featureImage;
        if (req.file) {
            featureImage = `/uploads/${req.file.filename}`;
        } else {
            featureImage = req.body.featureImage;
        }

        try {
            const post = await Post.findByPk(req.params.id);
            if (!post) return res.status(404).json({ message: 'Post not found' });
            
            await post.update({ title, content, featureImage });
            res.json(post);
        } catch (err) {
            console.error('Database update failed:', err);
            res.status(400).json({ message: 'Failed to update post.' });
        }
    });

    // DELETE: একটি নির্দিষ্ট পোস্ট ডিলেট করার জন্য
    router.delete('/:id', authMiddleware, async (req, res) => {
        try {
            const post = await Post.findByPk(req.params.id);
            if (!post) return res.status(404).json({ message: 'Post not found' });

            if (post.featureImage) {
                const imagePath = path.join(__dirname, '..', post.featureImage);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            
            await post.destroy();
            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error deleting post' });
        }
    });

    return router;
};