import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  if (pathname.startsWith('/admin')) return null

  const links = [
    { to: '/', label: 'Accueil' },
    { to: '/services', label: 'Services' },
    { to: '/projets', label: 'Projets' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="navbar scrolled">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
            <rect x="2" y="20" width="32" height="14" rx="2" stroke="currentColor" strokeWidth="2.5"/>
            <path d="M6 20V10L18 3L30 10V20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="15" y1="27" x2="21" y2="27" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <span>BTP<span style={{ color: '#C8A45C' }}>.</span>Pro</span>
        </Link>
        <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          {links.map(l => (
            <Link key={l.to} to={l.to} className={`nav-item ${pathname === l.to ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
        <Link to="/contact" className="nav-cta">Devis gratuit</Link>
        <button className={`nav-toggle ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
