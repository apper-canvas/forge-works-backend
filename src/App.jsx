import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { motion } from 'framer-motion'
import Layout from '@/components/organisms/Layout'
import Home from '@/components/pages/Home'
import Products from '@/components/pages/Products'
import ProductDetail from '@/components/pages/ProductDetail'
import Capabilities from '@/components/pages/Capabilities'
import Quality from '@/components/pages/Quality'
import News from '@/components/pages/News'
import About from '@/components/pages/About'
import Contact from '@/components/pages/Contact'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
<Route path="capabilities" element={<Capabilities />} />
          <Route path="quality" element={<Quality />} />
          <Route path="news" element={<News />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
      
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="light"
        toastClassName="rounded-lg shadow-xl"
        bodyClassName="text-sm font-medium"
      />
    </div>
  )
}

export default App