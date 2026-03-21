import { useEffect, useState } from 'react'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { activeZoneStore } from '../utils/activeZoneStore'

/* ═══════════════════════════════════════
   DATA
   ═══════════════════════════════════════ */
const skills = [
  { cat: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Vite', 'Tailwind'] },
  { cat: 'Backend', items: ['Python', 'Node.js', 'PostgreSQL'] },
  { cat: 'AI & DevOps', items: ['TensorFlow', 'Docker', 'Git'] },
]

const projects = [
  { emoji: '🚀', title: 'Zarnite', desc: 'Full-stack SaaS platform with Stripe integration and real-time telemetry dashboards.', tags: ['React', 'TypeScript', 'Tailwind', 'Stripe'] },
  { emoji: '🧠', title: 'Epilepsy Detection UI', desc: 'AI-powered interface for epilepsy diagnosis through EEG data visualization.', tags: ['React', 'Python', 'TensorFlow'] },
  { emoji: '🌍', title: 'AI Tourism Assistant', desc: 'Accessible tourism platform using AI wearables for real-time navigation.', tags: ['Python', 'React', 'Edge AI'] },
  { emoji: '📊', title: 'Developer Dashboard', desc: 'Real-time analytics dashboard with WebSocket connections.', tags: ['React', 'TypeScript', 'Node.js'] },
]

const hackathons = [
  { name: 'VTHacks 12', year: '2025', project: 'AI Health Monitor', award: '🏆 Winner' },
  { name: 'HackViolet', year: '2025', project: 'AccessPath', award: '🥈 Top 3' },
  { name: 'Capital One', year: '2024', project: 'FinSight', award: '⭐ Sponsor Prize' },
]

/* ═══════════════════════════════════════
   ZONE CONTENT COMPONENTS
   ═══════════════════════════════════════ */
function Tag({ label }: { label: string }) {
  return <span className="tag">{label}</span>
}

function BaseCampContent() {
  return (
    <>
      <h3>Welcome, Traveler</h3>
      <div className="zone-subtitle">Base Camp</div>
      <p>
        I'm <strong style={{ color: '#fff' }}>Ameen Harandi</strong> — a CS student at Virginia Tech,
        full-stack developer and AI enthusiast. Scroll up the mountain to discover my work.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        {['React', 'TypeScript', 'Python', 'AI', 'Full-Stack'].map(t => <Tag key={t} label={t} />)}
      </div>
    </>
  )
}

function SkillsContent() {
  return (
    <>
      <h3>The Workshop</h3>
      <div className="zone-subtitle">Skills &amp; Technologies</div>
      {skills.map(g => (
        <div key={g.cat} style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#c4915e', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
            {g.cat}
          </div>
          <div className="skill-grid">
            {g.items.map(s => <div key={s} className="skill-item"><span>{s}</span></div>)}
          </div>
        </div>
      ))}
    </>
  )
}

function ProjectsContent() {
  return (
    <>
      <h3>The Launchpad</h3>
      <div className="zone-subtitle">Projects</div>
      {projects.map(p => (
        <div key={p.title} style={{ marginBottom: '10px', padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '1.1rem' }}>{p.emoji}</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{p.title}</span>
          </div>
          <p style={{ fontSize: '0.7rem', lineHeight: 1.5, color: 'rgba(212,200,187,0.6)', margin: '0 0 6px 0' }}>{p.desc}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
            {p.tags.map(t => <Tag key={t} label={t} />)}
          </div>
        </div>
      ))}
    </>
  )
}

function AwardsContent() {
  return (
    <>
      <h3>Trophy Ridge</h3>
      <div className="zone-subtitle">Hackathons &amp; Awards</div>
      {hackathons.map(h => (
        <div key={h.name} className="award-card">
          <div className="award-info">
            <div className="award-name">{h.name} <span style={{ fontSize: '0.6rem', color: '#b8a899' }}>{h.year}</span></div>
            <div className="award-project">{h.project}</div>
          </div>
          <div className="award-badge">{h.award}</div>
        </div>
      ))}
    </>
  )
}

function SummitContent() {
  return (
    <>
      <h3>The Summit</h3>
      <div className="zone-subtitle">You made it to the top!</div>
      <p>Let's connect — I'm always open to collaborations, internships, and interesting ideas.</p>
      <a href="https://github.com/ameenh1" target="_blank" rel="noopener noreferrer" className="social-link">
        <FiGithub /> GitHub
      </a>
      <a href="https://www.linkedin.com/in/ameen-harandi-329325240/" target="_blank" rel="noopener noreferrer" className="social-link">
        <FiLinkedin /> LinkedIn
      </a>
      <a href="mailto:ameenh7181@gmail.com" className="social-link">
        <FiMail /> ameenh7181@gmail.com
      </a>
    </>
  )
}

const contentMap: Record<string, React.ReactNode> = {
  base: <BaseCampContent />,
  skills: <SkillsContent />,
  projects: <ProjectsContent />,
  awards: <AwardsContent />,
  summit: <SummitContent />,
}

/* ═══════════════════════════════════════
   ZONE CARD — fixed DOM overlay, outside Canvas
   ═══════════════════════════════════════ */
export default function ZoneCard() {
  const [activeZone, setActiveZone] = useState<string | null>(activeZoneStore.get())

  useEffect(() => {
    return activeZoneStore.subscribe(setActiveZone)
  }, [])

  const visible = activeZone !== null
  const content = activeZone ? contentMap[activeZone] : null

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        width: '360px',
        maxWidth: '40vw',
        zIndex: 100,
        pointerEvents: visible ? 'auto' : 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.97)',
        transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      <div className="zone-panel">
        {content}
      </div>
    </div>
  )
}
