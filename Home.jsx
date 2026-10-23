import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Trophy, Code2, Cpu, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import Lanyard from './Lanyard';

const Home = () => {
  const stats = [
    { label: '4×', value: 'Hackathon Winner', icon: Trophy, color: 'from-amber-400 to-amber-600' },
    { label: '9×', value: 'Hackathon Finalist', icon: Zap, color: 'from-cyan-400 to-cyan-600' },
    { label: '2×', value: '1st Prize @ FOSET', icon: Trophy, color: 'from-green-400 to-green-600' },
    { label: '8+', value: 'Robotics & IoT Projects', icon: Code2, color: 'from-purple-400 to-purple-600' },
  ];

  const skills = [
    { category: 'Embedded & Hardware', items: ['ESP32', 'STM32', 'Arduino', 'Raspberry Pi', 'UART', 'SPI', 'PWM', 'ADC', 'Wi-Fi', 'MQTT', '3D Printing'] },
    { category: 'Computer Vision & AI', items: ['OpenCV', 'MediaPipe', 'YOLOv8', 'Digital Filtering', 'Face & Hand Tracking'] },
    { category: 'Languages', items: ['C', 'C++', 'Python', 'JavaScript', 'TypeScript'] },
    { category: 'Web & Distributed', items: ['Node.js', 'WebSocket', 'React', 'Django REST', 'Streamlit', 'MongoDB'] },
    { category: 'Engineering Tools', items: ['PlatformIO', 'Git', 'GitHub', 'Figma', 'Postman', 'p5.js'] },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                <span className="text-cyan-400 text-sm font-mono">// Welcome to my digital space</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                Building Smart
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-500 via-cyan-400 to-pink-500 bg-clip-text text-transparent">
                Systems & Solutions
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              IoT Developer | Hardware Enthusiast | Hackathon Winner
              <br />
              Turning ideas into intelligent embedded systems with ESP32, Arduino, and cutting-edge technologies.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link to="/resume" className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-slate-950 overflow-hidden rounded-lg bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105">
                <div className="relative flex items-center gap-2">
                  <FileText size={18} />
                  View Resume
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/projects" className="group relative inline-flex items-center justify-center px-6 py-3 font-semibold text-white overflow-hidden rounded-lg border border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-300">
                <div className="relative flex items-center gap-2">
                  View Projects
                </div>
              </Link>

              <a href="https://github.com/gourab354" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-slate-700 hover:border-cyan-500 text-gray-300 hover:text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-all font-semibold flex items-center justify-center gap-2 group">
                <Cpu size={18} />
                GitHub
              </a>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-gray-500 text-sm hidden lg:block"
            >
              ↓ Scroll to explore
            </motion.div>
          </motion.div>

          {/* Lanyard Component as Photo/Intro */}
          <motion.div
            className="flex-1 relative flex justify-center items-center w-full h-[500px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            {/* Glowing background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
            
            <Lanyard 
              position={[0, 0, 20]} 
              gravity={[0, -40, 0]} 
              frontImage="/profile.jpg"
              imageFit="cover"
            />
          </motion.div>
          
          {/* Scroll Indicator Mobile */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-500 text-sm lg:hidden w-full text-center mt-8"
          >
            ↓ Scroll to explore
          </motion.div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={index} variants={itemVariants} className="group">
                <div className="relative h-full p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/20 overflow-hidden hover:border-cyan-500/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-pink-500/0 group-hover:from-cyan-500/10 group-hover:to-pink-500/10 transition-all duration-300"></div>
                  <div className="relative z-10">
                    <Icon className={`w-8 h-8 mb-4 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                    <div className="text-3xl font-bold text-white mb-2">{stat.label}</div>
                    <div className="text-gray-400 text-sm">{stat.value}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              Tech Stack & Skills
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ scale: 1.05, translateY: -8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
                className="p-6 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-cyan-500/20 shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group"
              >
                <h3 className="text-cyan-400 font-semibold mb-4 text-lg uppercase tracking-wider">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded-full text-sm hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Project */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              Featured Project
            </span>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
          >
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-white mb-2">💊 Smart Medicine Box</h3>
              <p className="text-cyan-400 font-mono text-sm">ESP32 + WebSocket + TFT Dashboard</p>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              An intelligent automated medicine dispenser with real-time web monitoring. Features a 5-state machine (IDLE → ALERTING → DISPENSING → CONFIRMED → MISSED), ultrasonic presence detection, servo-controlled lid, touch confirmation, and a live web dashboard with event logging.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <div className="text-cyan-400 text-sm font-mono mb-1">MCU</div>
                <div className="text-white font-semibold">ESP32</div>
              </div>
              <div className="p-4 bg-pink-500/10 rounded-lg border border-pink-500/20">
                <div className="text-pink-400 text-sm font-mono mb-1">Display</div>
                <div className="text-white font-semibold">ST7735 TFT</div>
              </div>
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="text-green-400 text-sm font-mono mb-1">Backend</div>
                <div className="text-white font-semibold">Node.js</div>
              </div>
              <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <div className="text-purple-400 text-sm font-mono mb-1">Sensors</div>
                <div className="text-white font-semibold">HC-SR04</div>
              </div>
              <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <div className="text-orange-400 text-sm font-mono mb-1">Actuators</div>
                <div className="text-white font-semibold">Servo + Buzzer</div>
              </div>
              <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <div className="text-cyan-400 text-sm font-mono mb-1">Time Sync</div>
                <div className="text-white font-semibold">NTP (IST)</div>
              </div>
            </div>

            <Link to="/projects" className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-400 rounded-lg transition-all duration-300">
              View All Projects
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-12 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-pink-500/10 to-cyan-500/10 border border-cyan-500/30 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to build something awesome?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's collaborate on innovative IoT projects, embedded systems, or bring your hardware ideas to life.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-pink-600 transition-all duration-300">
            Get in Touch
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
