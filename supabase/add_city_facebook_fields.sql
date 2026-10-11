-- Add city and facebook fields to the profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS community_facebook TEXT;
