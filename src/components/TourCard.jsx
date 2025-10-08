import { Link } from 'react-router-dom';
import { cleanHtmlContent } from '../utils/contentUtils';

function TourCard({ title, description, imageUrl, price = "From R899", duration = "Full Day", groupSize = "Small Group", rating = "4.9", reviewCount = "127", onBookNow, tour }) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200 transform hover:-translate-y-2 h-full flex flex-col">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={imageUrl || '/pexels-taryn-elliott-4873264.jpg'}
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            // Fallback to a default image if the main image fails to load
            if (e.target.src !== '/pexels-taryn-elliott-4873264.jpg') {
              e.target.src = '/pexels-taryn-elliott-4873264.jpg';
            } else {
              // If even the fallback fails, show placeholder
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }
          }}
        />
        {/* Fallback placeholder (hidden by default) */}
        <div 
          className="w-full h-64 bg-gradient-to-br from-purple-100 to-blue-100 items-center justify-center absolute top-0 left-0"
          style={{ display: 'none' }}
        >
          <span className="text-6xl opacity-50">🌺</span>
        </div>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Price badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-purple-600 font-semibold px-3 py-1 rounded-full text-sm">
          {price}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
          {title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {cleanHtmlContent(description)}
        </p>
        
        {/* Features */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            ⏱️ {duration}
          </span>
          <span className="flex items-center gap-1">
            👥 {groupSize}
          </span>
          <span className="flex items-center gap-1">
            📸 Photo Stops
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-auto">
          <button 
            onClick={() => onBookNow && onBookNow(tour || { title, description, imageUrl, price, duration, groupSize, rating, reviewCount })}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Book Now
          </button>
          <Link 
            to={`/tours/${tour?.id || 1}`}
            className="border border-gray-300 hover:border-purple-300 text-gray-700 hover:text-purple-600 py-2 px-4 rounded-lg font-medium transition-colors text-center"
          >
            Details
          </Link>
        </div>
      </div>

      {/* Rating */}
      <div className="px-6 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex text-yellow-400">
            ⭐⭐⭐⭐⭐
          </div>
          <span className="text-sm text-gray-500">({rating}) • {reviewCount} reviews</span>
        </div>
      </div>
    </div>
  );
}

export default TourCard;