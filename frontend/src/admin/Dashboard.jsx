import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { projects as projectsApi, testimonials as testimonialsApi, contact as contactApi, stats as statsApi, uploads as uploadsApi } from '../api'
import { CardSkeleton, StatCardSkeleton } from '../components/Skeleton'

function Sidebar({ active }) {
  const nav = useNavigate()
  const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('admin'); nav('/admin') }
  const links = [
    { to: '/admin/dashboard', label: 'Statistiques', icon: 'fa-chart-simple' },
    { to: '/admin/dashboard/projets', label: 'Projets', icon: 'fa-building' },
    { to: '/admin/dashboard/testimonials', label: 'Témoignages', icon: 'fa-star' },
    { to: '/admin/dashboard/messages', label: 'Messages', icon: 'fa-envelope' },
    { to: '/admin/dashboard/assistant', label: 'Assistant IA', icon: 'fa-robot' },
  ]
  return (
    <div style={{ width: 250, background: '#0B0B1A', minHeight: '100vh', padding: '2rem 0', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
        <Link to="/admin/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '1.3rem', fontWeight: 800 }}>BTP<span style={{ color: '#C8A45C' }}>.</span>Pro</Link>
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>Dashboard Admin</div>
      </div>
      {links.map(l => (
        <Link key={l.to} to={l.to} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.8rem 1.5rem', color: active.startsWith(l.to) ? '#C8A45C' : 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.9rem', transition: 'all 0.3s', background: active.startsWith(l.to) ? 'rgba(200,164,92,0.05)' : 'transparent', borderLeft: active.startsWith(l.to) ? '3px solid #C8A45C' : '3px solid transparent' }}>
          <i className={`fas ${l.icon}`} style={{ width: 20 }} /> {l.label}
        </Link>
      ))}
      <div style={{ marginTop: 'auto', padding: '0 1.5rem' }}>
        <Link to="/" style={{ display: 'block', padding: '0.8rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.85rem', textAlign: 'center', marginBottom: '0.5rem' }}>
          <i className="fas fa-external-link-alt" style={{ marginRight: 8 }} /> Voir le site
        </Link>
        <button onClick={logout} style={{ width: '100%', padding: '0.8rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontFamily: 'inherit' }}>
          <i className="fas fa-sign-out-alt" style={{ marginRight: 8 }} /> Déconnexion
        </button>
      </div>
    </div>
  )
}

function Card({ children, title, style: cardStyle }) {
  return (
    <div style={{ background: 'white', borderRadius: 12, padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', ...cardStyle }}>
      {title && <h3 style={{ fontSize: '1rem', marginBottom: '1rem', fontWeight: 700 }}>{title}</h3>}
      {children}
    </div>
  )
}

function Modal({ open, onClose, children }) {
  if (!open) return null
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1rem' }} onClick={onClose}>
      <div style={{ background: 'white', borderRadius: 16, padding: '2rem', width: '100%', maxWidth: 600, maxHeight: '80vh', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, color }) {
  return (
    <div style={{ background: 'white', borderRadius: 12, padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ width: 52, height: 52, borderRadius: 12, background: `${color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color }}>
        <i className={`fas ${icon}`} />
      </div>
      <div>
        <span style={{ fontSize: '2rem', fontWeight: 800, color: '#1a1a2e', display: 'block', lineHeight: 1.2 }}>{value}</span>
        <span style={{ fontSize: '0.85rem', color: '#6b6b80' }}>{label}</span>
      </div>
    </div>
  )
}

const CHART_COLORS = ['#C8A45C', '#2ecc71', '#3498db', '#e74c3c', '#9b59b6', '#1abc9c']

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'white', padding: '0.8rem 1.2rem', borderRadius: 8, boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: '1px solid #eee' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.3rem', fontSize: '0.85rem' }}>{label}</p>
        {payload.map((p, i) => <p key={i} style={{ color: p.color, fontSize: '0.85rem' }}>{p.name}: {p.value}</p>)}
      </div>
    )
  }
  return null
}

function HomeStats() {
  const [data, setData] = useState(null)
  useEffect(() => { statsApi.get().then(setData).catch(() => {}) }, [])

  if (!data) return (
    <div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', marginBottom: '0.5rem' }}>Tableau de bord</h2>
      <p style={{ color: '#6b6b80', marginBottom: '2rem' }}>Chargement des données...</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[1,2,3,4].map(i => <StatCardSkeleton key={i} />)}
      </div>
    </div>
  )

  const pieData = [
    { name: 'Lus', value: data.read, color: '#2ecc71' },
    { name: 'Non lus', value: data.unread, color: '#e74c3c' },
  ]

  const barData = data.projectsByCategory?.length ? data.projectsByCategory : [{ name: 'Non catégorisé', count: data.projects }]

  return (
    <div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', marginBottom: '0.5rem' }}>Tableau de bord</h2>
      <p style={{ color: '#6b6b80', marginBottom: '2rem' }}>Aperçu général de votre activité <span style={{ color: '#C8A45C', fontWeight: 600 }}>BTP.Pro</span></p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard icon="fa-building" label="Projets" value={data.projects} color="#C8A45C" />
        <StatCard icon="fa-star" label="Témoignages" value={data.testimonials} color="#2ecc71" />
        <StatCard icon="fa-envelope" label="Messages" value={data.messages} color="#3498db" />
        <StatCard icon="fa-bell" label="Non lus" value={data.unread} color="#e74c3c" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <Card title="Projets par catégorie">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b6b80' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#6b6b80' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(200,164,92,0.08)' }} />
              <Bar dataKey="count" name="Projets" radius={[6, 6, 0, 0]} barSize={48}>
                {barData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Statut des messages">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" nameKey="name" stroke="none">
                {pieData.map((e, i) => <cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={(value) => <span style={{ color: '#6b6b80', fontSize: '0.85rem' }}>{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Card title="Derniers projets">
          {data.recentProjects?.length ? data.recentProjects.map(p => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.6rem 0', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#C8A45C', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{p.title}</span>
                <span style={{ fontSize: '0.75rem', color: '#6b6b80', marginLeft: '0.5rem' }}>{p.category}</span>
              </div>
            </div>
          )) : <p style={{ color: '#6b6b80', fontSize: '0.9rem' }}>Aucun projet récent.</p>}
        </Card>

        <Card title="Accès rapide">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {[
              { to: '/admin/dashboard/projets', icon: 'fa-plus', label: 'Ajouter un projet', color: '#C8A45C' },
              { to: '/admin/dashboard/testimonials', icon: 'fa-plus', label: 'Ajouter un témoignage', color: '#2ecc71' },
              { to: '/admin/dashboard/messages', icon: 'fa-eye', label: 'Voir les messages', color: '#3498db' },
              { to: '/admin/dashboard/assistant', icon: 'fa-robot', label: 'Assistant IA', color: '#9b59b6' },
            ].map(l => (
              <Link key={l.to} to={l.to} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.7rem 1rem', background: `${l.color}08`, borderRadius: 8, color: '#1a1a2e', textDecoration: 'none', fontSize: '0.88rem', transition: 'all 0.2s' }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: `${l.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: l.color }}><i className={`fas ${l.icon}`} /></div>
                {l.label}
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

function ProjectsList() {
  const [list, setList] = useState([])
  const [modal, setModal] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', category: '', location: '', surface: '', imageUrl: '' })

  useEffect(() => { load() }, [])
  const load = async () => { try { setList(await projectsApi.getAll()) } catch {} }

  const openEdit = (p) => { setForm(p || { title: '', description: '', category: '', location: '', surface: '', imageUrl: '' }); setModal(p ? 'edit' : 'create') }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const res = await uploadsApi.upload(file)
      setForm({ ...form, imageUrl: res.url })
    } catch { alert('Erreur upload') }
    setUploading(false)
  }

  const save = async () => {
    try {
      if (modal === 'create') await projectsApi.create(form)
      else await projectsApi.update(form.id, form)
      setModal(null); load()
    } catch { alert('Erreur') }
  }

  const del = async (id) => { if (confirm('Supprimer ce projet ?')) { await projectsApi.delete(id); load() } }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem' }}>Projets</h2>
        <button className="btn-primary" onClick={() => openEdit(null)} style={{ cursor: 'pointer' }}><i className="fas fa-plus"></i> Nouveau projet</button>
      </div>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {list.length === 0 && <p style={{ color: '#6b6b80' }}>Aucun projet pour le moment.</p>}
        {list.map(p => (
          <Card key={p.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {p.imageUrl && <img src={p.imageUrl} alt="" style={{ width: 60, height: 60, borderRadius: 8, objectFit: 'cover' }} />}
                <div>
                  <strong>{p.title}</strong>
                  <span style={{ color: '#6b6b80', fontSize: '0.85rem', marginLeft: '0.5rem' }}>{p.category} — {p.location} ({p.surface})</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                <button onClick={() => openEdit(p)} style={{ padding: '0.4rem 1rem', cursor: 'pointer', border: '1px solid #ddd', borderRadius: 6, background: 'white' }}><i className="fas fa-edit"></i></button>
                <button onClick={() => del(p.id)} style={{ padding: '0.4rem 1rem', cursor: 'pointer', border: '1px solid #e74c3c', borderRadius: 6, background: 'white', color: '#e74c3c' }}><i className="fas fa-trash"></i></button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Modal open={modal} onClose={() => setModal(null)}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>{modal === 'create' ? 'Nouveau projet' : 'Modifier le projet'}</h3>
        {['title','description','category','location','surface'].map(f => (
          <input key={f} placeholder={f} value={form[f]} onChange={e => setForm({...form, [f]: e.target.value})} style={{ width: '100%', padding: '0.8rem', border: '1.5px solid #e8e8ee', borderRadius: 8, marginBottom: '0.8rem', fontFamily: 'inherit', fontSize: '0.9rem' }} />
        ))}
        <div style={{ marginBottom: '0.8rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.8rem', border: '1.5px dashed #ccc', borderRadius: 8, cursor: 'pointer', fontSize: '0.9rem', color: '#6b6b80' }}>
            <i className="fas fa-cloud-upload-alt" style={{ fontSize: '1.2rem', color: '#C8A45C' }} />
            {uploading ? 'Upload en cours...' : form.imageUrl ? 'Image ajoutée ✓' : 'Cliquez pour uploader une image'}
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
          </label>
          {form.imageUrl && <img src={form.imageUrl} alt="" style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 8, marginTop: '0.5rem' }} />}
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button className="btn-primary" onClick={save} style={{ cursor: 'pointer' }} disabled={uploading}>Enregistrer</button>
          <button onClick={() => setModal(null)} style={{ padding: '0.9rem 2rem', border: '1px solid #ddd', borderRadius: 8, background: 'white', cursor: 'pointer', fontFamily: 'inherit' }}>Annuler</button>
        </div>
      </Modal>
    </div>
  )
}

function TestimonialsList() {
  const [list, setList] = useState([])
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({ name: '', role: '', content: '', rating: 5, avatarColor: '#C8A45C' })

  useEffect(() => { load() }, [])
  const load = async () => { try { setList(await testimonialsApi.getAll()) } catch {} }

  const openEdit = (t) => { setForm(t || { name: '', role: '', content: '', rating: 5, avatarColor: '#C8A45C' }); setModal(t ? 'edit' : 'create') }

  const save = async () => {
    try {
      if (modal === 'create') await testimonialsApi.create(form)
      else await testimonialsApi.update(form.id, form)
      setModal(null); load()
    } catch { alert('Erreur') }
  }

  const del = async (id) => { if (confirm('Supprimer ce témoignage ?')) { await testimonialsApi.delete(id); load() } }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem' }}>Témoignages</h2>
        <button className="btn-primary" onClick={() => openEdit(null)} style={{ cursor: 'pointer' }}><i className="fas fa-plus"></i> Ajouter</button>
      </div>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {list.length === 0 && <p style={{ color: '#6b6b80' }}>Aucun témoignage.</p>}
        {list.map(t => (
          <Card key={t.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{t.name}</strong> <span style={{ color: '#6b6b80', fontSize: '0.85rem' }}>— {t.role}</span>
                <p style={{ color: '#6b6b80', fontSize: '0.9rem', marginTop: '0.3rem', fontStyle: 'italic' }}>"{t.content?.substring(0, 100)}..."</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => openEdit(t)} style={{ padding: '0.4rem 1rem', cursor: 'pointer', border: '1px solid #ddd', borderRadius: 6, background: 'white' }}><i className="fas fa-edit"></i></button>
                <button onClick={() => del(t.id)} style={{ padding: '0.4rem 1rem', cursor: 'pointer', border: '1px solid #e74c3c', borderRadius: 6, background: 'white', color: '#e74c3c' }}><i className="fas fa-trash"></i></button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Modal open={modal} onClose={() => setModal(null)}>
        <h3 style={{ marginBottom: '1.5rem' }}>{modal === 'create' ? 'Nouveau témoignage' : 'Modifier'}</h3>
        <input placeholder="Nom" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{ width: '100%', padding: '0.8rem', border: '1.5px solid #e8e8ee', borderRadius: 8, marginBottom: '0.8rem', fontFamily: 'inherit' }} />
        <input placeholder="Rôle" value={form.role} onChange={e => setForm({...form, role: e.target.value})} style={{ width: '100%', padding: '0.8rem', border: '1.5px solid #e8e8ee', borderRadius: 8, marginBottom: '0.8rem', fontFamily: 'inherit' }} />
        <textarea placeholder="Contenu du témoignage" value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={4} style={{ width: '100%', padding: '0.8rem', border: '1.5px solid #e8e8ee', borderRadius: 8, marginBottom: '0.8rem', fontFamily: 'inherit', resize: 'vertical' }}></textarea>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button className="btn-primary" onClick={save} style={{ cursor: 'pointer' }}>Enregistrer</button>
          <button onClick={() => setModal(null)} style={{ padding: '0.9rem 2rem', border: '1px solid #ddd', borderRadius: 8, background: 'white', cursor: 'pointer', fontFamily: 'inherit' }}>Annuler</button>
        </div>
      </Modal>
    </div>
  )
}

function MessagesList() {
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => { load() }, [page])
  const load = async () => {
    setLoading(true)
    try {
      const res = await contactApi.getAll(page)
      setList(res.data || [])
      setPages(res.pages || 1)
    } catch {}
    setLoading(false)
  }

  const markRead = async (id) => { await contactApi.markRead(id); load() }
  const del = async (id) => { if (confirm('Supprimer ce message ?')) { await contactApi.delete(id); load() } }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem' }}>Messages reçus</h2>
      </div>
      {loading ? (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {[1,2,3].map(i => <CardSkeleton key={i} />)}
        </div>
      ) : list.length === 0 ? (
        <p style={{ color: '#6b6b80' }}>Aucun message.</p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {list.map(m => (
            <Card key={m.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                    <strong>{m.name}</strong>
                    <span style={{ color: '#6b6b80', fontSize: '0.85rem' }}>{m.email}</span>
                    {!m.read && <span style={{ background: '#C8A45C', color: 'white', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: 4 }}>Nouveau</span>}
                  </div>
                  <p style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}><strong>Sujet :</strong> {m.subject}</p>
                  {m.service && <p style={{ fontSize: '0.85rem', color: '#6b6b80' }}>Service : {m.service}</p>}
                  <p style={{ fontSize: '0.9rem', color: '#6b6b80', marginTop: '0.5rem' }}>{m.message}</p>
                  <p style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '0.5rem' }}>{new Date(m.createdAt).toLocaleDateString('fr-FR')} à {new Date(m.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0, marginLeft: '1rem' }}>
                  {!m.read && <button onClick={() => markRead(m.id)} style={{ padding: '0.4rem 0.8rem', cursor: 'pointer', border: '1px solid #ddd', borderRadius: 6, background: 'white', fontSize: '0.8rem' }}>Lu</button>}
                  <button onClick={() => del(m.id)} style={{ padding: '0.4rem 0.8rem', cursor: 'pointer', border: '1px solid #e74c3c', borderRadius: 6, background: 'white', color: '#e74c3c', fontSize: '0.8rem' }}><i className="fas fa-trash"></i></button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      {pages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
          <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: 6, background: 'white', cursor: page === 1 ? 'default' : 'pointer', opacity: page === 1 ? 0.5 : 1 }}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <span style={{ padding: '0.5rem 1rem', color: '#6b6b80', fontSize: '0.9rem' }}>Page {page} / {pages}</span>
          <button onClick={() => setPage(p => Math.min(pages, p+1))} disabled={page === pages} style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: 6, background: 'white', cursor: page === pages ? 'default' : 'pointer', opacity: page === pages ? 0.5 : 1 }}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  )
}

function Assistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Bonjour ! Je suis votre assistant BTP.Pro. Je peux vous donner des informations sur vos projets, témoignages, messages et statistiques. Posez-moi une question !' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)

    try {
      const [statsData, projectsData, testimonialsData, messagesData] = await Promise.all([
        statsApi.get().catch(() => null),
        projectsApi.getAll().catch(() => []),
        testimonialsApi.getAll().catch(() => []),
        contactApi.getAll().catch(() => []),
      ])

      const q = userMsg.toLowerCase()
      let response = ''

      if (q.includes('statistique') || q.includes('stats') || q.includes('combien') || q.includes('nombre')) {
        if (statsData) {
          response = `Voici les statistiques actuelles :\n\n📊 **Projets :** ${statsData.projects}\n⭐ **Témoignages :** ${statsData.testimonials}\n📧 **Messages reçus :** ${statsData.messages} (${statsData.unread} non lus)\n🔧 **Services :** ${statsData.services}\n\nQue souhaitez-vous voir en détail ?`
        } else {
          response = 'Désolé, je n\'ai pas pu récupérer les statistiques.'
        }
      } else if (q.includes('projet') || q.includes('chantier')) {
        if (projectsData.length > 0) {
          response = `Voici la liste des ${projectsData.length} projets :\n\n${projectsData.map((p, i) => `${i + 1}. **${p.title}** (${p.category}) — ${p.location} ${p.surface ? '(' + p.surface + ')' : ''}`).join('\n')}`
        } else {
          response = 'Aucun projet enregistré pour le moment.'
        }
      } else if (q.includes('message') || q.includes('contact') || q.includes('email')) {
        const unread = messagesData.filter(m => !m.read)
        response = `Vous avez **${messagesData.length} messages** au total, dont **${unread.length} non lus**.\n\n${unread.length > 0 ? 'Derniers messages non lus :\n' + unread.slice(0, 3).map(m => `• **${m.name}** — ${m.subject}`).join('\n') : 'Tous les messages ont été lus.'}`
      } else if (q.includes('témoignage') || q.includes('testimonial') || q.includes('avis')) {
        response = `Vous avez **${testimonialsData.length} témoignages** clients.\n\n${testimonialsData.map((t, i) => `${i + 1}. **${t.name}** (${t.role})`).join('\n')}`
      } else if (q.includes('bonjour') || q.includes('salut') || q.includes('hello')) {
        response = 'Bonjour ! Je suis votre assistant virtuel BTP.Pro. Je peux vous renseigner sur vos statistiques, projets, témoignages et messages. Que puis-je faire pour vous ?'
      } else if (q.includes('aide') || q.includes('help') || q.includes('commande')) {
        response = 'Voici ce que je peux faire :\n\n• **"Statistiques"** — Voir les chiffres clés\n• **"Projets"** — Liste de tous les projets\n• **"Messages"** — Résumé des messages reçus\n• **"Témoignages"** — Aperçu des témoignages clients\n• **"Images"** — Pour uploader une image, rendez-vous dans la section Projets'
      } else {
        response = 'Je n\'ai pas compris votre demande. Voici ce que je peux faire :\n\n• **"Statistiques"** — Chiffres clés\n• **"Projets"** — Tous les projets\n• **"Messages"** — Messages reçus\n• **"Témoignages"** — Avis clients\n• **"Aide"** — Voir les commandes disponibles'
      }

      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', text: response }])
        setLoading(false)
      }, 500)
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Erreur de connexion au serveur.' }])
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 5rem)' }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', marginBottom: '0.5rem' }}>Assistant IA</h2>
      <p style={{ color: '#6b6b80', marginBottom: '1.5rem' }}>Posez une question sur votre système. L'assistant analyse les données en temps réel.</p>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem', paddingRight: '0.5rem' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '80%', padding: '1rem 1.2rem', borderRadius: 12, background: m.role === 'user' ? '#C8A45C' : 'white', color: m.role === 'user' ? 'white' : '#1a1a2e', boxShadow: m.role === 'user' ? 'none' : '0 1px 3px rgba(0,0,0,0.04)', whiteSpace: 'pre-line', lineHeight: '1.6' }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'white', color: '#6b6b80', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <i className="fas fa-spinner fa-spin"></i> Réflexion...
            </div>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Posez votre question..." style={{ flex: 1, padding: '0.9rem 1.2rem', border: '1.5px solid #e8e8ee', borderRadius: 10, fontFamily: 'inherit', fontSize: '0.9rem' }} />
        <button onClick={handleSend} disabled={loading} style={{ width: 48, height: 48, border: 'none', borderRadius: 10, background: '#C8A45C', color: 'white', cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <i className="fas fa-paper-plane" />
        </button>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const loc = useLocation()
  const activePath = loc.pathname

  const page = () => {
    if (activePath.includes('/projets')) return <ProjectsList />
    if (activePath.includes('/testimonials')) return <TestimonialsList />
    if (activePath.includes('/messages')) return <MessagesList />
    if (activePath.includes('/assistant')) return <Assistant />
    return <HomeStats />
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar active={activePath} />
      <div style={{ flex: 1, padding: '2.5rem', background: '#F8F8FC', minHeight: '100vh', overflow: 'auto' }}>
        {page()}
      </div>
    </div>
  )
}
