-- ============================================================
-- NUCLEAR FIX — Run this in Supabase SQL Editor
-- Drops ALL triggers on auth.users, rebuilds profiles cleanly
-- ============================================================

-- STEP 1: Find and drop ALL triggers on auth.users
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT trigger_name
    FROM information_schema.triggers
    WHERE event_object_schema = 'auth'
      AND event_object_table = 'users'
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS %I ON auth.users', r.trigger_name);
    RAISE NOTICE 'Dropped trigger: %', r.trigger_name;
  END LOOP;
END;
$$;

-- STEP 2: Drop ALL functions that might be broken triggers
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.create_profile_for_user() CASCADE;
DROP FUNCTION IF EXISTS public.on_auth_user_created() CASCADE;

-- STEP 3: Drop and recreate the profiles table
DROP TABLE IF EXISTS public.profiles CASCADE;

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT DEFAULT '',
  email TEXT DEFAULT '',
  role TEXT DEFAULT 'student',
  college TEXT DEFAULT '',
  department TEXT DEFAULT '',
  "graduationYear" INTEGER,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- STEP 4: Create a minimal, safe trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'student')
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Never let this trigger kill signup
  RETURN NEW;
END;
$$;

-- STEP 5: Attach trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- STEP 6: RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert their profile"
  ON public.profiles FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);
