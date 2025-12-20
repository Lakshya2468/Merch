import Categories from '@/components/Categories'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Categories - Browse All Product Types | MerchStore',
  description:
    'Browse all product categories including T-Shirts, Hoodies, Accessories, Business Merch, Premium Collection, and Custom Designs. Find the perfect product for your custom design.',
  keywords: [
    'merchandise categories',
    'custom t-shirts',
    'custom hoodies',
    'accessories',
    'business merch',
    'premium collection',
    'custom products'
  ],
  openGraph: {
    title: 'All Categories | MerchStore',
    description:
      'Browse all product categories and find the perfect item for your custom design.',
    type: 'website'
  }
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Explore All Categories
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover our complete range of customizable products. From
              everyday essentials to premium collections, we have everything you
              need to bring your designs to life.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">6+</div>
                <div className="text-white/80 text-sm">Product Categories</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">6K+</div>
                <div className="text-white/80 text-sm">Total Designs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">100+</div>
                <div className="text-white/80 text-sm">Designer Partners</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-white/80 text-sm">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Component - No title/description/button since we have hero */}
      <Categories
        showTitle={false}
        showDescription={false}
        showViewAllButton={false}
      />

      {/* Additional Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Custom Design Tools
              </h3>
              <p className="text-gray-600">
                Use our easy-to-use design editor or upload your own artwork
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                High-quality materials and printing for long-lasting products
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Quick production and shipping to get your merch on time
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
