import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import ApperIcon from '@/components/ApperIcon'
import QuoteRequestModal from '@/components/molecules/QuoteRequestModal'
import { AuthContext } from '../../App'
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const location = useLocation()
  const { logout } = useContext(AuthContext)
  const { user, isAuthenticated } = useSelector((state) => state.user)
  
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
          
{/* CTA Button and User Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={openQuoteModal}
              className="btn-primary text-sm"
            >
              Request Quote
            </button>
            
            {isAuthenticated && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  Welcome, {user?.firstName || 'User'}
                </span>
                <button
                  onClick={logout}
                  className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center"
                >
                  <ApperIcon name="LogOut" size={16} className="mr-1" />
                  Logout
                </button>
              </div>
            )}
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
<div className="flex flex-col space-y-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    openQuoteModal()
                  }}
                  className="btn-primary text-sm w-fit"
                >
                  Request Quote
                </button>
                
                {isAuthenticated && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">
                      Welcome, {user?.firstName || 'User'}
                    </p>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        logout()
                      }}
                      className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center"
                    >
                      <ApperIcon name="LogOut" size={16} className="mr-1" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
</motion.div>
      )}
      
      <QuoteRequestModal isOpen={isQuoteModalOpen} onClose={closeQuoteModal} />
    </motion.header>
  )
}

export default Header