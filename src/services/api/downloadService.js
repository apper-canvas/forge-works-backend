import downloadsData from '@/services/mockData/downloads.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const downloadService = {
  async getAll() {
    await delay(300)
    return [...downloadsData]
  },

  async getById(id) {
    await delay(200)
    const download = downloadsData.find(d => d.Id === id)
    if (!download) {
      throw new Error('Download not found')
    }
    return { ...download }
  },

  async create(downloadData) {
    await delay(500)
    const newDownload = {
      ...downloadData,
      Id: Math.max(...downloadsData.map(d => d.Id)) + 1
    }
    downloadsData.push(newDownload)
    return { ...newDownload }
  },

  async update(id, downloadData) {
    await delay(400)
    const index = downloadsData.findIndex(d => d.Id === id)
    if (index === -1) {
      throw new Error('Download not found')
    }
    downloadsData[index] = { ...downloadsData[index], ...downloadData }
    return { ...downloadsData[index] }
  },

  async delete(id) {
    await delay(300)
    const index = downloadsData.findIndex(d => d.Id === id)
    if (index === -1) {
      throw new Error('Download not found')
    }
const deletedDownload = downloadsData.splice(index, 1)[0]
    return { ...deletedDownload }
  },

  async downloadFile(download) {
    await delay(500)
    
    try {
      // Check if download has a direct URL
      if (download.downloadUrl) {
        // Create a temporary anchor element to trigger download
        const link = document.createElement('a')
        link.href = download.downloadUrl
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
      const fileContent = `${download.title}\n\nDescription: ${download.description}\n\nCategory: ${download.category}\nType: ${download.type}\nSize: ${download.fileSize} bytes\nLast Updated: ${download.lastUpdated}\n\nThis is a sample file generated for demonstration purposes.`
      
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