import TourCard from './components/TourCard';
import BookingForm from './components/BookingForm';
import ContactForm from './components/ContactForm';
import NewsletterSignup from './components/NewsletterSignup';
import { fetchTours } from './api/wordpress';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);


  useEffect(() => {
    const loadTours = async () => {
      setLoading(true);
      try {
        console.log('Fetching tours from WordPress API...');
        const toursData = await fetchTours();
        console.log('Tours data received:', toursData);
        setTours(toursData);
        setError(null);
      } catch (err) {
        console.error('Error loading tours:', err);
        setError('Failed to load tours. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadTours();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (tours.length > 3) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => 
          prev >= tours.length - 3 ? 0 : prev + 1
        );
      }, 4000); // Auto-advance every 4 seconds

      return () => clearInterval(interval);
    }
  }, [tours.length]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const openContactForm = () => setShowContactForm(true);
  const closeContactForm = () => setShowContactForm(false);
  
  const openNewsletterModal = () => setShowNewsletterModal(true);
  const closeNewsletterModal = () => setShowNewsletterModal(false);



  const handleBookNow = (tour) => {
    setSelectedTour(tour);
    setShowBookingForm(true);
  };

  const handleCloseBookingForm = () => {
    setShowBookingForm(false);
    setSelectedTour(null);
  };

  const handleBookingSubmit = async (bookingData) => {
    // TODO: Send booking data to WordPress API
    console.log('Booking submitted:', bookingData);
    
    // For now, just simulate API call
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-transparent backdrop-blur-sm absolute top-0 w-full z-50">
        <div className="w-full px-6 lg:px-12">
          <div className="flex justify-between items-center h-28">
            {/* Left: Enhanced Logo with Slogan */}
            <div className="flex items-center flex-shrink-0">
              <div className="flex items-center space-x-5">
                <div className="relative">
                  <img src="/floral-logo.png" alt="Floral Kingdom Tours" className="h-20 w-20 rounded-full shadow-lg border-2 border-white/30" />
                  <div className="absolute -top-1 -right-1 h-6 w-6 bg-purple-600 rounded-full animate-pulse"></div>
                </div>
                <div className="hidden md:block">
                  <p className="text-white/90 text-xl font-light italic drop-shadow-lg">Where every journey is a story waiting to be told</p>
                </div>
              </div>
            </div>

            {/* Center: Enhanced Navigation Menu */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-12">
              <div className="flex items-center space-x-12">
                <button onClick={() => scrollToSection('home')} className="btn-interactive px-8 py-4 rounded-xl text-xl font-semibold transition-all duration-300 text-white hover:text-purple-300 hover:bg-white/10 hover:shadow-md transform hover:scale-105">
                  Home
                </button>
                <button onClick={() => scrollToSection('about')} className="btn-interactive px-8 py-4 rounded-xl text-xl font-semibold transition-all duration-300 text-white hover:text-purple-300 hover:bg-white/10 hover:shadow-md transform hover:scale-105">
                  About Us
                </button>
                <button onClick={() => scrollToSection('tours')} className="btn-interactive px-8 py-4 rounded-xl text-xl font-semibold transition-all duration-300 text-white hover:text-purple-300 hover:bg-white/10 hover:shadow-md transform hover:scale-105">
                  Tours
                </button>
                <button onClick={openContactForm} className="btn-interactive px-8 py-4 rounded-xl text-xl font-semibold transition-all duration-300 text-white hover:text-purple-300 hover:bg-white/10 hover:shadow-md transform hover:scale-105">
                  Contact
                </button>
              </div>
            </div>

            {/* Right: Enhanced Social Media and CTA */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              {/* Enhanced Social Media Icons */}
              <div className="hidden md:flex items-center space-x-3">
                {/* X (Twitter) */}
                <a href="https://x.com/floralkingdom" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-purple-300 transition-all duration-300 p-3 rounded-full hover:bg-white/10 hover:shadow-md transform hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                
                {/* WhatsApp */}
                <a href="https://wa.me/27123456789" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-green-300 transition-all duration-300 p-3 rounded-full hover:bg-white/10 hover:shadow-md transform hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
                  </svg>
                </a>
                
                {/* Facebook */}
                <a href="https://facebook.com/floralkingdomtours" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-blue-300 transition-all duration-300 p-3 rounded-full hover:bg-white/10 hover:shadow-md transform hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a href="https://instagram.com/floralkingdomtours" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-pink-300 transition-all duration-300 p-3 rounded-full hover:bg-white/10 hover:shadow-md transform hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
              
              {/* Enhanced Call to Action Button */}
              <button 
                onClick={() => handleBookNow({ title: 'Select a Tour', description: 'Choose from our amazing tour options' })} 
                className="btn-interactive bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-4 rounded-xl text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
              >
                Book Now
              </button>

              {/* Enhanced Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden btn-interactive p-4 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Enhanced Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-100 py-4">
              <div className="flex flex-col space-y-3">
                <button 
                  onClick={() => {
                    scrollToSection('home');
                    setMobileMenuOpen(false);
                  }} 
                  className="btn-interactive px-6 py-3 text-left text-lg font-semibold text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300"
                >
                  Home
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('about');
                    setMobileMenuOpen(false);
                  }} 
                  className="btn-interactive px-6 py-3 text-left text-lg font-semibold text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300"
                >
                  About Us
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('tours');
                    setMobileMenuOpen(false);
                  }} 
                  className="btn-interactive px-6 py-3 text-left text-lg font-semibold text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300"
                >
                  Tours
                </button>
                <button 
                  onClick={() => {
                    openContactForm();
                    setMobileMenuOpen(false);
                  }} 
                  className="btn-interactive px-6 py-3 text-left text-lg font-semibold text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section 
        id="home" 
        className="hero-bg relative h-[75vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/25 z-10"></div>
        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow-lg drop-shadow-2xl">
            Welcome to Floral Kingdom Tours
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light opacity-95 drop-shadow-lg">
            Where every journey is a story waiting to be told.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollToSection('tours')} className="btn-interactive bg-white text-purple-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl hover:shadow-3xl">Start Your Adventure</button>
            <button onClick={() => scrollToSection('about')} className="btn-interactive border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-2xl">Learn Our Story</button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce cursor-pointer" onClick={() => scrollToSection('about')}>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center hover:border-gray-300 transition-colors">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      <section id="about" className="about-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Floral Kingdom Tours</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">Since 2018, we've been Cape Town's premier tour operator, crafting authentic experiences that showcase the Mother City's natural beauty, rich history, and vibrant culture. Every journey with us is more than just sightseeing—it's your personal story of discovery.</p>
          </div>
          
          {/* Company Story */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-16 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
                <p className="text-gray-700 mb-4">Founded by passionate locals who fell in love with Cape Town's magic, Floral Kingdom Tours was born from a simple belief: the best travel experiences come from authentic connections with people and places.</p>
                <p className="text-gray-700 mb-4">What started as weekend adventures sharing our favorite hidden spots with friends has grown into Cape Town's most trusted boutique tour company, serving over 15,000 happy travelers from around the globe.</p>
                <div className="flex items-center space-x-8 mt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">15,000+</div>
                    <div className="text-sm text-gray-600">Happy Travelers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">4.9★</div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">6</div>
                    <div className="text-sm text-gray-600">Years Excellence</div>
                  </div>
                </div>
              </div>
              <div className="h-80 bg-cover bg-center rounded-xl shadow-lg" style={{backgroundImage: "url('/pexels-pixabay-259463.jpg')"}}></div>
            </div>
          </div>
          
          {/* Enhanced About Content with Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-cover bg-center rounded-lg mb-4" style={{backgroundImage: "url('/pexels-jean-paul-wettstein-677916508-33618890.jpg')"}}></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Local Guides</h3>
              <p className="text-gray-700">Our certified guides are born-and-raised Cape Town locals who know every hidden gem, secret viewpoint, and authentic experience that makes our city special. From historical insights to the best local coffee spots.</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-cover bg-center rounded-lg mb-4" style={{backgroundImage: "url('/pexels-shalom-shore-408430-1077326.jpg')"}}></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Breathtaking Landscapes</h3>
              <p className="text-gray-700">From the iconic Table Mountain to pristine beaches, dramatic coastlines to world-class wine valleys—we'll take you to Cape Town's most spectacular locations with perfect timing for golden hour photography.</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-cover bg-center rounded-lg mb-4" style={{backgroundImage: "url('/pexels-firdevs-bars-2057421264-29645475.jpg')"}}></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cultural Authenticity</h3>
              <p className="text-gray-700">Experience the real Cape Town through meaningful cultural exchanges, traditional cuisine tastings, local artisan workshops, and stories that bring our diverse heritage to life.</p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Why Travelers Choose Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-purple-50 p-6 rounded-xl">
                <div className="text-3xl mb-3">🚐</div>
                <h4 className="font-semibold text-gray-900 mb-2">Luxury Transport</h4>
                <p className="text-sm text-gray-600">Air-conditioned vehicles with panoramic windows</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="text-3xl mb-3">👥</div>
                <h4 className="font-semibold text-gray-900 mb-2">Small Groups</h4>
                <p className="text-sm text-gray-600">Maximum 8 guests for personalized experiences</p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                <div className="text-3xl mb-3">📱</div>
                <h4 className="font-semibold text-gray-900 mb-2">24/7 Support</h4>
                <p className="text-sm text-gray-600">Always available for assistance and guidance</p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-xl">
                <div className="text-3xl mb-3">💎</div>
                <h4 className="font-semibold text-gray-900 mb-2">Premium Value</h4>
                <p className="text-sm text-gray-600">Luxury experiences at competitive prices</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tours" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Tours</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Embark on unforgettable journeys through South Africa's most breathtaking landscapes</p>
          </div>
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div>
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}
          {!loading && !error && tours.length > 0 && (
            <div className="relative">
              {/* Carousel Container */}
              <div className="overflow-hidden rounded-xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentSlide * (100 / 3)}%)` // Move by 1/3 for 3 items
                  }}
                >
                  {tours.slice(0, Math.min(12, tours.length)).map((tour) => (
                    <div 
                      key={tour.id} 
                      className="flex-shrink-0 px-4 w-1/3" // Always show 3 items
                    >
                      <TourCard
                        title={tour.title}
                        description={tour.description}
                        imageUrl={tour.image || tour.imageUrl}
                        price={tour.price}
                        duration={tour.duration}
                        groupSize={tour.groupSize || 'Small Group'}
                        rating={tour.rating || '4.9'}
                        reviewCount={tour.reviewCount || '127'}
                        tour={tour}
                        onBookNow={handleBookNow}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows - Show when more than 3 tours */}
              {tours.length > 3 && (
                <>
                  <button
                    onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                    disabled={currentSlide === 0}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10 group border border-gray-200"
                  >
                    <svg className="w-7 h-7 text-gray-700 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentSlide(Math.min(tours.length - 3, currentSlide + 1))}
                    disabled={currentSlide >= tours.length - 3}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10 group border border-gray-200"
                  >
                    <svg className="w-7 h-7 text-gray-700 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {tours.length > 3 && (
                <div className="flex justify-center mt-8 space-x-3">
                  {Array.from({ length: Math.max(1, tours.length - 2) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`transition-all duration-300 rounded-full ${
                        currentSlide === index 
                          ? 'bg-purple-600 w-10 h-3' 
                          : 'bg-gray-300 hover:bg-gray-400 w-3 h-3'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Carousel Progress Bar */}
              {tours.length > 3 && (
                <div className="mt-6">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${((currentSlide + 1) / (tours.length - 2)) * 100}%`
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>Tour {currentSlide + 1} of {tours.length - 2}</span>
                    <span>{tours.length} Total Tours</span>
                  </div>
                </div>
              )}

              {/* Show All Tours Button */}
              {tours.length > 3 && (
                <div className="text-center mt-8">
                  <button 
                    onClick={() => {
                      // Show all tours by expanding the view
                      const toursSection = document.getElementById('tours');
                      if (toursSection) {
                        // Create a full tours grid view
                        const allToursGrid = document.createElement('div');
                        allToursGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8';
                        allToursGrid.innerHTML = `
                          <div class="col-span-full text-center mb-8">
                            <h3 class="text-2xl font-bold text-gray-900">All Available Tours</h3>
                            <p class="text-gray-600">Discover all our amazing Cape Town experiences</p>
                          </div>
                        `;
                        // This would normally render all tour cards
                        alert('All tours page functionality would display a complete grid of all available tours. In a full implementation, this would navigate to /tours or expand the current view.');
                      }
                    }}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    View All {tours.length} Tours →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Stories from Our Travelers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Over 15,000 travelers have created unforgettable memories with us. Here are some of their stories.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative overflow-hidden rounded-2xl shadow-xl group">
              <div className="h-64 bg-cover bg-center" style={{backgroundImage: "url('/pexels-jonathanborba-13071834.jpg')"}}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-base mb-3">"Our Table Mountain cable car experience was absolutely breathtaking! The views were incredible, and our guide James knew all the best photo spots. A must-do in Cape Town!"</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-semibold">Sarah M.</p>
                    <p className="text-sm opacity-75">London, UK</p>
                  </div>
                  <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl shadow-xl group">
              <div className="h-64 bg-cover bg-center" style={{backgroundImage: "url('/pexels-piat-13549299.jpg')"}}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-base mb-3">"The wine tour to Stellenbosch exceeded all expectations. Amazing wines, beautiful scenery, and our guide Maria was so knowledgeable about local wine culture. Perfect day out!"</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-semibold">Michael R.</p>
                    <p className="text-sm opacity-75">Melbourne, Australia</p>
                  </div>
                  <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl shadow-xl group">
              <div className="h-64 bg-cover bg-center" style={{backgroundImage: "url('/pexels-taryn-elliott-6790337.jpg')"}}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-base mb-3">"The Cape Peninsula tour was the highlight of our South African adventure. Seeing the penguins at Boulders Beach and the dramatic coastline was magical. Thank you, Floral Kingdom!"</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-semibold">Emma & David</p>
                    <p className="text-sm opacity-75">Toronto, Canada</p>
                  </div>
                  <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-2xl font-bold text-purple-600">4.9/5</div>
                <div className="text-sm text-gray-600">TripAdvisor Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">95%</div>
                <div className="text-sm text-gray-600">Would Recommend</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">15,000+</div>
                <div className="text-sm text-gray-600">Happy Guests</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">6 Years</div>
                <div className="text-sm text-gray-600">In Business</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-bg relative py-20 overflow-hidden">
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for Your Adventure?</h2>
          <p className="text-xl mb-8 opacity-90">Let Floral Kingdom Tours be your gateway to the wonders of Cape Town</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handleBookNow({ title: 'Select a Tour', description: 'Choose from our amazing tour options' })}
              className="bg-white text-purple-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
            >
              Book Your Tour
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-2xl"
            >
              Contact Us
            </button>
            <button 
              onClick={openNewsletterModal}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-2xl"
            >
              Newsletter
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center">
                <img src="/floral-logo.png" alt="Floral Kingdom Tours" className="h-12 w-12 mr-3 rounded-full" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Floral Kingdom Tours
                </h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Discover the breathtaking beauty of Cape Town through authentic local experiences. 
                Where every journey becomes an unforgettable story.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-purple-300">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-purple-300 transition-colors duration-300 text-sm text-left">Home</button></li>
                <li><button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-purple-300 transition-colors duration-300 text-sm text-left">About Us</button></li>
                <li><button onClick={() => scrollToSection('tours')} className="text-gray-300 hover:text-purple-300 transition-colors duration-300 text-sm text-left">Our Tours</button></li>
                <li><button onClick={openContactForm} className="text-gray-300 hover:text-purple-300 transition-colors duration-300 text-sm text-left">Contact Us</button></li>
                <li><button onClick={() => handleBookNow({ title: 'Select a Tour', description: 'Choose from our amazing tour options' })} className="text-gray-300 hover:text-purple-300 transition-colors duration-300 text-sm text-left">Book Now</button></li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-purple-300">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-300 text-sm">V&A Waterfront, Suite 200<br />Cape Town, 8001<br />South Africa</p>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-purple-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <p className="text-gray-300 text-sm">+27 21 418 2369</p>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-purple-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <p className="text-gray-300 text-sm">hello@floralkingdomtours.co.za</p>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-purple-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2L3 7v11a2 2 0 002 2h4v-6a1 1 0 011-1h2a1 1 0 011 1v6h4a2 2 0 002-2V7l-7-5z"/>
                  </svg>
                  <p className="text-gray-300 text-sm">Open Daily: 7:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-purple-300">Stay Updated</h4>
              <div className="bg-gray-800 rounded-lg p-4">
                <NewsletterSignup isInline={true} />
              </div>
              <div className="flex space-x-4">
                <a href="https://x.com/floralkingdom" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-300 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://wa.me/27123456789" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
                  </svg>
                </a>
                <a href="https://facebook.com/floralkingdomtours" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://instagram.com/floralkingdomtours" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">&copy; 2025 Floral Kingdom Tours. All rights reserved.</p>
                <p className="text-gray-500 text-xs mt-1">Proudly South African • Licensed Tour Operator</p>
              </div>
              
              <div className="flex space-x-6 text-sm">
                <a href="/privacy" className="text-gray-400 hover:text-purple-300 transition-colors duration-300">Privacy Policy</a>
                <a href="/terms" className="text-gray-400 hover:text-purple-300 transition-colors duration-300">Terms of Service</a>
                <a href="/sitemap" className="text-gray-400 hover:text-purple-300 transition-colors duration-300">Sitemap</a>
              </div>
            </div>
            
            {/* Powered By Section */}
            <div className="border-t border-gray-800 mt-6 pt-6">
              <div className="flex justify-center items-center">
                <div className="flex items-center space-x-3 text-gray-500">
                  <span className="text-sm">Powered by:</span>
                  <a 
                    href="https://www.delitweb.co.za" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <img 
                      src="/delitweb-logo.png" 
                      alt="Delitweb" 
                      className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Form Modal */}
      {showBookingForm && selectedTour && (
        <BookingForm
          tour={selectedTour}
          onClose={handleCloseBookingForm}
          onSubmit={handleBookingSubmit}
        />
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactForm onClose={closeContactForm} />
      )}

      {/* Newsletter Modal */}
      {showNewsletterModal && (
        <NewsletterSignup onClose={closeNewsletterModal} />
      )}
    </div>
  );
}

export default App;
