'use client'

import DesignSelectorModal from '@/components/DesignSelectorModal'
import DesignVariationsPanel from '@/components/DesignVariationsPanel'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { getDesignById } from '@/data/designsData'
import {
  Check,
  CheckCircle2,
  ChevronLeft,
  FolderOpen,
  Heart,
  Image as ImageIcon,
  Info,
  RotateCcw,
  Share2,
  Shield,
  ShoppingCart,
  Truck,
  Upload,
  Wand2
} from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

type ViewType = 'front' | 'back' | 'left' | 'right'
type DesignMode = 'preselected' | 'custom'

export default function ProductCustomizerPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = params.category as string
  const designId = parseInt(params.designId as string)

  // Check if this is coming from designs page (preselected) or custom mode
  const fromDesigns = searchParams.get('from') === 'designs'
  // designId of 0 means no design selected (customize from scratch)
  const design = designId !== 0 ? getDesignById(designId) : null

  const [designMode, setDesignMode] = useState<DesignMode>(
    fromDesigns && design ? 'preselected' : 'custom'
  )
  const [selectedView, setSelectedView] = useState<ViewType>('front')
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('white')
  const [isFavorited, setIsFavorited] = useState(false)
  const [hasCustomDesign, setHasCustomDesign] = useState(false)
  const [isDesignSelectorOpen, setIsDesignSelectorOpen] = useState(false)

  // Track which variation is applied to each view
  const [viewVariations, setViewVariations] = useState<
    Record<ViewType, string>
  >(() => {
    // Initialize with first variation for each view if design has variations
    const firstVariationId = design?.variations?.[0]?.id || ''
    return {
      front: firstVariationId,
      back: firstVariationId,
      left: firstVariationId,
      right: firstVariationId
    }
  })

  // Determine if we have a design to show
  const hasDesign = designMode === 'preselected' && design

  // Get current variation for selected view
  const currentVariationId = viewVariations[selectedView]
  const currentVariation = design?.variations?.find(
    v => v.id === currentVariationId
  )

  // Handler for selecting a variation
  const handleSelectVariation = (variationId: string) => {
    setViewVariations(prev => ({
      ...prev,
      [selectedView]: variationId
    }))
  }

  const views: { key: ViewType; label: string; icon: string }[] = [
    { key: 'front', label: 'Front', icon: '👕' },
    { key: 'back', label: 'Back', icon: '🔙' },
    { key: 'left', label: 'Left', icon: '⬅️' },
    { key: 'right', label: 'Right', icon: '➡️' }
  ]

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const colors = [
    { name: 'white', hex: '#FFFFFF', label: 'White' },
    { name: 'black', hex: '#000000', label: 'Black' },
    { name: 'navy', hex: '#1E3A8A', label: 'Navy' },
    { name: 'red', hex: '#DC2626', label: 'Red' },
    { name: 'green', hex: '#059669', label: 'Green' },
    { name: 'gray', hex: '#6B7280', label: 'Gray' }
  ]

  const productName = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const basePrice = hasDesign ? design.price + 20 : 29.99

  const handleFileUpload = () => {
    // Simulate file upload
    setHasCustomDesign(true)
    setDesignMode('custom')
  }

  const handleLibrarySelect = () => {
    setIsDesignSelectorOpen(true)
  }

  const handleDesignSelect = (selectedDesignId: number) => {
    // Navigate to the same product with the new design
    router.push(`/product/${category}/${selectedDesignId}?from=designs`)
  }

  const handleAIGenerate = () => {
    // Navigate to AI generation
    alert('AI design generation coming soon!')
  }

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
                <h1 className="text-2xl font-bold">
                  {hasDesign ? 'Customize Your Design' : 'Create Custom Design'}
                </h1>
                <p className="text-white/80 text-sm">
                  {hasDesign
                    ? `Applying "${
                        design.title
                      }" to your ${productName.toLowerCase()}`
                    : `Design your perfect ${productName.toLowerCase()}`}
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
            {/* Design Status Banner */}
            {hasDesign && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-500 rounded-full">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">
                        Design Applied: {design.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        Your design is automatically positioned and ready to
                        customize
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setDesignMode('custom')}
                    className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-purple-300 transition-all text-sm font-semibold"
                  >
                    Change Design
                  </button>
                </div>
              </div>
            )}

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
                {views.map(view => (
                  <button
                    key={view.key}
                    onClick={() => setSelectedView(view.key)}
                    className={`relative p-4 rounded-xl border-2 transition-all ${
                      selectedView === view.key
                        ? 'border-purple-600 bg-purple-50 ring-4 ring-purple-200'
                        : 'border-gray-200 hover:border-purple-300 bg-white'
                    }`}
                  >
                    <div className="text-3xl mb-2">{view.icon}</div>
                    <div
                      className={`text-sm font-semibold ${
                        selectedView === view.key
                          ? 'text-purple-600'
                          : 'text-gray-600'
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
                    className="w-full h-full rounded-2xl shadow-xl flex items-center justify-center relative transition-all duration-300"
                    style={{
                      backgroundColor: colors.find(
                        c => c.name === selectedColor
                      )?.hex
                    }}
                  >
                    {/* Design Area */}
                    <div
                      className="w-2/3 h-2/3 rounded-xl border-4 border-dashed flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300"
                      style={{
                        borderColor:
                          hasDesign || hasCustomDesign
                            ? 'transparent'
                            : '#9CA3AF'
                      }}
                    >
                      {hasDesign && currentVariationId ? (
                        // Preselected Design Preview with Variation
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <div className="w-full h-full rounded-lg relative overflow-hidden shadow-lg">
                            {(currentVariation?.colors || design.colors).map(
                              (color, idx) => (
                                <div
                                  key={idx}
                                  className="absolute inset-0"
                                  style={{
                                    backgroundColor: color,
                                    clipPath: `polygon(${idx * 33}% 0, ${
                                      (idx + 1) * 33
                                    }% 0, ${(idx + 1) * 33}% 100%, ${
                                      idx * 33
                                    }% 100%)`
                                  }}
                                />
                              )
                            )}
                          </div>
                        </div>
                      ) : hasCustomDesign ? (
                        // Custom Design Preview
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <div className="w-full h-full rounded-lg bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 shadow-lg" />
                        </div>
                      ) : (
                        // Empty State - No Design
                        <div className="relative z-10 text-center">
                          <div className="mb-4 p-4 bg-gray-100 rounded-full inline-block">
                            <ImageIcon className="w-12 h-12 text-gray-400" />
                          </div>
                          <p className="text-lg font-bold text-gray-700 mb-2">
                            No Design Selected
                          </p>
                          <p className="text-sm text-gray-500 mb-4">
                            Upload, choose from library, or generate with AI
                          </p>
                          <button
                            onClick={handleFileUpload}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                          >
                            Add Design
                          </button>
                        </div>
                      )}
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
                  {views.find(v => v.key === selectedView)?.label} View
                </span>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Customization Options */}
          <div className="space-y-6">
            {/* Design Selection Section */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Design</h3>
                {(hasDesign || hasCustomDesign) && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                    Active
                  </span>
                )}
              </div>

              {hasDesign ? (
                // Preselected Design Info
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                        <div className="w-full h-full relative">
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
                                }% 100%)`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 mb-1">
                          {design.title}
                        </p>
                        <p className="text-xs text-gray-600 mb-2">
                          by {design.designer.name}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-purple-600">
                            ${design.price}
                          </span>
                          <span className="text-xs text-gray-500">
                            design fee
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setDesignMode('custom')
                      setHasCustomDesign(false)
                    }}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-purple-300 transition-all font-semibold"
                  >
                    Choose Different Design
                  </button>
                </div>
              ) : (
                // Custom Design Options
                <div className="space-y-3">
                  <button
                    onClick={handleFileUpload}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all group"
                  >
                    <Upload className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">Upload Design</span>
                  </button>

                  <button
                    onClick={handleLibrarySelect}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-purple-300 hover:shadow-md transition-all group"
                  >
                    <FolderOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">Choose from Library</span>
                  </button>

                  <button
                    onClick={handleAIGenerate}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Wand2 className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
                    <span className="font-semibold relative z-10">
                      Generate with AI
                    </span>
                    <span className="absolute top-1 right-1 text-xs bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full font-bold">
                      NEW
                    </span>
                  </button>

                  <div className="mt-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
                    <div className="flex items-start space-x-2">
                      <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          Design Guidelines
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Recommended: 4500 x 5400 pixels</li>
                          <li>• Formats: PNG, JPG, SVG</li>
                          <li>• Max file size: 10MB</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Design Variations Panel */}
            {hasDesign && design.variations && design.variations.length > 0 && (
              <DesignVariationsPanel
                variations={design.variations}
                selectedVariationId={currentVariationId}
                onSelectVariation={handleSelectVariation}
                currentView={selectedView}
                viewVariations={viewVariations}
              />
            )}

            {/* Product Info */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {hasDesign ? 'Selected Design' : 'Custom Design'}
                  </p>
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
                          ? 'fill-red-600 text-red-600'
                          : 'text-gray-600'
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
                  <span className="text-sm text-gray-500">
                    {hasDesign ? 'Total price' : 'Base price'}
                  </span>
                  <span className="ml-auto text-sm text-gray-400 line-through">
                    ${(basePrice + 10).toFixed(2)}
                  </span>
                </div>
                {hasDesign && (
                  <p className="text-xs text-gray-500 mt-1">
                    Includes ${design.price} design fee
                  </p>
                )}
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
                  {colors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`relative w-12 h-12 rounded-xl border-2 transition-all ${
                        selectedColor === color.name
                          ? 'border-purple-600 ring-4 ring-purple-200 scale-110'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor === color.name && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check
                            className={`w-6 h-6 ${
                              color.name === 'white'
                                ? 'text-gray-900'
                                : 'text-white'
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
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-xl border-2 font-semibold transition-all ${
                        selectedSize === size
                          ? 'bg-purple-600 border-purple-600 text-white'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-purple-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <button
                disabled={!hasDesign && !hasCustomDesign}
                className={`w-full flex items-center justify-center space-x-2 px-6 py-4 font-bold rounded-xl transition-all duration-300 mb-3 ${
                  hasDesign || hasCustomDesign
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-2xl transform hover:scale-105'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>
                  {hasDesign || hasCustomDesign
                    ? 'Add to Cart'
                    : 'Select Design First'}
                </span>
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

      <DesignSelectorModal
        isOpen={isDesignSelectorOpen}
        onClose={() => setIsDesignSelectorOpen(false)}
        onSelectDesign={handleDesignSelect}
        currentDesignId={design?.id}
      />

      <Footer />
    </div>
  )
}
