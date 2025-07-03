import certificationsData from '@/services/mockData/certifications.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const certificationService = {
  async getAll() {
    await delay(250)
    return [...certificationsData]
  },

  async getById(id) {
    await delay(200)
    const certification = certificationsData.find(c => c.Id === id)
    if (!certification) {
      throw new Error('Certification not found')
    }
    return { ...certification }
  },

  async create(certificationData) {
    await delay(500)
    const newCertification = {
      ...certificationData,
      Id: Math.max(...certificationsData.map(c => c.Id)) + 1
    }
    certificationsData.push(newCertification)
    return { ...newCertification }
  },

  async update(id, certificationData) {
    await delay(400)
    const index = certificationsData.findIndex(c => c.Id === id)
    if (index === -1) {
      throw new Error('Certification not found')
    }
    certificationsData[index] = { ...certificationsData[index], ...certificationData }
    return { ...certificationsData[index] }
  },

  async delete(id) {
    await delay(300)
    const index = certificationsData.findIndex(c => c.Id === id)
    if (index === -1) {
      throw new Error('Certification not found')
    }
    const deletedCertification = certificationsData.splice(index, 1)[0]
    return { ...deletedCertification }
  }
}