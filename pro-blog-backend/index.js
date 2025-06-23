// index.js (সঠিক এবং সম্পূর্ণ কোড)

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- পরিবর্তন এখানে ---
// Database Connection (সঠিক কনফিগারেশন সহ)
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql' // <-- এই লাইনটিই সবচেয়ে গুরুত্বপূর্ণ এবং সম্ভবত বাদ পড়েছিল
    }
);
// --------------------


// মডেলগুলো ইম্পোর্ট করা
const User = require('./models/User')(sequelize);
const Post = require('./models/Post')(sequelize);

// ডাটাবেস কানেকশন এবং টেবিল সিঙ্ক করা
const connectAndSyncDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL Database connected successfully.');
        await sequelize.sync({ alter: true });
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database or sync:', error);
    }
};
connectAndSyncDb();


// API রুটগুলো যুক্ত করা
const authRoutes = require('./routes/auth')(User);
const postRoutes = require('./routes/posts')(Post);

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);


// Basic Route
app.get('/', (req, res) => {
    res.send('Pro Blog Backend is running!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});