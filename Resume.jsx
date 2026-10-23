import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  Printer,
  Copy,
  Check,
  ExternalLink,
  FileText,
  Sparkles,
  Cpu,
  Trophy,
  Briefcase,
  GraduationCap,
  Code2,
  Terminal,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Globe,
  RefreshCw,
  Eye
} from 'lucide-react';
import resumeData from './resume_data.json';

const Resume = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('interactive'); // 'interactive' or 'preview'
  const [selectedTag, setSelectedTag] = useState('all');

  const { basics, education, experience, projects, achievements, skills, metadata } = resumeData;

  const handleCopyText = () => {
    const textContent = `
${basics.name}
${basics.location} | ${basics.email}
Website: ${basics.website} | GitHub: ${basics.github} | LinkedIn: ${basics.linkedin}

SUMMARY:
${basics.summary}

EDUCATION:
${education.map(e => `• ${e.degree} - ${e.institution} (${e.period})`).join('\n')}

EXPERIENCE:
${experience.map(exp => `• ${exp.role} | ${exp.company} (${exp.period})\n  ${exp.highlights.join('\n  ')}`).join('\n\n')}

PROJECTS:
${projects.map(p => `• ${p.name} [${p.tech.join(', ')}]\n  ${p.highlights.join('\n  ')}`).join('\n\n')}

ACHIEVEMENTS:
${achievements.map(a => `• ${a}`).join('\n')}

TECHNICAL SKILLS:
${Object.entries(skills).map(([cat, list]) => `• ${cat}: ${list.join(', ')}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Filter projects by tech tag
  const allTags = ['all', 'ESP32', 'C++', 'Python', 'OpenCV', 'MediaPipe', 'Node.js', 'Arduino'];
  const filteredProjects = selectedTag === 'all'
    ? projects
    : projects.filter(p => p.tech.some(t => t.toLowerCase().includes(selectedTag.toLowerCase())));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto print:p-0 print:m-0 print:max-w-none">
      
      {/* Non-Printable Header & Action Hub */}
      <div className="print:hidden mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
            <Sparkles size={14} className="animate-spin text-cyan-400" />
            Autonomous Resume Engine v{metadata.version} · Self-Upgrading
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-pink-500 bg-clip-text text-transparent">
              Curriculum Vitae
            </span>
          </h1>
          <p className="mt-3 text-gray-400 text-base max-w-2xl mx-auto">
            Robotics, IoT Architecture & Computer Vision. Automatically synchronized with live GitHub repository telemetry.
          </p>
        </motion.div>

        {/* Action Controls Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90 border border-cyan-500/30 backdrop-blur-md shadow-2xl flex flex-wrap items-center justify-between gap-4"
        >
          {/* Mode Switcher */}
          <div className="flex items-center gap-2 bg-slate-950/80 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setActiveTab('interactive')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'interactive'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Terminal size={16} />
              Interactive Dossier
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'preview'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Eye size={16} />
              PDF Vector Preview
            </button>
          </div>

          {/* Download & Utility Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="/Gourab_Dutta_Resume.pdf"
              download="Gourab_Dutta_Resume.pdf"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
            >
              <Download size={16} />
              Download PDF
            </a>

            <a
              href="/Gourab_Dutta_Resume.docx"
              download="Gourab_Dutta_Resume.docx"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-cyan-500/40 text-cyan-300 font-semibold text-sm hover:scale-105 transition-all"
            >
              <FileText size={16} />
              DOCX
            </a>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-gray-200 font-medium text-sm transition-all"
              title="Print or Save as Clean ATS PDF"
            >
              <Printer size={16} />
              Print
            </button>

            <button
              onClick={handleCopyText}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-gray-200 font-medium text-sm transition-all"
              title="Copy ATS Plain Text"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              {copied ? 'Copied ATS Text!' : 'Copy Text'}
            </button>
          </div>
        </motion.div>
      </div>

      {/* PDF Viewer Tab */}
      {activeTab === 'preview' ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-4 shadow-2xl print:hidden"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4 text-xs font-mono text-gray-400">
            <span>FILE: Gourab_Dutta_Resume.pdf (ATS Compliant Vector Render)</span>
            <span className="text-cyan-400">Last Synced: {metadata.lastUpdated}</span>
          </div>
          <iframe
            src="/Gourab_Dutta_Resume.pdf"
            className="w-full h-[850px] rounded-xl border border-slate-800 bg-white"
            title="Gourab Dutta Resume PDF"
          />
        </motion.div>
      ) : (
        /* Interactive Dossier View */
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 print:space-y-4 print:text-black"
        >
          {/* Main Paper Card */}
          <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-cyan-500/20 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden print:p-0 print:border-none print:bg-none print:shadow-none">
            {/* Subtle Top Glowing Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-pink-500 to-cyan-500 print:hidden" />

            {/* Header: Name & Contact Coordinates */}
            <motion.div variants={itemVariants} className="border-b border-slate-800 pb-6 print:pb-2 print:border-b-2 print:border-slate-800">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight print:text-black">
                    {basics.name}
                  </h2>
                  <p className="text-cyan-400 font-mono text-sm mt-1 print:text-slate-800 font-semibold">
                    {basics.label}
                  </p>
                </div>
                <div className="text-right text-xs text-gray-400 font-mono space-y-1 print:text-slate-700">
                  <div className="flex items-center md:justify-end gap-1.5">
                    <MapPin size={13} className="text-cyan-400 print:text-black" />
                    <span>{basics.location}</span>
                  </div>
                  <div className="flex items-center md:justify-end gap-1.5">
                    <Mail size={13} className="text-pink-400 print:text-black" />
                    <a href={`mailto:${basics.email}`} className="hover:text-cyan-400 underline print:no-underline">
                      {basics.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Links Grid */}
              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-slate-800/60 text-xs font-mono text-gray-300 print:text-slate-800 print:pt-2">
                <a
                  href={basics.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200"
                >
                  <Globe size={14} />
                  <span>{basics.website.replace('https://', '')}</span>
                </a>
                <span className="text-slate-600">•</span>
                <a
                  href={basics.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-gray-300 hover:text-white"
                >
                  <Github size={14} />
                  <span>{basics.github.replace('https://', '')}</span>
                </a>
                <span className="text-slate-600">•</span>
                <a
                  href={basics.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300"
                >
                  <Linkedin size={14} />
                  <span>{basics.linkedin.replace('https://', '')}</span>
                </a>
              </div>
            </motion.div>

            {/* Summary */}
            <motion.section variants={itemVariants} className="mt-8 print:mt-4">
              <h3 className="text-lg font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2 mb-3 print:text-slate-900">
                <Terminal size={18} className="print:hidden" />
                Summary
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base print:text-slate-800">
                {basics.summary}
              </p>
            </motion.section>

            {/* Education */}
            <motion.section variants={itemVariants} className="mt-8 print:mt-4">
              <h3 className="text-lg font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2 mb-4 print:text-slate-900">
                <GraduationCap size={18} className="print:hidden" />
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 print:p-0 print:border-none print:bg-none">
                    <div>
                      <h4 className="font-bold text-white text-base print:text-black">{edu.degree}</h4>
                      <p className="text-sm text-gray-400 print:text-slate-700">{edu.institution}</p>
                    </div>
                    <div className="text-xs font-mono text-cyan-400 print:text-slate-800 font-medium">
                      {edu.period}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Experience */}
            <motion.section variants={itemVariants} className="mt-8 print:mt-4">
              <h3 className="text-lg font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2 mb-4 print:text-slate-900">
                <Briefcase size={18} className="print:hidden" />
                Experience
              </h3>
              <div className="space-y-5">
                {experience.map((exp, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all print:p-0 print:border-none print:bg-none">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <div className="font-bold text-white text-base print:text-black">
                        <span className="text-cyan-400 print:text-black">{exp.role}</span>
                        <span className="text-gray-400 print:text-slate-700"> — {exp.company}</span>
                      </div>
                      <span className="text-xs font-mono text-cyan-400/90 print:text-slate-800 font-medium">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="space-y-1.5 mt-2">
                      {exp.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="text-xs sm:text-sm text-gray-300 print:text-slate-800 flex items-start gap-2">
                          <span className="text-cyan-400 print:text-black mt-0.5">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Projects Section */}
            <motion.section variants={itemVariants} className="mt-8 print:mt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h3 className="text-lg font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2 print:text-slate-900">
                  <Code2 size={18} className="print:hidden" />
                  Projects & Engineering Systems
                </h3>

                {/* Tag Filters (Non-Print) */}
                <div className="print:hidden flex flex-wrap gap-1.5">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                        selectedTag === tag
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-gray-400 hover:text-white'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {filteredProjects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all print:p-0 print:border-none print:bg-none print:mb-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-base print:text-black">{proj.name}</h4>
                        {proj.repo && (
                          <a
                            href={proj.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="print:hidden text-gray-400 hover:text-cyan-400 transition-colors"
                            title="View Repository"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tech.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 print:bg-none print:border-none print:text-slate-700 print:font-semibold"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <ul className="space-y-1 mt-2">
                      {proj.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="text-xs sm:text-sm text-gray-300 print:text-slate-800 flex items-start gap-2">
                          <span className="text-cyan-400 print:text-black mt-0.5">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Achievements */}
            <motion.section variants={itemVariants} className="mt-8 print:mt-4">
              <h3 className="text-lg font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2 mb-4 print:text-slate-900">
                <Trophy size={18} className="print:hidden" />
                Achievements & Honors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {achievements.map((ach, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-pink-500/30 transition-all print:p-0 print:border-none print:bg-none"
                  >
                    <div className="w-2 h-2 rounded-full bg-pink-500 print:bg-black shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-200 print:text-slate-900">
                      {ach}
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Technical Skills */}
            <motion.section variants={itemVariants} className="mt-8 print:mt-4">
              <h3 className="text-lg font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2 mb-4 print:text-slate-900">
                <Cpu size={18} className="print:hidden" />
                Technical Skills Arsenal
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(skills).map(([category, skillList], idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 print:p-0 print:border-none print:bg-none"
                  >
                    <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider mb-2 print:text-slate-900">
                      {category}
                    </h4>
                    <div className="flex flex-wrap gap-1.5 print:block">
                      {skillList.map((s, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-md text-xs bg-slate-800/80 text-gray-300 border border-slate-700/60 print:bg-none print:border-none print:text-slate-800 print:inline print:mr-2"
                        >
                          {s}{sIdx < skillList.length - 1 ? ' ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Telemetry Footer */}
            <div className="mt-10 pt-6 border-t border-slate-800 text-center text-xs font-mono text-gray-500 print:hidden">
              Autonomous Profile Sync • Last Telemetry Ping: {metadata.lastUpdated} • Build Hash: #{metadata.version}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Resume;
