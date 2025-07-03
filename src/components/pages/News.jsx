import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import SearchBar from '@/components/molecules/SearchBar'
import NewsCard from '@/components/molecules/NewsCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Button from '@/components/atoms/Button'
import { newsService } from '@/services/api/newsService'

const News = () => {
  const [news, setNews] = useState([])
  const [filteredNews, setFilteredNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  
  const itemsPerPage = 9
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentNews = filteredNews.slice(startIndex, endIndex)
  
  const categories = ['All', 'Company News', 'Industry Updates', 'Product Announcements', 'Press Releases']
  
  useEffect(() => {
    loadNews()
  }, [])
  
  useEffect(() => {
    filterNews()
  }, [news, searchTerm, selectedCategory, sortBy])
  
  const loadNews = async () => {
    try {
      setLoading(true)
      setError('')
      
      const data = await newsService.getAll()
      setNews(data)
      setFilteredNews(data)
    } catch (err) {
      setError('Failed to load news. Please try again.')
      toast.error('Failed to load news')
    } finally {
      setLoading(false)
    }
  }
  
  const filterNews = () => {
    let filtered = [...news]
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Apply category filter
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(article => article.category === selectedCategory)
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt))
        break
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }
    
    setFilteredNews(filtered)
    setCurrentPage(1)
  }
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }
  
  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }
  
  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setSortBy('newest')
    setCurrentPage(1)
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h1 className="heading-display mb-6">Latest News & Updates</h1>
              <p className="text-body text-xl max-w-3xl mx-auto">
                Stay informed about our latest company announcements, industry updates, and product news
              </p>
            </div>
            <Loading type="cards" />
          </div>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h1 className="heading-display mb-6">Latest News & Updates</h1>
              <p className="text-body text-xl max-w-3xl mx-auto">
                Stay informed about our latest company announcements, industry updates, and product news
              </p>
            </div>
            <Error message={error} onRetry={loadNews} />
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-white">
      <div className="section-padding">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="heading-display mb-6">Latest News & Updates</h1>
            <p className="text-body text-xl max-w-3xl mx-auto">
              Stay informed about our latest company announcements, industry updates, and product news
            </p>
          </motion.div>
          
          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
              <div className="w-full lg:w-1/2">
                <SearchBar
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search news articles..."
                />
              </div>
              
              <div className="flex flex-wrap gap-4 items-center">
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Title A-Z</option>
                </select>
                
                <Button
                  variant="secondary"
                  onClick={clearFilters}
                  className="flex items-center gap-2"
                >
                  <ApperIcon name="RotateCcw" size={16} />
                  Clear Filters
                </Button>
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category === 'All' ? '' : category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    (selectedCategory === '' && category === 'All') || selectedCategory === category
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
          
          {/* Results Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredNews.length)} of {filteredNews.length} articles
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory && ` in ${selectedCategory}`}
            </p>
          </motion.div>
          
          {/* News Grid */}
          {filteredNews.length === 0 ? (
            <Empty
              title="No news found"
              description="Try adjusting your search terms or filters to find more articles."
              icon="Newspaper"
            />
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
              >
                {currentNews.map((article, index) => (
                  <motion.div
                    key={article.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <NewsCard article={article} />
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-center items-center gap-2 mt-12"
                >
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ApperIcon name="ChevronLeft" size={20} />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        currentPage === page
                          ? 'bg-orange-500 text-white shadow-lg'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ApperIcon name="ChevronRight" size={20} />
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default News