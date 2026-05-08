// components/CuboDoDia.js
export default function CuboDoDia({ post, currentQD, quadrants }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${quadrants[currentQD].color}30, ${quadrants[currentQD].color}10)`,
      border: `2px solid ${quadrants[currentQD].color}`,
      borderRadius: '12px',
      padding: '30px',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '3em', marginBottom: '20px' }}>🧩</div>
      <h2 style={{ fontSize: '1.5em', margin: '0 0 10px 0', color: quadrants[currentQD].color }}>
        {post.title.rendered}
      </h2>
      <div
        style={{ color: '#999', lineHeight: '1.6', marginBottom: '25px', maxWidth: '600px', margin: '0 auto 25px' }}
        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
      />
      <a
        href={`/posts/${post.slug}`}
        style={{
          display: 'inline-block',
          padding: '12px 30px',
          background: quadrants[currentQD].color,
          color: 'white',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
      >
        Descobrir →
      </a>
    </div>
  )
}
