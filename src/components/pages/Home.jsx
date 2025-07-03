import React from 'react'
import Hero from '@/components/organisms/Hero'
import ProductShowcase from '@/components/organisms/ProductShowcase'
import CapabilitiesOverview from '@/components/organisms/CapabilitiesOverview'
import QualityOverview from '@/components/organisms/QualityOverview'

const Home = () => {
  return (
    <div>
      <Hero />
      <ProductShowcase />
      <CapabilitiesOverview />
      <QualityOverview />
    </div>
  )
}

export default Home