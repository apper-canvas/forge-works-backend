import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Capabilities', href: '/capabilities' },
    { name: 'Quality', href: '/quality' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ]
  
  const certifications = [
    'ISO 9001:2015',
    'AS9100',
    'IATF 16949',
    'ISO 14001'
  ]
  
  const socialLinks = [
    { name: 'LinkedIn', icon: 'Linkedin', href: '#' },
    { name: 'Twitter', icon: 'Twitter', href: '#' },
    { name: 'Facebook', icon: 'Facebook', href: '#' }
  ]
  
  return (
    <footer className="bg-navy text-white">
      <div className="container-custom">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Settings" size={24} className="text-white" />
                </div>
                <span className="text-xl font-display font-bold">
                  Forge Works
                </span>
              </Link>
              
              <p className="text-gray-300 mb-6 max-w-md">
                Precision manufacturing solutions with over 25 years of experience. 
                We deliver quality, reliability, and innovation to meet your industrial needs.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <ApperIcon name="MapPin" size={16} className="text-orange-500" />
                  <span className="text-sm text-gray-300">
                    123 Industrial Drive, Manufacturing District, City, State 12345
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <ApperIcon name="Phone" size={16} className="text-orange-500" />
                  <span className="text-sm text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ApperIcon name="Mail" size={16} className="text-orange-500" />
                  <span className="text-sm text-gray-300">info@forgeworks.com</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-orange-500 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Certifications */}
            <div>
              <h3 className="font-bold mb-4">Certifications</h3>
              <ul className="space-y-2">
                {certifications.map((cert) => (
                  <li key={cert} className="flex items-center space-x-2">
                    <ApperIcon name="Award" size={14} className="text-orange-500" />
                    <span className="text-gray-300 text-sm">{cert}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Follow Us</h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ scale: 1.1 }}
                      className="w-8 h-8 bg-gray-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors"
                    >
                      <ApperIcon name={social.icon} size={16} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-300 text-sm">
              © 2024 Forge Works. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link to="#" className="text-gray-300 hover:text-orange-500 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-300 hover:text-orange-500 text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer