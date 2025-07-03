import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'

const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-industrial overflow-hidden group"
    >
      <div className="relative overflow-hidden bg-gray-100 h-48">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="category">
            {product.category}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <h3 className="heading-card line-clamp-2 mb-2">
          {product.name}
        </h3>
        
        <p className="text-body text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {product.materials.slice(0, 2).map((material, index) => (
            <Badge key={index} variant="default" size="small">
              {material}
            </Badge>
          ))}
          {product.materials.length > 2 && (
            <Badge variant="default" size="small">
              +{product.materials.length - 2} more
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <ApperIcon name="Settings" size={16} className="mr-1" />
            <span>{product.applications.length} applications</span>
          </div>
          
          <Link
            to={`/products/${product.Id}`}
            className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center group"
          >
            <span>View Details</span>
            <ApperIcon name="ArrowRight" size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard