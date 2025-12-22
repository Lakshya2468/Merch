import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  description?: string
  price: number
  stock: number
  imageUrl?: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-transparent hover:shadow-2xl transition-all duration-300"
    >
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative z-10">
        {/* Product Image */}
        <div className="relative aspect-square bg-gradient-to-br from-purple-100 to-blue-100 overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {/* Stock Badge */}
          {product.stock === 0 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg\">
              Out of Stock
            </div>
          )}
          {product.stock > 0 && product.stock <= 5 && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse\">
              Only {product.stock} left
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6 space-y-4\">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all\">
              {product.name}
            </h3>

            {product.description && (
              <p className="text-sm text-gray-600 line-clamp-2\">
                {product.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100\">
            <span className="text-2xl font-bold text-gray-900\">
              ${product.price.toFixed(2)}
            </span>

            {product.stock > 0 ? (
              <span className="text-xs font-semibold text-purple-600\">
                In Stock
              </span>
            ) : (
              <span className="text-xs font-semibold text-red-600\">
                Out of Stock
              </span>
            )}
          </div>

          {/* Explore Arrow */}
          <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform pt-2\">
            <span>View Details</span>
            <svg
              className="w-5 h-5 ml-2\"
              fill="none\"
              stroke="currentColor\"
              viewBox="0 0 24 24\"
            ></svg>
          </div>
        </div>
      </div>
    </Link>
  )
}
