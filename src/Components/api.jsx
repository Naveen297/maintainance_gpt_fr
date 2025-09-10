// ChatbotScreen/api.js
import { API_BASE_URL } from './config';

// API call for search
export const searchAPI = async (query) => {
    try {
      const response = await fetch(`${API_BASE_URL}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Search API failed');
      }
      
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Search API error:', error);
      throw error; // Propagate error for better error handling
    }
  };
  
  // API call for source image
  export const sourceAPI = async (source, pageNo, setLoadingImage) => {
    try {
      if (setLoadingImage) {
        setLoadingImage(true);
      }
      
      const response = await fetch(`${API_BASE_URL}/source`, {
        method: "POST",
        headers: {  
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ source, pageNo }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Source API failed');
      }
      
      const data = await response.json();
      return data.image;
    } catch (error) {
      console.error('Source API error:', error);
      return null;
    } finally {
      if (setLoadingImage) {
        setLoadingImage(false);
      }
    }
  };