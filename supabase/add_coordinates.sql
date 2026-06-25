-- Add latitude and longitude columns to profiles table for the globe feature
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION;

-- Update the handle_new_user trigger to also store coordinates
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
    community_photo_url,
    latitude,
    longitude
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
    new.raw_user_meta_data->>'community_photo_url',
    (new.raw_user_meta_data->>'latitude')::double precision,
    (new.raw_user_meta_data->>'longitude')::double precision
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
