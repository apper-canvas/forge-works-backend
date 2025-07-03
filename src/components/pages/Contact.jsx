import React from 'react'
import { motion } from 'framer-motion'
import ContactForm from '@/components/molecules/ContactForm'
import ApperIcon from '@/components/ApperIcon'

const Contact = () => {
  const contactInfo = [
    {
      title: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Monday - Friday, 8AM - 6PM EST',
      icon: 'Phone'
    },
    {
      title: 'Email',
      value: 'info@forgeworks.com',
      description: 'We respond within 24 hours',
      icon: 'Mail'
    },
    {
      title: 'Address',
      value: '123 Industrial Drive',
      description: 'Manufacturing District, City, State 12345',
      icon: 'MapPin'
    }
  ]
  
  const offices = [
    {
      name: 'Headquarters',
      address: '123 Industrial Drive\nManufacturing District, City, State 12345',
      phone: '+1 (555) 123-4567',
      email: 'info@forgeworks.com'
    },
    {
      name: 'West Coast Office',
      address: '456 Technology Blvd\nInnovation Park, City, State 67890',
      phone: '+1 (555) 987-6543',
      email: 'west@forgeworks.com'
    }
  ]
  
  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="container-custom py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="heading-display mb-4">Contact Us</h1>
          <p className="text-body text-lg max-w-2xl mx-auto">
            Ready to discuss your manufacturing needs? Get in touch with our team 
            of experts who are here to help you find the perfect solution.
          </p>
        </motion.div>
        
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-industrial p-6 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name={info.icon} size={32} className="text-white" />
              </div>
              <h3 className="font-bold text-navy mb-2">{info.title}</h3>
              <p className="text-orange-600 font-medium mb-1">{info.value}</p>
              <p className="text-gray-600 text-sm">{info.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="heading-section mb-6">Send us a Message</h2>
            <ContactForm />
          </motion.div>
          
          {/* Office Locations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="heading-section mb-6">Our Locations</h2>
            
            {offices.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-industrial p-6"
              >
                <h3 className="font-bold text-navy mb-3">{office.name}</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <ApperIcon name="MapPin" size={16} className="text-orange-600 mt-1" />
                    <div>
                      <p className="text-gray-600 text-sm whitespace-pre-line">{office.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="Phone" size={16} className="text-orange-600" />
                    <p className="text-gray-600 text-sm">{office.phone}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="Mail" size={16} className="text-orange-600" />
                    <p className="text-gray-600 text-sm">{office.email}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-industrial p-6"
            >
              <h3 className="font-bold text-navy mb-3">Business Hours</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Monday - Friday</span>
                  <span className="text-gray-800 text-sm font-medium">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Saturday</span>
                  <span className="text-gray-800 text-sm font-medium">9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Sunday</span>
                  <span className="text-gray-800 text-sm font-medium">Closed</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-700">
                  <ApperIcon name="Clock" size={14} className="inline mr-1" />
                  Emergency services available 24/7 for existing customers
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-white rounded-lg shadow-lg p-8 text-center"
        >
          <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <ApperIcon name="MapPin" size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Interactive map coming soon</p>
              <p className="text-sm text-gray-500 mt-2">
                Visit us at 123 Industrial Drive, Manufacturing District
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact