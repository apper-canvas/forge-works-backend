const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const certificationService = {
  async getAll() {
    await delay(250)
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
          { field: { Name: "issuer" } },
          { field: { Name: "valid_until" } },
          { field: { Name: "logo" } }
        ]
      }
      
      const response = await apperClient.fetchRecords('certification', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching certifications:", error?.response?.data?.message)
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
          { field: { Name: "issuer" } },
          { field: { Name: "valid_until" } },
          { field: { Name: "logo" } }
        ]
      }
      
      const response = await apperClient.getRecordById('certification', numericId, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching certification with ID ${id}:`, error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      throw error
    }
  },

  async create(certificationData) {
    await delay(500)
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // Only include Updateable fields
      const updateableData = {
        Name: certificationData.Name,
        Tags: certificationData.Tags,
        Owner: certificationData.Owner,
        issuer: certificationData.issuer,
        valid_until: certificationData.valid_until,
        logo: certificationData.logo
      }
      
      const params = {
        records: [updateableData]
      }
      
      const response = await apperClient.createRecord('certification', params)
      
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
        console.error("Error creating certification:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      throw error
    }
  },

  async update(id, certificationData) {
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
        Name: certificationData.Name,
        Tags: certificationData.Tags,
        Owner: certificationData.Owner,
        issuer: certificationData.issuer,
        valid_until: certificationData.valid_until,
        logo: certificationData.logo
      }
      
      const params = {
        records: [updateableData]
      }
      
      const response = await apperClient.updateRecord('certification', params)
      
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
        console.error("Error updating certification:", error?.response?.data?.message)
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
      
      const response = await apperClient.deleteRecord('certification', params)
      
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
        console.error("Error deleting certification:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      throw error
    }
  }
}