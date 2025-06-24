import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

// --- লেআউট কম্পোনেন্ট ইম্পোর্ট ---
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute'; // আমাদের সুরক্ষিত রুটের 'গার্ড'

// --- পাবলিক পেজ ইম্পোর্ট ---
import HomePage from './pages/public/HomePage';
import PostPage from './pages/public/PostPage';
import SearchResultsPage from './pages/public/SearchResultsPage';

// --- অ্যাডমিন পেজ ইম্পোর্ট ---
import AdminDashboard from './pages/admin/AdminDashboard';
import CreatePost from './pages/admin/CreatePost';
import EditPost from './pages/admin/EditPost';
import LoginPage from './pages/admin/LoginPage';

function App() {
  return (
    <>
      {/* MUI-এর জন্য বেসলাইন স্টাইল এবং ফন্ট ঠিক রাখে */}
      <CssBaseline />
      
      {/* হেডার, যা সব পেজে দেখা যাবে */}
      <Header />
      
      {/* মূল কন্টেন্ট এখানে রেন্ডার হবে */}
      <main>
        <Routes>
          {/* ======================================== */}
          {/* ======== পাবলিক রুট (সবার জন্য) ======== */}
          {/* ======================================== */}
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/admin/login" element={<LoginPage />} />


          {/* ========================================================= */}
          {/* ======== সুরক্ষিত অ্যাডমিন রুট (শুধু লগইন করা ইউজার) ======== */}
          {/* ========================================================= */}
          {/* এই Route ট্যাগটি একটি 'গেটকিপার' হিসেবে কাজ করছে। 
              এর ভেতরের সব রুটে প্রবেশের আগে ProtectedRoute চেক করবে ইউজার লগইন করা আছে কিনা।
              লগইন করা না থাকলে, /admin/login পেজে পাঠিয়ে দেবে।
          */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/create-post" element={<CreatePost />} />
            <Route path="/admin/edit-post/:id" element={<EditPost />} />
          </Route>

        </Routes>
      </main>
    </>
  );
}

export default App;