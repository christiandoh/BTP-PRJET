import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#e74c3c' }}>
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', marginBottom: '0.5rem' }}>
            Une erreur est survenue
          </h2>
          <p style={{ color: '#6b6b80', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            {this.state.error?.message || 'Erreur inattendue'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.8rem 2rem',
              background: '#C8A45C',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontWeight: 600,
            }}
          >
            <i className="fas fa-redo" style={{ marginRight: 8 }} /> Recharger la page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
