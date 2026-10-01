-- 1. Add new columns to the existing profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS mobile TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS other_url TEXT,
ADD COLUMN IF NOT EXISTS community_type TEXT,
ADD COLUMN IF NOT EXISTS community_insta TEXT,
ADD COLUMN IF NOT EXISTS community_other TEXT,
ADD COLUMN IF NOT EXISTS community_role TEXT,
ADD COLUMN IF NOT EXISTS story TEXT,
ADD COLUMN IF NOT EXISTS participation_size TEXT,
ADD COLUMN IF NOT EXISTS nominee_1 TEXT,
ADD COLUMN IF NOT EXISTS nominee_2 TEXT,
ADD COLUMN IF NOT EXISTS nominee_3 TEXT,
ADD COLUMN IF NOT EXISTS stay_connected BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS profile_photo_url TEXT,
ADD COLUMN IF NOT EXISTS community_photo_url TEXT;

-- 2. Update the handle_new_user trigger to populate these new fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    full_name, 
    country, 
    social_url,
    mobile,
    city,
    other_url,
    community_type,
    community_insta,
    community_other,
    community_role,
    story,
    participation_size,
    nominee_1,
    nominee_2,
    nominee_3,
    stay_connected,
    profile_photo_url,
    community_photo_url
  )
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'country',
    new.raw_user_meta_data->>'social_url',
    new.raw_user_meta_data->>'mobile',
    new.raw_user_meta_data->>'city',
    new.raw_user_meta_data->>'other_url',
    new.raw_user_meta_data->>'community_type',
    new.raw_user_meta_data->>'community_insta',
    new.raw_user_meta_data->>'community_other',
    new.raw_user_meta_data->>'community_role',
    new.raw_user_meta_data->>'story',
    new.raw_user_meta_data->>'participation_size',
    new.raw_user_meta_data->>'nominee_1',
    new.raw_user_meta_data->>'nominee_2',
    new.raw_user_meta_data->>'nominee_3',
    COALESCE((new.raw_user_meta_data->>'stay_connected')::boolean, true),
    new.raw_user_meta_data->>'profile_photo_url',
    new.raw_user_meta_data->>'community_photo_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Create the Storage Bucket for media uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('roll_call_media', 'roll_call_media', true)
ON CONFLICT (id) DO NOTHING;

-- 4. Set up Storage Policies for 'roll_call_media'
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'roll_call_media' );

CREATE POLICY "Users can upload media" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'roll_call_media' AND auth.role() = 'authenticated' );

CREATE POLICY "Users can update their own media" 
ON storage.objects FOR UPDATE 
USING ( bucket_id = 'roll_call_media' AND auth.uid() = owner );

CREATE POLICY "Users can delete their own media" 
ON storage.objects FOR DELETE 
USING ( bucket_id = 'roll_call_media' AND auth.uid() = owner );
