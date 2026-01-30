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

function App() {
  return (
    <Router>
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
            <Route path="/admin" element={<AdminLogin />} />
            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;