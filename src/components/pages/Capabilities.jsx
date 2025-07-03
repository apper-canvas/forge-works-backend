import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CapabilityCard from '@/components/molecules/CapabilityCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { capabilityService } from '@/services/api/capabilityService'

const Capabilities = () => {
  const [capabilities, setCapabilities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  useEffect(() => {
    loadCapabilities()
  }, [])
  
  const loadCapabilities = async () => {
    try {
      setLoading(true)
      setError('')
      
      const data = await capabilityService.getAll()
      setCapabilities(data)
    } catch (err) {
      setError('Failed to load capabilities. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-surface pt-20">
        <div className="container-custom py-8">
          <div className="text-center mb-12">
            <h1 className="heading-display mb-4">Manufacturing Capabilities</h1>
            <p className="text-body max-w-2xl mx-auto">
              State-of-the-art equipment and processes for precision manufacturing
            </p>
          </div>
          <Loading type="cards" />
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-surface pt-20">
        <div className="container-custom py-8">
          <div className="text-center mb-12">
            <h1 className="heading-display mb-4">Manufacturing Capabilities</h1>
            <p className="text-body max-w-2xl mx-auto">
              State-of-the-art equipment and processes for precision manufacturing
            </p>
          </div>
          <Error message={error} onRetry={loadCapabilities} />
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="container-custom py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="heading-display mb-4">Manufacturing Capabilities</h1>
          <p className="text-body max-w-2xl mx-auto">
            Our state-of-the-art facility houses advanced equipment and skilled technicians 
            capable of handling complex manufacturing requirements with precision and efficiency
          </p>
        </motion.div>
        
        {capabilities.length === 0 ? (
          <Empty 
            title="No capabilities listed"
            description="We're currently updating our capabilities information. Please check back soon."
            icon="Settings"
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {capabilities.map((capability, index) => (
                <CapabilityCard key={capability.Id} capability={capability} index={index} />
              ))}
            </div>
            
            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Clock" size={32} className="text-white" />
                  </div>
                  <h3 className="font-bold text-navy mb-2">24/7 Production</h3>
                  <p className="text-gray-600 text-sm">
                    Continuous production capabilities to meet tight deadlines and high-volume requirements
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Users" size={32} className="text-white" />
                  </div>
                  <h3 className="font-bold text-navy mb-2">Expert Team</h3>
                  <p className="text-gray-600 text-sm">
                    Skilled engineers and technicians with decades of combined experience
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Zap" size={32} className="text-white" />
                  </div>
                  <h3 className="font-bold text-navy mb-2">Fast Turnaround</h3>
                  <p className="text-gray-600 text-sm">
                    Efficient processes and lean manufacturing principles for quick delivery
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}

export default Capabilities