import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'
import QuoteRequestModal from '@/components/molecules/QuoteRequestModal'
import { productService } from '@/services/api/productService'
const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  useEffect(() => {
    loadProduct()
  }, [id])
  
  const loadProduct = async () => {
    try {
      setLoading(true)
      setError('')
      
      const data = await productService.getById(parseInt(id))
      setProduct(data)
    } catch (err) {
      setError('Failed to load product details. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
const handleRequestQuote = () => {
    setIsQuoteModalOpen(true)
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-surface pt-20">
        <div className="container-custom py-8">
          <Loading />
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-surface pt-20">
        <div className="container-custom py-8">
          <Error message={error} onRetry={loadProduct} />
        </div>
      </div>
    )
  }
  
  if (!product) {
    return (
      <div className="min-h-screen bg-surface pt-20">
        <div className="container-custom py-8">
          <Error message="Product not found" />
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-orange-600">
              Home
            </Link>
            <ApperIcon name="ChevronRight" size={16} className="text-gray-400" />
            <Link to="/products" className="text-gray-500 hover:text-orange-600">
              Products
            </Link>
            <ApperIcon name="ChevronRight" size={16} className="text-gray-400" />
            <span className="text-navy font-medium">{product.name}</span>
          </div>
        </motion.nav>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 bg-white rounded-lg border-2 overflow-hidden ${
                      selectedImageIndex === index 
                        ? 'border-orange-500' 
                        : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
          
          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <Badge variant="category" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="heading-display text-3xl mb-4">{product.name}</h1>
              <p className="text-body text-lg">{product.description}</p>
            </div>
            
            {/* Materials */}
            <div>
              <h3 className="font-bold text-navy mb-3">Materials</h3>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((material, index) => (
                  <Badge key={index} variant="default">
                    {material}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Applications */}
            <div>
              <h3 className="font-bold text-navy mb-3">Applications</h3>
              <div className="flex flex-wrap gap-2">
                {product.applications.map((application, index) => (
                  <Badge key={index} variant="primary">
                    {application}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div>
                <h3 className="font-bold text-navy mb-3">Specifications</h3>
                <div className="bg-white rounded-lg shadow-sm p-4 space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="font-medium text-navy">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
<div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                onClick={handleRequestQuote}
                className="flex-1"
                icon="MessageCircle"
              >
                Request Quote
              </Button>
              <Link to="/contact" className="flex-1">
                <Button
                  variant="secondary"
                  className="w-full"
                  icon="Phone"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
            
            {/* Additional Info */}
            <div className="bg-orange-50 rounded-lg p-4 mt-8">
              <div className="flex items-start space-x-3">
                <ApperIcon name="Info" size={20} className="text-orange-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-navy mb-1">Need Custom Solutions?</h4>
                  <p className="text-sm text-gray-600">
                    Our engineering team can modify this product or develop custom solutions 
                    to meet your specific requirements.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
</div>
      </div>
      
      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  )
}

export default ProductDetail