// components/PostSemanal.js
export default function PostSemanal({ post, currentQD, quadrants }) {
  return (
    <div style={{
      background: '#222',
      borderLeft: `6px solid ${quadrants[currentQD].color}`,
      borderRadius: '12px',
      padding: '30px',
      display: 'grid',
      gridTemplateColumns: '1fr 300px',
      gap: '30px',
      alignItems: 'center'
    }}>
      <div>
        <div style={{ color: quadrants[currentQD].color, fontSize: '0.85em', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase' }}>
          Destaque da Semana
        </div>
        <h2 style={{ fontSize: '1.8em', margin: '0 0 15px 0', color: 'white' }}>
          {post.title.rendered}
        </h2>
        <div
          style={{ color: '#999', lineHeight: '1.6', marginBottom: '20px' }}
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
          Ler Artigo Completo →
        </a>
      </div>
      <div style={{
        fontSize: '4em',
        textAlign: 'center',
        opacity: 0.3
      }}>
        📖
      </div>
    </div>
  )
}
