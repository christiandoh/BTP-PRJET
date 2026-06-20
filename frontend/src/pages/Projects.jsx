import { useState, useEffect } from 'react'
import { projects as projectsApi } from '../api'

export default function Projects() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    projectsApi.getAllFlat().then(setList).catch(() => setList([])).finally(() => setLoading(false))
  }, [])

  return (
    <>
      <div className="page-header" />
      <section className="section-header">
        <span className="section-tag">Portfolio</span>
        <h2>Nos <span className="gold">réalisations</span></h2>
        <p className="section-desc">Découvrez l'étendue de notre savoir-faire à travers une sélection de projets d'exception.</p>
      </section>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', paddingBottom: '5rem' }}>
        {loading ? (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#6b6b80' }}>Chargement...</p>
        ) : list.length === 0 ? (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#6b6b80' }}>Aucun projet pour le moment.</p>
        ) : list.map(p => (
          <div key={p.id} className="project-card" style={{ height: 400 }}>
            <div className="project-thumb" style={{ backgroundImage: `url(${p.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'})` }} />
            <div className="project-overlay">
              <div className="project-info">
                <span className="project-tag">{p.category}</span>
                <h3>{p.title}</h3>
                <p>{p.location}{p.surface ? ` — ${p.surface}` : ''}</p>
                {p.description && <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'rgba(255,255,255,0.4)' }}>{p.description}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
