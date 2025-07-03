import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import CertificationBadge from '@/components/molecules/CertificationBadge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { certificationService } from '@/services/api/certificationService'

const QualityOverview = () => {
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
      setCertifications(data.slice(0, 4)) // Show only first 4 certifications
    } catch (err) {
      setError('Failed to load certifications. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) {
    return (
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section">Quality Standards</h2>
            <p className="text-body max-w-2xl mx-auto">
              Certified processes ensuring the highest quality standards
            </p>
          </div>
          <Loading type="cards" />
        </div>
      </section>
    )
  }
  
  if (error) {
    return (
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section">Quality Standards</h2>
            <p className="text-body max-w-2xl mx-auto">
              Certified processes ensuring the highest quality standards
            </p>
          </div>
          <Error message={error} onRetry={loadCertifications} />
        </div>
      </section>
    )
  }
  
  if (certifications.length === 0) {
    return (
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section">Quality Standards</h2>
            <p className="text-body max-w-2xl mx-auto">
              Certified processes ensuring the highest quality standards
            </p>
          </div>
          <Empty 
            title="No certifications listed"
            description="We're currently updating our certification information. Please check back soon."
            icon="Award"
          />
        </div>
      </section>
    )
  }
  
  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-section">Quality Standards</h2>
          <p className="text-body max-w-2xl mx-auto">
            Our commitment to quality is demonstrated through rigorous certifications 
            and adherence to international standards
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {certifications.map((certification, index) => (
            <CertificationBadge key={certification.Id} certification={certification} index={index} />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/quality" className="btn-primary">
            <ApperIcon name="Award" size={20} className="mr-2" />
            View Quality Standards
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default QualityOverview