// WordPress REST API configuration
const isProduction = import.meta.env.PROD || window.location.hostname !== 'localhost';
const API_BASE_URL = isProduction ? null : 'http://floral-kingdom-headless.local/wp-json';

// WordPress REST API endpoints
export const ENDPOINTS = {
  TOURS: API_BASE_URL ? `${API_BASE_URL}/wp/v2/tours` : null,
  BOOKINGS: API_BASE_URL ? `${API_BASE_URL}/floral/v1/bookings` : null,
  CONTACT: API_BASE_URL ? `${API_BASE_URL}/floral/v1/contact` : null,
  MEDIA: API_BASE_URL ? `${API_BASE_URL}/wp/v2/media` : null
};

// Helper function to clean WordPress HTML content
const cleanWordPressContent = (content) => {
  if (!content) return '';
  
  // First, decode HTML entities
  const entityMap = {
    '&#8217;': "'",
    '&#8216;': "'", 
    '&#8220;': '"',
    '&#8221;': '"',
    '&#8211;': '-',
    '&#8212;': '—',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' '
  };
  
  let cleaned = content;
  
  // Replace HTML entities
  Object.keys(entityMap).forEach(entity => {
    cleaned = cleaned.replace(new RegExp(entity, 'g'), entityMap[entity]);
  });
  
  // Strip all HTML tags
  cleaned = cleaned.replace(/<[^>]*>/g, '');
  
  // Remove extra whitespace and empty paragraphs
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  return cleaned;
};

// Helper function to extract clean excerpt from content
const extractExcerpt = (content, maxLength = 200) => {
  const cleaned = cleanWordPressContent(content);
  if (cleaned.length <= maxLength) return cleaned;
  
  // Find the last complete word within the limit
  const truncated = cleaned.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
};

// Fetch all tours
export const fetchTours = async () => {
  // In production or when WordPress API is not available, use fallback data
  if (!ENDPOINTS.TOURS) {
    console.log('Using fallback tour data (production mode)');
    return getFallbackTours();
  }
  
  try {
    const response = await fetch(`${ENDPOINTS.TOURS}?_embed&per_page=20`);
    if (!response.ok) {
      throw new Error('Failed to fetch tours');
    }
    const tours = await response.json();
    
    // Transform WordPress data to match our component structure
    return tours.map(tour => {
      // Clean the title and content
      const cleanTitle = cleanWordPressContent(tour.title.rendered);
      
      // Get description from excerpt first, then content
      let description = '';
      if (tour.excerpt?.rendered) {
        description = cleanWordPressContent(tour.excerpt.rendered);
      } else if (tour.content?.rendered) {
        description = extractExcerpt(tour.content.rendered, 200);
      }
      
      return {
        id: tour.id,
        title: cleanTitle,
        description: description || 'Discover the beauty of Cape Town with this amazing tour experience.',
        content: cleanWordPressContent(tour.content.rendered),
        price: tour.acf?.tour_price || 'Contact for pricing',
        duration: tour.acf?.tour_duration || 'Full day',
        category: tour.acf?.tour_category || 'adventure',
        image: tour.featured_image_url || tour._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/pexels-taryn-elliott-4873264.jpg',
        imageUrl: tour.featured_image_url || tour._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/pexels-taryn-elliott-4873264.jpg', // Backup compatibility
        groupSize: 'Small Group',
        rating: '4.9',
        reviewCount: '127',
        gallery: tour.acf?.tour_gallery || [],
        itinerary: cleanWordPressContent(tour.acf?.tour_itinerary) || '',
        included: cleanWordPressContent(tour.acf?.tour_included) || '',
        whatToBring: cleanWordPressContent(tour.acf?.tour_bring) || '',
        meetingPoint: tour.acf?.meeting_point || 'V&A Waterfront, Cape Town',
        slug: tour.slug
      };
    });
  } catch (error) {
    console.error('Error fetching tours:', error);
    // Return fallback data if API fails
    return getFallbackTours();
  }
};

// Fetch single tour by ID
export const fetchTour = async (id) => {
  // In production or when WordPress API is not available, use fallback data
  if (!ENDPOINTS.TOURS) {
    console.log('Using fallback tour data for ID:', id);
    const fallbackTours = getFallbackTours();
    return fallbackTours.find(tour => tour.id == id) || fallbackTours[0];
  }
  
  try {
    const response = await fetch(`${ENDPOINTS.TOURS}/${id}?_embed`);
    if (!response.ok) {
      throw new Error('Failed to fetch tour');
    }
    const tour = await response.json();
    
    // Clean the title and content
    const cleanTitle = cleanWordPressContent(tour.title.rendered);
    
    // Get description from excerpt first, then content
    let description = '';
    if (tour.excerpt?.rendered) {
      description = cleanWordPressContent(tour.excerpt.rendered);
    } else if (tour.content?.rendered) {
      description = extractExcerpt(tour.content.rendered, 200);
    }
    
    return {
      id: tour.id,
      title: cleanTitle,
      description: description || 'Discover the beauty of Cape Town with this amazing tour experience.',
      content: cleanWordPressContent(tour.content.rendered),
      price: tour.acf?.tour_price || 'Contact for pricing',
      duration: tour.acf?.tour_duration || 'Full day',
      category: tour.acf?.tour_category || 'adventure',
      image: tour.featured_image_url || tour._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/pexels-taryn-elliott-4873264.jpg',
      imageUrl: tour.featured_image_url || tour._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/pexels-taryn-elliott-4873264.jpg', // Backup compatibility
      gallery: tour.acf?.tour_gallery || [],
      itinerary: cleanWordPressContent(tour.acf?.tour_itinerary) || '',
      included: cleanWordPressContent(tour.acf?.tour_included) || '',
      whatToBring: cleanWordPressContent(tour.acf?.tour_bring) || '',
      meetingPoint: tour.acf?.meeting_point || 'V&A Waterfront, Cape Town',
      groupSize: 'Small Group',
      rating: '4.9',
      reviewCount: '127',
      slug: tour.slug
    };
  } catch (error) {
    console.error('Error fetching tour:', error);
    return null;
  }
};

// Submit booking
export const submitBooking = async (bookingData) => {
  // In production, show demo message
  if (!ENDPOINTS.BOOKINGS) {
    return {
      success: true,
      message: 'Demo Mode: Booking request received! In the live version, this would be submitted to WordPress and you would receive email confirmation.',
      booking_id: 'DEMO_' + Date.now()
    };
  }
  
  try {
    const response = await fetch(ENDPOINTS.BOOKINGS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData)
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to submit booking');
    }
    
    return result;
  } catch (error) {
    console.error('Error submitting booking:', error);
    throw error;
  }
};

// Submit contact form
export const submitContact = async (contactData) => {
  // In production, show demo message
  if (!ENDPOINTS.CONTACT) {
    return {
      success: true,
      message: 'Demo Mode: Message received! In the live version, this would be sent via WordPress and you would receive email confirmation.'
    };
  }
  
  try {
    const response = await fetch(ENDPOINTS.CONTACT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData)
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to send message');
    }
    
    return result;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

// Fallback tours data (same as your current hardcoded data)
const getFallbackTours = () => [
  {
    id: 1,
    title: "Table Mountain Cable Car & City Tour",
    description: "Experience breathtaking panoramic views from the top of Table Mountain and explore Cape Town's vibrant city center.",
    price: "R850",
    duration: "4 hours",
    category: "adventure",
    image: "/pexels-taryn-elliott-4873264.jpg",
    imageUrl: "/pexels-taryn-elliott-4873264.jpg",
    groupSize: "Small Group",
    rating: "4.9",
    reviewCount: "147",
    itinerary: "Morning pickup → Table Mountain Cable Car → City Bowl tour → V&A Waterfront → Return",
    included: "Transportation, Cable car tickets, Professional guide",
    whatToBring: "Comfortable shoes, warm jacket, camera",
    meetingPoint: "V&A Waterfront, Cape Town"
  },
  {
    id: 2,
    title: "Cape Peninsula & Penguin Tour",
    description: "Journey along the scenic Chapman's Peak and visit the famous penguin colony at Boulders Beach.",
    price: "R1,200",
    duration: "Full day",
    category: "nature",
    image: "/pexels-taryn-elliott-6790337.jpg",
    imageUrl: "/pexels-taryn-elliott-6790337.jpg",
    groupSize: "Small Group",
    rating: "4.8",
    reviewCount: "203",
    itinerary: "Hout Bay → Seal Island boat trip → Chapman's Peak → Boulders Beach penguins → Cape Point → Wine tasting",
    included: "Transportation, Entrance fees, Boat trip, Wine tasting",
    whatToBring: "Sun hat, sunscreen, comfortable walking shoes",
    meetingPoint: "V&A Waterfront, Cape Town"
  },
  {
    id: 3,
    title: "Stellenbosch Wine Safari",
    description: "Discover world-class wines in the heart of South Africa's wine country with expert tastings and vineyard tours.",
    price: "R950",
    duration: "6 hours",
    category: "wine",
    image: "/pexels-taryn-elliott-7608000 (1).jpg",
    imageUrl: "/pexels-taryn-elliott-7608000 (1).jpg",
    groupSize: "Small Group",
    rating: "4.9",
    reviewCount: "184",
    itinerary: "Stellenbosch wine route → 3 wine estates → Cellar tours → Gourmet lunch → Franschhoek visit",
    included: "Transportation, Wine tastings, Gourmet lunch, Professional guide",
    whatToBring: "Comfortable clothes, designated driver mindset",
    meetingPoint: "Cape Town city center"
  }
];