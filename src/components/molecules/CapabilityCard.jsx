import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const CapabilityCard = ({ capability, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card-industrial p-6 h-full"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
          <ApperIcon name={capability.icon} size={24} className="text-white" />
        </div>
        
        <div className="flex-1">
          <h3 className="heading-card text-lg mb-2">
            {capability.title}
          </h3>
          
          <p className="text-body text-sm mb-4">
            {capability.description}
          </p>
          
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-navy text-sm mb-2">Equipment:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {capability.equipment.map((item, i) => (
                  <li key={i} className="flex items-center">
                    <ApperIcon name="CheckCircle" size={14} className="text-green-500 mr-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-navy">Capacity:</span>
                <span className="text-sm font-bold text-orange-600">{capability.capacity}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CapabilityCard