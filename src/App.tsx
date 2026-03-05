/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  Download,
  Palette,
  Film,
  Settings,
  Briefcase,
  User,
  Cpu,
  Send,
  CheckCircle2,
  AlertCircle,
  Globe
} from 'lucide-react';
import { resumeData } from './data';

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12">
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono mb-2 block"
    >
      {subtitle || "Section"}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-5xl font-light tracking-tight text-white"
    >
      {title}
    </motion.h2>
  </div>
);

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'experience', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black">
      {/* Navigation Rail */}
      <nav className="fixed left-0 top-0 h-full w-20 hidden md:flex flex-col items-center justify-between py-12 border-r border-white/5 z-50 bg-[#050505]">
        <div className="text-xl font-bold tracking-tighter">
          {resumeData.name.split(' ').map(n => n[0]).join('')}
        </div>
        
        <div className="flex flex-col gap-8 items-center">
          {['home', 'experience', 'projects', 'skills', 'contact'].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className="group relative py-2"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className={`w-1 h-1 rounded-full transition-all duration-300 ${activeSection === section ? 'bg-white scale-[3]' : 'bg-white/20 group-hover:bg-white/50'}`} />
              <span className="absolute left-8 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {section}
              </span>
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <a href="#" className="text-white/40 hover:text-white transition-colors"><Github size={18} /></a>
          <a href="#" className="text-white/40 hover:text-white transition-colors"><Linkedin size={18} /></a>
        </div>
      </nav>

      <main className="md:ml-20">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center px-8 md:px-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl z-10"
          >
            <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-white/40 mb-6 block font-mono">
              Available for new opportunities
            </span>
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.85] mb-8">
              {resumeData.name.split(' ')[0]}<br />
              <span className="text-white/20">{resumeData.name.split(' ')[1]}</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl font-light leading-relaxed mb-12">
              {resumeData.summary}
            </p>
            
            <div className="flex flex-wrap gap-6">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-black font-medium rounded-full flex items-center gap-2 hover:bg-white/90 transition-colors"
              >
                Contact Me <Mail size={18} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-white/20 text-white font-medium rounded-full flex items-center gap-2 hover:bg-white/5 transition-colors"
              >
                Download CV <Download size={18} />
              </motion.button>
            </div>
          </motion.div>

          <div className="absolute bottom-12 left-8 md:left-24 flex items-center gap-4 text-white/20 text-xs tracking-widest uppercase font-mono">
            <div className="w-12 h-[1px] bg-white/20" />
            Scroll to explore
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-32 px-8 md:px-24 bg-[#0a0a0a]">
          <SectionHeader title="Experience" subtitle="Career Path" />
          
          <div className="max-w-5xl space-y-12">
            {resumeData.experience.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group grid md:grid-cols-[200px_1fr] gap-8 p-8 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all"
              >
                <div className="text-white/40 font-mono text-sm pt-1">
                  {exp.period}
                </div>
                <div>
                  <h3 className="text-2xl font-medium mb-1 group-hover:text-white transition-colors">
                    {exp.role}
                  </h3>
                  <div className="text-white/60 mb-4 flex items-center gap-2">
                    <Briefcase size={14} /> {exp.company}
                  </div>
                  <p className="text-white/40 leading-relaxed mb-6 max-w-2xl">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 rounded-full bg-white/5 text-[10px] uppercase tracking-wider text-white/60 border border-white/5">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-8 md:px-24">
          <SectionHeader title="Selected Projects" subtitle="Portfolio" />
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl">
            {resumeData.projects.map((project, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col"
              >
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-8 border border-white/5 bg-white/[0.02]">
                  <img 
                    src={`https://picsum.photos/seed/${project.title}/1200/800`} 
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-3xl font-light tracking-tight group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex gap-4">
                      {project.repoLink && (
                        <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                          <Github size={20} />
                        </a>
                      )}
                      {project.demoLink && (
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                          <Globe size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-white/50 leading-relaxed mb-6">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies?.map(tech => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-white/5 text-[10px] uppercase tracking-widest text-white/40 border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 px-8 md:px-24 bg-[#0a0a0a]">
          <SectionHeader title="Expertise" subtitle="Technical Skills" />
          
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl">
            <SkillCategory title="Design" icon={<Palette size={20} />} skills={resumeData.skills.design} />
            <SkillCategory title="Creative" icon={<Film size={20} />} skills={resumeData.skills.creative} />
            <SkillCategory title="Technical" icon={<Settings size={20} />} skills={resumeData.skills.technical} />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-8 md:px-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/[0.02] -skew-x-12 translate-x-1/2 pointer-events-none" />
          
          <div className="max-w-6xl grid md:grid-cols-2 gap-24">
            <div>
              <SectionHeader title="Get in Touch" subtitle="Contact" />
              <p className="text-xl text-white/50 font-light leading-relaxed mb-12">
                Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to new opportunities and collaborations.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Email</div>
                    <a href={`mailto:${resumeData.email}`} className="text-lg hover:text-white/60 transition-colors">{resumeData.email}</a>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1">LinkedIn</div>
                    <a href="#" className="text-lg hover:text-white/60 transition-colors">linkedin.com/in/username</a>
                  </div>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="p-8 md:p-12 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm"
            >
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 ml-1">Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 ml-1">Email</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 ml-1">Message</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/30 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <button 
                  disabled={formStatus === 'submitting'}
                  className="w-full py-4 bg-white text-black font-medium rounded-2xl flex items-center justify-center gap-2 hover:bg-white/90 transition-all disabled:opacity-50"
                >
                  {formStatus === 'submitting' ? (
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>Send Message <Send size={18} /></>
                  )}
                </button>

                <AnimatePresence>
                  {formStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-emerald-400 text-sm justify-center"
                    >
                      <CheckCircle2 size={16} /> Message sent successfully!
                    </motion.div>
                  )}
                  {formStatus === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-rose-400 text-sm justify-center"
                    >
                      <AlertCircle size={16} /> Something went wrong. Please try again.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-24 px-8 md:px-24 border-t border-white/5 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">Let's build something <span className="text-white/20 italic">extraordinary</span>.</h2>
          <p className="text-white/40 mb-12 max-w-xl mx-auto">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
          <a 
            href={`mailto:${resumeData.email}`}
            className="text-2xl md:text-3xl font-light underline underline-offset-8 hover:text-white/60 transition-colors"
          >
            {resumeData.email}
          </a>
          
          <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.3em] text-white/20">
            <div>© {new Date().getFullYear()} {resumeData.name}</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Dribbble</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function SkillCategory({ title, icon, skills }: { title: string; icon: React.ReactNode; skills: string[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="p-8 rounded-3xl border border-white/5 bg-white/[0.01]"
    >
      <div className="flex items-center gap-3 mb-8 text-white/40">
        {icon}
        <h3 className="text-sm uppercase tracking-[0.2em] font-mono">{title}</h3>
      </div>
      <div className="flex flex-col gap-4">
        {skills.map((skill, idx) => (
          <div key={skill} className="flex items-center justify-between group">
            <span className="text-white/60 group-hover:text-white transition-colors">{skill}</span>
            <div className="h-[1px] flex-grow mx-4 bg-white/5 group-hover:bg-white/20 transition-colors" />
            <span className="text-[10px] text-white/20 font-mono">0{idx + 1}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
