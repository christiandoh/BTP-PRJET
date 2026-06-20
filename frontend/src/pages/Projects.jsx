import { Link } from 'react-router-dom'

const projects = [
  { img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', tag: 'Résidentiel', title: 'Villa contemporaine', loc: 'Lyon 6e', surf: '450 m²', year: '2025', desc: 'Une villa moderne de 450 m² avec piscine à débordement et domotique intégrée. Structure béton avec parement pierre naturelle.' },
  { img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', tag: 'Commercial', title: 'Tour de bureaux', loc: 'La Défense', surf: '12 000 m²', year: '2024', desc: 'Immeuble de 15 étages certifié HQE, avec façade vitrée et toit-terrasse végétalisé.' },
  { img: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80', tag: 'Rénovation', title: 'Appartement haussmannien', loc: 'Paris 9e', surf: '200 m²', year: '2025', desc: 'Rénovation complète d\'un appartement haussmannien avec moulures d\'époque et parquet chevron restauré.' },
  { img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80', tag: 'Industriel', title: 'Entrepôt logistique', loc: 'Roissy', surf: '8 500 m²', year: '2024', desc: 'Entrepôt logistique aux normes environnementales avec panneaux solaires et système de récupération d\'eaux pluviales.' },
  { img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', tag: 'Résidentiel', title: 'Résidence de standing', loc: 'Paris 16e', surf: '3 200 m²', year: '2025', desc: 'Résidence de 25 appartements de luxe avec jardin paysager et parking souterrain.' },
  { img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', tag: 'Commercial', title: 'Centre commercial', loc: 'Lyon 3e', surf: '15 000 m²', year: '2024', desc: 'Centre commercial avec 40 boutiques, restaurant et parking de 600 places.' },
]

export default function Projects() {
  return (
    <>
      <div className="page-header" />
      <section className="section-header">
        <span className="section-tag">Portfolio</span>
        <h2>Nos <span className="gold">réalisations</span></h2>
        <p className="section-desc">Découvrez l'étendue de notre savoir-faire à travers une sélection de projets d'exception.</p>
      </section>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', paddingBottom: '5rem' }}>
        {projects.map((p, i) => (
          <div key={i} className="project-card" style={{ height: 400 }}>
            <div className="project-thumb" style={{ backgroundImage: `url(${p.img})` }} />
            <div className="project-overlay">
              <div className="project-info">
                <span className="project-tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.loc} — {p.surf}</p>
                <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'rgba(255,255,255,0.4)' }}>{p.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
