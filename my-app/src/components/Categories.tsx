import { Award, Briefcase, Coffee, Heart, Shirt, Umbrella } from "lucide-react";
import Link from "next/link";

interface CategoriesProps {
  showTitle?: boolean;
  showDescription?: boolean;
  showViewAllButton?: boolean;
  limit?: number;
}

export const categories = [
  {
    id: 1,
    name: "T-Shirts",
    slug: "t-shirts",
    icon: Shirt,
    description: "Classic & Trendy Tees",
    color: "from-purple-500 to-pink-500",
    count: "2.5K+ Designs",
  },
  {
    id: 2,
    name: "Hoodies",
    slug: "hoodies",
    icon: Coffee,
    description: "Cozy & Stylish",
    color: "from-blue-500 to-cyan-500",
    count: "1.8K+ Designs",
  },
  {
    id: 3,
    name: "Accessories",
    slug: "accessories",
    icon: Umbrella,
    description: "Caps, Bags & More",
    color: "from-green-500 to-emerald-500",
    count: "950+ Items",
  },
  {
    id: 4,
    name: "Business",
    slug: "business",
    icon: Briefcase,
    description: "Corporate Merch",
    color: "from-orange-500 to-red-500",
    count: "600+ Items",
  },
  {
    id: 5,
    name: "Premium",
    slug: "premium",
    icon: Award,
    description: "Exclusive Collection",
    color: "from-yellow-500 to-orange-500",
    count: "450+ Designs",
  },
  {
    id: 6,
    name: "Custom",
    slug: "custom",
    icon: Heart,
    description: "Your Own Design",
    color: "from-pink-500 to-rose-500",
    count: "Unlimited",
  },
];

export default function Categories({
  showTitle = true,
  showDescription = true,
  showViewAllButton = true,
  limit,
}: CategoriesProps = {}) {
  const displayedCategories = limit ? categories.slice(0, limit) : categories;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {showTitle && (
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            {showDescription && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our wide range of customizable products. From everyday
                essentials to premium collections.
              </p>
            )}
          </div>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group relative bg-white rounded-2xl border-2 border-gray-100 p-8 hover:border-transparent hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  {/* Icon */}
                  <div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${category.color} transform group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-1">{category.description}</p>
                    <p className="text-sm font-semibold text-purple-600">
                      {category.count}
                    </p>
                  </div>

                  {/* Explore Arrow */}
                  <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Explore</span>
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Button */}
        {showViewAllButton && (
          <div className="text-center mt-12">
            <Link
              href="/categories"
              className="inline-flex items-center px-8 py-4 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              View All Categories
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
