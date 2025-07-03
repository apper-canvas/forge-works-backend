const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const testimonialService = {
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
          { field: { Name: "company" } },
          { field: { Name: "logo" } },
          { field: { Name: "testimonial" } },
          { field: { Name: "client_name" } },
          { field: { Name: "client_title" } },
          { field: { Name: "rating" } },
          { field: { Name: "project_type" } }
        ]
      }
      
      const response = await apperClient.fetchRecords('testimonial', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching testimonials:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      throw error
    }
  },

  async getById(id) {
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
          { field: { Name: "company" } },
          { field: { Name: "logo" } },
          { field: { Name: "testimonial" } },
          { field: { Name: "client_name" } },
          { field: { Name: "client_title" } },
          { field: { Name: "rating" } },
          { field: { Name: "project_type" } }
        ]
      }
      
      const response = await apperClient.getRecordById('testimonial', numericId, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching testimonial with ID ${id}:`, error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      throw error
    }
  }
}