import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiArrowLeft, FiCode, FiCpu, FiAward, FiSend, FiExternalLink } from 'react-icons/fi'
import {
  SiReact, SiTypescript, SiPython, SiTailwindcss, SiNodedotjs,
  SiPostgresql, SiVite, SiNextdotjs, SiTensorflow, SiDocker, SiGit
} from 'react-icons/si'

type Section = 'home' | 'skills' | 'projects' | 'contact'

interface Props {
  onBackToMountain: () => void
}

/* ═══════════════════════════════════════════
   PROJECTS DATA
   ═══════════════════════════════════════════ */
const projects = [
  {
    emoji: '🚀', title: 'Zarnite',
    desc: 'Full-stack SaaS platform with Stripe integration, real-time telemetry dashboards, and responsive design.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Stripe'],
    links: [{ label: 'Code', url: '#' }, { label: 'Live', url: '#' }],
  },
  {
    emoji: '🧠', title: 'Epilepsy Detection UI',
    desc: 'AI-powered interface for epilepsy diagnosis through EEG data visualization and predictive analytics.',
    tags: ['React', 'Python', 'TensorFlow', 'SQL'],
    links: [{ label: 'Code', url: '#' }],
  },
  {
    emoji: '🌍', title: 'AI Tourism Assistant',
    desc: 'Accessible tourism platform using AI wearables for real-time navigation and environmental awareness.',
    tags: ['Python', 'React', 'Edge AI'],
    links: [{ label: 'Code', url: '#' }],
  },
  {
    emoji: '📊', title: 'Developer Dashboard',
    desc: 'Real-time analytics dashboard with WebSocket connections, customizable widgets, and automated alerting.',
    tags: ['React', 'TypeScript', 'Node.js', 'WebSocket'],
    links: [{ label: 'Code', url: '#' }, { label: 'Live', url: '#' }],
  },
]

const hackathons = [
  { name: 'VTHacks 12', year: '2025', project: 'AI Health Monitor', award: '🏆 Winner' },
  { name: 'HackViolet', year: '2025', project: 'AccessPath', award: '🥈 Top 3' },
  { name: 'Capital One', year: '2024', project: 'FinSight', award: '⭐ Sponsor Prize' },
]

const skills = [
  { cat: 'Frontend', items: [
    { icon: <SiReact />, name: 'React' }, { icon: <SiTypescript />, name: 'TypeScript' },
    { icon: <SiNextdotjs />, name: 'Next.js' }, { icon: <SiVite />, name: 'Vite' },
    { icon: <SiTailwindcss />, name: 'Tailwind' },
  ]},
  { cat: 'Backend', items: [
    { icon: <SiPython />, name: 'Python' }, { icon: <SiNodedotjs />, name: 'Node.js' },
    { icon: <SiPostgresql />, name: 'PostgreSQL' },
  ]},
  { cat: 'AI & DevOps', items: [
    { icon: <SiTensorflow />, name: 'TensorFlow' }, { icon: <SiDocker />, name: 'Docker' },
    { icon: <SiGit />, name: 'Git' },
  ]},
]

/* ═══════════════════════════════════════════
   NAV ITEMS
   ═══════════════════════════════════════════ */
const navItems: { key: Section; label: string; icon: React.ReactNode }[] = [
  { key: 'skills', label: 'Skills', icon: <FiCode className="w-4 h-4" /> },
  { key: 'projects', label: 'Projects', icon: <FiAward className="w-4 h-4" /> },
  { key: 'contact', label: 'Contact', icon: <FiMail className="w-4 h-4" /> },
]

/* ═══════════════════════════════════════════
   MAIN PORTFOLIO COMPONENT
   ═══════════════════════════════════════════ */
export default function Portfolio({ onBackToMountain }: Props) {
  const [section, setSection] = useState<Section>('home')
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="min-h-screen bg-dark-950 relative"
    >
      {/* ── Subtle mountain photo bleed at the top ── */}
      <div className="absolute top-0 left-0 right-0 h-64 overflow-hidden pointer-events-none">
        <img
          src="/mountain.jpg"
          alt=""
          className="w-full h-full object-cover opacity-[0.08]"
          style={{ filter: 'blur(20px) saturate(0.5)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-950" />
      </div>

      {/* ── Top bar ── */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5 max-w-5xl mx-auto">
        <button
          onClick={onBackToMountain}
          className="flex items-center gap-2 text-xs text-warm-400 hover:text-white transition-colors cursor-pointer"
        >
          <FiArrowLeft className="w-3.5 h-3.5" />
          Back to mountain
        </button>

        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setSection(item.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                section === item.key
                  ? 'bg-accent/15 text-accent border border-accent/20'
                  : 'text-warm-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-16">
        <AnimatePresence mode="wait">
          {section === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {/* ── PROFILE CARD ── */}
              <div className="max-w-2xl mx-auto mt-8 md:mt-16">
                <div className="glass-card rounded-2xl p-8 md:p-10">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-2 border-white/[0.06] bg-dark-700">
                        <div className="w-full h-full flex items-center justify-center text-4xl">
                          👨‍💻
                        </div>
                      </div>
                    </div>
                    {/* Info */}
                    <div className="text-center md:text-left flex-1">
                      <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">
                        Ameen Harandi
                      </h1>
                      <p className="text-accent text-sm font-medium mb-3">
                        CS @ Virginia Tech · Class of 2028
                      </p>
                      <p className="text-sm text-warm-300/70 leading-relaxed mb-5">
                        Full-stack developer and AI enthusiast building at the intersection of
                        technology and human impact. Passionate about health-tech, accessibility,
                        and shipping products that matter.
                      </p>
                      {/* Social links */}
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        {[
                          { icon: <FiGithub />, url: 'https://github.com/', label: 'GitHub' },
                          { icon: <FiLinkedin />, url: 'https://linkedin.com/in/', label: 'LinkedIn' },
                          { icon: <FiMail />, url: 'mailto:ameen@example.com', label: 'Email' },
                        ].map((s, i) => (
                          <a
                            key={i}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.label}
                            className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-warm-400 hover:text-accent hover:border-accent/30 transition-all"
                          >
                            {s.icon}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Quick nav cards ── */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {navItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setSection(item.key)}
                      className="glass-card hover-lift rounded-xl p-4 text-center cursor-pointer group"
                    >
                      <div className="text-warm-400 group-hover:text-accent transition-colors mb-1.5 flex justify-center">
                        {item.icon}
                      </div>
                      <span className="text-xs font-medium text-warm-300 group-hover:text-white transition-colors">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* ── Highlights strip ── */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                  {[
                    { icon: <FiCpu className="w-3.5 h-3.5" />, text: 'AI & Health-Tech' },
                    { icon: <FiCode className="w-3.5 h-3.5" />, text: 'React · TypeScript · Python' },
                    { icon: <FiAward className="w-3.5 h-3.5" />, text: 'Hackathon Winner' },
                  ].map((h, i) => (
                    <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] text-xs text-warm-400">
                      {h.icon} {h.text}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {section === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto mt-8"
            >
              <button onClick={() => setSection('home')} className="flex items-center gap-1.5 text-xs text-warm-400 hover:text-white mb-6 cursor-pointer">
                <FiArrowLeft className="w-3 h-3" /> Profile
              </button>
              <h2 className="font-display text-2xl font-bold text-white mb-6">Skills & Technologies</h2>
              <div className="space-y-4">
                {skills.map((group, gi) => (
                  <div key={gi} className="glass-card rounded-xl p-5">
                    <h3 className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">{group.cat}</h3>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((s, si) => (
                        <span key={si} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-sm text-warm-300 hover:text-white hover:border-accent/20 transition-colors">
                          <span className="text-xs text-warm-400">{s.icon}</span>
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {section === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto mt-8"
            >
              <button onClick={() => setSection('home')} className="flex items-center gap-1.5 text-xs text-warm-400 hover:text-white mb-6 cursor-pointer">
                <FiArrowLeft className="w-3 h-3" /> Profile
              </button>
              <h2 className="font-display text-2xl font-bold text-white mb-6">Projects</h2>
              <div className="grid gap-3">
                {projects.map((p, i) => (
                  <div key={i} className="glass-card hover-lift rounded-xl p-5 cursor-default">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0 mt-0.5">{p.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-base font-semibold text-white mb-1">{p.title}</h3>
                        <p className="text-xs text-warm-300/70 leading-relaxed mb-3">{p.desc}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {p.tags.map((t) => (
                              <span key={t} className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] text-warm-400">{t}</span>
                            ))}
                          </div>
                          <div className="flex gap-1.5">
                            {p.links.map((l) => (
                              <a key={l.label} href={l.url} className="flex items-center gap-1 px-2 py-1 rounded text-[10px] text-warm-400 hover:text-accent border border-white/[0.06] hover:border-accent/20 transition-colors">
                                {l.label === 'Code' ? <FiGithub className="w-2.5 h-2.5" /> : <FiExternalLink className="w-2.5 h-2.5" />}
                                {l.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hackathons */}
              <h3 className="font-display text-lg font-bold text-white mt-10 mb-4">Hackathons</h3>
              <div className="space-y-2">
                {hackathons.map((h, i) => (
                  <div key={i} className="glass-card rounded-lg px-4 py-3 flex items-center justify-between">
                    <div>
                      <span className="text-sm text-white font-medium">{h.name}</span>
                      <span className="text-xs text-warm-400 ml-2">{h.year}</span>
                      <p className="text-xs text-warm-400/70 mt-0.5">{h.project}</p>
                    </div>
                    <span className="text-xs font-medium text-accent whitespace-nowrap">{h.award}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {section === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="max-w-lg mx-auto mt-8"
            >
              <button onClick={() => setSection('home')} className="flex items-center gap-1.5 text-xs text-warm-400 hover:text-white mb-6 cursor-pointer">
                <FiArrowLeft className="w-3 h-3" /> Profile
              </button>
              <h2 className="font-display text-2xl font-bold text-white mb-2">Let's connect</h2>
              <p className="text-sm text-warm-400 mb-6">Open to collaborations, internships, and interesting ideas.</p>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  alert('Thanks! This form is a placeholder — wire it to your backend.')
                  setContactForm({ name: '', email: '', message: '' })
                }}
                className="space-y-3"
              >
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text" placeholder="Name" required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.07] text-sm text-white placeholder-warm-400/40 focus:outline-none focus:border-accent/40 transition-colors"
                  />
                  <input
                    type="email" placeholder="Email" required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.07] text-sm text-white placeholder-warm-400/40 focus:outline-none focus:border-accent/40 transition-colors"
                  />
                </div>
                <textarea
                  placeholder="Message" required rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.07] text-sm text-white placeholder-warm-400/40 focus:outline-none focus:border-accent/40 transition-colors resize-none"
                />
                <button type="submit" className="w-full py-2.5 rounded-lg bg-accent/15 border border-accent/25 text-sm font-medium text-accent hover:bg-accent/25 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2">
                  <FiSend className="w-3.5 h-3.5" /> Send message
                </button>
              </form>

              <div className="flex gap-3 mt-6">
                {[
                  { icon: <FiGithub />, label: 'GitHub', url: 'https://github.com/' },
                  { icon: <FiLinkedin />, label: 'LinkedIn', url: 'https://linkedin.com/in/' },
                  { icon: <FiMail />, label: 'Email', url: 'mailto:ameen@example.com' },
                ].map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-sm text-warm-400 hover:text-white hover:border-accent/20 transition-all">
                    {s.icon} {s.label}
                  </a>
                ))}
              </div>

              <p className="text-xs text-warm-400/30 text-center mt-10">
                © {new Date().getFullYear()} Ameen Harandi
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
