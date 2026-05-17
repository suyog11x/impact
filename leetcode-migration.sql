-- ============================================================
-- LeetCode & GitHub Integration Migration
-- Run this in your Supabase SQL Editor
-- ============================================================

-- STEP 1: Add leetcode_username and github_username columns to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS leetcode_username TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS github_username TEXT DEFAULT NULL;

-- STEP 2: Update the trigger function to also capture these new fields on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role, college, department, "graduationYear", leetcode_username, github_username)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'student'),
    COALESCE(NEW.raw_user_meta_data ->> 'college', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'department', ''),
    CASE
      WHEN NEW.raw_user_meta_data ->> 'graduation_year' IS NOT NULL
      THEN (NEW.raw_user_meta_data ->> 'graduation_year')::INTEGER
      ELSE NULL
    END,
    NEW.raw_user_meta_data ->> 'leetcode_username',
    NEW.raw_user_meta_data ->> 'github_username'
  )
  ON CONFLICT (id) DO UPDATE SET
    leetcode_username = EXCLUDED.leetcode_username,
    github_username = EXCLUDED.github_username;
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RETURN NEW;
END;
$$;

-- STEP 3: Allow users to update their own leetcode/github username
-- (The existing policy "Users can update own profile" already covers this)
-- But let's make sure the column is accessible:

COMMENT ON COLUMN public.profiles.leetcode_username IS 'Verified LeetCode username — validated via backend API on signup/update';
COMMENT ON COLUMN public.profiles.github_username IS 'GitHub username (optional)';

-- STEP 4: Verify the columns were added
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'profiles'
ORDER BY ordinal_position;
