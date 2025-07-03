import mockData from '@/services/mockData/news.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Generate next available ID
const generateId = () => {
  if (mockData.length === 0) return 1
  return Math.max(...mockData.map(item => item.Id)) + 1
}

export const newsService = {
  // Get all news articles
  getAll: async () => {
    await delay(300)
    return [...mockData]
  },

  // Get news article by ID
  getById: async (id) => {
    await delay(300)
    const numericId = parseInt(id)
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format')
    }
    
    const article = mockData.find(item => item.Id === numericId)
    if (!article) {
      throw new Error('Article not found')
    }
    
    return { ...article }
  },

  // Create new news article
  create: async (articleData) => {
    await delay(300)
    const newArticle = {
      ...articleData,
      Id: generateId(),
      publishedAt: new Date().toISOString()
    }
    
    mockData.push(newArticle)
    return { ...newArticle }
  },

  // Update existing news article
  update: async (id, articleData) => {
    await delay(300)
    const numericId = parseInt(id)
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format')
    }
    
    const index = mockData.findIndex(item => item.Id === numericId)
    if (index === -1) {
      throw new Error('Article not found')
    }
    
    const updatedArticle = {
      ...mockData[index],
      ...articleData,
      Id: numericId // Ensure ID cannot be changed
    }
    
    mockData[index] = updatedArticle
    return { ...updatedArticle }
  },

  // Delete news article
  delete: async (id) => {
    await delay(300)
    const numericId = parseInt(id)
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format')
    }
    
    const index = mockData.findIndex(item => item.Id === numericId)
    if (index === -1) {
      throw new Error('Article not found')
    }
    
    const deletedArticle = mockData.splice(index, 1)[0]
    return { ...deletedArticle }
  }
}