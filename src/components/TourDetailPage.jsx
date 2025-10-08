import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchTour } from '../api/wordpress';
import { useDocumentTitle } from '../utils/documentTitle';

function TourDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Update document title when tour data loads
  useDocumentTitle(tour?.title);



  useEffect(() => {
    const loadTour = async () => {
      setLoading(true);
      try {
        console.log('Fetching tour from WordPress API, ID:', id);
        const tourData = await fetchTour(id);
        
        if (tourData) {
          // Transform the data to match the expected structure
          const transformedTour = {
            ...tourData,
            fullDescription: tourData.content || tourData.description,
            imageUrl: tourData.image,
            groupSize: 'Small Group',
            rating: '4.9',
            reviewCount: '127',
            highlights: tourData.included ? tourData.included.split('\n') : [
              'Professional guide included',
              'Hotel transfers',
              'All entrance fees',
              'Small group experience'
            ],
            included: tourData.included ? tourData.included.split('\n') : [
              'Professional guide',
              'Hotel transfers',
              'All entrance fees'
            ],
            notIncluded: [
              'Meals and drinks',
              'Personal expenses',
              'Gratuities'
            ],
            itinerary: tourData.itinerary ? tourData.itinerary.split('\n').map((item, index) => ({
              time: `${9 + Math.floor(index * 1.5)}:${index * 30 % 60 === 0 ? '00' : '30'}`,
              activity: item
            })) : [
              { time: '09:00', activity: 'Hotel pickup and tour briefing' },
              { time: '10:00', activity: 'Main tour activity begins' },
              { time: '12:00', activity: 'Lunch break (own expense)' },
              { time: '14:00', activity: 'Afternoon activities' },
              { time: '16:00', activity: 'Return journey' },
              { time: '17:00', activity: 'Hotel drop-off' }
            ],
            galleryImages: tourData.gallery && tourData.gallery.length > 0 
              ? tourData.gallery 
              : [tourData.image, tourData.image, tourData.image]
          };
          setTour(transformedTour);
        } else {
          console.log('Tour not found, loading fallback data');
          // Fallback data if tour not found
          setTour({
            id: parseInt(id),
            title: 'Cape Town Tour Experience',
            description: 'Discover the beauty of Cape Town with our expert guides.',
            fullDescription: 'Join us for an unforgettable Cape Town experience...',
            imageUrl: '/pexels-taryn-elliott-4873264.jpg',
            price: 'From R899',
            duration: 'Full Day',
            groupSize: 'Small Group',
            rating: '4.9',
            reviewCount: '127',
            highlights: ['Professional guide', 'Hotel transfers', 'Entrance fees'],
            included: ['Professional guide', 'Hotel transfers', 'All entrance fees'],
            notIncluded: ['Meals', 'Personal expenses', 'Gratuities'],
            itinerary: [
              { time: '09:00', activity: 'Hotel pickup' },
              { time: '10:00', activity: 'Tour activities' },
              { time: '17:00', activity: 'Return to hotel' }
            ],
            galleryImages: [
              '/pexels-taryn-elliott-4873264.jpg',
              '/pexels-shalom-shore-408430-1077326.jpg',
              '/pexels-jean-paul-wettstein-677916508-33618890.jpg'
            ]
          });
        }
      } catch (error) {
        console.error('Error loading tour:', error);
        // Load fallback tour on error
        setTour({
          id: parseInt(id),
          title: 'Cape Town Tour Experience',
          description: 'Discover the beauty of Cape Town with our expert guides.',
          fullDescription: 'Join us for an unforgettable Cape Town experience...',
          imageUrl: '/pexels-taryn-elliott-4873264.jpg',
          price: 'From R899',
          duration: 'Full Day',
          groupSize: 'Small Group',
          rating: '4.9',
          reviewCount: '127',
          highlights: ['Professional guide', 'Hotel transfers', 'Entrance fees'],
          included: ['Professional guide', 'Hotel transfers', 'All entrance fees'],
          notIncluded: ['Meals', 'Personal expenses', 'Gratuities'],
          itinerary: [
            { time: '09:00', activity: 'Hotel pickup' },
            { time: '10:00', activity: 'Tour activities' },
            { time: '17:00', activity: 'Return to hotel' }
          ],
          galleryImages: [
            '/pexels-taryn-elliott-4873264.jpg',
            '/pexels-shalom-shore-408430-1077326.jpg',
            '/pexels-jean-paul-wettstein-677916508-33618890.jpg'
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    loadTour();
  }, [id]);

  const handleBookNow = () => {
    // In a real app, this would trigger the booking modal
    alert('Booking functionality would be implemented here');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tour Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{backgroundImage: `url('${tour.imageUrl}')`}}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <button 
              onClick={() => navigate('/')}
              className="mb-4 text-white/80 hover:text-white transition-colors"
            >
              ← Back to Tours
            </button>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{tour.title}</h1>
            <p className="text-xl opacity-90">{tour.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Overview */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Tour Overview</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                {tour.fullDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Highlights */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Tour Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tour.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Itinerary */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Detailed Itinerary</h2>
              <div className="space-y-4">
                {tour.itinerary.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-16 text-sm font-semibold text-purple-600">
                      {item.time}
                    </div>
                    <div className="text-gray-700">{item.activity}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* What's Included */}
            <section className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-green-600 mb-4">✓ What's Included</h3>
                  <ul className="space-y-2">
                    {tour.included.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-600 mb-4">✗ What's Not Included</h3>
                  <ul className="space-y-2">
                    {tour.notIncluded.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Booking Card */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 mb-8">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{tour.price}</div>
                  <div className="text-gray-500">per person</div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">{tour.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Group Size:</span>
                    <span className="font-semibold">{tour.groupSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center space-x-1">
                      <span className="font-semibold">{tour.rating}</span>
                      <span className="text-yellow-400">★</span>
                      <span className="text-gray-500">({tour.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleBookNow}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Book This Tour Now
                </button>
                
                <p className="text-sm text-gray-500 text-center mt-3">
                  Free cancellation up to 24 hours before tour
                </p>
              </div>

              {/* Contact Card */}
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help Planning?</h3>
                <p className="text-gray-600 mb-4">Our local experts are here to help customize your perfect Cape Town experience.</p>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors">
                  Contact Our Experts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourDetailPage;