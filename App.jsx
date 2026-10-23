import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import Home from './Home';
import Projects from './Projects';
import Certificates from './Certificates';
import About from './About';
import Contact from './Contact';
import Resume from './Resume';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
        {/* Background Grid Animation */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        <Navigation />
        
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
