import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Products from "@/components/pages/Products";
import Quality from "@/components/pages/Quality";
import Capabilities from "@/components/pages/Capabilities";

const Hero = () => {
  return (
<section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-navy via-steel to-navy overflow-hidden">
{/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzAgMzBsMTUtMTV2MzBsLTE1LTE1ek0xNSAxNWwxNSAxNUwxNSA0NVYxNXoiLz48L2c+PC9nPjwvc3ZnPg==')] animate-pulse"></div>
      </div>
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1 
              className="heading-display text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Precision Manufacturing
              <span className="block gradient-text">Excellence</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Delivering superior quality components and assemblies with cutting-edge 
              technology, certified processes, and unwavering commitment to customer satisfaction.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/products" className="btn-primary">
                <ApperIcon name="Package" size={20} className="mr-2" />
                View Products
              </Link>
              <Link to="/capabilities" className="btn-secondary">
                <ApperIcon name="Settings" size={20} className="mr-2" />
                Our Capabilities
              </Link>
            </motion.div>
            
            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-center lg:text-left">
                <div className="text-3xl lg:text-4xl font-bold text-orange-500 mb-1">25+</div>
                <div className="text-sm text-gray-300">Years Experience</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl lg:text-4xl font-bold text-orange-500 mb-1">500+</div>
                <div className="text-sm text-gray-300">Satisfied Clients</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl lg:text-4xl font-bold text-orange-500 mb-1">99.9%</div>
                <div className="text-sm text-gray-300">Quality Rate</div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <ApperIcon name="Zap" size={32} className="text-orange-500 mx-auto mb-2" />
                  <div className="text-white font-semibold text-sm">High Precision</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <ApperIcon name="Shield" size={32} className="text-orange-500 mx-auto mb-2" />
                  <div className="text-white font-semibold text-sm">Quality Assured</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <ApperIcon name="Clock" size={32} className="text-orange-500 mx-auto mb-2" />
                  <div className="text-white font-semibold text-sm">On-Time Delivery</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <ApperIcon name="Users" size={32} className="text-orange-500 mx-auto mb-2" />
                  <div className="text-white font-semibold text-sm">Expert Team</div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <ApperIcon name="Cog" size={24} className="text-white" />
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-steel to-navy rounded-full flex items-center justify-center shadow-lg"
            >
              <ApperIcon name="Wrench" size={18} className="text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero