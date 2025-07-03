import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const CertificationBadge = ({ certification, index }) => {
  const isValid = new Date(certification.validUntil) > new Date()
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="card-industrial p-6 text-center group cursor-pointer"
    >
      <div className="relative mb-4">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center group-hover:from-orange-50 group-hover:to-orange-100 transition-all duration-300">
          <ApperIcon name="Award" size={32} className="text-gray-600 group-hover:text-orange-600 transition-colors" />
        </div>
        
        {isValid && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <ApperIcon name="Check" size={14} className="text-white" />
          </div>
        )}
      </div>
      
      <h3 className="font-bold text-navy mb-2 group-hover:text-orange-600 transition-colors">
        {certification.name}
      </h3>
      
      <p className="text-sm text-gray-600 mb-3">
        {certification.issuer}
      </p>
      
      <div className="flex items-center justify-center space-x-2">
        <ApperIcon name="Calendar" size={14} className="text-gray-400" />
        <span className={`text-xs ${isValid ? 'text-green-600' : 'text-red-600'}`}>
          Valid until {new Date(certification.validUntil).toLocaleDateString()}
        </span>
      </div>
    </motion.div>
  )
}

export default CertificationBadge