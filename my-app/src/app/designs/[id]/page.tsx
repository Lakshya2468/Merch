"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCategoryModal from "@/components/ProductCategoryModal";
import { getDesignById } from "@/data/designsData";
import {
  Heart,
  Download,
  Star,
  Share2,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import Image from "next/image";

export default function DesignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const designId = parseInt(params.id as string);
  const design = getDesignById(designId);

  const [selectedImage, setSelectedImage] = useState<
    "front" | "back" | "left" | "right"
  >("front");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  if (!design) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Design Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The design you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push("/designs")}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Designs
          </button>
        </div>
      </div>
    );
  }

  const imageViews = [
    { key: "front" as const, label: "Front View" },
    { key: "back" as const, label: "Back View" },
    { key: "left" as const, label: "Left Side" },
    { key: "right" as const, label: "Right Side" },
  ];

  const currentIndex = imageViews.findIndex(
    (view) => view.key === selectedImage
  );

  const handlePrevImage = () => {
    const prevIndex =
      currentIndex === 0 ? imageViews.length - 1 : currentIndex - 1;
    setSelectedImage(imageViews[prevIndex].key);
  };

  const handleNextImage = () => {
    const nextIndex =
      currentIndex === imageViews.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(imageViews[nextIndex].key);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => router.push("/designs")}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Designs
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{design.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image Gallery */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="w-full h-full rounded-xl shadow-2xl relative overflow-hidden">
                  {design.colors.map((color, idx) => (
                    <div
                      key={idx}
                      className="absolute inset-0 transition-transform duration-500"
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

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-6 h-6 text-gray-900" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-6 h-6 text-gray-900" />
              </button>

              {/* View Label */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium">
                {imageViews.find((v) => v.key === selectedImage)?.label}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {imageViews.map((view) => (
                <button
                  key={view.key}
                  onClick={() => setSelectedImage(view.key)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === view.key
                      ? "border-purple-600 ring-4 ring-purple-200"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-2">
                    <div className="w-full h-full rounded-lg relative overflow-hidden">
                      {design.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className="absolute inset-0"
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
                  {selectedImage === view.key && (
                    <div className="absolute inset-0 bg-purple-600/20 flex items-center justify-center">
                      <Check className="w-6 h-6 text-purple-600" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Design Information */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              {design.trending && (
                <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  <span>🔥</span>
                  <span>Trending</span>
                </div>
              )}
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {design.title}
              </h1>
              <p className="text-xl text-purple-600 font-bold">
                ${design.price}
              </p>
            </div>

            {/* Rating & Stats */}
            <div className="flex items-center space-x-6 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-900">
                  {design.rating}
                </span>
                <span className="text-gray-600 text-sm">(248 reviews)</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Download className="w-5 h-5" />
                <span className="text-sm">
                  {(design.downloads / 1000).toFixed(1)}K downloads
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {design.description}
              </p>
            </div>

            {/* Designer Info */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Designer
              </h3>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                  {design.designer.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">
                    {design.designer.name}
                  </h4>
                  <p className="text-sm text-gray-600">{design.designer.bio}</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {design.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Color Palette
              </h3>
              <div className="flex space-x-3">
                {design.colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center space-y-2"
                  >
                    <div
                      className="w-12 h-12 rounded-xl shadow-md border-2 border-white ring-2 ring-gray-200"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-xs text-gray-600 font-mono">
                      {color}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Materials */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Materials
              </h3>
              <p className="text-sm text-gray-600">{design.materials}</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Try This Design</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-xl border-2 transition-all ${
                    isFavorited
                      ? "bg-red-50 border-red-500 text-red-600"
                      : "bg-white border-gray-200 text-gray-700 hover:border-red-300"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorited ? "fill-red-600" : ""}`}
                  />
                  <span className="font-semibold">
                    {isFavorited ? "Saved" : "Save"}
                  </span>
                </button>

                <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-purple-300 transition-all">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Product Category Modal */}
      <ProductCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        designId={designId}
      />
    </div>
  );
}
