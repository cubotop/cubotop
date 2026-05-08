// pages/index.js
import { useState, useEffect } from 'react'
import { getWordPressPosts, getWordPressCategories } from '../lib/wordpress'
import { quadrants, getQuadrantByCategory } from '../styles/theme'
import CicloStories from '../components/CicloStories'
import NewsletterSection from '../components/NewsletterSection'
import PostSemanal from '../components/PostSemanal'
import CuboDoDia from '../components/CuboDoDia'
import CategoriesGrid from '../components/CategoriesGrid'

export default function Home({ posts, categories }) {
  const [currentQD, setCurrentQD] = useState('qd1')
  const [activeStory, setActiveStory] = useState(null)

  // Simular dados do ciclo (depois vem do WordPress)
  const cicloData = [
    { id: 1, title: 'Segunda', day: 'Seg', color: '#FF6D00' },
    { id: 2, title: 'Terça', day: 'Ter', color: '#FF6D00' },
    { id: 3, title: 'Quarta', day: 'Qua', color: '#0F3460' },
    { id: 4, title: 'Quinta', day: 'Qui', color: '#0F3460' },
    { id: 5, title: 'Sexta', day: 'Sex', color: '#7B2D8B' },
    { id: 6, title: 'Sábado', day: 'Sab', color: '#7B2D8B' },
    { id: 7, title: 'Domingo', day: 'Dom', color: '#FF6D00' },
  ]

  // Post semanal (exemplo)
  const postSemanal = posts[0] || null

  // Cubo do dia (exemplo)
  const cuboDoDia = posts[1] || null

  // Newsletter (exemplo)
  const newsletter = {
    title: 'Newsletter Cubotop',
    description: 'Receba as melhores histórias da semana direto no seu email',
    frequency: 'Toda segunda-feira'
  }

  return (
    <div style={{ background: '#1A1A2E', color: 'white', minHeight: '100vh' }}>
      {/* HEADER */}
      <header style={{
        padding: '30px 20px',
        borderBottom: '1px solid #333',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(26, 26, 46, 0.95)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h1 style={{ fontSize: '2.5em', margin: 0, color: quadrants[currentQD].color }}>
                Cubotop
              </h1>
              <p style={{ fontSize: '0.9em', color: '#999', margin: '5px 0 0 0' }}>
                Saber tudo sobre tudo
              </p>
            </div>
            <div style={{ fontSize: '3em' }}>🧩</div>
          </div>

          {/* QUADRANT TABS */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {Object.entries(quadrants).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setCurrentQD(key)}
                style={{
                  padding: '10px 20px',
                  background: currentQD === key ? data.color : '#222',
                  color: 'white',
                  border: `2px solid ${data.color}`,
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s',
                  fontSize: '0.9em'
                }}
                onMouseEnter={(e) => {
                  if (currentQD !== key) e.currentTarget.style.opacity = '0.8'
                }}
                onMouseLeave={(e) => {
                  if (currentQD !== key) e.currentTarget.style.opacity = '1'
                }}
              >
                {data.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>

        {/* 1. CICLO - STORIES */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '1.2em', marginBottom: '20px', color: '#999', textTransform: 'uppercase', letterSpacing: '2px' }}>
            📅 Ciclo da Semana
          </h2>
          <CicloStories 
            cicloData={cicloData} 
            currentQD={currentQD}
            quadrants={quadrants}
            activeStory={activeStory}
            setActiveStory={setActiveStory}
          />
        </section>

        {/* 2. NEWSLETTER */}
        <section style={{ marginBottom: '60px' }}>
          <NewsletterSection 
            newsletter={newsletter}
            currentQD={currentQD}
            quadrants={quadrants}
          />
        </section>

        {/* 3. POST SEMANAL */}
        {postSemanal && (
          <section style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '1.2em', marginBottom: '20px', color: '#999', textTransform: 'uppercase', letterSpacing: '2px' }}>
              📰 Post Semanal
            </h2>
            <PostSemanal 
              post={postSemanal}
              currentQD={currentQD}
              quadrants={quadrants}
            />
          </section>
        )}

        {/* 4. CUBO DO DIA */}
        {cuboDoDia && (
          <section style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '1.2em', marginBottom: '20px', color: '#999', textTransform: 'uppercase', letterSpacing: '2px' }}>
              🎯 Cubo do Dia
            </h2>
            <CuboDoDia 
              post={cuboDoDia}
              currentQD={currentQD}
              quadrants={quadrants}
            />
          </section>
        )}

        {/* 5. GRID DE 27 CATEGORIAS */}
        <section>
          <h2 style={{ fontSize: '1.2em', marginBottom: '30px', color: '#999', textTransform: 'uppercase', letterSpacing: '2px' }}>
            🗂️ Explore por Categoria
          </h2>
          <CategoriesGrid 
            categories={categories}
            currentQD={currentQD}
            quadrants={quadrants}
          />
        </section>

        {/* 6. POSTS RECENTES */}
        <section style={{ marginTop: '60px' }}>
          <h2 style={{ fontSize: '1.2em', marginBottom: '30px', color: '#999', textTransform: 'uppercase', letterSpacing: '2px' }}>
            ✨ Posts Recentes
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '25px'
          }}>
            {posts.slice(0, 12).map(post => (
              <article
                key={post.id}
                style={{
                  padding: '20px',
                  background: '#222',
                  borderLeft: `4px solid ${quadrants[currentQD].color}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = `0 10px 30px rgba(${quadrants[currentQD].color}, 0.2)`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <h3 style={{ margin: '0 0 10px 0', color: quadrants[currentQD].color, fontSize: '1.1em' }}>
                  {post.title.rendered}
                </h3>
                <div
                  style={{ color: '#999', fontSize: '0.9em', marginBottom: '15px', lineHeight: '1.5' }}
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered.substring(0, 100) + '...' }}
                />
                <a 
                  href={`/posts/${post.slug}`} 
                  style={{ 
                    color: quadrants[currentQD].color, 
                    textDecoration: 'none', 
                    fontWeight: 'bold',
                    display: 'inline-block',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                >
                  Ler mais →
                </a>
              </article>
            ))}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer style={{
        borderTop: '1px solid #333',
        padding: '40px 20px',
        marginTop: '80px',
        textAlign: 'center',
        color: '#666'
      }}>
        <p>© 2024 Cubotop • Saber tudo sobre tudo</p>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const posts = await getWordPressPosts()
  const categories = await getWordPressCategories()

  return {
    props: { posts, categories },
    revalidate: 60
  }
}