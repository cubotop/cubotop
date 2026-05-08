// components/CicloStories.js
import { useState, useRef, useEffect } from 'react'

export default function CicloStories({ cicloData, currentQD, quadrants, activeStory, setActiveStory }) {
  const scrollRef = useRef(null)
  const [canScroll, setCanScroll] = useState(false)

  useEffect(() => {
    if (scrollRef.current) {
      setCanScroll(scrollRef.current.scrollWidth > scrollRef.current.clientWidth)
    }
  }, [])

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div style={{ position: 'relative', marginBottom: '40px' }}>
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: '15px',
          overflowX: 'auto',
          paddingBottom: '10px',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': { display: 'none' }
        }}
      >
        {cicloData.map((story) => (
          <div
            key={story.id}
            onClick={() => setActiveStory(story.id)}
            style={{
              minWidth: '100px',
              height: '140px',
              background: `linear-gradient(135deg, ${story.color}20, ${story.color}40)`,
              border: activeStory === story.id ? `3px solid ${story.color}` : '2px solid #333',
              borderRadius: '15px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s',
              padding: '15px',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.boxShadow = `0 5px 20px ${story.color}40`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={{ fontSize: '2em', marginBottom: '8px' }}>
              {story.id === 1 ? '📅' : story.id === 2 ? '📚' : story.id === 3 ? '🎬' : story.id === 4 ? '🎵' : story.id === 5 ? '🎮' : story.id === 6 ? '🌟' : '✨'}
            </div>
            <div style={{ fontSize: '0.9em', fontWeight: 'bold', color: story.color }}>
              {story.day}
            </div>
            <div style={{ fontSize: '0.75em', color: '#999', marginTop: '5px' }}>
              {story.title}
            </div>
          </div>
        ))}
      </div>

      {canScroll && (
        <>
          <button
            onClick={() => scroll('left')}
            style={{
              position: 'absolute',
              left: '-30px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: quadrants[currentQD].color,
              border: 'none',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: '1.2em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            style={{
              position: 'absolute',
              right: '-30px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: quadrants[currentQD].color,
              border: 'none',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: '1.2em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            →
          </button>
        </>
      )}
    </div>
  )
}
