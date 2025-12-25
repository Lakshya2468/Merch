"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllDesigns } from "@/data/designsData";
import {
  Palette,
  Edit,
  Trash2,
  Eye,
  Download,
  Star,
  TrendingUp,
  Plus,
  Search,
  Filter,
} from "lucide-react";
import Link from "next/link";

export default function MyDesignsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  // For demo purposes, we'll show all designs as "my designs"
  // In a real app, this would filter by the logged-in user
  const allDesigns = getAllDesigns();

  const filteredDesigns = allDesigns.filter((design) => {
    const matchesSearch =
      searchQuery === "" ||
      design.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filterCategory === "All" || design.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...new Set(allDesigns.map((d) => d.category))];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-400/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-400/30 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              My Design
              <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
              Manage, edit, and track the performance of your creative designs
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Palette className="w-5 h-5 text-pink-300" />
                <span className="text-2xl font-bold text-white">
                  {allDesigns.length}
                </span>
              </div>
              <p className="text-xs text-white/80 text-center">Total Designs</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Download className="w-5 h-5 text-blue-300" />
                <span className="text-2xl font-bold text-white">
                  {allDesigns
                    .reduce((sum, d) => sum + d.downloads, 0)
                    .toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-white/80 text-center">Downloads</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Star className="w-5 h-5 text-yellow-300 fill-current" />
                <span className="text-2xl font-bold text-white">
                  {(
                    allDesigns.reduce((sum, d) => sum + d.rating, 0) /
                    allDesigns.length
                  ).toFixed(1)}
                </span>
              </div>
              <p className="text-xs text-white/80 text-center">Avg Rating</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
              <div className="flex items-center justify-center gap-2 mb-1">
                <TrendingUp className="w-5 h-5 text-green-300" />
                <span className="text-2xl font-bold text-white">
                  {allDesigns.filter((d) => d.trending).length}
                </span>
              </div>
              <p className="text-xs text-white/80 text-center">Trending</p>
            </div>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="py-8 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search your designs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border-2 border-gray-200 focus:border-purple-400 focus:outline-none transition-all text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Filter and Add Button */}
            <div className="flex gap-3 w-full md:w-auto">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="flex-1 md:flex-none px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors text-gray-700 font-medium focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? "All Categories" : cat}
                  </option>
                ))}
              </select>

              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">New Design</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Designs Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-900">Your Designs</h2>
            </div>
            <p className="text-gray-600">
              <span className="font-semibold text-purple-600">
                {filteredDesigns.length}
              </span>{" "}
              {filteredDesigns.length === 1 ? "design" : "designs"}
            </p>
          </div>

          {filteredDesigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDesigns.map((design) => (
                <div
                  key={design.id}
                  className="group relative bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-transparent transition-all duration-300 hover:shadow-2xl"
                >
                  {/* Gradient Border Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur-sm"></div>

                  <div className="relative bg-white rounded-2xl overflow-hidden">
                    {/* Design Image */}
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <img
                        src={design.images.front}
                        alt={design.title}
                        className="w-full h-full object-cover"
                      />
                      {design.trending && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          Trending
                        </div>
                      )}
                    </div>

                    {/* Design Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900 flex-1">
                          {design.title}
                        </h3>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                          {design.category}
                        </span>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="font-bold text-gray-900">
                            {design.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-blue-500">
                          <Download className="w-4 h-4" />
                          <span className="font-bold text-gray-900">
                            {design.downloads}
                          </span>
                        </div>
                        <div className="text-lg font-bold text-purple-600 ml-auto">
                          ${design.price}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-3 gap-2">
                        <Link
                          href={`/product/${design.category.toLowerCase()}/${
                            design.id
                          }`}
                          className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-all duration-300 text-sm font-semibold"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="hidden sm:inline">View</span>
                        </Link>
                        <button className="flex items-center justify-center gap-1 px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-all duration-300 text-sm font-semibold">
                          <Edit className="w-4 h-4" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button className="flex items-center justify-center gap-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-all duration-300 text-sm font-semibold">
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-100">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No designs found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || filterCategory !== "All"
                  ? "Try adjusting your search or filter criteria"
                  : "Start creating your first design!"}
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create New Design
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
