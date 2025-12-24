'use client'

import { getAllDesigns } from '@/data/designsData'
import { Star, X } from 'lucide-react'
import { useState } from 'react'

interface DesignSelectorModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectDesign: (designId: number) => void
  currentDesignId?: number
}

export default function DesignSelectorModal({
  isOpen,
  onClose,
  onSelectDesign,
  currentDesignId
}: DesignSelectorModalProps) {
  const designs = getAllDesigns()
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  if (!isOpen) return null

  // Get unique categories
  const categories = [
    'All',
    ...Array.from(new Set(designs.map(d => d.category)))
  ]

  // Filter designs by category
  const filteredDesigns =
    selectedCategory === 'All'
      ? designs
      : designs.filter(d => d.category === selectedCategory)

  const handleSelectDesign = (designId: number) => {
    onSelectDesign(designId)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Choose a Design</h2>
              <p className="text-white/80 text-sm">
                Select from {filteredDesigns.length} available designs
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Category Filter */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-white text-purple-600'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Design Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDesigns.map(design => (
              <div
                key={design.id}
                onClick={() => handleSelectDesign(design.id)}
                className={`group relative bg-white border-2 rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:scale-105 ${
                  currentDesignId === design.id
                    ? 'border-purple-600 ring-4 ring-purple-200'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                {/* Design Preview */}
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
                  <div className="w-full h-full rounded-lg relative overflow-hidden shadow-lg">
                    {design.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="absolute inset-0"
                        style={{
                          backgroundColor: color,
                          clipPath: `polygon(${idx * 33}% 0, ${
                            (idx + 1) * 33
                          }% 0, ${(idx + 1) * 33}% 100%, ${idx * 33}% 100%)`
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Design Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                        {design.title}
                      </h3>
                      <p className="text-xs text-gray-600">
                        by {design.designer.name}
                      </p>
                    </div>
                    {currentDesignId === design.id && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-semibold">
                        Current
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-700">
                        {design.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({design.downloads})
                      </span>
                    </div>
                    <span className="text-lg font-bold text-purple-600">
                      ${design.price}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="mt-2">
                    <span className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {design.category}
                    </span>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                  <span className="text-white font-bold text-lg">
                    Select Design
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredDesigns.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No designs found in this category
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
