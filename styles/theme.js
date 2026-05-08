// styles/theme.js
export const quadrants = {
  qd1: {
    name: 'Gosto & Estilo',
    color: '#FF6D00',
    bgColor: 'rgba(255, 109, 0, 0.1)',
    categories: ['Design', 'Tecnologia', 'Moda', 'Comida', 'Esporte', 'Veículos', 'Ferramentas', 'Economia', 'Fé']
  },
  qd2: {
    name: 'Histórias & Pessoas',
    color: '#0F3460',
    bgColor: 'rgba(15, 52, 96, 0.1)',
    categories: ['Mente', 'Poder', 'Pessoas', 'Profissões', 'Saber', 'Mistérios', 'História', 'Animais', 'Vida']
  },
  qd3: {
    name: 'Tela & Universo',
    color: '#7B2D8B',
    bgColor: 'rgba(123, 45, 139, 0.1)',
    categories: ['Jogos', 'Filmes', 'Música', 'TV', 'Quadrinhos', 'Lugares', 'Literatura', 'Séries', 'Arte']
  }
}

export function getQuadrantByCategory(categoryName) {
  for (const [qd, data] of Object.entries(quadrants)) {
    if (data.categories.includes(categoryName)) return qd
  }
  return 'qd1'
}