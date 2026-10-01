-- Create a table for newsletter subscribers
create table if not exists newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table newsletter_subscribers enable row level security;

-- Create a policy to allow anyone to insert (subscribe)
create policy "Enable insert for everyone" on newsletter_subscribers
  for insert
  with check (true);

-- Create a policy to allow only authenticated users (admins) to view
-- For now, we'll just allow read access to service role or maybe authenticated users
-- Adjust this based on actual admin needs.
create policy "Enable read access for authenticated users" on newsletter_subscribers
  for select
  to authenticated
  using (true);
