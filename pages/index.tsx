import { useState } from 'react';

const quadrants = {
  qd1: {
    name: 'Gosto & Estilo',
    color: '#FF6D00',
    bgColor: 'rgb(255, 109, 0, 0.1)',
    categories: ['Design', 'Tecnologia', 'Moda', 'Comida', 'Esporte', 'Veículos', 'Ferramentas', 'Economia', 'Fé']
  },
  qd2: {
    name: 'Histórias & Pessoas',
    color: '#0F3460',
    bgColor: 'rgb(15, 52, 96, 0.1)',
    categories: ['Mente', 'Poder', 'Pessoas', 'Profissões', 'Saber', 'Mistérios', 'História', 'Animais', 'Vida']
  },
  qd3: {
    name: 'Tela & Universo',
    color: '#7B2D8B',
    bgColor: 'rgb(123, 45, 139, 0.1)',
    categories: ['Jogos', 'Filmes', 'Música', 'TV', 'Quadrinhos', 'Lugares', 'Literatura', 'Séries', 'Arte']
  }
};

function Logo({ quadrant = 'qd1' }: { quadrant?: string }) {
  const color = quadrants[quadrant as keyof typeof quadrants].color;
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" style={{ cursor: 'pointer' }}>
      <rect x="8" y="8" width="34" height="34" fill="white" stroke={color} strokeWidth="2" />
      <line x1="13" y1="28" x2="37" y2="28" stroke={color} strokeWidth="2" />
      <line x1="17" y1="18" x2="41" y2="18" stroke={color} strokeWidth="2" />
      <text x="25" y="44" textAnchor="middle" fontSize="8" fontWeight="bold" fill={color}>
        CUBO
      </text>
    </svg>
  );
}

function QuizEntrada({ onComplete }: { onComplete: (qd: string) => void }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const questions = [
    {
      q: 'Quando você aprende algo novo, o que funciona melhor?',
      options: [
        { text: 'Ler sobre o assunto', type: 'ling' },
        { text: 'Ver um diagrama', type: 'esp' },
        { text: 'Ouvir alguém explicar', type: 'mus' },
        { text: 'Tentar na prática', type: 'corp' }
      ]
    },
    {
      q: 'O que mais te prende numa história?',
      options: [
        { text: 'Os personagens', type: 'inter' },
        { text: 'A lógica do enredo', type: 'log' },
        { text: 'O cenário visual', type: 'esp' },
        { text: 'O que diz sobre você', type: 'intra' }
      ]
    },
    {
      q: 'Num dia livre, o que você faria?',
      options: [
        { text: 'Ler ou contar histórias', type: 'ling' },
        { text: 'Explorar a natureza', type: 'nat' },
        { text: 'Ouvir música', type: 'mus' },
        { text: 'Refletir sobre objetivos', type: 'intra' }
      ]
    },
    {
      q: 'Você se lembra melhor de:',
      options: [
        { text: 'Rostos e histórias', type: 'inter' },
        { text: 'Números e padrões', type: 'log' },
        { text: 'Paisagens e lugares', type: 'esp' },
        { text: 'Músicas e sons', type: 'mus' }
      ]
    },
    {
      q: 'O que te fascina num documentário?',
      options: [
        { text: 'Como os sistemas funcionam', type: 'log' },
        { text: 'A vida de pessoas reais', type: 'inter' },
        { text: 'Animais e ecossistemas', type: 'nat' },
        { text: 'Como algo foi criado', type: 'corp' }
      ]
    },
    {
      q: 'Com um problema para resolver:',
      options: [
        { text: 'Escrevo para organizar', type: 'ling' },
        { text: 'Desenho ou visualizo', type: 'esp' },
        { text: 'Sinto no corpo', type: 'corp' },
        { text: 'Fico em silêncio pra processar', type: 'intra' }
      ]
    },
    {
      q: 'O que você mais admira em alguém?',
      options: [
        { text: 'Como se expressa', type: 'ling' },
        { text: 'Inteligência analítica', type: 'log' },
        { text: 'Sensibilidade artística', type: 'mus' },
        { text: 'Capacidade de liderar', type: 'inter' }
      ]
    },
    {
      q: 'Qual habilidade você dominaria agora?',
      options: [
        { text: 'Tocar um instrumento', type: 'mus' },
        { text: 'Entender a natureza', type: 'nat' },
        { text: 'Autoconhecimento', type: 'intra' },
        { text: 'Esporte ou dança', type: 'corp' }
      ]
    }
  ];

  const intelligenceToQD: Record<string, string> = {
    ling: 'qd2', esp: 'qd3', mus: 'qd3', corp: 'qd1',
    inter: 'qd2', log: 'qd2', nat: 'qd1', intra: 'qd2'
  };

  function handleAnswer(type: string) {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      const counts: Record<string, number> = {};
      newAnswers.forEach(a => {
        const qd = intelligenceToQD[a];
        counts[qd] = (counts[qd] || 0) + 1;
      });
      const resultQD = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
      setResult(resultQD);
      onComplete(resultQD);
    }
  }

  if (result) {
    return (
      <div style={{
        background: quadrants[result as keyof typeof quadrants].color,
        color: 'white',
        padding: '40px',
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <h2>🎯 Sua categoria principal:</h2>
        <h1 style={{ fontSize: '2em', margin: '10px 0' }}>{quadrants[result as keyof typeof quadrants].name}</h1>
        <p>Comece explorando:</p>
        <p style={{ fontSize: '1.1em', fontWeight: 'bold' }}>{quadrants[result as keyof typeof quadrants].categories.slice(0, 3).join(' · ')}</p>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ background: '#222', padding: '20px', borderRadius: '5px', marginBottom: '20px' }}>
        <div style={{ fontSize: '0.9em', color: '#999' }}>Pergunta {current + 1} de {questions.length}</div>
        <div style={{ width: '100%', height: '4px', background: '#444', borderRadius: '2px', margin: '8px 0' }}>
          <div style={{
            width: `${((current + 1) / questions.length) * 100}%`,
            height: '100%',
            background: quadrants.qd1.color,
            borderRadius: '2px',
            transition: 'width 0.3s'
          }} />
        </div>
      </div>

      <h3 style={{ fontSize: '1.3em', marginBottom: '25px', textAlign: 'center' }}>{q.q}</h3>

      <div>
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt.type)}
            style={{
              display: 'block',
              width: '100%',
              padding: '14px',
              margin: '10px 0',
              border: '2px solid #555',
              background: '#222',
              color: 'white',
              cursor: 'pointer',
              borderRadius: '8px',
              fontSize: '1em',
              transition: 'all 0.2s',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.borderColor = '#FF6D00';
              target.style.background = '#2a2a2a';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.borderColor = '#555';
              target.style.background = '#222';
            }}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}

function CategoriesGrid({ selectedQD }: { selectedQD: string }) {
  const data = quadrants[selectedQD as keyof typeof quadrants];
  return (
    <div>
      <h2 style={{ color: data.color, marginBottom: '25px' }}>
        {data.name}
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '15px'
      }}>
        {data.categories.map((cat, i) => (
          <div
            key={i}
            style={{
              padding: '20px',
              background: data.bgColor,
              border: `2px solid ${data.color}`,
              borderRadius: '8px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              color: 'white'
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLDivElement;
              target.style.background = data.color;
              target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLDivElement;
              target.style.background = data.bgColor;
              target.style.color = 'white';
            }}
          >
            <div style={{ fontWeight: 'bold' }}>{cat}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CubotopTemplate() {
  const [currentQD, setCurrentQD] = useState('qd1');
  const [showQuiz, setShowQuiz] = useState(false);
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);

  function handleQuizComplete(qd: string) {
    setCurrentQD(qd);
    setHasCompletedQuiz(true);
    setShowQuiz(false);
  }

  return (
    <div style={{
      background: '#1A1A2E',
      color: 'white',
      minHeight: '100vh',
      padding: '30px 20px',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '40px',
        paddingBottom: '20px',
        borderBottom: `3px solid ${quadrants[currentQD as keyof typeof quadrants].color}`,
        transition: 'border-color 0.3s'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Logo quadrant={currentQD} />
          <div>
            <h1 style={{ margin: 0, fontSize: '2em' }}>Cubotop</h1>
            <p style={{ margin: '5px 0 0 0', color: '#999', fontSize: '0.9em' }}>
              Saber tudo sobre tudo
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowQuiz(!showQuiz)}
          style={{
            padding: '10px 20px',
            background: quadrants[currentQD as keyof typeof quadrants].color,
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.transform = 'scale(1)';
          }}
        >
          {showQuiz ? '← Voltar' : '🎯 Quiz'}
        </button>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {showQuiz ? (
          <QuizEntrada onComplete={handleQuizComplete} />
        ) : (
          <>
            <div style={{
              display: 'flex',
              gap: '15px',
              marginBottom: '40px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              {Object.entries(quadrants).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => setCurrentQD(key)}
                  style={{
                    padding: '12px 20px',
                    background: currentQD === key ? data.color : '#222',
                    color: 'white',
                    border: `2px solid ${data.color}`,
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.2s'
                  }}
                >
                  {data.name}
                </button>
              ))}
            </div>

            <CategoriesGrid selectedQD={currentQD} />

            {hasCompletedQuiz && (
              <div style={{
                marginTop: '40px',
                padding: '20px',
                background: quadrants[currentQD as keyof typeof quadrants].bgColor,
                border: `2px solid ${quadrants[currentQD as keyof typeof quadrants].color}`,
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <p style={{ margin: 0, color: '#ccc' }}>
                  Você completou o Quiz! Explore as categorias acima ou escolha outro Quadrante.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <div style={{
        marginTop: '60px',
        paddingTop: '20px',
        borderTop: '1px solid #333',
        textAlign: 'center',
        color: '#666',
        fontSize: '0.9em'
      }}>
        <p>Cubotop • Enciclopédia Atemporal</p>
        <p style={{ margin: '5px 0 0 0' }}>#dalemucho</p>
      </div>
    </div>
  );
}