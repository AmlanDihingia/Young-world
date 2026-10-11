-- Table for Community Join Requests
CREATE TABLE IF NOT EXISTS community_join_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  community_name TEXT NOT NULL,
  community_slug TEXT,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  age TEXT,
  city TEXT,
  country TEXT,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security
ALTER TABLE community_join_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit a join request
CREATE POLICY "Enable insert for everyone" ON community_join_requests
  FOR INSERT WITH CHECK (true);

-- Allow authenticated admins to view join requests
CREATE POLICY "Enable select for authenticated users" ON community_join_requests
  FOR SELECT TO authenticated USING (true);
