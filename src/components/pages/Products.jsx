import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '@/components/molecules/ProductCard'
import FilterSidebar from '@/components/molecules/FilterSidebar'
import SearchBar from '@/components/molecules/SearchBar'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { productService } from '@/services/api/productService'

const Products = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    categories: [],
    materials: [],
    applications: []
  })
  
  useEffect(() => {
    loadProducts()
  }, [])
  
  useEffect(() => {
    filterProducts()
  }, [products, searchQuery, filters])
  
  const loadProducts = async () => {
    try {
      setLoading(true)
      setError('')
      
      const data = await productService.getAll()
      setProducts(data)
    } catch (err) {
      setError('Failed to load products. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const filterProducts = () => {
    let filtered = [...products]
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category)
      )
    }
    
    // Apply material filter
    if (filters.materials.length > 0) {
      filtered = filtered.filter(product =>
        product.materials.some(material => filters.materials.includes(material))
      )
    }
    
    // Apply application filter
    if (filters.applications.length > 0) {
      filtered = filtered.filter(product =>
        product.applications.some(application => filters.applications.includes(application))
      )
    }
    
    setFilteredProducts(filtered)
  }
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }
  
  const clearFilters = () => {
    setFilters({
      categories: [],
      materials: [],
      applications: []
    })
    setSearchQuery('')
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-surface pt-20">
        <div className="container-custom py-8">
          <div className="text-center mb-8">
            <h1 className="heading-display mb-4">Our Products</h1>
            <p className="text-body max-w-2xl mx-auto">
              Explore our comprehensive range of precision-engineered components and assemblies
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
          <div className="text-center mb-8">
            <h1 className="heading-display mb-4">Our Products</h1>
            <p className="text-body max-w-2xl mx-auto">
              Explore our comprehensive range of precision-engineered components and assemblies
            </p>
          </div>
          <Error message={error} onRetry={loadProducts} />
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
          className="text-center mb-8"
        >
          <h1 className="heading-display mb-4">Our Products</h1>
          <p className="text-body max-w-2xl mx-auto">
            Explore our comprehensive range of precision-engineered components and assemblies 
            designed to meet the highest industry standards
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar 
              filters={filters} 
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <SearchBar 
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search products by name, description, or category..."
              />
            </motion.div>
            
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              
              {(searchQuery || filters.categories.length > 0 || filters.materials.length > 0 || filters.applications.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center"
                >
                  <ApperIcon name="X" size={16} className="mr-1" />
                  Clear all filters
                </button>
              )}
            </div>
            
            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <Empty 
                title="No products found"
                description="Try adjusting your search terms or filters to find what you're looking for."
                icon="Search"
                actionLabel="Clear Filters"
                onAction={clearFilters}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products