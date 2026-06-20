import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="nav-logo" style={{ color: 'white' }}>
              <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                <rect x="2" y="20" width="32" height="14" rx="2" stroke="#C8A45C" strokeWidth="2.5"/>
                <path d="M6 20V10L18 3L30 10V20" stroke="#C8A45C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="15" y1="27" x2="21" y2="27" stroke="#C8A45C" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              <span>BTP<span style={{ color: '#C8A45C' }}>.</span>Pro</span>
            </div>
            <p>Leader dans la construction et la rénovation de prestige en France. L'excellence est notre signature.</p>
            <div className="footer-social">
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          <div className="footer-links">
            <h4>Navigation</h4>
            <Link to="/">Accueil</Link>
            <Link to="/services">Services</Link>
            <Link to="/projets">Projets</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-links">
            <h4>Services</h4>
            <Link to="/services">Construction neuve</Link>
            <Link to="/services">Rénovation</Link>
            <Link to="/services">Aménagement</Link>
            <Link to="/services">Gros oeuvre</Link>
          </div>
          <div className="footer-links">
            <h4>Mentions</h4>
            <a href="#">Mentions légales</a>
            <a href="#">Confidentialité</a>
            <a href="#">CGV</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026 BTP.Pro — Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
