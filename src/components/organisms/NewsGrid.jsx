import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import NewsCard from '@/components/molecules/NewsCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { newsService } from '@/services/api/newsService'

const NewsGrid = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  useEffect(() => {
    loadNews()
  }, [])
  
  const loadNews = async () => {
    try {
      setLoading(true)
      setError('')
      
      const data = await newsService.getAll()
      setNews(data.slice(0, 6)) // Show only first 6 news items
    } catch (err) {
      setError('Failed to load news. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section">Latest News & Updates</h2>
            <p className="text-body max-w-2xl mx-auto">
              Stay informed about our latest company announcements and industry updates
            </p>
          </div>
          <Loading type="cards" />
        </div>
      </section>
    )
  }
  
  if (error) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section">Latest News & Updates</h2>
            <p className="text-body max-w-2xl mx-auto">
              Stay informed about our latest company announcements and industry updates
            </p>
          </div>
          <Error message={error} onRetry={loadNews} />
        </div>
      </section>
    )
  }
  
  if (news.length === 0) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section">Latest News & Updates</h2>
            <p className="text-body max-w-2xl mx-auto">
              Stay informed about our latest company announcements and industry updates
            </p>
          </div>
          <Empty 
            title="No news available"
            description="We're currently updating our news feed. Please check back soon."
            icon="Newspaper"
          />
        </div>
      </section>
    )
  }
  
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-section">Latest News & Updates</h2>
          <p className="text-body max-w-2xl mx-auto">
            Stay informed about our latest company announcements and industry updates
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {news.map((article, index) => (
            <motion.div
              key={article.Id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <NewsCard article={article} />
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button className="btn-primary">
            <ApperIcon name="Newspaper" size={20} className="mr-2" />
            View All News
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default NewsGrid