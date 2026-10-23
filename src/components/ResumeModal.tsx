import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  Printer,
  ExternalLink,
  GraduationCap,
  Code2,
  FolderGit2,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Award,
  Sparkles,
  FileText
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const resumePrintRef = useRef<HTMLDivElement>(null);

  const handlePrintOrDownloadPDF = () => {
    // Printable window method ensures pixel-perfect A4 PDF rendering
    const printContent = resumePrintRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.print();
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Sudarshan_Lama_Resume.pdf</title>
          <meta charset="utf-8" />
          <style>
            @page {
              size: A4;
              margin: 14mm 16mm;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              color: #0f172a;
              background: #ffffff;
              line-height: 1.45;
              font-size: 11pt;
              margin: 0;
              padding: 0;
            }
            h1 { font-size: 22pt; margin: 0 0 4px 0; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; }
            h2 { font-size: 13pt; margin: 16px 0 8px 0; color: #1e3a8a; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
            h3 { font-size: 11pt; margin: 4px 0 2px 0; color: #1e293b; }
            p { margin: 0 0 6px 0; }
            .header-bar { margin-bottom: 14px; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
            .contact-line { font-size: 9.5pt; color: #475569; display: flex; flex-wrap: wrap; gap: 12px; margin-top: 4px; }
            .contact-item { display: inline-block; }
            .section { margin-bottom: 14px; }
            .item-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; }
            .badge { font-weight: bold; color: #1d4ed8; }
            ul { margin: 4px 0 8px 18px; padding: 0; font-size: 10pt; color: #334155; }
            li { margin-bottom: 3px; }
            .tag { display: inline-block; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 4px; padding: 2px 6px; font-size: 9pt; margin-right: 4px; margin-bottom: 4px; }
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <div class="header-bar">
            <h1>SUDARSHAN LAMA</h1>
            <p style="font-size: 11pt; font-weight: 600; color: #2563eb; margin: 0;">
              Bachelor in Information Technology (BIT) Student | Aspiring Web Developer & AI Enthusiast
            </p>
            <div class="contact-line">
              <span class="contact-item">📍 Kathmandu, Nepal</span>
              <span class="contact-item">📱 +977 9744690125</span>
              <span class="contact-item">✉️ sudarshanlama09@gmail.com</span>
              <span class="contact-item">🔗 github.com/sudarshanlama19</span>
              <span class="contact-item">💼 linkedin.com/in/sudarshan-lama-779431354</span>
            </div>
          </div>

          <div class="section">
            <h2>Executive Profile</h2>
            <p style="font-size: 10pt; color: #334155; line-height: 1.5;">
              Motivated Bachelor in Information Technology (BIT) Semester 1 undergraduate based in Kathmandu, Nepal.
              Demonstrates strong foundations in procedural C programming, data structures, and modern front-end web engineering.
              Proven ability to architect creative and responsive digital platforms, evidenced by the development and launch of the GameHub Arcade web platform.
              Combines academic excellence (3.62 GPA SEE distinction & 2.94 GPA SLC) with passion for scalable web architecture and modern AI tooling.
            </p>
          </div>

          <div class="section">
            <h2>Education & Academic Credentials</h2>
            
            <div style="margin-bottom: 8px;">
              <div class="item-row">
                <span style="font-weight: bold; color: #0f172a;">Bachelor in Information Technology (BIT)</span>
                <span class="badge">Semester 1 • Enrolled (Present)</span>
              </div>
              <div style="font-size: 9.5pt; color: #475569;">Southwestern School of Management and Technology • Kathmandu, Nepal</div>
              <ul>
                <li>Core curricula: Procedural Programming in C, Digital Logic, Computational Mathematics, and Computer Architecture.</li>
                <li>Actively engaging in algorithm design and laboratory computing assignments.</li>
              </ul>
            </div>

            <div style="margin-bottom: 8px;">
              <div class="item-row">
                <span style="font-weight: bold; color: #0f172a;">School Leaving Certificate (SLC - Grade 12)</span>
                <span class="badge">GPA: 2.94 (2026 AD)</span>
              </div>
              <div style="font-size: 9.5pt; color: #475569;">Southwestern State College • Kathmandu, Nepal</div>
              <ul>
                <li>Rigorous higher secondary education in science, physics, mathematics, and computing principles.</li>
              </ul>
            </div>

            <div style="margin-bottom: 8px;">
              <div class="item-row">
                <span style="font-weight: bold; color: #0f172a;">Secondary Education Examination (SEE - Grade 10)</span>
                <span class="badge" style="color: #047857;">GPA: 3.62 (Distinction - 2024 AD)</span>
              </div>
              <div style="font-size: 9.5pt; color: #475569;">Vibhuti Vidhya Mandir • Kathmandu, Nepal</div>
              <ul>
                <li>Graduated with outstanding academic distinction (3.62 GPA) with honors in science and mathematics.</li>
              </ul>
            </div>

            <div>
              <div class="item-row">
                <span style="font-weight: bold; color: #0f172a;">Basic AI Bootcamp Training Certification</span>
                <span class="badge">Certified (2026 AD)</span>
              </div>
              <div style="font-size: 9.5pt; color: #475569;">AI Technology Training Institute</div>
              <ul>
                <li>Comprehensive training on generative AI architectures, prompt engineering methodologies, and developer productivity tools.</li>
              </ul>
            </div>
          </div>

          <div class="section">
            <h2>Key Technical Projects</h2>

            <div style="margin-bottom: 8px;">
              <div class="item-row">
                <span style="font-weight: bold; color: #0f172a;">GameHub Arcade — Interactive Web Gaming Platform</span>
                <span style="font-size: 9.5pt; color: #2563eb;">Live: gamehub-4909.ai.studio</span>
              </div>
              <div style="font-size: 9.5pt; color: #475569; margin-bottom: 2px;">
                Technologies: HTML5 Canvas, JavaScript ES6+, Tailwind CSS, Responsive Game Loops, Vite
              </div>
              <ul>
                <li>Engineered high-performance browser arcade games utilizing 60fps HTML5 Canvas loops and particle renderers.</li>
                <li>Created intuitive keyboard/touch input listeners with dynamic state handling across mobile and desktop displays.</li>
              </ul>
            </div>

            <div>
              <div class="item-row">
                <span style="font-weight: bold; color: #0f172a;">Developer Portfolio & Interactive Platform</span>
                <span style="font-size: 9.5pt; color: #2563eb;">Repository: github.com/sudarshanlama19/Portfolio</span>
              </div>
              <div style="font-size: 9.5pt; color: #475569; margin-bottom: 2px;">
                Technologies: React, TypeScript, Tailwind CSS, Framer Motion, Express.js Backend
              </div>
              <ul>
                <li>Built modern reactive interface featuring real-time GitHub stats synchronization and live multi-device website previewers.</li>
                <li>Hardened full-stack Express server with rate limiting, input sanitization, CSP headers, and anti-crash shields.</li>
              </ul>
            </div>
          </div>

          <div class="section">
            <h2>Technical Skills</h2>
            <div style="margin-bottom: 4px;">
              <strong>Languages & Logic:</strong> C (Pointers, Memory Management, Structs), JavaScript (ES6+), TypeScript, HTML5, CSS3.
            </div>
            <div style="margin-bottom: 4px;">
              <strong>Web & Frameworks:</strong> React, Tailwind CSS, Responsive Web Design, REST APIs, HTML5 Canvas 2D.
            </div>
            <div style="margin-bottom: 4px;">
              <strong>Developer Tools:</strong> Git Version Control, GitHub, Vite, Linux Shell/Terminal, VS Code, npm.
            </div>
            <div>
              <strong>Artificial Intelligence:</strong> Prompt Engineering, LLM Integration (Gemini API), Developer AI workflows.
            </div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 450);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-4xl bg-[#0B1120] border border-blue-900/60 rounded-3xl overflow-hidden shadow-2xl my-6 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Modal Controls Bar */}
            <div className="flex items-center justify-between p-4 sm:p-5 bg-[#080D18] border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="resume-title" className="text-base sm:text-lg font-bold text-white">
                    Sudarshan Lama — Official Curriculum Vitae
                  </h3>
                  <span className="text-xs text-slate-400">
                    PDF Document • Updated 2026 AD • Kathmandu, Nepal
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintOrDownloadPDF}
                  className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/30 active:scale-95 cursor-pointer"
                  title="Download / Print PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download PDF</span>
                  <span className="sm:hidden">PDF</span>
                </button>

                <button
                  onClick={handlePrintOrDownloadPDF}
                  className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                  title="Print Résumé"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-red-950/60 hover:text-red-300 text-slate-400 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Printable Résumé Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 text-slate-200" ref={resumePrintRef}>
              {/* Header Box */}
              <div className="pb-6 border-b border-blue-500/30 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold font-display uppercase tracking-tight text-white">
                    Sudarshan Lama
                  </h1>
                  <p className="text-sm sm:text-base font-semibold text-blue-400 mt-1">
                    Bachelor in Information Technology (BIT) Student | Aspiring Web Developer & AI Enthusiast
                  </p>
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-3 text-xs text-slate-300">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      <span>Kathmandu, Nepal</span>
                    </span>
                    <a href="https://wa.me/9779744690125" className="flex items-center gap-1 hover:text-cyan-300">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>+977 9744690125 (WhatsApp)</span>
                    </a>
                    <a href="mailto:sudarshanlama09@gmail.com" className="flex items-center gap-1 hover:text-cyan-300">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      <span>sudarshanlama09@gmail.com</span>
                    </a>
                    <a href="https://github.com/sudarshanlama19" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-cyan-300">
                      <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                      <span>github.com/sudarshanlama19</span>
                    </a>
                  </div>
                </div>

                <div className="px-3 py-2 rounded-2xl bg-blue-950/60 border border-blue-800/40 text-center shrink-0">
                  <span className="text-[10px] uppercase font-bold text-blue-300 block">Status</span>
                  <span className="text-xs font-extrabold text-emerald-400">Available For Projects</span>
                </div>
              </div>

              {/* Bio Summary */}
              <div>
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-blue-400 mb-2 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Executive Bio</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {PERSONAL_INFO.bio}
                </p>
              </div>

              {/* Education Section */}
              <div>
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-blue-400 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  <span>Education & Academic Credentials</span>
                </h4>

                <div className="space-y-4">
                  {/* BIT */}
                  <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <span className="font-bold text-white text-sm sm:text-base">
                        Bachelor in Information Technology (BIT)
                      </span>
                      <span className="text-xs font-semibold text-cyan-300 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/40 self-start sm:self-auto">
                        Semester 1 • Enrolled (Present)
                      </span>
                    </div>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=South+western+marga%2C+Kathmandu%2C+Bagmati+Province+44600"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-400 hover:text-cyan-300 hover:underline inline-flex items-center gap-1 mb-2 font-medium"
                      title="Open in Google Maps: South western marga, Kathmandu, Bagmati Province 44600"
                    >
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span>Southwestern School of Management and Technology • South western marga, Kathmandu</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                    </a>
                    <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                      <li>Studying C Programming, Computational Mathematics, and Computer Architecture foundations.</li>
                      <li>Engaging in algorithmic problem solving and hands-on laboratory computing.</li>
                    </ul>
                  </div>

                  {/* Grade 12 SLC */}
                  <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <span className="font-bold text-white text-sm sm:text-base">
                        School Leaving Certificate (SLC - Grade 12)
                      </span>
                      <span className="text-xs font-semibold text-blue-300 px-2.5 py-0.5 rounded-full bg-blue-950/60 border border-blue-800/40 self-start sm:self-auto">
                        GPA: 2.94 • 2026 AD
                      </span>
                    </div>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=%E0%A4%B0%E0%A4%BF%E0%A4%99%E0%A5%8D%E0%A4%97+%E0%A4%B0%E0%A5%8B%E0%A4%A1%2C+Kathmandu%2C+Bagmati+Province+44600"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:text-blue-300 hover:underline inline-flex items-center gap-1 mb-2 font-medium"
                      title="Open in Google Maps: रिङ्ग रोड, Kathmandu, Bagmati Province 44600"
                    >
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span>Southwestern State College • रिङ्ग रोड, Kathmandu</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                    </a>
                    <p className="text-xs text-slate-300">
                      Strengthened mathematical reasoning, physics, and computer science foundations with laboratory computing projects.
                    </p>
                  </div>

                  {/* Grade 10 SEE */}
                  <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <span className="font-bold text-white text-sm sm:text-base">
                        Secondary Education Examination (SEE - Grade 10)
                      </span>
                      <span className="text-xs font-semibold text-emerald-300 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/40 self-start sm:self-auto">
                        GPA: 3.62 (Distinction) • 2024 AD
                      </span>
                    </div>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=P7GV%2B3CQ%2C+Ring+Rd%2C+Nagarjun%2C+Bagmati+Province+44600"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-400 hover:text-emerald-300 hover:underline inline-flex items-center gap-1 mb-2 font-medium"
                      title="Open in Google Maps: P7GV+3CQ, Ring Rd, Nagarjun, Bagmati Province 44600"
                    >
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span>Vibhuti Vidhya Mandir • P7GV+3CQ, Ring Rd, Nagarjun</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                    </a>
                    <p className="text-xs text-slate-300">
                      Graduated with high academic distinction (3.62 GPA), discovering early passion for computational logic and programming.
                    </p>
                  </div>

                  {/* AI Bootcamp */}
                  <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <span className="font-bold text-white text-sm sm:text-base">
                        Basic AI Bootcamp Training Certification
                      </span>
                      <span className="text-xs font-semibold text-amber-300 px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-800/40 self-start sm:self-auto">
                        Completed • 2026 AD
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Trained in modern generative AI architectures, prompt engineering methodologies, and developer productivity workflows.
                    </p>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div>
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-blue-400 mb-4 flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-cyan-400" />
                  <span>Key Featured Projects</span>
                </h4>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h5 className="font-bold text-white text-sm sm:text-base">
                        GameHub Arcade — Interactive Web Gaming Platform
                      </h5>
                      <a
                        href="https://gamehub-4909.ai.studio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-cyan-300 hover:underline flex items-center gap-1"
                      >
                        <span>Live Site</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-xs text-slate-300 mb-2">
                      Built a multi-game browser arcade platform utilizing HTML5 Canvas 2D game loops, particle physics, responsive controls, and high-framerate rendering.
                    </p>
                    <div className="flex flex-wrap gap-1.5 text-[11px]">
                      {['JavaScript ES6+', 'HTML5 Canvas', 'Tailwind CSS', 'Vite'].map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-md bg-slate-800 text-cyan-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h5 className="font-bold text-white text-sm sm:text-base">
                        Developer Portfolio & Interactive Platform
                      </h5>
                      <a
                        href="https://github.com/sudarshanlama19/Portfolio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-cyan-300 hover:underline flex items-center gap-1"
                      >
                        <span>GitHub Repo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-xs text-slate-300 mb-2">
                      High-performance single-page portfolio engineered with React, TypeScript, and Tailwind CSS. Features live GitHub API sync, live multi-device website previews, and custom cyber security protections.
                    </p>
                    <div className="flex flex-wrap gap-1.5 text-[11px]">
                      {['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Express.js'].map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-md bg-slate-800 text-cyan-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-blue-400 mb-3 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>Technical Skills</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900/70 border border-white/5">
                    <span className="font-semibold text-white block mb-1">Programming & Systems</span>
                    <p className="text-slate-300">C (Pointers, Memory Allocation, Structs), JavaScript (ES6+), TypeScript</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/70 border border-white/5">
                    <span className="font-semibold text-white block mb-1">Web Engineering</span>
                    <p className="text-slate-300">HTML5 Semantic, CSS3, Tailwind CSS, React, Responsive Viewports</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/70 border border-white/5">
                    <span className="font-semibold text-white block mb-1">Interactive Systems</span>
                    <p className="text-slate-300">HTML5 Canvas 2D, Game Loops, Event Listeners, Micro-animations</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/70 border border-white/5">
                    <span className="font-semibold text-white block mb-1">Developer Tools & AI</span>
                    <p className="text-slate-300">Git, GitHub, Linux Shell, VS Code, Prompt Engineering, Gemini API</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Modal Actions */}
            <div className="p-4 sm:p-5 bg-[#080D18] border-t border-white/10 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-400">
                Print dialog supports "Save as PDF" on all major browsers.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={handlePrintOrDownloadPDF}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download / Print PDF</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
