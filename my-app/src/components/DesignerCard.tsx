import Link from "next/link";
import { Designer } from "@/data/designersData";
import { Star, Download, Heart, CheckCircle } from "lucide-react";

interface DesignerCardProps {
  designer: Designer;
}

export default function DesignerCard({ designer }: DesignerCardProps) {
  return (
    <Link href={`/designers/${designer.id}`}>
      <div className="group relative bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-transparent transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer">
        {/* Gradient Border Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur-sm"></div>

        <div className="relative bg-white rounded-2xl p-6">
          {/* Featured Badge */}
          {designer.featured && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <Star className="w-3 h-3 fill-current" />
              Featured
            </div>
          )}

          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-4">
            <div className="relative">
              {/* Gradient Ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>

              {/* Avatar */}
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img
                  src={designer.avatar}
                  alt={designer.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Verified Badge */}
              {designer.verified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-white shadow-lg">
                  <CheckCircle className="w-4 h-4 text-white fill-current" />
                </div>
              )}
            </div>

            {/* Name and Location */}
            <h3 className="text-xl font-bold text-gray-900 mt-4 mb-1 text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all">
              {designer.name}
            </h3>
            <p className="text-sm text-gray-500 mb-2">{designer.location}</p>

            {/* Specialty Tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              {designer.specialty.slice(0, 2).map((spec, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 rounded-full text-xs font-semibold border border-purple-200"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-gray-600 text-center mb-4 line-clamp-2 min-h-[40px]">
            {designer.bio}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-bold text-gray-900">
                  {designer.stats.rating}
                </span>
              </div>
              <p className="text-xs text-gray-500">Rating</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-sm font-bold text-gray-900">
                  {designer.stats.totalDesigns}
                </span>
              </div>
              <p className="text-xs text-gray-500">Designs</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
                <Download className="w-4 h-4" />
                <span className="text-sm font-bold text-gray-900">
                  {designer.stats.totalDownloads > 1000
                    ? `${(designer.stats.totalDownloads / 1000).toFixed(1)}k`
                    : designer.stats.totalDownloads}
                </span>
              </div>
              <p className="text-xs text-gray-500">Downloads</p>
            </div>
          </div>

          {/* View Profile Button */}
          <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center gap-2">
            View Portfolio
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
