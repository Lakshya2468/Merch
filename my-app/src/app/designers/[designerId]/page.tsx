"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCategoryModal from "@/components/ProductCategoryModal";
import { getDesignerById } from "@/data/designersData";
import { getDesignsByDesignerId } from "@/data/designsData";
import {
  MapPin,
  Calendar,
  Star,
  Download,
  Users,
  Palette,
  CheckCircle,
  Instagram,
  Twitter,
  Globe,
  Heart,
  TrendingUp,
} from "lucide-react";

export default function DesignerProfilePage() {
  const params = useParams();
  const designerId = params.designerId as string;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDesignId, setSelectedDesignId] = useState<number | null>(null);

  const designer = getDesignerById(designerId);
  const designs = getDesignsByDesignerId(designerId);

  const handleDesignClick = (designId: number) => {
    setSelectedDesignId(designId);
    setIsModalOpen(true);
  };

  if (!designer) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Designer Not Found
          </h1>
          <Link
            href="/designers"
            className="text-purple-600 hover:text-purple-700 font-semibold"
          >
            ← Back to Designers
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const joinedYear = new Date(designer.joinedDate).getFullYear();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Designer Profile */}
      <section className="relative py-16 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-400/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-400/30 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/designers"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors"
          >
            <span>←</span>
            <span className="font-semibold">Back to Designers</span>
          </Link>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-full opacity-75 animate-pulse"></div>
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <img
                    src={designer.avatar}
                    alt={designer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {designer.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2 border-4 border-white shadow-lg">
                    <CheckCircle className="w-6 h-6 text-white fill-current" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {designer.name}
                  </h1>
                  {designer.featured && (
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      <Star className="w-4 h-4 fill-current" />
                      Featured Designer
                    </span>
                  )}
                </div>

                {/* Specialty Tags */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                  {designer.specialty.map((spec, index) => (
                    <span
                      key={index}
                      className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold border border-white/30"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Location and Join Date */}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 text-white/90">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{designer.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Joined {joinedYear}</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-white/90 text-base md:text-lg mb-6 max-w-3xl">
                  {designer.bio}
                </p>

                {/* Social Links */}
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                  {designer.socialLinks.instagram && (
                    <a
                      href={designer.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      <Instagram className="w-4 h-4" />
                      <span className="text-sm font-semibold">Instagram</span>
                    </a>
                  )}
                  {designer.socialLinks.twitter && (
                    <a
                      href={designer.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      <Twitter className="w-4 h-4" />
                      <span className="text-sm font-semibold">Twitter</span>
                    </a>
                  )}
                  {designer.socialLinks.website && (
                    <a
                      href={designer.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      <Globe className="w-4 h-4" />
                      <span className="text-sm font-semibold">Website</span>
                    </a>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                    <div className="flex items-center justify-center gap-2 text-yellow-300 mb-1">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="text-2xl font-bold text-white">
                        {designer.stats.rating}
                      </span>
                    </div>
                    <p className="text-xs text-white/80 text-center">Rating</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Palette className="w-5 h-5 text-pink-300" />
                      <span className="text-2xl font-bold text-white">
                        {designer.stats.totalDesigns}
                      </span>
                    </div>
                    <p className="text-xs text-white/80 text-center">Designs</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Download className="w-5 h-5 text-blue-300" />
                      <span className="text-2xl font-bold text-white">
                        {designer.stats.totalDownloads > 1000
                          ? `${(designer.stats.totalDownloads / 1000).toFixed(
                              1
                            )}k`
                          : designer.stats.totalDownloads}
                      </span>
                    </div>
                    <p className="text-xs text-white/80 text-center">
                      Downloads
                    </p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Users className="w-5 h-5 text-purple-300" />
                      <span className="text-2xl font-bold text-white">
                        {designer.stats.followers > 1000
                          ? `${(designer.stats.followers / 1000).toFixed(1)}k`
                          : designer.stats.followers}
                      </span>
                    </div>
                    <p className="text-xs text-white/80 text-center">
                      Followers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section - Using FeaturedDesigns Style */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900">
              Portfolio ({designs.length} Designs)
            </h2>
          </div>

          {designs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {designs.map((design) => (
                <div
                  key={design.id}
                  onClick={() => handleDesignClick(design.id)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                >
                  {/* Design Preview with Color Palette */}
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
                              }% 0, ${(idx + 1) * 33}% 100%, ${
                                idx * 33
                              }% 100%)`,
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle favorite toggle here
                        }}
                        className="ml-auto bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                      >
                        <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
                      </button>
                    </div>

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDesignClick(design.id);
                        }}
                        className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                      >
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

                    {/* Title */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                        {design.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {design.description}
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
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border-2 border-gray-100">
              <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No designs yet
              </h3>
              <p className="text-gray-600">
                This designer hasn't uploaded any designs yet.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Product Category Modal */}
      {selectedDesignId !== null && (
        <ProductCategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          designId={selectedDesignId}
        />
      )}
    </div>
  );
}
