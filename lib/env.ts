/**
 * Environment variable validation
 * This runs at build time to ensure all required env vars are set in production
 */

// Required environment variables
const requiredEnvVars = {
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
} as const;

// Validate at build time (only in production)
if (process.env.NODE_ENV === 'production') {
  const missing = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(
      `❌ Missing required environment variables:\n${missing.join('\n')}\n\n` +
      `Please set these in Vercel Dashboard > Project Settings > Environment Variables\n` +
      `Then redeploy with: vercel --prod`
    );
  }
}

// Export validated env vars (with localhost fallback for development only)
export const env = {
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
} as const;

// Type-safe access
export const getAppUrl = () => env.APP_URL;
export const getSiteUrl = () => env.SITE_URL;
