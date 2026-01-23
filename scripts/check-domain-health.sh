#!/bin/bash

# Domain Health Check Script
# Compares custom domain performance vs direct Vercel URL

DOMAIN="https://www.diemdanh.net"
PROJECT_NAME="www-diemdanh"

# Get latest production deployment URL
LATEST_DEPLOYMENT=$(vercel ls --prod 2>/dev/null | grep "https://" | head -1 | awk '{print $1}')

if [ -z "$LATEST_DEPLOYMENT" ]; then
  echo "❌ Error: Could not find latest deployment"
  echo "Run: vercel ls --prod"
  exit 1
fi

echo "🔍 Checking domain health..."
echo ""
echo "Domain: $DOMAIN"
echo "Latest deployment: $LATEST_DEPLOYMENT"
echo ""

# Test domain response time
echo "Testing domain..."
DOMAIN_TIME=$(timeout 30 curl -w "%{time_total}" -s -o /dev/null $DOMAIN 2>/dev/null)
DOMAIN_EXIT=$?

if [ $DOMAIN_EXIT -ne 0 ] || [ -z "$DOMAIN_TIME" ]; then
  echo "❌ Domain timeout or error (> 30 seconds)"
  DOMAIN_TIME="30.000"
else
  echo "✓ Domain response time: ${DOMAIN_TIME}s"
fi

# Test direct Vercel URL
echo "Testing direct Vercel URL..."
DIRECT_TIME=$(timeout 30 curl -w "%{time_total}" -s -o /dev/null $LATEST_DEPLOYMENT 2>/dev/null)
DIRECT_EXIT=$?

if [ $DIRECT_EXIT -ne 0 ] || [ -z "$DIRECT_TIME" ]; then
  echo "❌ Direct URL timeout or error (> 30 seconds)"
  exit 1
else
  echo "✓ Direct URL response time: ${DIRECT_TIME}s"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Compare and provide recommendations
DOMAIN_FLOAT=$(echo "$DOMAIN_TIME" | awk '{print $1}')
DIRECT_FLOAT=$(echo "$DIRECT_TIME" | awk '{print $1}')

# Check if domain is significantly slower (> 5x)
if (( $(echo "$DOMAIN_FLOAT > $DIRECT_FLOAT * 5" | bc -l) )); then
  echo "⚠️  WARNING: Domain is significantly slower than direct URL!"
  echo ""
  echo "Ratio: $(echo "scale=1; $DOMAIN_FLOAT / $DIRECT_FLOAT" | bc)x slower"
  echo ""
  echo "This indicates a domain routing issue. To fix:"
  echo ""
  echo "  vercel alias rm www.diemdanh.net"
  echo "  vercel alias set $LATEST_DEPLOYMENT www.diemdanh.net"
  echo ""
  exit 1
elif (( $(echo "$DOMAIN_FLOAT > 3" | bc -l) )); then
  echo "⚠️  Domain is slower than expected but within acceptable range"
  echo ""
  echo "This may improve as the edge network caches content."
  echo "If it persists, consider refreshing the domain alias."
  exit 0
else
  echo "✅ Domain health is GOOD!"
  echo ""
  echo "Both domain and direct URL are performing well."
  exit 0
fi
