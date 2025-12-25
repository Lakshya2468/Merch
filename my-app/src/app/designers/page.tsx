"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DesignerCard from "@/components/DesignerCard";
import {
  getAllDesigners,
  getFeaturedDesigners,
  searchDesigners,
} from "@/data/designersData";
import {
  Search,
  Users,
  TrendingUp,
  Sparkles,
  Award,
  Palette,
} from "lucide-react";

const specialties = [
  "All Designers",
  "Abstract",
  "Retro",
  "Nature",
  "Street Art",
  "Space",
  "Minimal",
];

export default function DesignersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Designers");

  const allDesigners = getAllDesigners();
  const featuredDesigners = getFeaturedDesigners();

  // Filter designers based on search and specialty
  const filteredDesigners = allDesigners.filter((designer) => {
    const matchesSearch =
      searchQuery === "" ||
      designer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      designer.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      designer.specialty.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesSpecialty =
      selectedSpecialty === "All Designers" ||
      designer.specialty.some(
        (s) => s.toLowerCase() === selectedSpecialty.toLowerCase()
      );

    return matchesSearch && matchesSpecialty;
  });

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
          {/* Badge */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-semibold border border-white/30 shadow-lg">
              <Users className="w-3 h-3" />
              <span>Meet Our Talented Designers</span>
              <Sparkles className="w-3 h-3" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Discover Creative
              <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                Designers & Artists
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
              Browse portfolios from talented designers around the world. Find
              the perfect style for your custom merchandise.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400 z-10" />
                <input
                  type="text"
                  placeholder="Search designers by name, style, or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="relative w-full pl-12 pr-4 py-4 rounded-xl bg-white border-2 border-transparent focus:border-purple-400 focus:outline-none transition-all text-gray-900 placeholder-gray-400 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {allDesigners.length}+
                  </p>
                  <p className="text-sm text-gray-600">Talented Designers</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-orange-600 rounded-xl flex items-center justify-center">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {allDesigners.reduce(
                      (sum, d) => sum + d.stats.totalDesigns,
                      0
                    )}
                    +
                  </p>
                  <p className="text-sm text-gray-600">Unique Designs</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {featuredDesigners.length}
                  </p>
                  <p className="text-sm text-gray-600">Featured Artists</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`px-6 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedSpecialty === specialty
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl transform scale-105 ring-4 ring-purple-200"
                    : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg hover:scale-105"
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Designers Section */}
      {selectedSpecialty === "All Designers" && searchQuery === "" && (
        <section className="py-12 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Designers
              </h2>
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredDesigners.map((designer) => (
                <DesignerCard key={designer.id} designer={designer} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Designers Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-900">
                {selectedSpecialty === "All Designers"
                  ? "All Designers"
                  : `${selectedSpecialty} Designers`}
              </h2>
            </div>
            <p className="text-gray-600">
              <span className="font-semibold text-purple-600">
                {filteredDesigners.length}
              </span>{" "}
              {filteredDesigners.length === 1 ? "designer" : "designers"} found
            </p>
          </div>

          {filteredDesigners.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDesigners.map((designer) => (
                <DesignerCard key={designer.id} designer={designer} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No designers found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSpecialty("All Designers");
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
