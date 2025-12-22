import { Download, Heart, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { getAllDesigns } from "@/data/designsData";

const featuredDesigns = getAllDesigns();

export default function FeaturedDesigns() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Trending Now</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Designs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover unique designs created by talented artists from around the
            world.
          </p>
        </div>

        {/* Designs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDesigns.map((design) => (
            <Link
              key={design.id}
              href={`/designs/${design.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Design Preview */}
              <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 p-8">
                {/* Color palette preview */}
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="w-full h-full rounded-xl shadow-lg relative overflow-hidden">
                    {design.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                        style={{
                          backgroundColor: color,
                          clipPath: `polygon(${idx * 33}% 0, ${
                            (idx + 1) * 33
                          }% 0, ${(idx + 1) * 33}% 100%, ${idx * 33}% 100%)`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  {design.trending && (
                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>Trending</span>
                    </span>
                  )}
                  <button className="ml-auto bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
                  </button>
                </div>

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Quick View
                  </button>
                </div>
              </div>

              {/* Design Info */}
              <div className="p-6 space-y-3">
                {/* Category */}
                <div className="text-sm text-purple-600 font-semibold">
                  {design.category}
                </div>

                {/* Title & Designer */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                    {design.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    by {design.designer.name}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{design.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="w-4 h-4" />
                      <span>{(design.downloads / 1000).toFixed(1)}K</span>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-purple-600">
                    ${design.price}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/designs"
            className="inline-flex items-center px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Browse All Designs
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
      </div>
    </section>
  );
}
