// src/utils/auth.js

import { jwtDecode } from 'jwt-decode';

// টোকেন localStorage-এ সেভ করার ফাংশন
export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
};

// টোকেন localStorage থেকে মুছে ফেলার ফাংশন
export const logout = () => {
    localStorage.removeItem('token');
};

// টোকেন আছে কিনা এবং ভ্যালিড কিনা তা চেক করার ফাংশন
export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }

    try {
        const decoded = jwtDecode(token);
        // টোকেনের মেয়াদ আছে কিনা তা চেক করা
        if (decoded.exp * 1000 < Date.now()) {
            logout(); // মেয়াদ শেষ হয়ে গেলে টোকেন মুছে ফেলা
            return false;
        }
        return true;
    } catch {
        // টোকেনটি ভ্যালিড না হলেও লগ আউট করে দেওয়া
        logout();
        return false;
    }
};

// টোকেনটি localStorage থেকে পাওয়ার ফাংশন
export const getToken = () => {
    return localStorage.getItem('token');
};