'use client'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { ProductCard } from '@/components/ProductCard'
import { useState } from 'react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  imageUrl?: string
  category: string
  createdAt: string
}

interface Category {
  id: string
  name: string
  slug: string
}

// Demo data
const demoCategories: Category[] = [
  { id: '1', name: 'T-Shirts', slug: 't-shirts' },
  { id: '2', name: 'Hoodies', slug: 'hoodies' },
  { id: '3', name: 'Mugs', slug: 'mugs' },
  { id: '4', name: 'Stickers', slug: 'stickers' },
  { id: '5', name: 'Posters', slug: 'posters' }
]

const demoProducts: Product[] = [
  {
    id: '1',
    name: 'Classic Black T-Shirt',
    description: 'Premium cotton t-shirt with custom design',
    price: 29.99,
    stock: 50,
    category: 't-shirts',
    imageUrl:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    createdAt: '2025-12-22T10:00:00.000Z'
  },
  {
    id: '2',
    name: 'Cozy Hoodie',
    description: 'Warm and comfortable hoodie for cold days',
    price: 59.99,
    stock: 30,
    category: 'hoodies',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
    createdAt: '2025-12-22T09:00:00.000Z'
  },
  {
    id: '3',
    name: 'Coffee Mug',
    description: 'Ceramic mug perfect for your morning coffee',
    price: 14.99,
    stock: 100,
    category: 'mugs',
    imageUrl:
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500',
    createdAt: '2025-12-22T08:00:00.000Z'
  },
  {
    id: '4',
    name: 'Vinyl Sticker Pack',
    description: 'Set of 10 waterproof vinyl stickers',
    price: 9.99,
    stock: 200,
    category: 'stickers',
    imageUrl:
      'https://images.unsplash.com/photo-1618241280195-6823e4406137?w=500',
    createdAt: '2025-12-22T07:00:00.000Z'
  },
  {
    id: '5',
    name: 'Motivational Poster',
    description: 'Inspirational wall art for your workspace',
    price: 24.99,
    stock: 40,
    category: 'posters',
    imageUrl:
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500',
    createdAt: '2025-12-22T06:00:00.000Z'
  },
  {
    id: '6',
    name: 'White Logo T-Shirt',
    description: 'Comfortable white tee with bold logo',
    price: 27.99,
    stock: 60,
    category: 't-shirts',
    imageUrl:
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
    createdAt: '2025-12-22T05:00:00.000Z'
  },
  {
    id: '7',
    name: 'Zip-Up Hoodie',
    description: 'Stylish zip-up hoodie with custom design',
    price: 64.99,
    stock: 25,
    category: 'hoodies',
    imageUrl:
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500',
    createdAt: '2025-12-22T04:00:00.000Z'
  },
  {
    id: '8',
    name: 'Travel Mug',
    description: 'Insulated travel mug for on-the-go',
    price: 19.99,
    stock: 80,
    category: 'mugs',
    imageUrl:
      'https://images.unsplash.com/photo-1609840113808-59e7b74fcb2b?w=500',
    createdAt: '2025-12-22T03:00:00.000Z'
  },
  {
    id: '9',
    name: 'Holographic Stickers',
    description: 'Eye-catching holographic sticker set',
    price: 12.99,
    stock: 0,
    category: 'stickers',
    imageUrl:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500',
    createdAt: '2025-12-22T02:00:00.000Z'
  },
  {
    id: '10',
    name: 'Abstract Art Poster',
    description: 'Modern abstract design wall poster',
    price: 29.99,
    stock: 3,
    category: 'posters',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=500',
    createdAt: '2025-12-22T01:00:00.000Z'
  },
  {
    id: '11',
    name: 'Vintage T-Shirt',
    description: 'Retro style t-shirt with faded print',
    price: 34.99,
    stock: 45,
    category: 't-shirts',
    imageUrl:
      'https://images.unsplash.com/photo-1503341338985-c2e5a4a55954?w=500',
    createdAt: '2025-12-21T23:00:00.000Z'
  },
  {
    id: '12',
    name: 'Pullover Hoodie',
    description: 'Classic pullover style with front pocket',
    price: 54.99,
    stock: 35,
    category: 'hoodies',
    imageUrl:
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500',
    createdAt: '2025-12-21T22:00:00.000Z'
  }
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [displayCount, setDisplayCount] = useState(8)

  const filteredProducts =
    selectedCategory === 'all'
      ? demoProducts
      : demoProducts.filter(p => p.category === selectedCategory)

  const displayedProducts = filteredProducts.slice(0, displayCount)
  const hasMore = displayCount < filteredProducts.length

  const loadMore = () => {
    setDisplayCount(prev => prev + 8)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Header Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Premium Products
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our collection of custom merchandise. High-quality
              products tailored to your style.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-purple-50 border-2 border-gray-100 hover:border-purple-200 hover:shadow-md'
              }`}
            >
              All Products
            </button>
            {demoCategories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.slug)
                  setDisplayCount(8)
                }}
                className={`px-6 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category.slug
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-purple-50 border-2 border-gray-100 hover:border-purple-200 hover:shadow-md'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-gray-600">
                No products found in this category
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-12">
                  <button
                    onClick={loadMore}
                    className="inline-flex items-center px-8 py-4 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Load More Products
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
