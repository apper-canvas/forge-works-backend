import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { testimonialService } from '@/services/api/testimonialService'

const TestimonialSlider = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    loadTestimonials()
  }, [])

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [testimonials.length])

  const loadTestimonials = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await testimonialService.getAll()
      setTestimonials(data)
    } catch (err) {
      setError('Failed to load testimonials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length)
  }

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section">What Our Clients Say</h2>
            <p className="text-body max-w-2xl mx-auto">
              Discover why leading companies trust ForgeWorks for their precision manufacturing needs
            </p>
          </div>
          <Loading />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section">What Our Clients Say</h2>
            <p className="text-body max-w-2xl mx-auto">
              Discover why leading companies trust ForgeWorks for their precision manufacturing needs
            </p>
          </div>
          <Error message={error} onRetry={loadTestimonials} />
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return null
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-section">What Our Clients Say</h2>
          <p className="text-body max-w-2xl mx-auto">
            Discover why leading companies trust ForgeWorks for their precision manufacturing needs
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="card-industrial p-8 lg:p-12 text-center"
              >
                {/* Company Logo */}
                <div className="flex justify-center mb-6">
                  <img
                    src={currentTestimonial.logo}
                    alt={`${currentTestimonial.company} logo`}
                    className="h-12 object-contain opacity-80"
                  />
                </div>

                {/* Rating Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <ApperIcon
                      key={i}
                      name="Star"
                      size={20}
                      className={`${
                        i < currentTestimonial.rating
                          ? 'text-orange-500 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <div className="mb-8">
                  <ApperIcon
                    name="Quote"
                    size={32}
                    className="text-orange-500 mx-auto mb-4 opacity-50"
                  />
                  <p className="text-lg lg:text-xl text-gray-700 italic leading-relaxed max-w-3xl mx-auto">
                    "{currentTestimonial.testimonial}"
                  </p>
                </div>

                {/* Client Info */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="font-semibold text-navy text-lg">
                    {currentTestimonial.clientName}
                  </div>
                  <div className="text-gray-600 mb-2">
                    {currentTestimonial.clientTitle}
                  </div>
                  <div className="text-orange-500 font-semibold">
                    {currentTestimonial.company}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    {currentTestimonial.projectType}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center absolute top-1/2 -translate-y-1/2 w-full px-4">
            <button
              onClick={goToPrevious}
              className="bg-white hover:bg-gray-50 text-navy border-2 border-gray-200 hover:border-orange-500 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              aria-label="Previous testimonial"
            >
              <ApperIcon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={goToNext}
              className="bg-white hover:bg-gray-50 text-navy border-2 border-gray-200 hover:border-orange-500 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              aria-label="Next testimonial"
            >
              <ApperIcon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-orange-500 scale-110'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Company Logos Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-gray-200"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-navy mb-2">
              Trusted by Industry Leaders
            </h3>
            <p className="text-gray-600">
              Join hundreds of companies that rely on our precision manufacturing
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.Id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-center"
              >
                <img
                  src={testimonial.logo}
                  alt={`${testimonial.company} logo`}
                  className="h-10 object-contain opacity-60 hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                  onClick={() => goToSlide(index)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialSlider