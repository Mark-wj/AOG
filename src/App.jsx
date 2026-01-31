import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route path="/*" element={
          <div className="App bg-gradient-to-br from-purple-50 to-white min-h-screen">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/events" element={<Events />} />
                <Route path="/sermons" element={<Sermons />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/ministries" element={<Ministries />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />

        {/* Admin Login (No Layout) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Routes with AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="sermons" element={<AdminSermons />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="gallery" element={<AdminGallery />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;