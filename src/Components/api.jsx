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
      throw error;
    }
};

// API call for source image - Updated to match exact Postman format
export const sourceAPI = async (source, pageNo, setLoadingImage) => {
    try {
      if (setLoadingImage) {
        setLoadingImage(true);
      }
      
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      const raw = JSON.stringify({
        "source": source,
        "pageNo": pageNo
      });
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      
      const response = await fetch(`${API_BASE_URL}/source`, requestOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.text();
      console.log(result);
      
      // Try to parse as JSON if possible, otherwise return as text
      try {
        const parsedResult = JSON.parse(result);
        return parsedResult.image || parsedResult;
      } catch (parseError) {
        // If not JSON, return the text result directly
        return result;
      }
      
    } catch (error) {
      console.error('Source API error:', error);
      return null;
    } finally {
      if (setLoadingImage) {
        setLoadingImage(false);
      }
    }
};