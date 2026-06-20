import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth as authApi } from '../api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const nav = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await authApi.login({ email, password })
      localStorage.setItem('token', res.token)
      localStorage.setItem('admin', JSON.stringify(res.admin))
      nav('/admin/dashboard')
    } catch {
      setError('Email ou mot de passe incorrect')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0B0B1A', padding: '2rem' }}>
      <div style={{ background: 'white', padding: '3rem', borderRadius: 16, width: '100%', maxWidth: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>BTP<span style={{ color: '#C8A45C' }}>.</span>Pro</div>
          <p style={{ color: '#6b6b80', fontSize: '0.9rem' }}>Espace administrateur</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '1rem', border: '1.5px solid #e8e8ee', borderRadius: 10, fontSize: '0.95rem', marginBottom: '1rem', fontFamily: 'inherit' }} />
          <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '1rem', border: '1.5px solid #e8e8ee', borderRadius: 10, fontSize: '0.95rem', marginBottom: '1rem', fontFamily: 'inherit' }} />
          {error && <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>}
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Se connecter</button>
        </form>
      </div>
    </div>
  )
}
