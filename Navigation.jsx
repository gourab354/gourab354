import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Resume', path: '/resume' },
    { label: 'Projects', path: '/projects' },
    { label: 'Certificates', path: '/certificates' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-slate-950 via-slate-950/95 to-transparent backdrop-blur-sm border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent font-mono"
              whileHover={{ scale: 1.05 }}
            >
              &lt;GOURAB /&gt;
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium text-sm uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://github.com/gourab354"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-all duration-300"
            >
              GitHub
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cyan-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 border-t border-cyan-500/20"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-2 px-4 text-gray-300 hover:text-cyan-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
