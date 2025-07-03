import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const About = () => {
  const timeline = [
    {
      year: '1998',
      title: 'Company Founded',
      description: 'Forge Works established with a vision to provide precision manufacturing solutions'
    },
    {
      year: '2005',
      title: 'ISO Certification',
      description: 'Achieved ISO 9001:2000 certification, demonstrating our commitment to quality'
    },
    {
      year: '2010',
      title: 'Facility Expansion',
      description: 'Expanded manufacturing facility to accommodate growing demand'
    },
    {
      year: '2015',
      title: 'Advanced Technology',
      description: 'Invested in state-of-the-art CNC machines and automation systems'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Implemented Industry 4.0 technologies for enhanced efficiency'
    },
    {
      year: '2024',
      title: 'Sustainable Future',
      description: 'Leading the industry with eco-friendly manufacturing processes'
    }
  ]
  
  const leadership = [
    {
      name: 'John Smith',
      position: 'CEO & Founder',
      experience: '25+ years in manufacturing',
      icon: 'User'
    },
    {
      name: 'Sarah Johnson',
      position: 'Chief Operations Officer',
      experience: '20+ years in operations',
      icon: 'Settings'
    },
    {
      name: 'Michael Chen',
      position: 'Chief Technology Officer',
      experience: '18+ years in engineering',
      icon: 'Wrench'
    },
    {
      name: 'Emily Davis',
      position: 'Quality Director',
      experience: '22+ years in quality management',
      icon: 'Award'
    }
  ]
  
  const values = [
    {
      title: 'Quality Excellence',
      description: 'Uncompromising commitment to delivering superior products that exceed expectations',
      icon: 'Award'
    },
    {
      title: 'Innovation',
      description: 'Continuous investment in technology and processes to stay ahead of industry trends',
      icon: 'Lightbulb'
    },
    {
      title: 'Customer Focus',
      description: 'Building lasting partnerships through exceptional service and support',
      icon: 'Users'
    },
    {
      title: 'Reliability',
      description: 'Consistent delivery of products and services you can depend on',
      icon: 'Shield'
    }
  ]
  
  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="container-custom py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="heading-display mb-4">About Forge Works</h1>
          <p className="text-body text-lg max-w-3xl mx-auto">
            For over 25 years, we have been at the forefront of precision manufacturing, 
            delivering innovative solutions that power industries worldwide. Our commitment 
            to quality, innovation, and customer satisfaction has made us a trusted partner 
            for companies seeking excellence in manufacturing.
          </p>
        </motion.div>
        
        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          <div className="card-industrial p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-6">
              <ApperIcon name="Target" size={32} className="text-white" />
            </div>
            <h3 className="heading-card mb-4">Our Mission</h3>
            <p className="text-body">
              To provide precision manufacturing solutions that enable our customers to achieve 
              their goals through superior quality, innovative technology, and exceptional service.
            </p>
          </div>
          
          <div className="card-industrial p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-6">
              <ApperIcon name="Eye" size={32} className="text-white" />
            </div>
            <h3 className="heading-card mb-4">Our Vision</h3>
            <p className="text-body">
              To be the world's leading provider of precision manufacturing solutions, 
              recognized for our innovation, quality, and commitment to sustainable practices.
            </p>
          </div>
        </motion.div>
        
        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="heading-section text-center mb-8">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-industrial p-6 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={value.icon} size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-navy mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="heading-section text-center mb-8">Our Journey</h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-orange-600"></div>
            
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`w-full max-w-md ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="card-industrial p-6 relative">
                      <div className={`absolute top-6 ${index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} w-4 h-4 bg-orange-500 rounded-full border-4 border-white`}></div>
                      <div className="text-2xl font-bold text-orange-600 mb-2">{item.year}</div>
                      <h3 className="font-bold text-navy mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Leadership */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="heading-section text-center mb-8">Leadership Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-industrial p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={leader.icon} size={32} className="text-gray-600" />
                </div>
                <h3 className="font-bold text-navy mb-1">{leader.name}</h3>
                <p className="text-orange-600 font-medium text-sm mb-2">{leader.position}</p>
                <p className="text-gray-600 text-xs">{leader.experience}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="heading-section text-center mb-8">By the Numbers</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">25+</div>
              <div className="text-gray-600">Years of Experience</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
              <div className="text-gray-600">Satisfied Clients</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-gray-600">Expert Employees</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">100K+</div>
              <div className="text-gray-600">Products Delivered</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About