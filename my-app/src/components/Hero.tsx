'use client'

import { Palette, Shirt, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import ProductCategoryModal from './ProductCategoryModal'

export default function Hero() {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)

  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Design Your Own Merch</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Customize Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                Perfect Merchandise
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Create unique t-shirts, hoodies, and more with our easy-to-use
              customization tools. Choose from thousands of designs or upload
              your own.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsCategoryModalOpen(true)}
                className="inline-flex items-center justify-center px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Palette className="w-5 h-5 mr-2" />
                Start Customizing
              </button>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg border-2 border-purple-600 hover:bg-purple-50 transition-all"
              >
                <Shirt className="w-5 h-5 mr-2" />
                Browse Products
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Designs Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">4.9★</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main Product Image Placeholder */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                <div className="aspect-square bg-gradient-to-br from-purple-200 to-blue-200 rounded-xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Shirt className="w-32 h-32 mx-auto text-purple-600" />
                    <p className="text-gray-600 font-medium">
                      Your Design Here
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 transform rotate-3 hover:rotate-6 transition-transform">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 transform -rotate-3 hover:-rotate-6 transition-transform">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg"></div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20"></div>
          </div>
        </div>
      </div>

      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>

      <ProductCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />
    </section>
  )
}
