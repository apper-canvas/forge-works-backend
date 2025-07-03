import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import QuoteRequestModal from '@/components/molecules/QuoteRequestModal'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const location = useLocation()
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Capabilities', href: '/capabilities' },
    { name: 'Quality', href: '/quality' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ]
  
const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  const openQuoteModal = () => {
    setIsQuoteModalOpen(true)
  }
  
  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false)
  }
  
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="Settings" size={24} className="text-white" />
            </div>
            <span className="text-xl lg:text-2xl font-display font-bold text-navy">
              Forge Works
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 relative ${
                  location.pathname === item.href
                    ? 'text-orange-600'
                    : isScrolled
                    ? 'text-navy hover:text-orange-600'
                    : 'text-white hover:text-orange-300'
                }`}
              >
                {item.name}
                {location.pathname === item.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-600"
                  />
                )}
              </Link>
            ))}
          </div>
          
{/* CTA Button */}
          <div className="hidden lg:block">
            <button
              onClick={openQuoteModal}
              className="btn-primary text-sm"
            >
              Request Quote
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-navy hover:bg-gray-100 transition-colors"
          >
            <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
        >
          <div className="container-custom py-4">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-medium transition-colors duration-200 ${
                    location.pathname === item.href
                      ? 'text-orange-600'
                      : 'text-navy hover:text-orange-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
<button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  openQuoteModal()
                }}
                className="btn-primary text-sm w-fit"
              >
                Request Quote
              </button>
            </div>
          </div>
</motion.div>
      )}
      
      <QuoteRequestModal isOpen={isQuoteModalOpen} onClose={closeQuoteModal} />
    </motion.header>
  )
}

export default Header