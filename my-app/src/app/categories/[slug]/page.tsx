import { categories } from '@/components/Categories'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

// Generate static params for all categories
export async function generateStaticParams() {
  return categories.map(category => ({
    slug: category.slug
  }))
}

// Generate metadata for each category
export async function generateMetadata({
  params
}: CategoryPageProps): Promise<Metadata> {
  const category = categories.find(c => c.slug === params.slug)

  if (!category) {
    return {
      title: 'Category Not Found'
    }
  }

  return {
    title: `${category.name} - ${category.description} | MerchStore`,
    description: `Browse ${category.count} in our ${category.name} collection. ${category.description}. Customize with your own designs or choose from our marketplace.`,
    keywords: [
      category.name.toLowerCase(),
      'custom merchandise',
      'custom designs',
      'personalized products'
    ],
    openGraph: {
      title: `${category.name} Collection | MerchStore`,
      description: `${category.count} available in ${category.name}`,
      type: 'website'
    }
  }
}

// Mock products - in real app, fetch from database
const getMockProducts = (categorySlug: string) => {
  const products = [
    {
      id: 1,
      name: 'Classic Cotton',
      price: 24.99,
      image: '/placeholder-product.jpg',
      rating: 4.8,
      reviews: 234
    },
    {
      id: 2,
      name: 'Premium Blend',
      price: 29.99,
      image: '/placeholder-product.jpg',
      rating: 4.9,
      reviews: 456
    },
    {
      id: 3,
      name: 'Eco-Friendly',
      price: 27.99,
      image: '/placeholder-product.jpg',
      rating: 4.7,
      reviews: 189
    },
    {
      id: 4,
      name: 'Performance Fit',
      price: 32.99,
      image: '/placeholder-product.jpg',
      rating: 4.9,
      reviews: 567
    },
    {
      id: 5,
      name: 'Vintage Style',
      price: 26.99,
      image: '/placeholder-product.jpg',
      rating: 4.6,
      reviews: 123
    },
    {
      id: 6,
      name: 'Modern Cut',
      price: 28.99,
      image: '/placeholder-product.jpg',
      rating: 4.8,
      reviews: 345
    }
  ]

  return products.map(p => ({
    ...p,
    categorySlug
  }))
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug)

  if (!category) {
    notFound()
  }

  const Icon = category.icon
  const products = getMockProducts(category.slug)

  // Get related categories (exclude current)
  const relatedCategories = categories
    .filter(c => c.slug !== category.slug)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Navbar />

      {/* Category Hero */}
      <section
        className={`pt-32 pb-16 bg-gradient-to-br ${category.color} relative overflow-hidden`}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-white/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href="/categories"
                  className="hover:text-white transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>/</li>
              <li className="text-white font-semibold">{category.name}</li>
            </ol>
          </nav>

          <div className="flex items-center space-x-6 mb-6">
            <div className="p-6 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
              <Icon className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
                {category.name}
              </h1>
              <p className="text-xl text-white/90">{category.description}</p>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <div className="text-white">
              <span className="text-2xl font-bold">{category.count}</span>
              <span className="ml-2 text-white/80">Available</span>
            </div>
            <div className="text-white">
              <span className="text-2xl font-bold">4.8★</span>
              <span className="ml-2 text-white/80">Average Rating</span>
            </div>
            <div className="text-white">
              <span className="text-2xl font-bold">50K+</span>
              <span className="ml-2 text-white/80">Orders</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Sort */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                All Sizes
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                All Colors
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                Price Range
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Sort by:</span>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Most Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
                <option>Top Rated</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-transparent hover:shadow-2xl transition-all duration-300"
              >
                {/* Product Image */}
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="w-24 h-24 text-gray-300" />
                  </div>
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-purple-600">
                    ${product.price}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {product.name} {category.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        ({product.reviews})
                      </span>
                    </div>

                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold">
                      Customize
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
              Load More Products
            </button>
          </div>
        </div>
      </section>

      {/* Related Categories */}
      <section className="py-16 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Explore Related Categories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCategories.map(relCat => {
              const RelIcon = relCat.icon
              return (
                <Link
                  key={relCat.id}
                  href={`/categories/${relCat.slug}`}
                  className="group bg-white rounded-2xl border-2 border-gray-100 p-8 hover:border-transparent hover:shadow-2xl transition-all duration-300"
                >
                  <div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${relCat.color} mb-4`}
                  >
                    <RelIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {relCat.name}
                  </h3>
                  <p className="text-gray-600 mb-1">{relCat.description}</p>
                  <p className="text-sm font-semibold text-purple-600">
                    {relCat.count}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
