// lib/wordpress.js
const WP_API = 'https://cubotop.com.br/wp-json/wp/v2'

export async function getWordPressPosts(perPage = 100) {
  try {
    const res = await fetch(`${WP_API}/posts?per_page=${perPage}&_embed`)
    if (!res.ok) throw new Error('Failed to fetch posts')
    return res.json()
  } catch (error) {
    console.error('WP API Error:', error)
    return []
  }
}

export async function getWordPressCategories() {
  try {
    const res = await fetch(`${WP_API}/categories?per_page=100`)
    if (!res.ok) throw new Error('Failed to fetch categories')
    return res.json()
  } catch (error) {
    console.error('WP API Error:', error)
    return []
  }
}

export async function getWordPressPostsByCategory(categoryId) {
  try {
    const res = await fetch(`${WP_API}/posts?categories=${categoryId}&per_page=100&_embed`)
    if (!res.ok) throw new Error('Failed to fetch posts')
    return res.json()
  } catch (error) {
    console.error('WP API Error:', error)
    return []
  }
}

export async function getWordPressPostBySlug(slug) {
  try {
    const res = await fetch(`${WP_API}/posts?slug=${slug}&_embed`)
    if (!res.ok) throw new Error('Failed to fetch post')
    const posts = await res.json()
    return posts[0] || null
  } catch (error) {
    console.error('WP API Error:', error)
    return null
  }
}
