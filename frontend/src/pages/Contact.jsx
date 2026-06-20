import { useState } from 'react'
import { contact as contactApi } from '../api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', service: '', message: '' })
  const [status, setStatus] = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setStatus('Veuillez remplir tous les champs obligatoires.')
      return
    }
    try {
      await contactApi.send(form)
      setStatus('Merci ! Votre message a été envoyé. Nous vous répondrons sous 24h.')
      setForm({ name: '', email: '', subject: '', service: '', message: '' })
    } catch {
      setStatus('Erreur lors de l\'envoi. Veuillez réessayer.')
    }
  }

  return (
    <>
      <div className="page-header" />
      <section className="contact">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Contact</span>
            <h2>Parlons de <span className="gold">votre projet</span></h2>
            <p className="section-desc">Que vous ayez un projet précis ou une simple question, notre équipe est disponible.</p>
          </div>
          <div className="contact-grid">
            <div className="contact-info-side">
              <div className="contact-details">
                <div className="contact-detail">
                  <i className="fas fa-phone"></i>
                  <div><span className="detail-label">Téléphone</span><span className="detail-value">01 23 45 67 89</span></div>
                </div>
                <div className="contact-detail">
                  <i className="fas fa-envelope"></i>
                  <div><span className="detail-label">Email</span><span className="detail-value">contact@btppro.fr</span></div>
                </div>
                <div className="contact-detail">
                  <i className="fas fa-location-dot"></i>
                  <div><span className="detail-label">Adresse</span><span className="detail-value">12 Rue de la Construction, 75001 Paris</span></div>
                </div>
                <div className="contact-detail">
                  <i className="fas fa-clock"></i>
                  <div><span className="detail-label">Horaires</span><span className="detail-value">Lun-Ven 8h-19h, Sam 9h-13h</span></div>
                </div>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input type="text" name="name" placeholder="Nom complet" value={form.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Adresse email" value={form.email} onChange={handleChange} required />
              </div>
              <input type="text" name="subject" placeholder="Sujet" value={form.subject} onChange={handleChange} />
              <select name="service" value={form.service} onChange={handleChange}>
                <option value="">Type de projet</option>
                <option>Construction neuve</option>
                <option>Rénovation</option>
                <option>Aménagement intérieur</option>
                <option>Gros oeuvre</option>
                <option>Autre</option>
              </select>
              <textarea name="message" placeholder="Décrivez votre projet..." rows="5" value={form.message} onChange={handleChange} required></textarea>
              <button type="submit" className="btn-primary"><span>Envoyer la demande</span><i className="fas fa-paper-plane"></i></button>
              <div className="form-message" style={{ color: status.includes('Merci') ? '#27ae60' : '#e74c3c' }}>{status}</div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
