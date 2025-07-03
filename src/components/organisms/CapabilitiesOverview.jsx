import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import CapabilityCard from '@/components/molecules/CapabilityCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { capabilityService } from '@/services/api/capabilityService'

const CapabilitiesOverview = () => {
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
      setCapabilities(data.slice(0, 4)) // Show only first 4 capabilities
    } catch (err) {
      setError('Failed to load capabilities. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section">Our Capabilities</h2>
            <p className="text-body max-w-2xl mx-auto">
              Advanced manufacturing processes and cutting-edge technology
            </p>
          </div>
          <Loading type="cards" />
        </div>
      </section>
    )
  }
  
  if (error) {
    return (
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section">Our Capabilities</h2>
            <p className="text-body max-w-2xl mx-auto">
              Advanced manufacturing processes and cutting-edge technology
            </p>
          </div>
          <Error message={error} onRetry={loadCapabilities} />
        </div>
      </section>
    )
  }
  
  if (capabilities.length === 0) {
    return (
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section">Our Capabilities</h2>
            <p className="text-body max-w-2xl mx-auto">
              Advanced manufacturing processes and cutting-edge technology
            </p>
          </div>
          <Empty 
            title="No capabilities listed"
            description="We're currently updating our capabilities information. Please check back soon."
            icon="Settings"
          />
        </div>
      </section>
    )
  }
  
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-section">Our Capabilities</h2>
          <p className="text-body max-w-2xl mx-auto">
            State-of-the-art manufacturing processes backed by decades of expertise 
            and continuous innovation
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {capabilities.map((capability, index) => (
            <CapabilityCard key={capability.Id} capability={capability} index={index} />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/capabilities" className="btn-primary">
            <ApperIcon name="Settings" size={20} className="mr-2" />
            View All Capabilities
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default CapabilitiesOverview