import React from 'react';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/gourab354',
      label: 'GitHub'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/gourab354',
      label: 'LinkedIn'
    },
    {
      icon: Instagram,
      href: 'https://instagram.com/user_cooked98',
      label: 'Instagram'
    },
    {
      icon: Mail,
      href: 'mailto:gourabd911@gmail.com',
      label: 'Email'
    }
  ];

  return (
    <footer className="border-t border-cyan-500/20 bg-gradient-to-t from-slate-950 to-transparent mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent font-mono mb-2">
              GOURAB
            </h3>
            <p className="text-gray-400">IoT Developer | Hardware Enthusiast | Building Smart Systems</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-cyan-400 font-semibold mb-4 uppercase text-sm tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/" className="hover:text-cyan-400 transition-colors">Home</a></li>
              <li><a href="/resume" className="hover:text-cyan-400 transition-colors">Resume / CV</a></li>
              <li><a href="/projects" className="hover:text-cyan-400 transition-colors">Projects</a></li>
              <li><a href="/certificates" className="hover:text-cyan-400 transition-colors">Certificates</a></li>
              <li><a href="/about" className="hover:text-cyan-400 transition-colors">About</a></li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h4 className="text-cyan-400 font-semibold mb-4 uppercase text-sm tracking-wider">Get In Touch</h4>
            <p className="text-gray-400 text-sm mb-4">Have a project in mind? Let's connect and build something amazing!</p>
            <a href="/contact" className="inline-block px-4 py-2 border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-all text-sm">
              Contact Me
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-cyan-500/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © {currentYear} Gourab. All rights reserved.
          </div>
          
          <div className="flex gap-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
