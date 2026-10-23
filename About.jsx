import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Code2, Briefcase } from 'lucide-react';

const About = () => {
  const journey = [
    {
      icon: Zap,
      title: 'The Beginning',
      description: 'Started exploring electronics and Arduino projects during my early college days, fascinated by the intersection of hardware and software.',
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      icon: Cpu,
      title: 'Embedded Systems Journey',
      description: 'Dove deep into microcontrollers, ESP32 development, and IoT applications. Built multiple projects combining firmware and web backends.',
      color: 'from-pink-400 to-pink-600'
    },
    {
      icon: Code2,
      title: 'Full Stack IoT Development',
      description: 'Expanded skills to include full-stack development: embedded C/C++, Node.js backend, React frontend, and cloud integration.',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: Briefcase,
      title: 'Building Smart Solutions',
      description: 'Now focused on creating intelligent IoT systems that solve real-world problems through innovative hardware and software integration.',
      color: 'from-purple-400 to-purple-600'
    }
  ];

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
              About Me
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A passionate IoT developer and hardware enthusiast building intelligent systems
          </p>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 p-8 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/20"
        >
          <h2 className="text-3xl font-bold mb-6 text-white">Who Am I?</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
            <p>
              I'm <span className="text-cyan-400 font-semibold">Gourab</span>, an IoT developer and electronics enthusiast from West Bengal, India. 
              I have a deep passion for building smart systems that bridge the gap between hardware and software.
            </p>
            <p>
              My journey started with curiosity about how things work — from Arduino basics to complex ESP32 firmware development, 
              from sensor integration to full-stack IoT applications with web dashboards and real-time communication.
            </p>
            <p>
              I've been recognized as a <span className="text-pink-400 font-semibold">9× Hackathon Finalist</span>, 
              <span className="text-green-400 font-semibold"> 4× Hackathon Winner</span>, and <span className="text-cyan-400 font-semibold">FOSET 2026 First Prize Winner</span> (paper & model competitions). 
              I'm driven by the challenge of creating innovative solutions that solve real-world problems.
            </p>
            <p>
              Beyond coding and hardware, I'm passionate about sharing knowledge, collaborating on open-source projects, 
              and continuously learning the latest technologies in IoT, embedded systems, and machine learning.
            </p>
          </div>
        </motion.div>

        {/* Journey Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              My Journey
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {journey.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group"
                >
                  <Icon className={`w-10 h-10 mb-4 bg-gradient-to-br ${item.color} bg-clip-text text-transparent`} />
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Skills Highlight */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              Core Competencies
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: '🔧 Hardware Design', desc: 'PCB design, sensor integration, actuator control, and embedded systems' },
              { title: '💾 Firmware Development', desc: 'ESP32, Arduino, C/C++, real-time systems, and state machines' },
              { title: '🌐 Backend Development', desc: 'Node.js, Express, WebSocket, REST APIs, and database design' },
              { title: '🎨 Frontend Development', desc: 'React, Vue, Tailwind CSS, and interactive user interfaces' },
              { title: '🤖 Machine Learning', desc: 'TensorFlow, PyTorch, data analysis, and model optimization' },
              { title: '☁️ Cloud & DevOps', desc: 'Google Cloud, deployment, CI/CD, and scalable architectures' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ scale: 1.05, translateY: -8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, type: "spring", stiffness: 100 }}
                className="p-6 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-cyan-500/20 shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
              >
                <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-12 rounded-xl bg-gradient-to-r from-cyan-500/10 via-pink-500/10 to-cyan-500/10 border border-cyan-500/30 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent mb-2">8+</div>
              <div className="text-gray-400">Robotics & IoT Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent mb-2">9×</div>
              <div className="text-gray-400">Hackathon Finalist</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-2">4×</div>
              <div className="text-gray-400">Hackathon Winner</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-2">15+</div>
              <div className="text-gray-400">Silicon & CV Skills</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
