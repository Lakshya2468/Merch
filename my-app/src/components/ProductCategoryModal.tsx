"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { categories } from "./Categories";

interface ProductCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  designId: number;
}

export default function ProductCategoryModal({
  isOpen,
  onClose,
  designId,
}: ProductCategoryModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleCategorySelect = (categorySlug: string) => {
    // Navigate to product detail page with design and category
    router.push(`/product/${categorySlug}/${designId}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl transform transition-all">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          {/* Header */}
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Choose Your Product
            </h2>
            <p className="text-gray-600">
              Select which product you'd like to see this design on
            </p>
          </div>

          {/* Categories Grid */}
          <div className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.slug)}
                    className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 text-left overflow-hidden"
                  >
                    {/* Gradient Background on Hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div
                        className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} mb-4 transform group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      {/* Text */}
                      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {category.description}
                      </p>
                      <p className="text-xs text-purple-600 font-semibold mt-2">
                        {category.count}
                      </p>
                    </div>

                    {/* Arrow Indicator */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      <svg
                        className="w-5 h-5 text-purple-600"
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
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 rounded-b-3xl border-t border-gray-100">
            <p className="text-sm text-gray-600 text-center">
              Can't decide? You can always change the product later
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
