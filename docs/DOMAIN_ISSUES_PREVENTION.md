# Domain Access Issues - Root Causes & Prevention

## The Problem We Encountered

**Symptom**: www.diemdanh.net took 79+ seconds to load (timeout/inaccessible)
**Direct Vercel URL**: 0.5 seconds (fast)
**Root Domain**: 3 seconds (redirects properly)

This indicates a **Vercel domain alias routing issue**, not a deployment problem.

## Root Causes

### 1. Corrupted Domain Alias Mapping
**What happened**:
- The alias between `www.diemdanh.net` → Vercel edge network became corrupted
- Vercel's routing table had stale/incorrect data for the www subdomain

**Why it happens**:
- Adding/removing domain aliases multiple times in quick succession
- Making DNS changes while deployments are running
- Vercel edge network cache inconsistencies across regions
- Domain alias not properly removed before being re-added to a new deployment

### 2. Edge Network Propagation Delays
**What happened**:
- Vercel uses a global CDN with 100+ edge locations worldwide
- Domain configuration changes must propagate to all edge servers
- Different geographic regions saw different behavior during propagation

**Why it happens**:
- Edge caches have TTL (time-to-live) that varies by region
- New alias mappings take time to distribute globally
- Old routing rules can persist in some edge locations

### 3. DNS Cache Poisoning
**What happened**:
- Local DNS resolver cached the broken domain mapping
- Browser kept using cached bad route even after Vercel fix

**Why it happens**:
- DNS has multiple cache layers: browser → OS → ISP → authoritative nameservers
- Each layer has its own TTL (can be hours or days)
- Vercel's fast DNS changes don't instantly clear all caches

## How We Fixed It

```bash
# 1. Remove the broken alias
vercel alias rm www.diemdanh.net

# 2. Re-add alias to latest deployment
vercel alias set <deployment-url> www.diemdanh.net

# 3. Wait 5-10 minutes for edge network propagation

# 4. Clear local DNS cache (optional)
# macOS: sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder
# Windows: ipconfig /flushdns
# Linux: sudo systemd-resolve --flush-caches
```

**Result**: Response time improved from 79s → 3s

## Prevention Strategies

### 1. **Always Deploy Before Managing Domains**

❌ **Wrong Order**:
```bash
vercel alias set <old-deployment> www.example.com
vercel --prod  # Deploy after setting alias
```

✅ **Correct Order**:
```bash
vercel --prod  # Deploy first
# Wait for deployment to complete
vercel alias set <new-deployment> www.example.com
```

**Why**: Vercel needs the deployment to exist before creating the alias mapping.

### 2. **Use Project Domain Settings (Recommended)**

Instead of manual alias commands, configure domains in Vercel Dashboard:

1. Go to Project Settings → Domains
2. Add domains there (Vercel auto-manages aliases)
3. Vercel automatically updates aliases on each production deployment

**Why**: Vercel handles the orchestration and timing automatically, reducing human error.

### 3. **Monitor Domain Health**

Create a simple monitoring script:

```bash
#!/bin/bash
# scripts/check-domain-health.sh

DOMAIN="https://www.diemdanh.net"
DIRECT_URL="https://diemdanh-latest.vercel.app"  # Update with your project

echo "Checking domain health..."

# Test domain response time
DOMAIN_TIME=$(curl -w "%{time_total}" -s -o /dev/null $DOMAIN)
DIRECT_TIME=$(curl -w "%{time_total}" -s -o /dev/null $DIRECT_URL)

echo "Domain response time: ${DOMAIN_TIME}s"
echo "Direct URL response time: ${DIRECT_TIME}s"

# Alert if domain is 10x slower than direct
if (( $(echo "$DOMAIN_TIME > $DIRECT_TIME * 10" | bc -l) )); then
  echo "⚠️  WARNING: Domain is significantly slower than direct URL!"
  echo "Consider running: vercel alias rm && vercel alias set"
fi
```

### 4. **Avoid These Mistakes**

❌ **Don't**: Add and remove domains repeatedly in quick succession
✅ **Do**: Wait 5-10 minutes between domain changes

❌ **Don't**: Make DNS changes during active deployments
✅ **Do**: Wait for deployments to complete before DNS changes

❌ **Don't**: Use `vercel --prod` immediately after domain changes
✅ **Do**: Let the previous domain change propagate first

❌ **Don't**: Ignore slow response times (they indicate routing issues)
✅ **Do**: Test and fix domain routing immediately

### 5. **Emergency Recovery Procedure**

If your domain becomes inaccessible:

```bash
# Step 1: Verify the deployment is healthy
curl -I https://<your-deployment>.vercel.app
# Should respond quickly (< 1 second)

# Step 2: Check domain response
curl -w "\nTime: %{time_total}s\n" -I https://www.yourdomain.com
# If > 5 seconds, proceed to fix

# Step 3: Remove and re-add alias
vercel alias rm www.yourdomain.com
vercel alias set <deployment-url> www.yourdomain.com

# Step 4: Wait 5 minutes and test again
sleep 300
curl -w "\nTime: %{time_total}s\n" -I https://www.yourdomain.com
# Should now be < 3 seconds

# Step 5: Clear your local DNS cache (optional but recommended)
# macOS: sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder
# Windows: ipconfig /flushdns
# Linux: sudo systemd-resolve --flush-caches
```

### 6. **Long-term Best Practices**

1. **Use Vercel's Git Integration**: Automatic deployments on git push reduce manual domain management
2. **Set Up Monitoring**: Use UptimeRobot or Pingdom to alert you if the domain becomes slow
3. **Document Your Domains**: Keep a list of which domains point to which projects
4. **Regular Health Checks**: Run the monitoring script weekly
5. **Avoid Manual Alias Commands**: Let Vercel auto-manage aliases through Dashboard

## Verification Checklist

After fixing domain issues, verify:

- [ ] Direct Vercel URL responds in < 1 second
- [ ] www subdomain responds in < 3 seconds
- [ ] Root domain redirects properly
- [ ] HTTPS works on all domains
- [ ] No mixed content warnings
- [ ] DNS records are correct: `dig www.yourdomain.com`
- [ ] All environments (dev, preview, production) work

## When to Ask for Help

Contact Vercel support if:
- Domain issues persist after 2 hours of DNS propagation
- Direct Vercel URL is also slow (indicates deployment issue, not routing)
- Multiple remove/re-add attempts don't fix the issue
- You see "Domain not found" errors when the domain exists
- SSL certificates won't provision after 24 hours

## Additional Resources

- Vercel DNS Documentation: https://vercel.com/docs/concepts/projects/domains
- Vercel Status Page: https://vercel.com/status
- DNS Propagation Checker: https://dnschecker.org
