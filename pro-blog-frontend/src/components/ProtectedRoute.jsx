// src/components/ProtectedRoute.jsx

import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth'; // আমাদের বানানো helper ফাংশন

function ProtectedRoute() {
    // isLoggedIn() ফাংশনটি localStorage থেকে টোকেন চেক করে
    // এবং টোকেনটি ভ্যালিড কিনা তা নিশ্চিত করে
    const auth = isLoggedIn();

    // যদি ইউজার লগইন করা থাকে, তাহলে তাকে চাওয়া পেজটি দেখানো হবে
    // <Outlet /> কম্পোনেন্টটি চাইল্ড রুটগুলোকে রেন্ডার করে
    // যদি লগইন করা না থাকে, তাহলে তাকে লগইন পেজে পাঠিয়ে দেওয়া হবে
    return auth ? <Outlet /> : <Navigate to="/admin/login" />;
}

export default ProtectedRoute;