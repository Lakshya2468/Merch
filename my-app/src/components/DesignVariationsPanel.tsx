'use client'

import { Layers, Sparkles } from 'lucide-react'

type ViewType = 'front' | 'back' | 'left' | 'right'

interface DesignVariation {
  id: string
  name: string
  description: string
  colors: string[]
}

interface DesignVariationsPanelProps {
  variations: DesignVariation[]
  selectedVariationId: string
  onSelectVariation: (variationId: string) => void
  currentView: ViewType
  viewVariations: Record<ViewType, string>
}

export default function DesignVariationsPanel({
  variations,
  selectedVariationId,
  onSelectVariation,
  currentView,
  viewVariations
}: DesignVariationsPanelProps) {
  if (!variations || variations.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Layers className="w-5 h-5 text-purple-600" />
          <h3 className="font-bold text-gray-900">Design Variations</h3>
        </div>
        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-semibold">
          {variations.length} Available
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Select a variation to apply to the{' '}
        <span className="font-semibold capitalize">{currentView}</span> view
      </p>

      {/* Variations Grid */}
      <div className="space-y-3">
        {variations.map(variation => {
          const isSelected = selectedVariationId === variation.id
          const appliedToViews = Object.entries(viewVariations)
            .filter(([_, varId]) => varId === variation.id)
            .map(([view]) => view)

          return (
            <button
              key={variation.id}
              onClick={() => onSelectVariation(variation.id)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all group ${
                isSelected
                  ? 'border-purple-600 bg-purple-50 ring-4 ring-purple-200'
                  : 'border-gray-200 hover:border-purple-300 bg-white hover:shadow-md'
              }`}
            >
              <div className="flex items-start space-x-3">
                {/* Color Preview */}
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                  <div className="w-full h-full relative">
                    {variation.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="absolute inset-0"
                        style={{
                          backgroundColor: color,
                          clipPath: `polygon(${
                            idx * (100 / variation.colors.length)
                          }% 0, ${
                            (idx + 1) * (100 / variation.colors.length)
                          }% 0, ${
                            (idx + 1) * (100 / variation.colors.length)
                          }% 100%, ${
                            idx * (100 / variation.colors.length)
                          }% 100%)`
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Variation Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h4
                      className={`font-bold text-sm ${
                        isSelected
                          ? 'text-purple-600'
                          : 'text-gray-900 group-hover:text-purple-600'
                      } transition-colors`}
                    >
                      {variation.name}
                    </h4>
                    {isSelected && (
                      <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full font-semibold">
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-2">
                    {variation.description}
                  </p>

                  {/* Applied to views indicator */}
                  {appliedToViews.length > 0 && (
                    <div className="flex items-center space-x-1 flex-wrap gap-1">
                      <span className="text-xs text-gray-500">Applied to:</span>
                      {appliedToViews.map(view => (
                        <span
                          key={view}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full capitalize"
                        >
                          {view}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Info Box */}
      <div className="mt-4 p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
        <div className="flex items-start space-x-2">
          <Sparkles className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-700">
            <span className="font-semibold">Tip:</span> Switch between views
            (Front, Back, Left, Right) to apply different variations to each
            side of your product.
          </p>
        </div>
      </div>
    </div>
  )
}
