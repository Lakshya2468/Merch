"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FeaturedDesigns from "@/components/FeaturedDesigns";
import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Users,
  Palette,
  Star,
} from "lucide-react";

const designCategories = [
  { id: "all", name: "All Designs", icon: Palette },
  { id: "abstract", name: "Abstract", icon: Sparkles },
  { id: "retro", name: "Retro", icon: Star },
  { id: "nature", name: "Nature", icon: Sparkles },
  { id: "street-art", name: "Street Art", icon: TrendingUp },
  { id: "space", name: "Space", icon: Sparkles },
  { id: "minimal", name: "Minimal", icon: Star },
];

const stats = [
  { label: "Total Designs", value: "10,000+", icon: Palette },
  { label: "Artists", value: "500+", icon: Users },
  { label: "Categories", value: "50+", icon: Sparkles },
];

export default function DesignsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Enhanced Gradients */}
      <section className="relative py-16 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-400/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-400/30 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Trending Badge */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-semibold border border-white/30 shadow-lg">
              <TrendingUp className="w-3 h-3" />
              <span>New Designs Added Daily</span>
              <Sparkles className="w-3 h-3" />
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Explore Amazing
              <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                Creative Designs
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
              Discover unique designs created by talented artists from around
              the world. Find the perfect design for your custom merchandise.
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400 z-10" />
                <input
                  type="text"
                  placeholder="Search for designs, artists, or styles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="relative w-full pl-12 pr-4 py-4 rounded-xl bg-white border-2 border-transparent focus:border-purple-400 focus:outline-none transition-all text-gray-900 placeholder-gray-400 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Pills with Icons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {designCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group px-6 py-3.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl transform scale-105 ring-4 ring-purple-200"
                      : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg hover:scale-105"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:rotate-12 ${
                      selectedCategory === category.id
                        ? "text-white"
                        : "text-purple-500"
                    }`}
                  />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Enhanced Filter & Sort Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-gray-900">Showing:</span>
              <span className="text-purple-600 font-medium">
                All trending designs
              </span>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-xl transition-all duration-300 font-semibold transform hover:scale-105">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Advanced Filters</span>
              </button>
              <select className="px-5 py-2.5 bg-white border-2 border-gray-200 rounded-lg hover:border-purple-300 transition-colors text-gray-700 font-medium focus:outline-none focus:border-purple-500 cursor-pointer">
                <option>Sort: Trending</option>
                <option>Sort: Newest</option>
                <option>Sort: Popular</option>
                <option>Sort: Price: Low to High</option>
                <option>Sort: Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Designs Section */}
      <div className="bg-gradient-to-b from-white via-gray-50 to-white">
        <FeaturedDesigns />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
