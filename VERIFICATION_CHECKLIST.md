# DiemDanh.net - Verification Checklist

## How to Verify All Changes

### 1. Start Development Server
```bash
cd www
npm run dev
```

### 2. Test Each Page

#### ✅ Homepage (/)
- [ ] Logo shows "DiemDanh.net"
- [ ] Free trial button says "Dùng Thử Miễn Phí **7 Ngày**"
- [ ] Mobile menu opens and closes
- [ ] All navigation links work

#### ✅ About Page (/about)
- [ ] Pricing shows: 79K (9 employees), 179K (30 employees), 279K (unlimited)
- [ ] Free trial mentions "7 ngày"
- [ ] All features listed correctly
- [ ] Mobile navigation works

#### ✅ Pricing Page (/pricing)
- [ ] Three tiers: Gói Cửa Hàng (79K), Gói Doanh Nghiệp (179K), Gói Chuỗi (279K)
- [ ] Employee limits: 9, 30, unlimited
- [ ] FAQ section loads
- [ ] Toggle between monthly/yearly works
- [ ] Mobile menu functional

#### ✅ Help Center (/help)
- [ ] Search box is removed (clean header)
- [ ] Popular articles display
- [ ] Categories show correctly
- [ ] Mobile navigation works

#### ✅ Help - Bắt Đầu (/help/bat-dau)
- [ ] FAQ says "7 ngày" free trial
- [ ] Employee limits match: 9, 30, unlimited
- [ ] All step-by-step sections display
- [ ] Links to other help pages work

#### ✅ Help - Điểm Danh (/help/diem-danh)
- [ ] Free trial mentions "7 ngày"
- [ ] Scenarios tab switching works
- [ ] All content displays correctly

### 3. Test SEO Elements

#### ✅ Meta Tags (View Page Source)
```bash
# Check homepage source
curl http://localhost:3000 | grep -i "meta"
```

Look for:
- [ ] `<title>DiemDanh.net - Hệ Thống Điểm Danh Thông Minh</title>`
- [ ] Open Graph tags (`og:title`, `og:description`, `og:image`)
- [ ] Twitter Card tags
- [ ] Meta description with "7 ngày"

#### ✅ Structured Data
View page source and search for:
- [ ] `application/ld+json` script tag in homepage
- [ ] SoftwareApplication schema with pricing
- [ ] FAQ schema on pricing page

#### ✅ Sitemap & Robots
```bash
# Test sitemap
curl http://localhost:3000/sitemap.xml

# Test robots.txt
curl http://localhost:3000/robots.txt
```

Expected sitemap entries:
- [ ] / (homepage)
- [ ] /about
- [ ] /pricing
- [ ] /help
- [ ] /help/bat-dau
- [ ] /help/diem-danh
- [ ] /help/sep-lich-ai
- [ ] /help/cai-dat-app

Expected robots.txt:
- [ ] Allow: /
- [ ] Disallow: /api/, /auth/, /owner/, /checkin/, /history/, /settings/
- [ ] Sitemap: link

### 4. Mobile Responsiveness

#### Test on Different Viewports
```bash
# Chrome DevTools: Toggle device toolbar (Cmd/Ctrl + Shift + M)
```

Test these breakpoints:
- [ ] Mobile (375px) - iPhone SE
- [ ] Tablet (768px) - iPad
- [ ] Desktop (1024px+)

Check:
- [ ] Mobile menu hamburger appears < 768px
- [ ] Mobile menu opens/closes smoothly
- [ ] All buttons are touchable (min 44px)
- [ ] Text doesn't overflow
- [ ] Images scale properly

### 5. Navigation Testing

#### All Internal Links (Should use Next.js Link)
- [ ] Header navigation (Bảng Giá, Giới Thiệu, Trợ Giúp)
- [ ] Footer links
- [ ] Help article cross-links
- [ ] "Về Trang Chủ" buttons

#### External Links (Should use <a> tag)
- [ ] "Đăng Ký" buttons → `/auth/signup`
- [ ] "Đăng Nhập" buttons → `/auth/login`

### 6. Console Errors

Open browser console (F12) and check:
- [ ] No React hydration errors
- [ ] No 404 errors for assets
- [ ] No TypeScript errors
- [ ] No layout shift warnings

### 7. Build Test

```bash
# Run production build
npm run build

# Check for errors
# Expected: ✓ Compiled successfully
```

Common issues to watch:
- [ ] No missing dependencies
- [ ] No TypeScript errors
- [ ] All pages build successfully
- [ ] Sitemap generates correctly

### 8. Lighthouse Audit (Optional but Recommended)

```bash
# Chrome DevTools → Lighthouse tab
```

Target scores:
- [ ] Performance: 90+
- [ ] Accessibility: 95+
- [ ] Best Practices: 95+
- [ ] SEO: 100

### 9. Cross-Browser Testing

Test in:
- [ ] Chrome/Edge (Chromium)
- [ ] Safari (if on Mac)
- [ ] Firefox
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### 10. Content Verification

#### Pricing Consistency Check
Navigate through: Homepage → About → Pricing → Help

Verify same pricing everywhere:
| Package | Price | Employees | Branches |
|---------|-------|-----------|----------|
| Cửa Hàng | 79K | 9 | 1 |
| Doanh Nghiệp | 179K | 30 | 3 |
| Chuỗi | 279K | Unlimited | Unlimited |

#### Free Trial Consistency
Search entire site for "ngày":
- [ ] All mentions should say "7 ngày"
- [ ] No "14 ngày" anywhere

#### Branding Consistency
Search entire site:
- [ ] All instances show "DiemDanh.net" (PascalCase with .net)
- [ ] No "diemdanh.net" or "Diemdanh.net"

---

## 🐛 Common Issues & Fixes

### Issue: Mobile menu doesn't work
**Fix**: Clear cache, restart dev server

### Issue: Metadata not showing
**Fix**: Check if page is using 'use client' - metadata only works in server components or layouts

### Issue: Sitemap 404
**Fix**: Ensure `app/sitemap.ts` exists and builds correctly

### Issue: Links don't work
**Fix**: Check if using `<Link>` from 'next/link' for internal links

### Issue: Hydration error
**Fix**: Ensure server and client render the same content initially

---

## ✅ Final Checklist Before Production

- [ ] All pages load without errors
- [ ] Mobile navigation works perfectly
- [ ] All pricing is consistent (79K/179K/279K)
- [ ] Free trial is "7 ngày" everywhere
- [ ] Branding is "DiemDanh.net" everywhere
- [ ] SEO meta tags present on all pages
- [ ] Sitemap.xml accessible at /sitemap.xml
- [ ] Robots.txt accessible at /robots.txt
- [ ] No console errors or warnings
- [ ] Build completes successfully
- [ ] All links navigate correctly
- [ ] Mobile responsive on all breakpoints
- [ ] Structured data validates (use schema.org validator)
- [ ] Search box removed from help center
- [ ] FAQ structured data on pricing page

---

## 🔗 Useful Testing Tools

1. **SEO Testing**
   - Google Rich Results Test: https://search.google.com/test/rich-results
   - Schema Markup Validator: https://validator.schema.org/

2. **Performance**
   - PageSpeed Insights: https://pagespeed.web.dev/
   - GTmetrix: https://gtmetrix.com/

3. **Mobile Testing**
   - Google Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
   - BrowserStack: https://www.browserstack.com/

4. **Accessibility**
   - WAVE: https://wave.webaim.org/
   - axe DevTools: Browser extension

---

**Status**: Ready for verification ✅
**Next Step**: Run through this checklist systematically
**Goal**: All checkboxes ticked before deploying to production
