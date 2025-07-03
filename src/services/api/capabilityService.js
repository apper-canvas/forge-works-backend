const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const capabilityService = {
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
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "equipment" } },
          { field: { Name: "capacity" } },
          { field: { Name: "icon" } }
        ]
      }
      
      const response = await apperClient.fetchRecords('capability', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching capabilities:", error?.response?.data?.message)
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
          { field: { Name: "equipment" } },
          { field: { Name: "capacity" } },
          { field: { Name: "icon" } }
        ]
      }
      
      const response = await apperClient.getRecordById('capability', numericId, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching capability with ID ${id}:`, error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      throw error
    }
  },

  async create(capabilityData) {
    await delay(500)
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // Only include Updateable fields
      const updateableData = {
        Name: capabilityData.Name,
        Tags: capabilityData.Tags,
        Owner: capabilityData.Owner,
        title: capabilityData.title,
        description: capabilityData.description,
        equipment: capabilityData.equipment,
        capacity: capabilityData.capacity,
        icon: capabilityData.icon
      }
      
      const params = {
        records: [updateableData]
      }
      
      const response = await apperClient.createRecord('capability', params)
      
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
        console.error("Error creating capability:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      throw error
    }
  },

  async update(id, capabilityData) {
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
        Name: capabilityData.Name,
        Tags: capabilityData.Tags,
        Owner: capabilityData.Owner,
        title: capabilityData.title,
        description: capabilityData.description,
        equipment: capabilityData.equipment,
        capacity: capabilityData.capacity,
        icon: capabilityData.icon
      }
      
      const params = {
        records: [updateableData]
      }
      
      const response = await apperClient.updateRecord('capability', params)
      
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
        console.error("Error updating capability:", error?.response?.data?.message)
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
      
      const response = await apperClient.deleteRecord('capability', params)
      
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
        console.error("Error deleting capability:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      throw error
    }
  }
}