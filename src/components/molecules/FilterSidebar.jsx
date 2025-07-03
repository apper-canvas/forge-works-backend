import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const FilterSidebar = ({ filters, onFilterChange, onClearFilters }) => {
  const categories = [
    'Precision Parts',
    'Industrial Components',
    'Custom Fabrication',
    'Assemblies',
    'Tooling'
  ]
  
  const materials = [
    'Steel',
    'Aluminum',
    'Stainless Steel',
    'Brass',
    'Copper',
    'Titanium',
    'Plastics'
  ]
  
  const applications = [
    'Automotive',
    'Aerospace',
    'Medical',
    'Industrial',
    'Electronics',
    'Construction'
  ]
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 sticky top-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-navy">Filters</h3>
        <Button
          variant="ghost"
          size="small"
          onClick={onClearFilters}
          className="text-orange-600 hover:text-orange-700"
        >
          Clear All
        </Button>
      </div>
      
      <div className="space-y-6">
        {/* Categories */}
        <div>
          <h4 className="font-semibold text-navy mb-3 flex items-center">
            <ApperIcon name="Grid3x3" size={16} className="mr-2" />
            Categories
          </h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={(e) => {
                    const newCategories = e.target.checked
                      ? [...filters.categories, category]
                      : filters.categories.filter(c => c !== category)
                    onFilterChange({ ...filters, categories: newCategories })
                  }}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Materials */}
        <div>
          <h4 className="font-semibold text-navy mb-3 flex items-center">
            <ApperIcon name="Layers" size={16} className="mr-2" />
            Materials
          </h4>
          <div className="space-y-2">
            {materials.map((material) => (
              <label key={material} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.materials.includes(material)}
                  onChange={(e) => {
                    const newMaterials = e.target.checked
                      ? [...filters.materials, material]
                      : filters.materials.filter(m => m !== material)
                    onFilterChange({ ...filters, materials: newMaterials })
                  }}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-700">{material}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Applications */}
        <div>
          <h4 className="font-semibold text-navy mb-3 flex items-center">
            <ApperIcon name="Target" size={16} className="mr-2" />
            Applications
          </h4>
          <div className="space-y-2">
            {applications.map((application) => (
              <label key={application} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.applications.includes(application)}
                  onChange={(e) => {
                    const newApplications = e.target.checked
                      ? [...filters.applications, application]
                      : filters.applications.filter(a => a !== application)
                    onFilterChange({ ...filters, applications: newApplications })
                  }}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-700">{application}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default FilterSidebar