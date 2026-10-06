CREATE POLICY "Admin can update all profiles" 
ON public.profiles FOR UPDATE 
USING ( auth.jwt() ->> 'email' = 'admin@youngworld.life' );
