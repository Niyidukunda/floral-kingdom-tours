# Floral Kingdom Tours - Headless CMS Tourism Website

A modern, full-stack tourism website built with a headless CMS architecture, featuring WordPress as the backend content management system and React as the frontend framework. This professional tourism platform showcases Cape Town tours and experiences with a seamless booking system.

## Architecture Overview

This project implements a **headless CMS architecture** that separates content management from presentation:

- **Backend (CMS)**: WordPress with custom REST API endpoints
- **Frontend**: React SPA with responsive design
- **Deployment**: Vercel with automatic CI/CD from GitHub
- **API Integration**: RESTful communication between WordPress and React

## Live Demo

**Production Site**: [https://floral-kingdom-tours.vercel.app](https://floral-kingdom-tours.vercel.app)

## Technology Stack

### Frontend Technologies
- **React 19.1.1** - Modern UI library with hooks and components
- **Vite 7.1.6** - Lightning-fast build tool and dev server
- **Tailwind CSS 3.4.0** - Utility-first CSS framework with custom configuration
- **React Router DOM** - Client-side routing for SPA navigation
- **JavaScript ES6+** - Modern JavaScript features and syntax

### Backend Technologies
- **WordPress 6.x** - Headless CMS with custom post types
- **PHP 8.x** - Server-side logic and custom API endpoints
- **WordPress REST API** - Custom endpoints for tours and bookings
- **Advanced Custom Fields (ACF)** - Structured content management
- **MySQL/MariaDB** - Database for content and bookings

### Development & Deployment
- **Git & GitHub** - Version control and collaboration
- **Vercel** - Serverless deployment platform with automatic builds
- **Local by Flywheel** - Local WordPress development environment
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing and optimization

## Features

### Core Functionality
- **Tour Showcase**: Dynamic tour listings with rich media content
- **Booking System**: Complete reservation flow with form validation
- **Contact Forms**: Customer inquiry and support system
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Meta tags, structured data, and performance optimization

### User Experience
- **Interactive Carousel**: Featured tours with auto-play and navigation
- **Modal Forms**: Booking and contact forms with smooth animations
- **Loading States**: Professional loading indicators and error handling
- **Progressive Enhancement**: Graceful degradation for offline functionality

### Technical Features
- **Environment Detection**: Automatic API switching between development and production
- **Fallback Data**: Demo content when WordPress API is unavailable
- **Custom WordPress Endpoints**: `/floral/v1/tours`, `/floral/v1/bookings`, `/floral/v1/contact`
- **CORS Configuration**: Secure cross-origin resource sharing
- **Performance Optimization**: Code splitting and lazy loading

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- WordPress local development environment
- Git for version control

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/Niyidukunda/floral-kingdom-tours.git
cd floral-kingdom-tours

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### WordPress Backend Setup
1. **Install WordPress** locally (using Local by Flywheel or similar)
2. **Activate required plugins**: Advanced Custom Fields (ACF)
3. **Import custom functions**: Add the custom `functions.php` code for API endpoints
4. **Configure custom post types**: Tours and Bookings post types
5. **Set up CORS**: Configure headers for frontend-backend communication

## Project Structure

```
floral-frontend/
├── public/                     # Static assets and images
│   ├── floral-logo.png        # Brand logo and favicon
│   └── [tour-images].jpg      # Tour photography assets
├── src/
│   ├── components/            # Reusable React components
│   │   ├── BookingForm.jsx   # Tour booking modal with validation
│   │   ├── ContactForm.jsx   # Customer contact form
│   │   ├── ContactPage.jsx   # Contact page layout
│   │   ├── TourCard.jsx      # Individual tour display card
│   │   └── TourDetailPage.jsx # Detailed tour view
│   ├── api/
│   │   └── wordpress.js      # WordPress REST API integration
│   ├── utils/
│   │   ├── contentUtils.js   # Content processing utilities
│   │   └── documentTitle.js  # Dynamic page title management
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # Application entry point
│   └── index.css             # Global styles and Tailwind config
├── dist/                     # Production build output
├── vercel.json              # Vercel deployment configuration
├── tailwind.config.js       # Tailwind CSS customization
├── vite.config.js          # Vite build configuration
└── package.json            # Dependencies and scripts
```

## API Endpoints

### WordPress Custom Endpoints
- `GET /wp-json/floral/v1/tours` - Fetch all tours with metadata
- `POST /wp-json/floral/v1/bookings` - Submit booking requests
- `POST /wp-json/floral/v1/contact` - Submit contact form inquiries

### Frontend API Integration
```javascript
// Environment-aware API calls
const API_BASE = window.location.protocol === 'https:' 
  ? 'https://your-wordpress-site.com' 
  : 'http://floral-kingdom-headless.local';
```

## Deployment Process

### Automatic Deployment (Recommended)
1. **Push to GitHub**: `git push origin main`
2. **Vercel Auto-Deploy**: Automatic build and deployment triggers
3. **Live Updates**: Changes reflect immediately on production URL

### Manual Deployment
1. Build locally: `npm run build`
2. Deploy to Vercel: Connect GitHub repository
3. Configure environment variables for production API

## Customization

### Styling & Branding
- **Colors**: Modify Tailwind config in `tailwind.config.js`
- **Typography**: Update font scales in `src/index.css`
- **Components**: Customize React components in `src/components/`
- **Assets**: Replace images in `public/` directory

### Content Management
- **Tours**: Add/edit through WordPress admin dashboard
- **Images**: Upload via WordPress media library
- **Bookings**: View submissions in WordPress backend
- **SEO**: Manage meta tags and structured data

## Development Workflow

### Local Development
1. **Start WordPress**: Launch local WordPress environment
2. **Run Frontend**: `npm run dev` for hot reload development
3. **API Testing**: Test endpoints using browser dev tools
4. **Version Control**: Regular commits with descriptive messages

### Code Quality
- **ESLint**: Automatic code linting and formatting
- **Build Validation**: Pre-deployment build testing
- **Error Handling**: Comprehensive error boundaries and logging

## Performance & SEO

### Optimization Features
- **Lazy Loading**: Images and components load on demand
- **Code Splitting**: Optimized bundle sizes with Vite
- **Caching**: Static asset caching via Vercel CDN
- **Compression**: Gzip compression for faster loading

### SEO Implementation
- **Meta Tags**: Dynamic titles and descriptions
- **Open Graph**: Social media sharing optimization
- **Structured Data**: JSON-LD for search engines
- **Sitemap**: Automatic sitemap generation

## Client Collaboration

### Content Management
- **WordPress Dashboard**: Intuitive interface for non-technical users
- **Live Preview**: Real-time content updates on frontend
- **Media Management**: Easy image upload and organization
- **Booking Management**: View and manage customer inquiries

### Maintenance & Updates
- **Version Control**: Complete project history in Git
- **Backup Strategy**: Regular WordPress database backups
- **Security Updates**: Regular WordPress and dependency updates
- **Performance Monitoring**: Vercel analytics and error tracking

## Support & Documentation

### Technical Documentation
- **API Reference**: Detailed endpoint documentation
- **Component Guide**: React component usage examples
- **Deployment Guide**: Step-by-step deployment instructions
- **Troubleshooting**: Common issues and solutions

### Client Training
- **WordPress Training**: Content management best practices
- **Tour Management**: Adding and updating tour information
- **Booking System**: Processing customer inquiries
- **Analytics**: Understanding website performance metrics

## Future Enhancements

### Planned Features
- **Payment Integration**: Stripe/PayPal for online payments
- **Multi-language Support**: Internationalization (i18n)
- **Advanced Analytics**: Custom tracking and reporting
- **Mobile App**: React Native companion app
- **CRM Integration**: Customer relationship management
- **Advanced Booking**: Calendar integration and availability

---

**Built with care for professional tourism experiences**

*This headless CMS architecture provides the perfect balance of content management flexibility and modern web performance, delivering an exceptional user experience for both clients and their customers.*
