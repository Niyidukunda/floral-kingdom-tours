// Utility functions for handling WordPress content in React

// Clean HTML content for display
export const cleanHtmlContent = (htmlString) => {
  if (!htmlString) return '';
  
  // Decode HTML entities
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
  
  let cleaned = htmlString;
  
  // Replace HTML entities
  Object.keys(entityMap).forEach(entity => {
    cleaned = cleaned.replace(new RegExp(entity, 'g'), entityMap[entity]);
  });
  
  // Strip HTML tags
  cleaned = cleaned.replace(/<[^>]*>/g, '');
  
  // Clean up whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  return cleaned;
};

// Safely render HTML content (for when you want to preserve some formatting)
export const createMarkup = (htmlString) => {
  const cleaned = cleanHtmlContent(htmlString);
  return { __html: cleaned };
};

// Format WordPress content for display with line breaks
export const formatContentWithBreaks = (content) => {
  if (!content) return '';
  
  const cleaned = cleanHtmlContent(content);
  
  // Convert paragraph breaks to line breaks
  return cleaned
    .split('\n')
    .filter(line => line.trim() !== '')
    .join('\n\n');
};

// Extract clean excerpt from HTML content
export const extractCleanExcerpt = (htmlContent, maxLength = 200) => {
  const cleaned = cleanHtmlContent(htmlContent);
  
  if (cleaned.length <= maxLength) return cleaned;
  
  // Find the last complete word within the limit
  const truncated = cleaned.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
};