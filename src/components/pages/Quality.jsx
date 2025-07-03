import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CertificationBadge from '@/components/molecules/CertificationBadge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { certificationService } from '@/services/api/certificationService'

const Quality = () => {
  const [certifications, setCertifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  useEffect(() => {
    loadCertifications()
  }, [])
  
  const loadCertifications = async () => {
    try {
      setLoading(true)
      setError('')
      
      const data = await certificationService.getAll()
      setCertifications(data)
    } catch (err) {
      setError('Failed to load certifications. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const qualityProcesses = [
    {
      title: 'Incoming Material Inspection',
      description: 'All raw materials undergo rigorous inspection to ensure compliance with specifications',
      icon: 'Package'
    },
    {
      title: 'In-Process Quality Control',
      description: 'Continuous monitoring throughout the manufacturing process using advanced measurement tools',
      icon: 'Search'
    },
    {
      title: 'Final Product Testing',
      description: 'Comprehensive testing and validation before product release to customers',
      icon: 'CheckCircle'
    },
    {
      title: 'Documentation & Traceability',
      description: 'Complete documentation and traceability for all products and processes',
      icon: 'FileText'
    }
  ]
  
  if (loading) {
    return (
      <div className="min-h-screen bg-surface pt-20">
        <div className="container-custom py-8">
          <div className="text-center mb-12">
            <h1 className="heading-display mb-4">Quality Standards</h1>
            <p className="text-body max-w-2xl mx-auto">
              Our commitment to quality through certified processes and rigorous standards
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
            <h1 className="heading-display mb-4">Quality Standards</h1>
            <p className="text-body max-w-2xl mx-auto">
              Our commitment to quality through certified processes and rigorous standards
            </p>
          </div>
          <Error message={error} onRetry={loadCertifications} />
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
          <h1 className="heading-display mb-4">Quality Standards</h1>
          <p className="text-body max-w-2xl mx-auto">
            Quality is at the heart of everything we do. Our comprehensive quality management 
            system ensures consistent excellence in every product we manufacture.
          </p>
        </motion.div>
        
        {/* Quality Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="heading-section text-center mb-8">Our Quality Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityProcesses.map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-industrial p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={process.icon} size={32} className="text-white" />
                </div>
                <h3 className="font-bold text-navy mb-2">{process.title}</h3>
                <p className="text-gray-600 text-sm">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="heading-section text-center mb-8">Certifications & Standards</h2>
          
          {certifications.length === 0 ? (
            <Empty 
              title="No certifications listed"
              description="We're currently updating our certification information. Please check back soon."
              icon="Award"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {certifications.map((certification, index) => (
                <CertificationBadge key={certification.Id} certification={certification} index={index} />
              ))}
            </div>
          )}
        </motion.div>
        
        {/* Quality Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="heading-section text-center mb-8">Quality Metrics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">99.9%</div>
              <div className="text-gray-600">Quality Rate</div>
              <p className="text-sm text-gray-500 mt-2">
                Products meeting or exceeding specifications
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-gray-600">On-Time Delivery</div>
              <p className="text-sm text-gray-500 mt-2">
                Orders delivered on or before scheduled date
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">0.01%</div>
              <div className="text-gray-600">Defect Rate</div>
              <p className="text-sm text-gray-500 mt-2">
                Continuously improving through lean processes
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Quality