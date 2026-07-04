const DEFAULT_ORDER_BASE_URL =
  'https://frankiesbreakfastburritos.toast.site/order/frankies-breakfast-burritos-28708-roadside-drive';

const normalizeUrl = (value) => value?.trim().replace(/\/$/, '') || '';

const DEFAULT_API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:8884/wp-json'
  : 'https://ajaypalsingh82775-nopfh-studio.wp.build/wp-json';

export const API_BASE_URL = normalizeUrl(import.meta.env.VITE_WP_API_URL) || DEFAULT_API_BASE_URL;
export const ORDER_BASE_URL = normalizeUrl(import.meta.env.VITE_ORDER_BASE_URL) || DEFAULT_ORDER_BASE_URL;
