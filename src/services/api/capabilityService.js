import capabilitiesData from '@/services/mockData/capabilities.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const capabilityService = {
  async getAll() {
    await delay(250)
    return [...capabilitiesData]
  },

  async getById(id) {
    await delay(200)
    const capability = capabilitiesData.find(c => c.Id === id)
    if (!capability) {
      throw new Error('Capability not found')
    }
    return { ...capability }
  },

  async create(capabilityData) {
    await delay(500)
    const newCapability = {
      ...capabilityData,
      Id: Math.max(...capabilitiesData.map(c => c.Id)) + 1
    }
    capabilitiesData.push(newCapability)
    return { ...newCapability }
  },

  async update(id, capabilityData) {
    await delay(400)
    const index = capabilitiesData.findIndex(c => c.Id === id)
    if (index === -1) {
      throw new Error('Capability not found')
    }
    capabilitiesData[index] = { ...capabilitiesData[index], ...capabilityData }
    return { ...capabilitiesData[index] }
  },

  async delete(id) {
    await delay(300)
    const index = capabilitiesData.findIndex(c => c.Id === id)
    if (index === -1) {
      throw new Error('Capability not found')
    }
    const deletedCapability = capabilitiesData.splice(index, 1)[0]
    return { ...deletedCapability }
  }
}