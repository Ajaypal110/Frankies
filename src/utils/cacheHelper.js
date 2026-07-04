/**
 * Simple cache helper for session-based storage of API responses.
 * This ensures that when a user navigates between pages, the content
 * loads instantly while a background fetch updates the data.
 */

const CACHE_PREFIX = 'frankies_cache_';

export const getCache = (key) => {
  try {
    const cached = sessionStorage.getItem(CACHE_PREFIX + key);
    if (!cached) return null;
    return JSON.parse(cached);
  } catch (err) {
    console.error('Cache read error:', err);
    return null;
  }
};

export const setCache = (key, data) => {
  try {
    sessionStorage.setItem(CACHE_PREFIX + key, JSON.stringify(data));
  } catch (err) {
    console.error('Cache write error:', err);
  }
};
