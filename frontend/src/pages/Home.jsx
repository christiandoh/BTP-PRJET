import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { services, testimonials } from '../api'

const heroImages = [
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=85',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85',
]

export default function Home() {
  const servicesRef = useRef([])
  const statsRef = useRef()
  const observerRef = useRef()
  const [testimonialsList, setTestimonialsList] = useState([])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.15 })
    observerRef.current = obs
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    testimonials.getAll().then(setTestimonialsList).catch(() => {})
  }, [])

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.querySelectorAll('.stat-num').forEach(c => {
          const target = parseInt(c.dataset.target)
          let cur = 0; const step = target / (2000 / 16)
          const fn = () => { cur += step; if (cur < target) { c.textContent = Math.round(cur); requestAnimationFrame(fn) } else c.textContent = target }
          fn()
        })
        obs.unobserve(el)
      }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${heroImages[0]})` }} />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-badge">Fondé en 2009</div>
          <h1>Nous bâtissons<br /><span className="gold">l'excellence</span></h1>
          <p>Construction, rénovation et aménagement de prestige pour les professionnels et particuliers exigeants.</p>
          <div className="hero-buttons">
            <Link to="/contact" className="btn-primary"><span>Démarrer votre projet</span><i className="fas fa-arrow-right"></i></Link>
            <Link to="/projets" className="btn-outline"><span>Voir nos réalisations</span></Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><span className="hero-stat-num">320</span><span className="hero-stat-label">Projets livrés</span></div>
            <div className="hero-stat"><span className="hero-stat-num">15</span><span className="hero-stat-label">Années d'expérience</span></div>
            <div className="hero-stat"><span className="hero-stat-num">48</span><span className="hero-stat-label">Experts</span></div>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-visual reveal">
              <div className="about-image-main"><img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80" alt="" /></div>
              <div className="about-image-secondary"><img src="https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400&q=80" alt="" /></div>
              <div className="about-experience"><span className="experience-number">15+</span><span className="experience-text">Années d'expertise</span></div>
            </div>
            <div className="about-content reveal">
              <span className="section-tag">À propos</span>
              <h2>Une entreprise fondée sur <span className="gold">l'excellence</span> et la confiance</h2>
              <p className="about-desc">Depuis plus de 15 ans, BTP.Pro s'impose comme un acteur majeur de la construction et de la rénovation en France. Notre mission : transformer vos visions en réalisations durables, avec un niveau de finition qui fait notre différence.</p>
              <div className="about-features">
                <div className="about-feature"><i className="fas fa-hard-hat"></i><div><h4>Expertise multidisciplinaire</h4><p>De la conception à la livraison, nous maîtrisons chaque étape.</p></div></div>
                <div className="about-feature"><i className="fas fa-leaf"></i><div><h4>Construction durable</h4><p>Matériaux éco-responsables pour des bâtiments à faible empreinte carbone.</p></div></div>
                <div className="about-feature"><i className="fas fa-certificate"></i><div><h4>Garantie décennale</h4><p>Tous nos travaux sont couverts par une assurance décennale Qualibat.</p></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Notre offre</span>
            <h2>Des solutions complètes <br/>pour chaque projet</h2>
            <p className="section-desc">De la fondation à la touche finale, nous couvrons l'intégralité des besoins de votre chantier.</p>
          </div>
          <div className="services-grid">
            {[
              { icon: 'fa-building', title: 'Construction neuve', desc: 'Maisons individuelles, immeubles résidentiels et locaux commerciaux livrés clé en main.' },
              { icon: 'fa-rotate-left', title: 'Rénovation complète', desc: 'Rénovation lourde ou légère, ravalement de façade, mise aux normes thermiques.' },
              { icon: 'fa-pencil-ruler', title: 'Aménagement intérieur', desc: 'Plâtrerie, carrelage, parquet, menuiserie sur mesure et agencement d\'espaces.' },
              { icon: 'fa-trowel-bricks', title: 'Gros oeuvre & structure', desc: 'Fondations, dalles, murs porteurs, charpente et couverture.' },
            ].map((s, i) => (
              <div key={i} className="service-card reveal">
                <div className="service-icon"><i className={`fas ${s.icon}`} /></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <Link to="/services" className="service-link">En savoir plus <i className="fas fa-arrow-right"></i></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="projects">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Portfolio</span>
            <h2>Nos dernières <span className="gold">réalisations</span></h2>
            <p className="section-desc">Explorez une sélection de nos projets les plus emblématiques.</p>
          </div>
          <div className="projects-grid">
            {[
              { img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', tag: 'Résidentiel', title: 'Villa contemporaine', loc: 'Lyon 6e — 450 m²' },
              { img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', tag: 'Commercial', title: 'Tour de bureaux', loc: 'La Défense — 12 000 m²' },
              { img: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80', tag: 'Rénovation', title: 'Appartement haussmannien', loc: 'Paris 9e — 200 m²' },
              { img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80', tag: 'Industriel', title: 'Entrepôt logistique', loc: 'Roissy — 8 500 m²' },
            ].map((p, i) => (
              <div key={i} className="project-card reveal" style={{ '--img': `url(${p.img})` }}>
                <div className="project-thumb" style={{ backgroundImage: `url(${p.img})` }} />
                <div className="project-overlay">
                  <div className="project-info">
                    <span className="project-tag">{p.tag}</span>
                    <h3>{p.title}</h3>
                    <p>{p.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="projects-cta">
            <Link to="/projets" className="btn-primary">Voir tous nos projets <i className="fas fa-arrow-right"></i></Link>
          </div>
        </div>
      </section>

      {testimonialsList.length > 0 && (
        <section className="testimonials">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Témoignages</span>
              <h2>Ce que disent <span className="gold">nos clients</span></h2>
              <p className="section-desc">La satisfaction de nos clients est notre plus belle récompense.</p>
            </div>
            <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {testimonialsList.map((t, i) => (
                <div key={t.id || i} className="testimonial-card reveal" style={{ background: 'white', borderRadius: 16, padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
                    {Array.from({ length: t.rating || 5 }, (_, j) => (
                      <i key={j} className="fas fa-star" style={{ color: '#C8A45C', fontSize: '0.9rem' }} />
                    ))}
                  </div>
                  <p style={{ color: '#1a1a2e', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1.5rem', fontStyle: 'italic' }}>"{t.content}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    {t.avatarUrl ? (
                      <img src={t.avatarUrl} alt="" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: 44, height: 44, borderRadius: '50%', background: t.avatarColor || '#C8A45C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>{t.name?.charAt(0)}</div>
                    )}
                    <div>
                      <strong style={{ fontSize: '0.9rem' }}>{t.name}</strong>
                      <span style={{ display: 'block', fontSize: '0.8rem', color: '#6b6b80' }}>{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="stats-section" ref={statsRef}>
        <div className="container">
          <div className="stats-grid">
            {[
              { icon: 'fa-building', target: 320, label: 'Projets réalisés' },
              { icon: 'fa-users', target: 48, label: 'Collaborateurs' },
              { icon: 'fa-trophy', target: 98, label: 'Satisfaction client', suffix: '%' },
              { icon: 'fa-clock', target: 15, label: "Années d'expertise" },
            ].map((s, i) => (
              <div key={i} className="stat-item reveal">
                <i className={`fas ${s.icon}`}></i>
                <span className="stat-num" data-target={s.target}>0</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
