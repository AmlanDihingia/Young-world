import Link from "next/link";
import { ArrowDown, Shirt, Music, Camera, Users, Hash, UserPlus, Share2 } from "lucide-react";
import HowItWorksTimeline from '@/components/how-it-works-timeline';
import RecentCommunities from '@/components/recent-communities';
import { createClient } from '@/utils/supabase/server'

import flagsData from '@/utils/flags.json';

// Comprehensive map of country names to flags
const countryFlags: Record<string, string> = {};
for (const [key, value] of Object.entries(flagsData)) {
  countryFlags[key.trim().toLowerCase()] = value as string;
}

// Add a few common variations just in case
countryFlags["bénin"] = "🇧🇯";
countryFlags["nuevo león méxico"] = "🇲🇽";

export default async function WaveTheWhite() {
    const supabase = await createClient()

    // Fetch founding communities (the oldest ones)
    const { data: foundingProfiles } = await supabase
        .from('profiles')
        .select('id, full_name, community_type, city, country, community_photo_url, community_role, story')
        .not('community_type', 'is', null)
        .neq('community_type', '')
        .order('created_at', { ascending: true })
        .limit(30)

    const foundingCommunities = foundingProfiles || [];
    const row1 = foundingCommunities.filter((_, i) => i % 2 === 0);
    const row2 = foundingCommunities.filter((_, i) => i % 2 !== 0);

    // Helper for rendering a marquee track
    const renderTrack = (items: typeof foundingCommunities, reverse: boolean) => {
      // Duplicate items multiple times to ensure seamless scrolling
      const repeatedItems = [...items, ...items, ...items, ...items];
      
      return (
        <div className="flex overflow-hidden w-full group">
          <div className={`flex whitespace-nowrap shrink-0 gap-4 sm:gap-6 px-2 sm:px-3 hover:[animation-play-state:paused] ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`} style={{ animationDuration: '240s' }}>
            {repeatedItems.map((community, idx) => {
              const name = community.community_type ? community.community_type : (community.full_name || 'Anonymous Creator');
              const cleanCountry = community.country ? community.country.trim().toLowerCase() : '';
              const flag = cleanCountry ? (countryFlags[cleanCountry] || "🌍") : "🌍";
              const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
              const location = [community.city, community.community_type || 'Community'].filter(Boolean).join(' · ');
              
              // Extract initials (e.g. "Women Cycling" -> "WC")
              const initials = String(name).split(' ').map((n: string) => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();

              return (
                <Link href={`/community/${slug}`} key={`${community.id}-${idx}`} className="shrink-0 max-w-[300px] bg-white rounded-full p-2 pr-6 shadow-sm border border-gray-100 flex items-center gap-3 hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer">
                  {community.community_photo_url ? (
                    <img src={community.community_photo_url} alt={name} className="w-auto h-12 max-w-[80px] object-contain shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-800 text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-inner">
                      {initials}
                    </div>
                  )}
                  <div className="flex flex-col min-w-0">
                    <h3 className="text-sm font-bold text-[#222222] leading-tight flex items-center gap-1.5">
                      <span className="text-base shrink-0">{flag}</span>
                      <span className="truncate">{name}</span>
                    </h3>
                    <p className="text-[11px] text-gray-500 font-medium truncate mt-0.5">
                      {location}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className={`flex whitespace-nowrap shrink-0 gap-4 sm:gap-6 px-2 sm:px-3 hover:[animation-play-state:paused] ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`} style={{ animationDuration: '240s' }} aria-hidden="true">
            {repeatedItems.map((community, idx) => {
              const name = community.community_type ? community.community_type : (community.full_name || 'Anonymous Creator');
              const cleanCountry = community.country ? community.country.trim().toLowerCase() : '';
              const flag = cleanCountry ? (countryFlags[cleanCountry] || "🌍") : "🌍";
              const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
              const location = [community.city, community.community_type || 'Community'].filter(Boolean).join(' · ');
              
              const initials = String(name).split(' ').map((n: string) => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();

              return (
                <Link href={`/community/${slug}`} key={`copy-${community.id}-${idx}`} className="shrink-0 max-w-[300px] bg-white rounded-full p-2 pr-6 shadow-sm border border-gray-100 flex items-center gap-3 hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer">
                  {community.community_photo_url ? (
                    <img src={community.community_photo_url} alt={name} className="w-auto h-12 max-w-[80px] object-contain shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-800 text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-inner">
                      {initials}
                    </div>
                  )}
                  <div className="flex flex-col min-w-0">
                    <h3 className="text-sm font-bold text-[#222222] leading-tight flex items-center gap-1.5">
                      <span className="text-base shrink-0">{flag}</span>
                      <span className="truncate">{name}</span>
                    </h3>
                    <p className="text-[11px] text-gray-500 font-medium truncate mt-0.5">
                      {location}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      );
    };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-sky-200 selection:text-sky-900">
      {/* 
        ========================================
        HERO SECTION
        ========================================
      */}
      <section className="relative w-full min-h-[85vh] flex flex-col justify-center overflow-hidden bg-[#FDFBF7]">
        {/* Hero Content */}
        <div className="relative z-10 container flex flex-col items-center justify-center text-center px-6 sm:px-8 pt-20 pb-12 md:pt-32 md:pb-24 w-full max-w-5xl mx-auto">
          
          {/* Subtitle */}
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#C49232] mb-6">
            THE HOME FOR THE WORLD&apos;S COMMUNITIES
          </p>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6rem] font-black tracking-tighter mb-8 text-[#222222] leading-[0.95]">
            Communities,<br />
            <span className="text-[#C49232] italic">everywhere.</span><br />
            And now, together.
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            From skate crews to run clubs to dance studios — Young World is where the world&apos;s communities are seen, connected, and celebrated. Discover them, and what they&apos;re up to, all over the world.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#events"
              className="bg-[#222222] text-white font-bold px-8 py-4 rounded-full hover:bg-black transition-colors flex items-center gap-2"
            >
              See community events
            </Link>
            <Link
              href="/communities"
              className="bg-transparent text-[#222222] border border-[#222222] font-bold px-8 py-4 rounded-full hover:bg-gray-50 transition-colors"
            >
              Meet the communities
            </Link>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        FOUNDING COMMUNITIES SECTION (OPTION E)
        ========================================
      */}
      <section id="communities" className="w-full py-10 md:py-24 bg-[#F8F6F0] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 mb-8 md:mb-12 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#222222] tracking-tight mb-3">
            The founding communities
          </h2>
          <p className="text-gray-600 font-medium text-sm md:text-base">
            A living wall, always moving. Hover to pause.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:gap-6 w-full">
          {renderTrack(row1, false)}
          {renderTrack(row2, true)}
        </div>

        <div className="mt-8 text-center text-xs text-gray-400 font-medium tracking-wide">
          ↑ these scroll on their own — hover any card to pause and read
        </div>
      </section>

      {/* 
        ========================================
        HAPPENING THIS WEEK SECTION
        ========================================
      */}
      <section id="events" className="w-full py-10 md:py-16 bg-[#FDFBF7]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-6 md:mb-10 gap-4">
            <h2 className="text-3xl md:text-4xl font-black text-[#222222] tracking-tight">
              Happening this week
            </h2>
            <Link href="#" className="text-[#C49232] font-bold text-sm hover:underline flex items-center gap-1 pb-1">
              See all events &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
              <div className="relative h-48 bg-[#4d3b2b] p-4 m-3 rounded-2xl">
                <div className="absolute top-4 left-4 bg-white rounded-xl py-1.5 px-3 flex flex-col items-center shadow-sm">
                  <span className="text-lg font-black text-[#222222] leading-none">14</span>
                  <span className="text-[9px] font-bold text-[#C49232] tracking-wider uppercase mt-1">JUN</span>
                </div>
              </div>
              <div className="p-5 pt-2 flex flex-col flex-1">
                <span className="text-[#C49232] text-[10px] font-bold uppercase tracking-widest mb-1.5">RUNNING</span>
                <h3 className="text-[1.15rem] font-bold text-[#222222] mb-1 leading-tight">Saturday Sunrise Run</h3>
                <p className="text-sm text-gray-500 font-medium mt-auto">Hycore Run Club &middot; Guwahati 🇮🇳</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
              <div className="relative h-48 bg-[#5c3727] p-4 m-3 rounded-2xl">
                <div className="absolute top-4 left-4 bg-white rounded-xl py-1.5 px-3 flex flex-col items-center shadow-sm">
                  <span className="text-lg font-black text-[#222222] leading-none">15</span>
                  <span className="text-[9px] font-bold text-[#C49232] tracking-wider uppercase mt-1">JUN</span>
                </div>
              </div>
              <div className="p-5 pt-2 flex flex-col flex-1">
                <span className="text-[#C49232] text-[10px] font-bold uppercase tracking-widest mb-1.5">SKATE</span>
                <h3 className="text-[1.15rem] font-bold text-[#222222] mb-1 leading-tight">Open Skate Jam</h3>
                <p className="text-sm text-gray-500 font-medium mt-auto">Girlskate Nairobi &middot; Nairobi 🇰🇪</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
              <div className="relative h-48 bg-[#2f423b] p-4 m-3 rounded-2xl">
                <div className="absolute top-4 left-4 bg-white rounded-xl py-1.5 px-3 flex flex-col items-center shadow-sm">
                  <span className="text-lg font-black text-[#222222] leading-none">16</span>
                  <span className="text-[9px] font-bold text-[#C49232] tracking-wider uppercase mt-1">JUN</span>
                </div>
              </div>
              <div className="p-5 pt-2 flex flex-col flex-1">
                <span className="text-[#C49232] text-[10px] font-bold uppercase tracking-widest mb-1.5">DANCE</span>
                <h3 className="text-[1.15rem] font-bold text-[#222222] mb-1 leading-tight">Breaking Cypher Night</h3>
                <p className="text-sm text-gray-500 font-medium mt-auto">Goma Breaking &middot; Goma 🇨🇩</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
              <div className="relative h-48 bg-[#2d283c] p-4 m-3 rounded-2xl">
                <div className="absolute top-4 left-4 bg-white rounded-xl py-1.5 px-3 flex flex-col items-center shadow-sm">
                  <span className="text-lg font-black text-[#222222] leading-none">18</span>
                  <span className="text-[9px] font-bold text-[#C49232] tracking-wider uppercase mt-1">JUN</span>
                </div>
              </div>
              <div className="p-5 pt-2 flex flex-col flex-1">
                <span className="text-[#C49232] text-[10px] font-bold uppercase tracking-widest mb-1.5">ROLLER</span>
                <h3 className="text-[1.15rem] font-bold text-[#222222] mb-1 leading-tight">Sunset Roll Meetup</h3>
                <p className="text-sm text-gray-500 font-medium mt-auto">Roller Dolls &middot; Monterrey 🇲🇽</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        EXPLORE BY WHAT YOU LOVE SECTION
        ========================================
      */}
      <section className="w-full py-10 md:py-16 bg-[#FDFBF7]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-6 md:mb-8 gap-4">
            <h2 className="text-3xl md:text-4xl font-black text-[#222222] tracking-tight">
              Explore by what you love
            </h2>
            <Link href="#" className="text-[#C49232] font-bold text-sm hover:underline flex items-center gap-1 pb-1">
              All categories &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {[
              { emoji: "🏃", title: "Running", subtitle: "Run clubs" },
              { emoji: "🛹", title: "Skating", subtitle: "Skate & roller crews" },
              { emoji: "💃", title: "Dance", subtitle: "Crews & studios" },
              { emoji: "🚴", title: "Cycling", subtitle: "Riding clubs" },
              { emoji: "🥋", title: "Martial Arts", subtitle: "Academies" },
              { emoji: "🤸", title: "Circus", subtitle: "Troupes" },
              { emoji: "🏋️", title: "Fitness", subtitle: "Gyms & groups" },
              { emoji: "🤍", title: "Purpose", subtitle: "NGOs & volunteers" },
            ].map((category, index) => (
              <Link href="#" key={index} className="bg-white rounded-[20px] p-6 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <span className="text-2xl mb-3 block">{category.emoji}</span>
                <h3 className="font-bold text-[#222222] text-[15px] mb-1">{category.title}</h3>
                <p className="text-xs text-gray-500 font-medium">{category.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* 
        ========================================
        WHY YOUNG WORLD SECTION
        ========================================
      */}
      <section className="w-full py-10 md:py-16 bg-[#FDFBF7]">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center">
          
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#C49232] mb-4 md:mb-6">
            WHY YOUNG WORLD
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#222222] tracking-tight mb-4 md:mb-6 leading-tight">
            It&apos;s not an app. It&apos;s a way<br />
            to <span className="text-[#C49232]">belong.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed mb-10 md:mb-16">
            Every city is full of people looking for their people. Young World is where you find them — and where the communities that make life better become easy to discover, join, and love.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Card 1 */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <span className="text-2xl mb-4 block">🔎</span>
              <h3 className="text-lg font-bold text-[#222222] mb-3">Discover</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Find real communities and events near you — by what you love and where you are.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <span className="text-2xl mb-4 block">🤝</span>
              <h3 className="text-lg font-bold text-[#222222] mb-3">Join</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Show up, take part, belong. One click to the community, one step to your people.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <span className="text-2xl mb-4 block">🌍</span>
              <h3 className="text-lg font-bold text-[#222222] mb-3">Belong to something bigger</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Your local crew is part of a global network of communities. Near you, and everywhere.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 
        ========================================
        GLOBAL NETWORK STATS SECTION
        ========================================
      */}
      <section className="w-full bg-[#F8F6F0] py-10 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          
          {/* Stats Header */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10 md:mb-16 text-center">
            <div className="flex flex-col items-center">
              <span className="text-5xl md:text-6xl font-black text-[#C49232] mb-2">100+</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">COMMUNITIES</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl md:text-6xl font-black text-[#C49232] mb-2">21</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">COUNTRIES</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl md:text-6xl font-black text-[#C49232] mb-2">5</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">CONTINENTS</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl md:text-6xl font-black text-[#C49232] mb-2">10+</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">CATEGORIES</span>
            </div>
          </div>

          <div className="mb-6 md:mb-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-[#222222] tracking-tight mb-3">
              A living, global network
            </h2>
            <p className="text-slate-600 font-medium text-sm md:text-base">
              A rotating spotlight — one crew featured, the rest a click away.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
            {/* Featured Community (Left) */}
            {(() => {
              const featured = foundingCommunities[4] || foundingCommunities[0];
              if (!featured) return null;
              
              const name = featured.community_type || featured.full_name || 'Community';
              const cleanCountry = featured.country ? featured.country.trim().toLowerCase() : '';
              const flag = cleanCountry ? (countryFlags[cleanCountry] || "🌍") : "🌍";
              const category = featured.community_role || 'COMMUNITY';
              const locationStr = [featured.city, featured.country].filter(Boolean).join(' - ').toUpperCase();
              const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
              
              return (
                <Link href={`/community/${slug}`} className="flex-1 bg-[#2C1A14] text-white rounded-[24px] p-8 md:p-12 shadow-sm flex flex-col items-start justify-end min-h-[400px] lg:min-h-[500px] hover:shadow-md transition-shadow group relative overflow-hidden">
                  {featured.community_photo_url && (
                     <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none">
                       <img src={featured.community_photo_url} className="w-full h-full object-cover" alt="" />
                     </div>
                  )}
                  <div className="relative z-10 w-full mt-auto">
                    <p className="text-[#F2B04E] font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 mb-3">
                      <span>{flag}</span> {locationStr} - {category.toUpperCase()} - FEATURED
                    </p>
                    <h3 className="text-4xl md:text-5xl font-serif font-bold mb-4">{name}</h3>
                    <p className="text-gray-300 font-medium line-clamp-3 mb-2 leading-relaxed">
                      {featured.story || 'A room full of strangers becomes a room full of friends.'}
                    </p>
                  </div>
                </Link>
              );
            })()}

            {/* List of Communities (Right) */}
            <div className="flex-1 flex flex-col gap-3">
              {foundingCommunities.slice(1, 6).map((c, idx) => {
                const name = c.community_type || c.full_name || 'Community';
                const cleanCountry = c.country ? c.country.trim().toLowerCase() : '';
                const flag = cleanCountry ? (countryFlags[cleanCountry] || "🌍") : "🌍";
                const initials = name.split(' ').map((n: string) => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
                const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                const category = c.community_role || 'COMMUNITY';
                const loc = [c.city, c.country].filter(Boolean).join(', ');

                return (
                  <Link href={`/community/${slug}`} key={c.id} className="bg-white border border-gray-200 rounded-[16px] p-4 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-sm transition-all text-slate-800">
                    {c.community_photo_url ? (
                      <img src={c.community_photo_url} alt={name} className="w-auto h-12 max-w-[60px] object-contain shrink-0" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#4A3B32] text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-inner">
                        {initials}
                      </div>
                    )}
                    <div className="flex flex-col flex-1 min-w-0">
                      <h4 className="font-bold text-[15px] truncate">{name}</h4>
                      <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5 truncate mt-0.5">
                        <span className="text-sm">{flag}</span> {loc}
                      </p>
                    </div>
                    <div className="text-[10px] font-bold text-[#D67138] uppercase tracking-widest shrink-0 ml-4 hidden sm:block">
                      {category}
                    </div>
                  </Link>
                )
              })}
              
              <Link href="/communities" className="bg-white border border-gray-200 rounded-full py-4 mt-1 text-center text-[#C49232] font-bold text-sm hover:bg-gray-50 transition-colors">
                + {foundingCommunities.length > 6 ? foundingCommunities.length - 6 : 45} more — explore all →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 
        ========================================
        CALL TO ACTION CARDS SECTION
        ========================================
      */}
      <section className="w-full bg-[#FDFBF7] py-10 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Card */}
            <div className="flex-1 bg-white rounded-[24px] p-10 md:p-14 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-start">
              <span className="text-[#C49232] font-bold text-xs tracking-[0.2em] uppercase mb-4">
                FOR COMMUNITIES
              </span>
              <h3 className="text-3xl md:text-4xl font-black mb-4 text-[#222222] tracking-tight">
                Run a community?
              </h3>
              <p className="text-gray-600 font-medium leading-relaxed mb-8 max-w-md">
                List your events, get discovered, connect with communities worldwide, and give your people a home. Free — always. We help you grow.
              </p>
              <div className="mt-auto pt-4">
                <Link href="/checkyourcommunityin" className="bg-[#222222] text-white font-bold py-4 px-8 rounded-full hover:bg-black transition-colors inline-block">
                  List your community
                </Link>
              </div>
            </div>

            {/* Right Card */}
            <div className="flex-1 bg-[#231F1A] text-white rounded-[24px] p-10 md:p-14 shadow-lg flex flex-col items-start">
              <span className="text-[#C49232] font-bold text-xs tracking-[0.2em] uppercase mb-4">
                FOR BRANDS & PARTNERS
              </span>
              <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
                Want to reach real communities?
              </h3>
              <p className="text-gray-400 font-medium leading-relaxed mb-8 max-w-md">
                Authentic, mission-first access to the world&apos;s communities — ethically, at global scale. Enable moments that matter.
              </p>
              <div className="mt-auto pt-4">
                <Link href="#" className="bg-[#C49232] text-black font-bold py-4 px-8 rounded-full hover:bg-[#b0832d] transition-colors inline-block">
                  Partner with us
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 
        ========================================
        RECENT COMMUNITIES SECTION
        ========================================
      */}

      {/* <RecentCommunities /> */}

      {/* 
        ========================================
        LIVE CITY WALL SECTION (HIDDEN)
        ========================================
      */}
      {false && (<>
        <section className="w-full py-28 md:py-40 bg-gradient-to-b from-white to-sky-50/50 border-t border-sky-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-20">
            <div className="inline-block bg-sky-100 text-sky-800 px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 animate-pulse">
              Coming Soon
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight mb-6 text-slate-800">
              Live City Wall
            </h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
              The wave is spreading. Watch creators from around the globe join the movement in real-time.
            </p>
          </div>

          {/* City Wall Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
            {[
              { name: "Kathmandu", delay: "0s", image: "https://images.unsplash.com/photo-1623492701902-47dc207df5dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
              { name: "Shillong", delay: "0.2s", image: "https://images.unsplash.com/photo-1625826415766-001bd75aaf52?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
              { name: "Colombo", delay: "0.4s", image: "https://images.unsplash.com/photo-1623595289196-007a22dd8560?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
              { name: "Bali", delay: "0.6s", image: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
              { name: "Guwahati", delay: "0.8s", image: "https://images.unsplash.com/photo-1611336814186-914161b9bdb6?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            ].map((city, idx) => (
              <div key={idx} className="flex flex-col gap-3 group">
                <div className="relative aspect-[9/16] bg-sky-100/50 rounded-3xl overflow-hidden shadow-sm border border-sky-100 group-hover:shadow-[0_8px_30px_rgba(212,156,7,0.15)] group-hover:-translate-y-1 transition-all duration-500">
                  {/* City Background Image */}
                  <img src={city.image} alt={city.name} className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-700" />
                  
                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-900/80 via-sky-900/10 to-transparent z-10"></div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-40 z-10 text-white group-hover:opacity-80 transition-opacity">
                    <svg className="w-12 h-12 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  <div className="absolute bottom-5 left-5 right-5 z-20 flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-sky-100 drop-shadow-md mb-1">Coming Soon</span>
                    <h3 className="text-white font-medium text-xl tracking-wide drop-shadow-md">
                      {city.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ========================================
        FEATURED CREATOR REELS SECTION
        ========================================
      */}
      <section className="w-full py-28 md:py-40 bg-white text-slate-800 border-t border-sky-50 overflow-hidden relative">
        {/* Dynamic Background Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-100/40 rounded-full blur-[150px] translate-y-1/4 -translate-x-1/4 pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="max-w-2xl">
              <div className="inline-block bg-sky-100 text-sky-800 border border-sky-200 px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Featured
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight mb-6 drop-shadow-sm text-slate-800">
                Creator Reels
              </h2>
              <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed">
                Best clips, emotional edits, and city waves. Experience the energy.
              </p>
            </div>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-sky-600 hover:text-sky-800 transition-colors group pb-2 border-b-2 border-sky-100 hover:border-sky-500">
              Watch All
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Reels Carousel/Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { title: "The Best of NYC", type: "City Wave", views: "1.2M", delay: "0s" },
              { title: "Moments of Peace", type: "Emotional Edit", views: "850K", delay: "0.2s" },
              { title: "Skating the White", type: "Action", views: "2.1M", delay: "0.4s" },
              { title: "Global Montage", type: "Best Reel", views: "3.5M", delay: "0.6s" },
            ].map((reel, idx) => (
              <div key={idx} className="group relative aspect-[9/16] bg-sky-50 rounded-3xl overflow-hidden cursor-pointer shadow-md border border-sky-100 hover:shadow-[0_8px_30px_rgba(212,156,7,0.15)] hover:border-sky-300 transition-all duration-500 hover:-translate-y-2">
                
                {/* Simulated Video Background */}
                <div className="absolute inset-0 bg-sky-200/50 animate-pulse" style={{ animationDelay: reel.delay }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/80 via-sky-900/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500 z-10"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-16 h-16 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/60 group-hover:scale-110 group-hover:bg-white group-hover:text-sky-500 transition-all duration-500 text-white shadow-lg">
                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-6 left-5 right-5 z-20 transform group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="bg-sky-500 text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest shadow-sm">
                      {reel.type}
                    </span>
                    <span className="text-[10px] font-bold text-sky-100 drop-shadow-md">
                      {reel.views} Views
                    </span>
                  </div>
                  <h3 className="text-xl font-medium text-white leading-tight drop-shadow-md">
                    {reel.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </>)}

      {/* 
        ========================================
        JOIN THE MOVEMENT SECTION
        ========================================
      */}
      <section id="join" className="relative w-full pb-12 md:pb-16 bg-sky-50/30 text-slate-800 overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-100/50 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">

          {/* Reinforcement Block (HIDDEN) */}
          {false && (
          <div className="max-w-4xl mx-auto text-center border border-sky-50 shadow-[0_8px_40px_rgba(212,156,7,0.06)] rounded-3xl p-10 md:p-14 mb-16 bg-white relative overflow-hidden">
            {/* Inner Glare Effect */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-sky-50/50 to-transparent pointer-events-none"></div>

            <h4 className="text-3xl md:text-4xl font-light mb-6 tracking-tight text-slate-800">That&apos;s it.</h4>
            <div className="text-lg md:text-xl text-slate-500 space-y-2 font-light">
              <p>No choreography. No location required.</p>
              <p>From your home to the beach to the streets —</p>
              <p className="font-normal text-sky-600 mt-4 text-2xl drop-shadow-sm">peace can start anywhere.</p>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/checkyourcommunityin"
                className="bg-sky-500 text-white font-medium py-3.5 px-8 rounded-full text-lg shadow-[0_4px_14px_rgba(212,156,7,0.39)] hover:bg-sky-600 hover:scale-105 transition-all w-full sm:w-auto"
              >
                JOIN THE ROLL CALL
              </Link>
              <a
                href="#listen"
                className="bg-sky-50 border border-sky-100 text-sky-700 hover:bg-sky-100 font-medium py-3.5 px-8 rounded-full flex items-center justify-center gap-2 transition-all shadow-sm w-full sm:w-auto"
              >
                <Music className="w-4 h-4" /> Listen to the Track
              </a>
            </div>
          </div>
          )}



          {/* 
            ========================================
            STAY CONNECTED SECTION (Removed)
            ========================================
          */}

        </div>
      </section>

    </main>
  );
}
