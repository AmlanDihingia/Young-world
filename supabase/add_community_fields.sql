-- Add new columns to the profiles table for the community page enhancements
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS what_we_love_most TEXT,
ADD COLUMN IF NOT EXISTS proudest_moment TEXT,
ADD COLUMN IF NOT EXISTS featured_reel TEXT,
ADD COLUMN IF NOT EXISTS cover_photo_url TEXT;
