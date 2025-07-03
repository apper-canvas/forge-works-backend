const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const downloadService = {
  async getAll() {
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
          { field: { Name: "description" } },
          { field: { Name: "category" } },
          { field: { Name: "type" } },
          { field: { Name: "file_size" } },
          { field: { Name: "url" } },
          { field: { Name: "last_updated" } }
        ]
      }
      
      const response = await apperClient.fetchRecords('download', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching downloads:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      throw error
    }
  },

  async getById(id) {
    await delay(200)
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
          { field: { Name: "description" } },
          { field: { Name: "category" } },
          { field: { Name: "type" } },
          { field: { Name: "file_size" } },
          { field: { Name: "url" } },
          { field: { Name: "last_updated" } }
        ]
      }
      
      const response = await apperClient.getRecordById('download', numericId, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching download with ID ${id}:`, error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      throw error
    }
  },

  async create(downloadData) {
    await delay(500)
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // Only include Updateable fields
      const updateableData = {
        Name: downloadData.Name,
        Tags: downloadData.Tags,
        Owner: downloadData.Owner,
        title: downloadData.title,
        description: downloadData.description,
        category: downloadData.category,
        type: downloadData.type,
        file_size: downloadData.file_size,
        url: downloadData.url,
        last_updated: downloadData.last_updated
      }
      
      const params = {
        records: [updateableData]
      }
      
      const response = await apperClient.createRecord('download', params)
      
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
        console.error("Error creating download:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      throw error
    }
  },

  async update(id, downloadData) {
    await delay(400)
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
        Name: downloadData.Name,
        Tags: downloadData.Tags,
        Owner: downloadData.Owner,
        title: downloadData.title,
        description: downloadData.description,
        category: downloadData.category,
        type: downloadData.type,
        file_size: downloadData.file_size,
        url: downloadData.url,
        last_updated: downloadData.last_updated
      }
      
      const params = {
        records: [updateableData]
      }
      
      const response = await apperClient.updateRecord('download', params)
      
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
        console.error("Error updating download:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      throw error
    }
  },

  async delete(id) {
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
      
      const response = await apperClient.deleteRecord('download', params)
      
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
        console.error("Error deleting download:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      throw error
    }
  },

  async downloadFile(download) {
    await delay(500)
    
    try {
      // Check if download has a direct URL
      if (download.url) {
        // Create a temporary anchor element to trigger download
        const link = document.createElement('a')
        link.href = download.url
        link.download = download.fileName || download.title
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
        
        // Append to body, click, and remove
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        return { success: true, message: 'Download started' }
      }
      
      // If no direct URL, simulate file content creation for demo
      // In a real app, this would fetch the actual file from a server
      const fileContent = `${download.title}\n\nDescription: ${download.description}\n\nCategory: ${download.category}\nType: ${download.type}\nSize: ${download.file_size} bytes\nLast Updated: ${download.last_updated}\n\nThis is a sample file generated for demonstration purposes.`
      
      // Create blob and download
      const blob = new Blob([fileContent], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `${download.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Clean up the URL object
      URL.revokeObjectURL(url)
      
      return { success: true, message: 'Download completed' }
      
    } catch (error) {
      console.error('Download error:', error)
      throw new Error('Failed to download file. Please check your internet connection and try again.')
    }
  }
}