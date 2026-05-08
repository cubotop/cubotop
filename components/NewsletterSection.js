// components/NewsletterSection.js
import { useState } from 'react'

export default function NewsletterSection({ newsletter, currentQD, quadrants }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui você conecta com seu serviço de email (Mailchimp, SendGrid, etc)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setEmail('')
  }

  return (
    <div style={{
      background: `linear-gradient(135deg, ${quadrants[currentQD].color}20, ${quadrants[currentQD].color}10)`,
      border: `2px solid ${quadrants[currentQD].color}`,
      borderRadius: '15px',
      padding: '40px',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '2.5em', marginBottom: '15px' }}>📬</div>
      <h3 style={{ fontSize: '1.5em', margin: '0 0 10px 0', color: quadrants[currentQD].color }}>
        {newsletter.title}
      </h3>
      <p style={{ color: '#999', margin: '0 0 20px 0', fontSize: '0.95em' }}>
        {newsletter.description}
      </p>
      <p style={{ color: '#666', fontSize: '0.85em', margin: '0 0 25px 0' }}>
        {newsletter.frequency}
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', maxWidth: '500px', margin: '0 auto' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
          style={{
            flex: 1,
            padding: '12px 15px',
            background: '#222',
            border: `1px solid ${quadrants[currentQD].color}`,
            borderRadius: '8px',
            color: 'white',
            fontSize: '0.95em',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '12px 30px',
            background: quadrants[currentQD].color,
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          {submitted ? '✓ Inscrito!' : 'Inscrever'}
        </button>
      </form>
    </div>
  )
}
