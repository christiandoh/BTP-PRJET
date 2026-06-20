import { Link } from 'react-router-dom'

const servicesList = [
  { icon: 'fa-building', title: 'Construction neuve', desc: 'Maisons individuelles, immeubles résidentiels et locaux commerciaux livrés clé en main. Nous prenons en charge l\'intégralité du processus, de l\'étude de faisabilité à la remise des clés.', features: ['Étude de sol et fondations', 'Structure béton/bois/métal', 'Toiture et étanchéité', 'Façade et isolation extérieure', 'Second oeuvre complet', 'Finitions haut de gamme'] },
  { icon: 'fa-rotate-left', title: 'Rénovation complète', desc: 'Rénovation totale ou partielle, ravalement de façade, mise aux normes thermiques et acoustiques. Nous redonnons vie à vos espaces avec un savoir-faire artisanal d\'exception.', features: ['Diagnostic structurel', 'Rénovation lourde', 'Ravalement de façade', 'Mise aux normes électriques', 'Isolation thermique', 'Rénovation écologique'] },
  { icon: 'fa-pencil-ruler', title: 'Aménagement intérieur', desc: 'Plâtrerie, carrelage, parquet, menuiserie sur mesure et agencement d\'espaces. Chaque détail est pensé pour allier esthétique et fonctionnalité.', features: ['Plâtrerie et cloisons', 'Carrelage et pierre naturelle', 'Parquet et sols techniques', 'Menuiserie intérieure sur mesure', 'Agencement de cuisines', 'Salles de bains et dressing'] },
  { icon: 'fa-trowel-bricks', title: 'Gros oeuvre & structure', desc: 'Fondations, dalles, murs porteurs, charpente et couverture réalisés par des équipes qualifiées avec des équipements de pointe.', features: ['Fondations profondes', 'Dalles et planchers', 'Murs porteurs', 'Charpente bois/métal', 'Couverture et zinguerie', 'Démolition et terrassement'] },
]

export default function Services() {
  return (
    <>
      <div className="page-header" />
      <section className="section-header" style={{ paddingTop: '2rem' }}>
        <span className="section-tag">Notre offre</span>
        <h2>Des services <span className="gold">sur mesure</span></h2>
        <p className="section-desc">De la conception à la réalisation, nous vous accompagnons à chaque étape avec une expertise reconnue.</p>
      </section>
      <div className="container">
        {servicesList.map((s, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '5rem', alignItems: 'center', background: '#fff', borderRadius: '16px', padding: '3rem', boxShadow: '0 5px 25px rgba(0,0,0,0.04)' }}>
            <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
              <div style={{ width: 64, height: 64, background: 'rgba(200,164,92,0.1)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', color: '#C8A45C', marginBottom: '1.5rem' }}>
                <i className={`fas ${s.icon}`} />
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '1rem' }}>{s.title}</h2>
              <p style={{ color: '#6b6b80', marginBottom: '1.5rem' }}>{s.desc}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                {s.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
                    <i className="fas fa-check-circle" style={{ color: '#C8A45C', fontSize: '0.9rem' }} /> {f}
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>
                <span>Demander un devis</span><i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
              <img src={`https://images.unsplash.com/photo-${1600585154340 + i * 100}?w=600&q=80`} alt="" style={{ width: '100%', borderRadius: 16, height: 400, objectFit: 'cover' }} onError={e => { e.target.src = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80' }} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
