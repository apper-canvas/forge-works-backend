import React from 'react'
import { motion } from 'framer-motion'

const Loading = ({ type = 'default', className = '' }) => {
  const shimmerAnimation = {
    initial: { x: '-100%' },
    animate: { x: '100%' },
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: 'linear'
    }
  }

  if (type === 'cards') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card-industrial p-6 animate-pulse">
            <div className="relative overflow-hidden bg-gray-200 h-48 rounded-lg mb-4">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                {...shimmerAnimation}
              />
            </div>
            <div className="space-y-3">
              <div className="relative overflow-hidden bg-gray-200 h-6 rounded">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  {...shimmerAnimation}
                />
              </div>
              <div className="relative overflow-hidden bg-gray-200 h-4 rounded w-3/4">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  {...shimmerAnimation}
                />
              </div>
              <div className="relative overflow-hidden bg-gray-200 h-4 rounded w-1/2">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  {...shimmerAnimation}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (type === 'list') {
    return (
      <div className={`space-y-4 ${className}`}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow animate-pulse">
            <div className="relative overflow-hidden bg-gray-200 h-12 w-12 rounded-full">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                {...shimmerAnimation}
              />
            </div>
            <div className="flex-1 space-y-2">
              <div className="relative overflow-hidden bg-gray-200 h-4 rounded w-3/4">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  {...shimmerAnimation}
                />
              </div>
              <div className="relative overflow-hidden bg-gray-200 h-3 rounded w-1/2">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  {...shimmerAnimation}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-orange-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 rounded-full animate-spin border-t-steel"></div>
        </div>
      </div>
    </div>
  )
}

export default Loading