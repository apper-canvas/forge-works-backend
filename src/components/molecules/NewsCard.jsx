import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'
import { format } from 'date-fns'

const NewsCard = ({ article }) => {
  const formattedDate = format(new Date(article.publishedAt), 'MMM dd, yyyy')
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-industrial overflow-hidden group cursor-pointer"
    >
      <div className="relative overflow-hidden bg-gray-100 h-48">
        <img 
          src={article.featuredImage} 
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="category">
            {article.category}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <ApperIcon name="Calendar" size={16} className="mr-2" />
          <span>{formattedDate}</span>
        </div>
        
        <h3 className="heading-card line-clamp-2 mb-3">
          {article.title}
        </h3>
        
        <p className="text-body text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <ApperIcon name="User" size={16} className="mr-1" />
            <span>{article.author}</span>
          </div>
          
          <div className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center group">
            <span>Read More</span>
            <ApperIcon name="ArrowRight" size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default NewsCard