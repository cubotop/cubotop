// components/CategoriesGrid.js
import { quadrants, getQuadrantByCategory } from '../styles/theme'

export default function CategoriesGrid({ categories, currentQD, quadrants }) {
  // Mapeamento das 27 categorias
  const allCategories = [
    // QD1 - Laranja
    { name: 'Design', icon: '🎨', qd: 'qd1' },
    { name: 'Tecnologia', icon: '💻', qd: 'qd1' },
    { name: 'Moda', icon: '👗', qd: 'qd1' },
    { name: 'Comida', icon: '🍽️', qd: 'qd1' },
    { name: 'Esporte', icon: '⚽', qd: 'qd1' },
    { name: 'Veículos', icon: '🚗', qd: 'qd1' },
    { name: 'Ferramentas', icon: '🔧', qd: 'qd1' },
    { name: 'Economia', icon: '💰', qd: 'qd1' },
    { name: 'Fé', icon: '✨', qd: 'qd1' },
    // QD2 - Azul
    { name: 'Mente', icon: '🧠', qd: 'qd2' },
    { name: 'Poder', icon: '👑', qd: 'qd2' },
    { name: 'Pessoas', icon: '👥', qd: 'qd2' },
    { name: 'Profissões', icon: '💼', qd: 'qd2' },
    { name: 'Saber', icon: '📚', qd: 'qd2' },
    { name: 'Mistérios', icon: '🔮', qd: 'qd2' },
    { name: 'História', icon: '📜', qd: 'qd2' },
    { name: 'Animais', icon: '🦁', qd: 'qd2' },
    { name: 'Vida', icon: '🌱', qd: 'qd2' },
    // QD3 - Roxo
    { name: 'Jogos', icon: '🎮', qd: 'qd3' },
    { name: 'Filmes', icon: '🎬', qd: 'qd3' },
    { name: 'Música', icon: '🎵', qd: 'qd3' },
    { name: 'TV', icon: '📺', qd: 'qd3' },
    { name: 'Quadrinhos', icon: '💭', qd: 'qd3' },
    { name: 'Lugares', icon: '🗺️', qd: 'qd3' },
    { name: 'Literatura', icon: '📖', qd: 'qd3' },
    { name: 'Séries', icon: '🎭', qd: 'qd3' },
    { name: 'Arte', icon: '🖼️', qd: 'qd3' },
  ]

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '15px'
    }}>
      {allCategories.map((cat, idx) => (
        <div
          key={idx}
          style={{
            padding: '20px',
            background: quadrants[cat.qd].bgColor,
            border: `2px solid ${quadrants[cat.qd].color}`,
            borderRadius: '12px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)'
            e.currentTarget.style.boxShadow = `0 10px 30px ${quadrants[cat.qd].color}40`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <div style={{ fontSize: '2.5em', marginBottom: '10px' }}>
            {cat.icon}
          </div>
          <h3 style={{ margin: '0', color: quadrants[cat.qd].color, fontSize: '1em', fontWeight: 'bold' }}>
            {cat.name}
          </h3>
        </div>
      ))}
    </div>
  )
}