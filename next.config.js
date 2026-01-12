/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  // Disable static page generation to prevent build-time environment variable issues
  output: 'standalone',
}

module.exports = nextConfig
