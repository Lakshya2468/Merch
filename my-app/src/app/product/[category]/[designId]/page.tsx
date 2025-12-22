"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDesignById } from "@/data/designsData";
import {
  Heart,
  Share2,
  ShoppingCart,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Check,
  ChevronLeft,
  Info,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";

type ViewType = "front" | "back" | "left" | "right";

export default function ProductCustomizerPage() {
  const params = useParams();
  const router = useRouter();
  const category = params.category as string;
  const designId = parseInt(params.designId as string);
  const design = getDesignById(designId);

  const [selectedView, setSelectedView] = useState<ViewType>("front");
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("white");
  const [isFavorited, setIsFavorited] = useState(false);

  if (!design) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
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

  const views: { key: ViewType; label: string; icon: any }[] = [
    { key: "front", label: "Front", icon: "👕" },
    { key: "back", label: "Back", icon: "🔙" },
    { key: "left", label: "Left", icon: "⬅️" },
    { key: "right", label: "Right", icon: "➡️" },
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = [
    { name: "white", hex: "#FFFFFF", label: "White" },
    { name: "black", hex: "#000000", label: "Black" },
    { name: "navy", hex: "#1E3A8A", label: "Navy" },
    { name: "red", hex: "#DC2626", label: "Red" },
    { name: "green", hex: "#059669", label: "Green" },
    { name: "gray", hex: "#6B7280", label: "Gray" },
  ];

  const productName = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const basePrice = design.price + 20;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Product Customizer</h1>
                <p className="text-white/80 text-sm">
                  Design your perfect {productName.toLowerCase()}
                </p>
              </div>
            </div>
            <button className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors font-semibold">
              Autosaved ✓
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - View Selector */}
          <div className="lg:col-span-2 space-y-6">
            {/* View Tabs */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">VIEWS</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Viewing:</span>
                  <span className="font-semibold text-purple-600 capitalize">
                    {selectedView}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {views.map((view) => (
                  <button
                    key={view.key}
                    onClick={() => setSelectedView(view.key)}
                    className={`relative p-4 rounded-xl border-2 transition-all ${
                      selectedView === view.key
                        ? "border-purple-600 bg-purple-50 ring-4 ring-purple-200"
                        : "border-gray-200 hover:border-purple-300 bg-white"
                    }`}
                  >
                    <div className="text-3xl mb-2">{view.icon}</div>
                    <div
                      className={`text-sm font-semibold ${
                        selectedView === view.key
                          ? "text-purple-600"
                          : "text-gray-600"
                      }`}
                    >
                      {view.label}
                    </div>
                    {selectedView === view.key && (
                      <div className="absolute top-2 right-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Preview */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200 p-8">
              <div className="relative aspect-square bg-white rounded-xl shadow-2xl flex items-center justify-center overflow-hidden">
                {/* Product Mockup */}
                <div className="relative w-full h-full p-12">
                  <div
                    className="w-full h-full rounded-2xl shadow-xl flex items-center justify-center relative"
                    style={{
                      backgroundColor: colors.find(
                        (c) => c.name === selectedColor
                      )?.hex,
                    }}
                  >
                    {/* Design Upload Area */}
                    <div className="w-2/3 h-2/3 bg-gray-200 rounded-xl border-4 border-dashed border-gray-400 flex flex-col items-center justify-center relative overflow-hidden">
                      {/* Design Preview */}
                      <div className="absolute inset-0 flex items-center justify-center p-4">
                        <div className="w-full h-full rounded-lg relative overflow-hidden">
                          {design.colors.map((color, idx) => (
                            <div
                              key={idx}
                              className="absolute inset-0"
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

                      {/* Upload Overlay */}
                      <div className="relative z-10 text-center">
                        <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 font-medium">
                          Upload your design
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Zoom Controls */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
                    <span className="text-sm font-semibold">100%</span>
                  </button>
                </div>
              </div>

              {/* View Label */}
              <div className="mt-4 text-center">
                <span className="inline-block px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-semibold text-gray-700">
                  {views.find((v) => v.key === selectedView)?.label} View
                </span>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Customization Options */}
          <div className="space-y-6">
            {/* Design Upload Section */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Design</h3>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all">
                  <Upload className="w-5 h-5" />
                  <span className="font-semibold">Upload</span>
                </button>

                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-purple-300 transition-all">
                  <ImageIcon className="w-5 h-5" />
                  <span className="font-semibold">Library</span>
                </button>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200 text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-white rounded-full">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  Click to upload
                </p>
                <p className="text-xs text-gray-600">PNG, JPG, SVG</p>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-2">
                  <Sparkles className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-blue-900">
                    AI generation coming soon
                  </p>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Custom Design</p>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Premium Cotton {productName}
                  </h2>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsFavorited(!isFavorited)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isFavorited
                          ? "fill-red-600 text-red-600"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ${basePrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">Base price</span>
                  <span className="ml-auto text-sm text-gray-400 line-through">
                    ${(basePrice + 10).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-900">Color</h3>
                  <span className="text-sm text-gray-600 capitalize">
                    {selectedColor}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`relative w-12 h-12 rounded-xl border-2 transition-all ${
                        selectedColor === color.name
                          ? "border-purple-600 ring-4 ring-purple-200 scale-110"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor === color.name && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check
                            className={`w-6 h-6 ${
                              color.name === "white"
                                ? "text-gray-900"
                                : "text-white"
                            }`}
                          />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-900">Size</h3>
                  <button className="text-sm text-purple-600 font-semibold hover:text-purple-700 flex items-center space-x-1">
                    <span>Size guide</span>
                    <Info className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-xl border-2 font-semibold transition-all ${
                        selectedSize === size
                          ? "bg-purple-600 border-purple-600 text-white"
                          : "bg-white border-gray-200 text-gray-700 hover:border-purple-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <button className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 mb-3">
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>

              <p className="text-center text-sm text-gray-600">
                Free shipping on orders over $50
              </p>
            </div>

            {/* Features */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Why Choose Us</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded-lg">
                    <Truck className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Free Shipping
                    </p>
                    <p className="text-xs text-gray-600">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded-lg">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Quality Guarantee
                    </p>
                    <p className="text-xs text-gray-600">Premium materials</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded-lg">
                    <RotateCcw className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Easy Returns
                    </p>
                    <p className="text-xs text-gray-600">30-day policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
