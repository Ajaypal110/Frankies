const DEFAULT_ORDER_BASE_URL =
  'https://frankiesbreakfastburritos.toast.site/order/frankies-breakfast-burritos-28708-roadside-drive';

const normalizeUrl = (value) => value?.trim().replace(/\/$/, '') || '';

const DEFAULT_API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:8884/wp-json'
  : 'https://burrito.launchpreview.live/wp-json';

const WP_BASE_URL = normalizeUrl(import.meta.env.VITE_WP_BASE_URL);

export const API_BASE_URL = (WP_BASE_URL ? `${WP_BASE_URL}/wp-json` : '') || DEFAULT_API_BASE_URL;
export const ORDER_BASE_URL = normalizeUrl(import.meta.env.VITE_ORDER_BASE_URL) || DEFAULT_ORDER_BASE_URL;
