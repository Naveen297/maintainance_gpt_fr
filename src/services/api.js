import { API_BASE_URL } from '../constants/config';

/**
 * Search API - Performs search query with plant name
 * @param {string} query - Search query string
 * @param {boolean} rethink - Whether this is a rethink request (default: false)
 * @returns {Promise<{results: Array, summary: any}>} Search results and summary
 */
// export const searchAPI = async (query, rethink = false) => {
//   try {
//     const plantname = localStorage.getItem('selectedPlant') || '';

//     const response = await fetch(`${API_BASE_URL}/search`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ query, plantname, rethink }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       throw new Error(errorData.detail || 'Search API failed');
//     }

//     const data = await response.json();
//     return {
//       results: data.results || [],
//       summary: data.summary || null,
//     };
//   } catch (error) {
//     console.error('Search API error:', error);
//     throw error;
//   }
// };

export const searchAPI = async (query, rethink = false, onStream) => {
  const plantname = localStorage.getItem("selectedPlant") || "";

  const response = await fetch(`${API_BASE_URL}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, plantname, rethink }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Search API failed");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let accumulatedText = "";
  let finalResult = null;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split("\n");

    for (let line of lines) {
      if (!line.startsWith("data:")) continue;

      const payload = line.replace("data:", "").trim();

      // 📌 FINAL RESULTS
      if (payload.startsWith("FINAL_RESULTS::")) {
        const jsonStr = payload.replace("FINAL_RESULTS::", "");
        finalResult = JSON.parse(jsonStr);
        continue;
      }

      // 📌 END EVENT
      if (payload === "__END__") {
        return {
          results: finalResult?.docs || [],
          summary: finalResult?.summary || "",
        };
      }

      // 📌 STREAMED TEXT
      accumulatedText += payload + "\n";
      if (onStream) onStream(accumulatedText);
    }
  }

  return {
    results: finalResult?.docs || [],
    summary: finalResult?.summary || "",
  };
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
