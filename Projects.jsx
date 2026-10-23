import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2, Zap } from 'lucide-react';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Smart Medicine Box',
      description: 'Built an ESP32 medicine box around a five-state finite state machine with NTP time synchronization, ultrasonic distance sensing, servo actuation and capacitive touch input.',
      category: 'hardware',
      tags: ['ESP32', 'Node.js', 'WebSocket', 'ST7735 TFT', 'IoT'],
      image: '💊',
      highlights: [
        'Five-state finite state machine architecture',
        'NTP time synchronization with real-time RTC',
        'HC-SR04 distance sensing & servo lid actuation',
        'Node.js WebSocket dashboard for live telemetry',
        'TTP223 capacitive touch confirmation'
      ],
      github: 'https://github.com/gourab354/smart-medicine-box',
      demo: '#'
    },
    {
      id: 2,
      title: 'Webcam Heart-Rate Measurement (rPPG)',
      description: 'Contactless biomedical pulse rate extraction using POS, CHROM and green-channel rPPG on MediaPipe FaceMesh multi-region input, validated against AD8232 ECG hardware.',
      category: 'ml',
      tags: ['Python', 'OpenCV', 'MediaPipe', 'ESP32', 'AD8232 ECG', 'Digital Filtering'],
      image: '❤️',
      highlights: [
        'Zero-phase Butterworth filtering (0.75 to 2.8 Hz)',
        'Harmonic disambiguation & slew-rate limiting',
        'AD8232 + ESP32 ECG reference sampling @ 250 Hz',
        'Bland-Altman, MAE, RMSE & Wilcoxon analysis pipeline',
        'Evaluated across 4 lighting & motion conditions'
      ],
      github: 'https://github.com/gourab354/heart-cv',
      demo: '#'
    },
    {
      id: 3,
      title: 'Orbit Eye — Standalone GPS Smartwatch',
      description: 'Custom wearable smartwatch running on ESP32 with NMEA sentence parsing, SPI display driving, great-circle compass calculation, and web flasher.',
      category: 'hardware',
      tags: ['ESP32', 'C++', 'u-blox Neo-6M', 'SPI TFT', 'Google Places'],
      image: '🛰️',
      highlights: [
        'NMEA GPS parsing on 240x240 SPI display',
        'Four-screen non-blocking UI state machine',
        'Great-circle bearing compass calculations',
        'Google Places with OpenStreetMap Overpass fallback',
        'Browser-based Web Serial flasher tool'
      ],
      github: 'https://github.com/gourab354/orbit-eye',
      demo: '#'
    },
    {
      id: 4,
      title: 'Four-Legged Crawler Robot',
      description: '12-servo quadruped robot with inverse kinematics, timer-driven coordinate leg control, and custom 3D printed mechanical chassis.',
      category: 'hardware',
      tags: ['Arduino Nano', 'C++', 'Servo Kinematics', '3D Printing'],
      image: '🕷️',
      highlights: [
        '12 micro-servos (3 joints per leg)',
        'Coordinate-based leg trajectory interpolation',
        'Timer-driven servo routines (walk, turn, sit, wave)',
        'Integrated servo-calibration software utility',
        'Custom 3D-printable modular mechanical parts'
      ],
      github: 'https://github.com/gourab354/4legged-crawler',
      demo: '#'
    },
    {
      id: 5,
      title: 'Air-Dimmer Gesture Lighting',
      description: 'Touchless gesture-controlled lighting interface mapping computer vision hand tracking to hardware PWM brightness over Wi-Fi sockets.',
      category: 'hardware',
      tags: ['Python', 'OpenCV', 'MediaPipe', 'ESP32', 'Wi-Fi Sockets'],
      image: '💡',
      highlights: [
        'Real-time MediaPipe hand landmark tracking',
        'Dynamic thumb-to-index distance calculation',
        '0-255 PWM continuous brightness scaling',
        'Low-latency Wi-Fi UDP/TCP socket stream',
        'Hardware LED driver circuit design'
      ],
      github: 'https://github.com/gourab354/drone-gesture',
      demo: '#'
    },
    {
      id: 6,
      title: 'ASTRA — Subsurface Rescue Architecture',
      description: 'Autonomous disaster-rescue multi-legged robotic architecture designed to detect trapped human survivors and map subterranean environments.',
      category: 'hardware',
      tags: ['Raspberry Pi', 'Arduino', 'MPU9250', 'YOLOv8', 'Streamlit', 'MongoDB'],
      image: '🛸',
      highlights: [
        'Team Circuit Bird disaster-rescue robotics platform',
        'OpenCV + YOLOv8 real-time victim perception',
        'Acoustic & thermal sensor array analysis',
        'MPU9250 9-DOF IMU spatial orientation telemetry',
        'Streamlit & MongoDB mission control dashboard'
      ],
      github: 'https://github.com/gourab354',
      demo: '#'
    },
    {
      id: 7,
      title: 'Gesture-Control Gaming & Physics',
      description: 'Vision-based interactive interfaces including a hand-steered racing controller, neon Cat’s Cradle simulation, and kinetic gesture gaming.',
      category: 'web',
      tags: ['Python', 'OpenCV', 'MediaPipe', 'p5.js', 'PyAutoGUI'],
      image: '🎮',
      highlights: [
        'Virtual hand-gesture steering wheel controller',
        'Two-hand neon Cat’s Cradle p5.js browser canvas',
        'Fruit Ninja kinetic slicing gesture engine',
        'Sub-30ms real-time latency optimization'
      ],
      github: 'https://github.com/gourab354/virtual-steering-wheel',
      demo: '#'
    },
    {
      id: 8,
      title: 'Cratus & Build Club AOT Projects',
      description: 'Core-member engineering projects including combat robotics, ultrasonic sonar radar, RF spectrum analyzers, and autopilot telemetry.',
      category: 'hardware',
      tags: ['Robotics', 'e-yantra', 'IIMCIP-TIC', 'STM32', 'FPV'],
      image: '⚡',
      highlights: [
        'Cratus heavyweight combat robot chassis & drive',
        'Sonar radar with rotating servo mapping display',
        'RF spectrum analyzer & telemetry signal processing',
        'Autopilot telemetry dashboard for FPV racers',
        'e-yantra (IIT Bombay) robotics competition entry'
      ],
      github: 'https://github.com/gourab354',
      demo: '#'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'hardware', label: 'Hardware/IoT' },
    { id: 'web', label: 'Web Development' },
    { id: 'ml', label: 'Machine Learning' },
    { id: 'backend', label: 'Backend' }
  ];

  const filtered = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              Projects & Innovations
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A collection of my IoT hardware projects, web applications, and machine learning solutions
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700 border border-cyan-500/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={selectedCategory}
        >
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-pink-500/0 group-hover:from-cyan-500/10 group-hover:to-pink-500/10 transition-all duration-300"></div>

              {/* Content */}
              <div className="relative z-10 p-6 h-full flex flex-col">
                {/* Icon & Title */}
                <div className="mb-4">
                  <div className="text-5xl mb-3">{project.image}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
                </div>

                {/* Highlights */}
                <div className="mb-4 flex-grow">
                  <div className="text-xs text-cyan-400 font-semibold mb-2 uppercase tracking-wider">Key Features</div>
                  <ul className="space-y-1">
                    {project.highlights.slice(0, 3).map((highlight, idx) => (
                      <li key={idx} className="text-xs text-gray-400 flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 rounded-lg transition-all text-sm font-semibold"
                  >
                    <Github size={16} />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    className="flex items-center gap-2 px-4 py-2 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/50 text-pink-400 rounded-lg transition-all text-sm font-semibold"
                  >
                    <ExternalLink size={16} />
                    Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
