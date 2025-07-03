import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { downloadService } from '@/services/api/downloadService'
import { formatFileSize } from '@/utils/formatters'

const DownloadCenter = () => {
  const [downloads, setDownloads] = useState([])
  const [filteredDownloads, setFilteredDownloads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [downloadingIds, setDownloadingIds] = useState(new Set())

  const categories = [
    { id: 'all', name: 'All Categories', count: 0 },
    { id: 'precision-parts', name: 'Precision Parts', count: 0 },
    { id: 'industrial-components', name: 'Industrial Components', count: 0 },
    { id: 'custom-fabrication', name: 'Custom Fabrication', count: 0 },
    { id: 'assemblies', name: 'Assemblies', count: 0 },
    { id: 'tooling', name: 'Tooling', count: 0 }
  ]

  useEffect(() => {
    loadDownloads()
  }, [])

  useEffect(() => {
    filterDownloads()
  }, [downloads, searchQuery, selectedCategory])

  const loadDownloads = async () => {
    try {
      setLoading(true)
      setError('')
      
      const data = await downloadService.getAll()
      setDownloads(data)
    } catch (err) {
      setError('Failed to load downloads. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const filterDownloads = () => {
    let filtered = [...downloads]
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(download =>
        download.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        download.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        download.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(download => download.category === selectedCategory)
    }
    
    setFilteredDownloads(filtered)
  }

  const handleDownload = async (download) => {
    try {
      setDownloadingIds(prev => new Set([...prev, download.Id]))
      
      // Simulate download delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would trigger the actual download here
      // For now, we'll just show a success message
      toast.success(`Downloaded: ${download.title}`)
      
    } catch (err) {
      toast.error('Download failed. Please try again.')
    } finally {
      setDownloadingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(download.Id)
        return newSet
      })
    }
  }

  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return downloads.length
    return downloads.filter(d => d.category === categoryId).length
  }

  if (loading) {
    return (
      <div className="card-industrial p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="heading-card">Product Documentation</h2>
            <p className="text-body">Access technical specifications and product catalogs</p>
          </div>
          <ApperIcon name="Download" size={32} className="text-orange-500" />
        </div>
        <Loading type="grid" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="card-industrial p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="heading-card">Product Documentation</h2>
            <p className="text-body">Access technical specifications and product catalogs</p>
          </div>
          <ApperIcon name="Download" size={32} className="text-orange-500" />
        </div>
        <Error message={error} onRetry={loadDownloads} />
      </div>
    )
  }

  return (
    <div className="card-industrial p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="heading-card">Product Documentation</h2>
          <p className="text-body">Access technical specifications and product catalogs</p>
        </div>
        <ApperIcon name="Download" size={32} className="text-orange-500" />
      </div>

      {/* Search and Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {/* Search */}
        <div className="lg:col-span-1">
          <Input
            type="text"
            placeholder="Search downloads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
            leftIcon="Search"
          />
        </div>

        {/* Categories */}
        <div className="lg:col-span-3">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
                <span className="ml-2 text-xs opacity-75">
                  ({getCategoryCount(category.id)})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600 text-sm">
          Showing {filteredDownloads.length} of {downloads.length} downloads
        </p>
      </div>

      {/* Downloads Grid */}
      {filteredDownloads.length === 0 ? (
        <div className="text-center py-12">
          <ApperIcon name="FileText" size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No downloads found</h3>
          <p className="text-gray-500">
            Try adjusting your search terms or selecting a different category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredDownloads.map((download, index) => (
            <motion.div
              key={download.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-orange-200 hover:bg-orange-50 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <ApperIcon name="FileText" size={20} className="text-orange-500 mr-2" />
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    {download.type}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {formatFileSize(download.fileSize)}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-800 mb-2 text-sm">
                {download.title}
              </h3>
              
              <p className="text-xs text-gray-600 mb-4 line-clamp-2">
                {download.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Updated: {new Date(download.lastUpdated).toLocaleDateString()}
                </span>
                
                <Button
                  size="sm"
                  onClick={() => handleDownload(download)}
                  disabled={downloadingIds.has(download.Id)}
                  className="flex items-center"
                >
                  {downloadingIds.has(download.Id) ? (
                    <>
                      <ApperIcon name="Loader2" size={14} className="animate-spin mr-1" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Download" size={14} className="mr-1" />
                      Download
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DownloadCenter