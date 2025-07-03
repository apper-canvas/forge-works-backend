import { useState, useEffect } from 'react'
import { productService } from '@/services/api/productService'

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await productService.getAll()
      setProducts(data)
    } catch (err) {
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const getProductById = async (id) => {
    try {
      setError('')
      const product = await productService.getById(id)
      return product
    } catch (err) {
      setError('Failed to load product')
      throw err
    }
  }

  const createProduct = async (productData) => {
    try {
      setError('')
      const newProduct = await productService.create(productData)
      setProducts(prev => [...prev, newProduct])
      return newProduct
    } catch (err) {
      setError('Failed to create product')
      throw err
    }
  }

  const updateProduct = async (id, productData) => {
    try {
      setError('')
      const updatedProduct = await productService.update(id, productData)
      setProducts(prev => prev.map(p => p.Id === id ? updatedProduct : p))
      return updatedProduct
    } catch (err) {
      setError('Failed to update product')
      throw err
    }
  }

  const deleteProduct = async (id) => {
    try {
      setError('')
      await productService.delete(id)
      setProducts(prev => prev.filter(p => p.Id !== id))
    } catch (err) {
      setError('Failed to delete product')
      throw err
    }
  }

  return {
    products,
    loading,
    error,
    loadProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
  }
}