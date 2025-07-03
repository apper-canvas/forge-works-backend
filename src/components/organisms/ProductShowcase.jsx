import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductCard from '@/components/molecules/ProductCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { productService } from '@/services/api/productService'

const ProductShowcase = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  useEffect(() => {
    loadProducts()
  }, [])
  
  const loadProducts = async () => {
    try {
      setLoading(true)
      setError('')
      
      const data = await productService.getAll()
      setProducts(data.slice(0, 6)) // Show only first 6 products
    } catch (err) {
      setError('Failed to load products. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) {
    return (
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section">Featured Products</h2>
            <p className="text-body max-w-2xl mx-auto">
              Discover our precision-engineered components and assemblies
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
            <h2 className="heading-section">Featured Products</h2>
            <p className="text-body max-w-2xl mx-auto">
              Discover our precision-engineered components and assemblies
            </p>
          </div>
          <Error message={error} onRetry={loadProducts} />
        </div>
      </section>
    )
  }
  
  if (products.length === 0) {
    return (
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section">Featured Products</h2>
            <p className="text-body max-w-2xl mx-auto">
              Discover our precision-engineered components and assemblies
            </p>
          </div>
          <Empty 
            title="No products available"
            description="We're currently updating our product catalog. Please check back soon."
            icon="Package"
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
          <h2 className="heading-section">Featured Products</h2>
          <p className="text-body max-w-2xl mx-auto">
            Discover our precision-engineered components and assemblies designed 
            to meet the highest industry standards
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.Id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/products" className="btn-primary">
            <ApperIcon name="Package" size={20} className="mr-2" />
            View All Products
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductShowcase