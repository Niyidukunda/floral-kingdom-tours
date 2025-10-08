import { useState } from 'react';
import { submitBooking } from '../api/wordpress';

function BookingForm({ tour, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    tourId: parseInt(tour?.id) || 1,
    tourTitle: tour?.title || 'Tour Booking',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    tourDate: '',
    participants: 1,
    specialRequests: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.tourDate) {
      newErrors.tourDate = 'Tour date is required';
    } else {
      const selectedDate = new Date(formData.tourDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.tourDate = 'Tour date cannot be in the past';
      }
    }

    if (formData.participants < 1 || formData.participants > 12) {
      newErrors.participants = 'Participants must be between 1 and 12';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate total price (basic calculation)
      const basePrice = parseFloat(tour?.price?.replace(/[^\d.]/g, '') || '899');
      const totalPrice = basePrice * formData.participants;

      // Prepare booking data for WordPress API
      const bookingData = {
        tour_id: parseInt(formData.tourId) || 1,
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_email: formData.email,
        customer_phone: formData.phone,
        booking_date: formData.tourDate,
        party_size: parseInt(formData.participants) || 1,
        special_requests: formData.specialRequests || ''
      };

      console.log('Booking submission:', bookingData);
      
      // Submit to WordPress API using our helper function
      const result = await submitBooking(bookingData);

      // Show success message
      alert(`🎉 Booking request submitted successfully! 
      
Booking ID: ${result.booking_id}
Tour: ${formData.tourTitle}
Date: ${formData.tourDate}
Participants: ${formData.participants}
Total: R${totalPrice.toFixed(2)}

${result.message}`);

      onClose();
    } catch (error) {
      console.error('Booking submission error:', error);
      alert(`❌ Error: ${error.message}\n\nPlease try again or contact us directly.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Get maximum date (6 months from now)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);
  const maxDateString = maxDate.toISOString().split('T')[0];

  const basePrice = parseFloat(tour?.price?.replace(/[^\d.]/g, '') || '899');
  const totalPrice = basePrice * formData.participants;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">Book Your Adventure</h2>
              <p className="text-purple-100">{tour?.title}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-purple-200 transition-colors p-2"
              aria-label="Close booking form"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+27 123 456 789"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Tour Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tour Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="tourDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  id="tourDate"
                  name="tourDate"
                  value={formData.tourDate}
                  onChange={handleInputChange}
                  min={minDate}
                  max={maxDateString}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                    errors.tourDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.tourDate && <p className="text-red-500 text-sm mt-1">{errors.tourDate}</p>}
              </div>

              <div>
                <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Participants *
                </label>
                <select
                  id="participants"
                  name="participants"
                  value={formData.participants}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                    errors.participants ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i + 1 === 1 ? 'Person' : 'People'}
                    </option>
                  ))}
                </select>
                {errors.participants && <p className="text-red-500 text-sm mt-1">{errors.participants}</p>}
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2">
              Special Requests or Dietary Requirements
            </label>
            <textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              placeholder="Any special requirements, dietary restrictions, or accessibility needs..."
            />
          </div>

          {/* Pricing Summary */}
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Booking Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Tour:</span>
                <span className="font-medium">{tour?.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Price per person:</span>
                <span>R{basePrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Participants:</span>
                <span>{formData.participants}</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-semibold text-lg">
                <span>Total:</span>
                <span className="text-purple-600">R{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
              I agree to the{' '}
              <a href="/terms" className="text-purple-600 hover:text-purple-800 underline">
                terms and conditions
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-purple-600 hover:text-purple-800 underline">
                privacy policy
              </a>
              . I understand that this is a booking request and final confirmation will be sent via email. *
            </label>
          </div>
          {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-semibold"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                `Submit Booking Request - R${totalPrice.toFixed(2)}`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;