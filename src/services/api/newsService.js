// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const newsService = {
  // Get all news articles
  getAll: async () => {
    await delay(300)
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "title" } },
          { field: { Name: "excerpt" } },
          { field: { Name: "category" } },
          { field: { Name: "author" } },
          { field: { Name: "published_at" } },
          { field: { Name: "featured_image" } },
          { field: { Name: "content" } }
        ]
      }
      
      const response = await apperClient.fetchRecords('news', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching news:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      throw error
    }
  },

  // Get news article by ID
  getById: async (id) => {
    await delay(300)
    try {
      const numericId = parseInt(id)
      if (isNaN(numericId)) {
        throw new Error('Invalid ID format')
      }
      
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "title" } },
          { field: { Name: "excerpt" } },
          { field: { Name: "category" } },
          { field: { Name: "author" } },
          { field: { Name: "published_at" } },
          { field: { Name: "featured_image" } },
          { field: { Name: "content" } }
        ]
      }
      
      const response = await apperClient.getRecordById('news', numericId, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching news article with ID ${id}:`, error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      throw error
    }
  },

  // Create new news article
  create: async (articleData) => {
    await delay(300)
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // Only include Updateable fields
      const updateableData = {
        Name: articleData.Name,
        Tags: articleData.Tags,
        Owner: articleData.Owner,
        title: articleData.title,
        excerpt: articleData.excerpt,
        category: articleData.category,
        author: articleData.author,
        published_at: articleData.published_at || new Date().toISOString(),
        featured_image: articleData.featured_image,
        content: articleData.content
      }
      
      const params = {
        records: [updateableData]
      }
      
      const response = await apperClient.createRecord('news', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success)
        const failedRecords = response.results.filter(result => !result.success)
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              console.error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) console.error(record.message)
          })
        }
        
        return successfulRecords[0]?.data
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating news article:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      throw error
    }
  },

  // Update existing news article
  update: async (id, articleData) => {
    await delay(300)
    try {
      const numericId = parseInt(id)
      if (isNaN(numericId)) {
        throw new Error('Invalid ID format')
      }
      
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // Only include Updateable fields plus Id
      const updateableData = {
        Id: numericId,
        Name: articleData.Name,
        Tags: articleData.Tags,
        Owner: articleData.Owner,
        title: articleData.title,
        excerpt: articleData.excerpt,
        category: articleData.category,
        author: articleData.author,
        published_at: articleData.published_at,
        featured_image: articleData.featured_image,
        content: articleData.content
      }
      
      const params = {
        records: [updateableData]
      }
      
      const response = await apperClient.updateRecord('news', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success)
        const failedUpdates = response.results.filter(result => !result.success)
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`)
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              console.error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) console.error(record.message)
          })
        }
        
        return successfulUpdates[0]?.data
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating news article:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      throw error
    }
  },

  // Delete news article
  delete: async (id) => {
    await delay(300)
    try {
      const numericId = parseInt(id)
      if (isNaN(numericId)) {
        throw new Error('Invalid ID format')
      }
      
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        RecordIds: [numericId]
      }
      
      const response = await apperClient.deleteRecord('news', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const failedDeletions = response.results.filter(result => !result.success)
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`)
          failedDeletions.forEach(record => {
            if (record.message) console.error(record.message)
          })
        }
        
        return true
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting news article:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      throw error
    }
  }
}