// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // রিকোয়েস্টের হেডার থেকে টোকেনটি নেওয়া হচ্ছে
    // সাধারণত টোকেনটি 'Authorization' হেডারে 'Bearer <token>' ফরম্যাটে পাঠানো হয়
    const authHeader = req.header('Authorization');

    // যদি হেডার বা টোকেন না থাকে
    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // 'Bearer ' লেখাটি বাদ দিয়ে শুধু টোকেনটি নেওয়া হচ্ছে
        const token = authHeader.split(' ')[1];

        // টোকেনটি ভ্যারিফাই বা যাচাই করা হচ্ছে
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // টোকেন থেকে পাওয়া ইউজার ইনফরমেশন রিকোয়েস্টের সাথে যুক্ত করে দেওয়া হচ্ছে
        // যাতে পরবর্তী রুটে আমরা জানতে পারি কোন ইউজার রিকোয়েস্ট পাঠিয়েছে
        req.user = decoded.user;

        // সবকিছু ঠিক থাকলে, পরবর্তী ধাপে যাওয়ার অনুমতি দেওয়া হচ্ছে
        next();
        
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};