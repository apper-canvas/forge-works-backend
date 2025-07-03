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
  }
}