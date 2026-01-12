# Domain Separation Plan: www vs app

## Overview
Separate DiemDanh into two projects for better PWA experience and clear separation of concerns.

## Architecture

```
www.diemdanh.net/              → Marketing Site (Static/Light)
├─ /                           Landing page
├─ /pricing                    Pricing page
├─ /about                      About page
├─ /help/*                     Help center (SEO)
└─ /auth/login                 Redirects to app.diemdanh.net/auth/login

app.diemdanh.net/              → PWA Application (Dynamic)
├─ /                           Dashboard (requires auth)
├─ /auth/login                 Login
├─ /auth/signup                Signup
├─ /auth/forgot-password       Password reset
├─ /auth/reset-password        Password reset
├─ /checkin                    Check-in page
├─ /checkin/submit             Submit check-in
├─ /history                    History
├─ /owner                      Owner dashboard
├─ /owner/create-store         Create store
├─ /owner/stores/[id]          Store details
├─ /owner/stores/[id]/add-staff Add staff
├─ /settings                   Settings
└─ /sep-lich-ai                Smart schedule AI
```

## Project Structure

### WWW Project (Marketing)
```
www-diemdanh/
├─ app/
│  ├─ page.tsx                 (Landing)
│  ├─ pricing/page.tsx
│  ├─ about/page.tsx
│  └─ help/
│     ├─ page.tsx
│     ├─ bat-dau/page.tsx
│     ├─ diem-danh/page.tsx
│     ├─ cai-dat-app/page.tsx
│     └─ sep-lich-ai/page.tsx
├─ components/
│  ├─ Header.tsx               (Marketing header)
│  ├─ HelpLayout.tsx
│  └─ FeatureContent.tsx
├─ lib/
│  └─ help-articles.ts
└─ content/
   └─ help/
```

### APP Project (PWA)
```
app-diemdanh/
├─ app/
│  ├─ page.tsx                 (Dashboard - requires auth)
│  ├─ auth/
│  │  ├─ login/page.tsx
│  │  ├─ signup/page.tsx
│  │  ├─ forgot-password/page.tsx
│  │  └─ reset-password/page.tsx
│  ├─ checkin/
│  ├─ history/
│  ├─ owner/
│  ├─ settings/
│  └─ sep-lich-ai/
├─ components/
│  ├─ Header.tsx               (App header - with user menu)
│  ├─ SmartSchedule.tsx
│  ├─ StoreSchedule.tsx
│  └─ ... (all app components)
├─ lib/
│  └─ supabase.ts
└─ public/
   ├─ manifest.json            (PWA manifest)
   └─ sw.js                    (Service worker)
```

## Shared Components Strategy

Option 1: **Git Submodule** (Recommended)
- Create `diemdanh-shared` repo
- Include as submodule in both projects
- Contains: Basic UI components, types, constants

Option 2: **NPM Package**
- Publish private npm package
- Install in both projects

Option 3: **Copy & Diverge** (Simplest for now)
- Copy shared components to both
- Allow them to diverge over time

## Authentication Flow

1. **User visits www.diemdanh.net**
   - No auth required
   - Marketing content

2. **User clicks "Đăng Ký" or "Đăng Nhập"**
   - Redirects to `app.diemdanh.net/auth/signup` or `/auth/login`

3. **User logs in at app.diemdanh.net**
   - Supabase auth sets cookie on `app.diemdanh.net`
   - User stays on app subdomain

4. **User installs PWA**
   - Installs from `app.diemdanh.net`
   - Start URL: `app.diemdanh.net/` (dashboard)

5. **User opens PWA from home screen**
   - Opens directly to `app.diemdanh.net/` (dashboard)
   - Already authenticated via cookie

## PWA Configuration

### WWW (No PWA)
- No manifest.json
- No service worker
- Just static marketing site

### APP (PWA Enabled)
```json
{
  "name": "DiemDanh",
  "short_name": "DiemDanh",
  "start_url": "/",
  "display": "standalone",
  "scope": "/",
  "theme_color": "#3B82F6",
  "background_color": "#FFFFFF",
  "orientation": "portrait",
  "icons": [...]
}
```

## Deployment

### Vercel Projects
1. **www-diemdanh** → www.diemdanh.net
2. **app-diemdanh** → app.diemdanh.net

### Environment Variables
Both projects need:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL` (app.diemdanh.net)
- `NEXT_PUBLIC_WWW_URL` (www.diemdanh.net)

## Migration Steps

1. ✅ Create `www-diemdanh` folder with marketing pages
2. ✅ Move current project to `app-diemdanh`, remove marketing pages
3. ✅ Update links and redirects
4. ✅ Configure PWA manifest on app only
5. ✅ Deploy both to Vercel
6. ✅ Configure custom domains
7. ✅ Test auth flow across domains
8. ✅ Test PWA installation

## Benefits

✅ Clear separation: marketing vs app
✅ Better PWA experience (users install "the app")
✅ Independent deployments
✅ Marketing site can be super optimized
✅ App can be heavy without affecting landing page
✅ Professional architecture
✅ Better security isolation
