import { useEffect } from 'react';

// Custom hook to update document title
export const useDocumentTitle = (title) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title} - Floral Kingdom Tours` : 'Floral Kingdom Tours - Premium Cape Town Tourism Experience';
    
    // Cleanup function to restore previous title
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};

// Utility function to set page title
export const setPageTitle = (title) => {
  document.title = title ? `${title} - Floral Kingdom Tours` : 'Floral Kingdom Tours - Premium Cape Town Tourism Experience';
};