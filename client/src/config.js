const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_PROD_URL, // Default to production

  // Uncomment below for development
  // API_BASE_URL: import.meta.env.VITE_DEV_URL,

  SOCKET_URL: import.meta.env.VITE_PROD_SOCKET_URL, // Default to production

  // Uncomment below for development
  // SOCKET_URL: import.meta.env.VITE_DEV_SOCKET_URL,
};

export default CONFIG;
