// src/main.jsx (সঠিক এবং সম্পূর্ণ কোড)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// ধাপ ১: react-router-dom থেকে BrowserRouter ইম্পোর্ট করুন
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import './index.css'; // আপনি চাইলে index.css ব্যবহার করতে পারেন

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ধাপ ২: আপনার সম্পূর্ণ App কম্পোনেন্টটিকে <BrowserRouter> দিয়ে মুড়ে দিন */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);