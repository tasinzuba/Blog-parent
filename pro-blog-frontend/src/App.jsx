// src/App.jsx (CssBaseline সহ আপডেটেড)

import { Route, Routes } from 'react-router-dom';

// MUI থেকে CssBaseline ইম্পোর্ট করুন
import { CssBaseline } from '@mui/material';

// কম্পোনেন্ট ও পেজ ইম্পোর্ট
import AdminDashboard from './pages/admin/AdminDashboard';
import CreatePost from './pages/admin/CreatePost';
import EditPost from './pages/admin/EditPost';
import LoginPage from './pages/admin/LoginPage';
import HomePage from './pages/public/HomePage';
import PostPage from './pages/public/PostPage';

function App() {
  return (
    <>
      {/* এই কম্পোনেন্টটি এখানে যোগ করতে হবে */}
      <CssBaseline />
      
      {/* আমাদের হেডার কম্পোনেন্টটি পরে এখানে আসবে */}
      {/* <Header /> */}

      <main>
        <Routes>
          {/* --- পাবলিক রুট --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostPage />} />

          {/* --- অ্যাডমিন রুট --- */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/create-post" element={<CreatePost />} />
          <Route path="/admin/edit-post/:id" element={<EditPost />} />
        </Routes>
      </main>
    </>
  );
}

export default App;