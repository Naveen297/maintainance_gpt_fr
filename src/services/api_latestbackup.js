import { API_BASE_URL } from '../constants/config';

/**
 * Search API - Performs search query with plant name
 * @param {string} query - Search query string
 * @param {boolean} rethink - Whether this is a rethink request (default: false)
 * @returns {Promise<{results: Array, summary: any}>} Search results and summary
 */
export const searchAPI = async (query, rethink = false) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 300000);

  try {
    const plantname = localStorage.getItem('selectedPlant') || '';

    const response = await fetch(`${API_BASE_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, plantname, rethink }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Search API failed');
    }

    const data = await response.json();
    return {
      results: data.results || [],
      summary: data.summary || null,
    };

  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Search API timeout after 5 minutes');
      throw new Error('Search request timed out. Please try again.');
    }

    console.error('Search API error:', error);
    throw error;

  } finally {
    clearTimeout(timeout);
  }
};


/**
 * Source API - Fetches source image for a given page
 * @param {string} source - Source identifier
 * @param {number} pageNo - Page number
 * @param {Function} setLoadingImage - Optional loading state setter
 * @returns {Promise<string|object|null>} Image data or null on error
 */
export const sourceAPI = async (source, pageNo, setLoadingImage) => {
  try {
    if (setLoadingImage) {
      setLoadingImage(true);
    }

    const plantname = localStorage.getItem('selectedPlant') || '';

    const response = await fetch(`${API_BASE_URL}/search-img`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source,
        pageNo,
        plantname,
      }),
      redirect: 'follow',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.text();

    // Try to parse as JSON if possible, otherwise return as text
    try {
      const parsedResult = JSON.parse(result);
      return parsedResult.image || parsedResult;
    } catch (parseError) {
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
