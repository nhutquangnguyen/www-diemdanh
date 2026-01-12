# Staff User ID Migration Guide

## Overview

This migration adds a `user_id` column to the `staff` table and updates the Add Staff feature to only accept emails that are already registered on the platform.

## What Changed

### 1. Database Changes

- **Added `user_id` column** to `staff` table (UUID, foreign key to `auth.users.id`)
- **Added unique constraints**:
  - `staff_email_store_unique`: Prevents duplicate emails per store
  - `staff_user_store_unique`: Prevents same user from being added twice to same store
- **Created database function** `get_user_by_email()` to safely check if users exist
- **Removed duplicate records** (kept oldest record for each email+store combination)
- **Populated `user_id`** for all existing staff records by matching emails

### 2. Code Changes

#### `/types/index.ts`
- Added `user_id: string` to `Staff` interface

#### `/app/owner/stores/[id]/add-staff/page.tsx`
- Updated to use `get_user_by_email()` database function instead of admin API
- Now validates that email exists in the platform before adding
- Auto-populates `full_name` and `phone` from user's account settings
- Trims and lowercases email input to prevent typos
- Inserts `user_id` along with email when adding staff

## Migration Steps

### Step 1: Run the Database Migration

In your Supabase SQL Editor, run:

```bash
MIGRATION_ADD_USER_ID_TO_STAFF.sql
```

This script will:
1. Create the `get_user_by_email()` function
2. Delete duplicate staff records (keeping the oldest)
3. Add `user_id` column to `staff` table
4. Populate `user_id` for existing records
5. Add foreign key constraint
6. Add unique constraints
7. Display verification results

### Step 2: Verify the Migration

After running the script, check the output:

- **"Staff without user_id"** should show `count: 0`
- **"Duplicate staff records"** should show `count: 0`
- All staff records should show status `✅ OK`

If any records show `⚠️ NO USER`, those staff were added with emails that don't exist in your auth system. You can either:
- Ask those people to register accounts
- Delete those orphaned staff records

### Step 3: Deploy Code Changes

The code changes are already made in:
- `types/index.ts`
- `app/owner/stores/[id]/add-staff/page.tsx`

Just test and deploy as usual.

## New Add Staff Behavior

### Before
- Could add any email address
- Email typos were allowed (e.g., `@gmai.com`)
- Used email prefix as full_name
- No validation against registered users

### After
- ✅ Only accepts emails that are registered on the platform
- ✅ Validates email exists in auth system
- ✅ Auto-populates real name and phone from user's account
- ✅ Prevents typos by trimming and lowercasing
- ✅ Shows clear error: "Email này chưa đăng ký tài khoản trên hệ thống"
- ✅ Creates proper `user_id` foreign key relationship

## Benefits

1. **Data Integrity**: Foreign key ensures staff records always reference valid users
2. **No Orphaned Records**: Cascade delete removes staff when user account is deleted
3. **No Duplicates**: Unique constraints prevent the same user being added twice
4. **Better UX**: Users see real names instead of email prefixes
5. **Sync Profile Updates**: When users update their profile in Settings, staff records can be updated too
6. **Security**: Only registered users can be added as staff

## Troubleshooting

### Error: "function get_user_by_email(text) does not exist"

Run the `CREATE_GET_USER_FUNCTION.sql` script to create the function.

### Error: "duplicate key value violates unique constraint"

This means you're trying to add a user who's already in the staff list for that store. This is expected behavior.

### Some staff records have NULL user_id

These are staff that were added before the migration with emails that don't exist in your auth system. Options:
1. Ask them to register an account
2. Delete those staff records
3. Leave them as is (they won't be able to check in)

## SQL Files Reference

- `MIGRATION_ADD_USER_ID_TO_STAFF.sql` - Complete migration (run this)
- `CREATE_GET_USER_FUNCTION.sql` - Just the function creation
- `ADD_USER_ID_TO_STAFF.sql` - Alternative migration script
- `FIX_DUPLICATE_STAFF.sql` - Legacy script (now included in main migration)
- `DELETE_TYPO_EMAIL.sql` - Delete specific typo record
- `CHECK_DUPLICATE_STAFF.sql` - Check for duplicates
