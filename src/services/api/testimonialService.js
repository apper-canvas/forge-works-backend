import testimonialData from '@/services/mockData/testimonials.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const testimonialService = {
  async getAll() {
    await delay(300)
    return [...testimonialData]
  },

  async getById(id) {
    await delay(300)
    const testimonial = testimonialData.find(item => item.Id === id)
    if (!testimonial) {
      throw new Error(`Testimonial with id ${id} not found`)
    }
    return { ...testimonial }
  }
}