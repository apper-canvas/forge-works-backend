import React from 'react'
import Hero from '@/components/organisms/Hero'
import ProductShowcase from '@/components/organisms/ProductShowcase'
import CapabilitiesOverview from '@/components/organisms/CapabilitiesOverview'
import QualityOverview from '@/components/organisms/QualityOverview'
import NewsGrid from '@/components/organisms/NewsGrid'
const Home = () => {
  return (
    <div>
      <Hero />
      <ProductShowcase />
      <CapabilitiesOverview />
      <QualityOverview />
      <NewsGrid />
    </div>
  )
}

export default Home