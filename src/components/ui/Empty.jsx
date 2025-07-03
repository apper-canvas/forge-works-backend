import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = 'No items found',
  description = 'There are no items to display at the moment.',
  icon = 'Package',
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}
    >
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-full p-6 mb-6">
        <ApperIcon name={icon} size={64} className="text-gray-400" />
      </div>
      
      <h3 className="text-2xl font-bold text-navy mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 text-center max-w-md mb-8">
        {description}
      </p>
      
      {actionLabel && onAction && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="btn-primary flex items-center space-x-2"
        >
          <ApperIcon name="Plus" size={20} />
          <span>{actionLabel}</span>
        </motion.button>
      )}
    </motion.div>
  )
}

export default Empty