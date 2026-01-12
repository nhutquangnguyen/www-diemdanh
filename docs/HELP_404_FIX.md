# Fix for 404 Error on Help Articles

## Problem
Help articles at `/help/[slug]` were returning 404 errors.

## Root Cause
Next.js 16 App Router changed how dynamic route params work:
- `params` is now a **Promise** that must be awaited
- File system operations must use async methods

## Solution Applied

### 1. Updated `generateMetadata` function
```typescript
// Before (wrong)
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  ...
}

// After (correct)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;  // ← Must await!
  const article = getArticleBySlug(slug);
  ...
}
```

### 2. Updated page component
```typescript
// Before (wrong)
export default async function HelpArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  ...
}

// After (correct)
export default async function HelpArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;  // ← Must await!
  const article = getArticleBySlug(slug);
  ...
}
```

### 3. Changed to async file reading
```typescript
// Before (wrong)
import { readFileSync } from 'fs';

async function getArticleContent(slug: string) {
  const source = readFileSync(contentPath, 'utf8');  // Sync in async function
  ...
}

// After (correct)
import fs from 'fs/promises';

async function getArticleContent(slug: string) {
  const source = await fs.readFile(contentPath, 'utf8');  // Properly async
  ...
}
```

## Files Modified
- `app/help/[slug]/page.tsx`

## Testing
```bash
npm run build  # Should build successfully
```

All help article routes should now work:
- `/help/bat-dau`
- `/help/diem-danh`
- `/help/sep-lich-ai`
- `/help/cai-dat-app`

## Reference
Next.js 16 documentation: https://nextjs.org/docs/app/api-reference/file-conventions/page#params
