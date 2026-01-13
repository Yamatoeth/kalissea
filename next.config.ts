/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimiser le bundle
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Optimisations webpack
  webpack: (config, { isServer }) => {
    // Optimiser Three.js
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // Tree-shaking pour Three.js
        three$: 'three/build/three.module.js',
      };
    }
    
    return config;
  },
  
  // Activer la compression
  compress: true,
  
  // Optimiser les images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Production optimizations
  ...(process.env.NODE_ENV === 'production' && {
    productionBrowserSourceMaps: false,
  }),
};

module.exports = nextConfig;