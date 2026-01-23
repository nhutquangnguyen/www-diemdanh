#!/usr/bin/env node

/**
 * Pre-build environment variable validation
 * Ensures all required env vars are set before building for production
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_APP_URL',
  'NEXT_PUBLIC_SITE_URL',
];

// Only validate in Vercel production builds
const isVercelProduction = process.env.VERCEL === '1' && process.env.VERCEL_ENV === 'production';

if (isVercelProduction) {
  console.log('\n🔍 Validating production environment variables...\n');

  const missing = requiredEnvVars.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error('❌ ERROR: Missing required environment variables:\n');
    missing.forEach(key => {
      console.error(`   - ${key}`);
    });
    console.error('\n📝 Please set these in Vercel Dashboard:');
    console.error('   Project Settings > Environment Variables > Production\n');
    console.error('Expected values:');
    console.error('   NEXT_PUBLIC_APP_URL=https://app.diemdanh.net');
    console.error('   NEXT_PUBLIC_SITE_URL=https://www.diemdanh.net\n');
    process.exit(1);
  }

  // Validate URLs don't contain localhost
  const localhostVars = requiredEnvVars.filter(key => {
    const value = process.env[key];
    return value && value.includes('localhost');
  });

  if (localhostVars.length > 0) {
    console.error('❌ ERROR: Production environment variables contain localhost:\n');
    localhostVars.forEach(key => {
      console.error(`   - ${key}=${process.env[key]}`);
    });
    console.error('\n📝 These should be production URLs, not localhost!\n');
    process.exit(1);
  }

  console.log('✅ All environment variables are valid');
  console.log(`   NEXT_PUBLIC_APP_URL=${process.env.NEXT_PUBLIC_APP_URL}`);
  console.log(`   NEXT_PUBLIC_SITE_URL=${process.env.NEXT_PUBLIC_SITE_URL}\n`);
}
