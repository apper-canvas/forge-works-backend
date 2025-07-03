import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    inquiryType: '',
    message: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  
  const inquiryTypes = [
    { value: 'quote', label: 'Request Quote' },
    { value: 'product', label: 'Product Inquiry' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'support', label: 'Technical Support' },
    { value: 'other', label: 'Other' }
  ]
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required'
    }
    
    if (!formData.inquiryType) {
      newErrors.inquiryType = 'Please select an inquiry type'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success('Thank you for your inquiry! We will get back to you soon.')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        inquiryType: '',
        message: ''
      })
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
          required
          icon="User"
        />
        
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
          icon="Mail"
        />
        
        <Input
          label="Company Name"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          error={errors.company}
          required
          icon="Building"
        />
        
        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          error={errors.phone}
          icon="Phone"
        />
      </div>
      
      <Select
        label="Inquiry Type"
        name="inquiryType"
        value={formData.inquiryType}
        onChange={handleInputChange}
        options={inquiryTypes}
        error={errors.inquiryType}
        required
      />
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-navy">
          Message
          <span className="text-red-500 ml-1">*</span>
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={6}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Please describe your requirements or inquiry..."
        />
        {errors.message && (
          <p className="text-sm text-red-600 flex items-center mt-1">
            <ApperIcon name="AlertCircle" size={16} className="mr-1" />
            {errors.message}
          </p>
        )}
      </div>
      
      <Button
        type="submit"
        loading={loading}
        className="w-full md:w-auto"
        icon="Send"
      >
        Send Inquiry
      </Button>
    </motion.form>
  )
}

export default ContactForm