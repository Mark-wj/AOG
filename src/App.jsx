import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundMusic from './components/Backgroundmusic';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Events from './pages/Events';
import Sermons from './pages/Sermons';
import Gallery from './pages/Gallery';
import Ministries from './pages/Ministries';
import AdminLogin from './components/Adminlogin';
import AdminLayout from './components/Adminlayout';
import AdminDashboard from './pages/Admindashboard';
import AdminEvents from './pages/Adminevents';
import AdminSermons from './components/Adminsermons';
import AdminMessages from './components/Adminmessages';
import AdminGallery from './components/Admingallery';
import AdminSettings from './components/Adminsettings';
import ProtectedRoute from './components/ProtectedRoute';

// Public Layout Wrapper
const PublicLayout = ({ children }) => (
  <div className="App bg-gradient-to-br from-midnight-950 via-royal-purple-900 to-midnight-900 min-h-screen">
    <Navbar />
    <BackgroundMusic />
    <main>
      {children}
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* ⚠️ IMPORTANT: Admin routes MUST come BEFORE public routes to prevent path matching issues */}
        
        {/* Admin Login (No Layout - Public Access) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes with AdminLayout */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="sermons" element={<AdminSermons />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Public Routes with PublicLayout */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/events" element={<PublicLayout><Events /></PublicLayout>} />
        <Route path="/sermons" element={<PublicLayout><Sermons /></PublicLayout>} />
        <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
        <Route path="/ministries" element={<PublicLayout><Ministries /></PublicLayout>} />

        {/* Catch-all redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;