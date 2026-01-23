/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
    formats: ['image/avif', 'image/webp'], // Modern image formats
  },

  // Performance optimizations
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header for security

  // Turbpack is default in Next.js 16 for dev, use webpack for production
  experimental: {
    optimizePackageImports: ['exceljs', 'html2canvas', 'jspdf'], // Tree-shake large packages
  },
}

module.exports = nextConfig
