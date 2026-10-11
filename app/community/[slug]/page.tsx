import Link from "next/link";
import { notFound } from "next/navigation";

import { createClient } from '@/utils/supabase/server';
import JoinCommunityModal from '@/components/join-community-modal';

import flagsData from '@/utils/flags.json';

const countryFlags: Record<string, string> = {};
for (const [key, value] of Object.entries(flagsData)) {
  countryFlags[key.trim().toLowerCase()] = value as string;
}
countryFlags["bénin"] = "🇧🇯";
countryFlags["nuevo león méxico"] = "🇲🇽";

// Mock data fallback - used only if a community profile is not yet in Supabase
const mockCommunities = [
  {
    slug: "five6seven8",
    name: "Five6seven8",
    country: "South Africa",
    flag: "🇿🇦",
    category: "Dance",
    description: "Five6seven8 is a multi-genre dance studio in Randburg, Johannesburg, home to 20+ dance styles across four studio spaces. We started as a space to teach dance and have grown into a full community, students, instructors, wedding couples, corporate teams and families who keep coming back not just for the classes but for each other. Our people range from complete beginners to lifelong dancers, and what holds us together is simple: we believe movement brings people closer, whether that's on a dance floor, in a yoga class, or just showing up for one another. Joining Wave The White felt like a natural extension of that, community has always been at the heart of what we do.",
    insta: "https://instagram.com/five6seven8",
    members: "100+ Members",
    loveMost: "The moment a room full of strangers becomes a room full of friends. Whether it's a first-time student nervous at the door or a group taking on a new style together, watching people show up badly and beautifully, and keep coming back, is what makes Five6seven8 more than a studio. It makes it a home.",
    proudOf: "Building a space where 20+ dance styles and hundreds of people from completely different backgrounds all find somewhere to belong. I'm proud that Five6seven8 has grown from a single studio into an ecosystem, teaching, events, weddings, community give-back, without losing the personal feel that made people want to stay in the first place.",
    logo: "/five6seven8-logo.jpg",
  },
  {
    slug: "girlskatenairobi",
    name: "Girlskate Nairobi",
    country: "Kenya",
    flag: "🇰🇪",
    category: "Skate",
    description: "Empowering girls and women through skateboarding in Nairobi. We build confidence, community, and shred the streets together.",
    insta: "https://instagram.com/girlskatenairobi",
  },
  {
    slug: "hycorerunclub",
    name: "Hycore Run Club",
    country: "India",
    flag: "🇮🇳",
    category: "Running",
    description: "A community of runners pushing limits, supporting each other, and taking over the streets of Guwahati.",
    insta: "https://instagram.com/hycorerunclub",
  },
  {
    slug: "gomabreaking",
    name: "Goma Breaking",
    country: "DRC",
    flag: "🇨🇩",
    category: "Dance",
    description: "Uniting youth in Goma through the art, discipline, and expression of breakdancing.",
    insta: "https://instagram.com/gomabreaking",
  },
  {
    slug: "rollerdolls",
    name: "Roller Dolls",
    country: "Mexico",
    flag: "🇲🇽",
    category: "Roller",
    description: "Fierce, fun, and fast. The premier roller derby and skating community in Mexico.",
    insta: "https://instagram.com/rollerdolls",
  },
  {
    slug: "womencyclingnepal",
    name: "Women Cycling Nepal",
    country: "Nepal",
    flag: "🇳🇵",
    category: "Cycling",
    description: "Promoting women's health, independence, and environmental consciousness through cycling across the beautiful landscapes of Nepal.",
    insta: "https://instagram.com/womencyclingnepal",
  },
  {
    slug: "ghanabmx",
    name: "Ghana BMX",
    country: "Ghana",
    flag: "🇬🇭",
    category: "BMX",
    description: "Taking BMX culture in Ghana to the next level. Tricks, community, and passion on two wheels.",
    insta: "https://instagram.com/ghanabmx",
  },
  {
    slug: "caribbeanbasketball",
    name: "Caribbean Basketball",
    country: "Jamaica",
    flag: "🇯🇲",
    category: "Basketball",
    description: "Elevating the game of basketball across the Caribbean, fostering talent, teamwork, and community spirit.",
    insta: "https://instagram.com/caribbeanbasketball",
  },
  {
    slug: "kigaliskates",
    name: "Kigali Skates",
    country: "Rwanda",
    flag: "🇷🇼",
    category: "Skate",
    description: "Building a supportive and progressive skate scene in the heart of Kigali.",
    insta: "https://instagram.com/kigaliskates",
  },
  {
    slug: "guetapenscrew",
    name: "Guetapens Crew",
    country: "France",
    flag: "🇫🇷",
    category: "Dance",
    description: "A dynamic dance crew bringing innovative choreography and infectious energy to the French dance scene.",
    insta: "https://instagram.com/guetapenscrew",
  }
];

type Props = {
  params: Promise<{ slug: string }>;
};

const normalizeSlug = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

export default async function CommunityPage(props: Props) {
  const params = await props.params;
  const cleanParamsSlug = normalizeSlug(params.slug);
  
  // 1. Fetch from Supabase FIRST so inputs from admin dashboard always take precedence
  const supabase = await createClient();
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .or('is_hidden.is.null,is_hidden.eq.false');

  let community: any = null;

  if (profiles) {
    const dbCommunity = profiles.find(p => {
      const name = p.community_type ? p.community_type.trim() : (p.full_name?.trim() || 'Anonymous Creator');
      const slug = normalizeSlug(name);
      if (slug === cleanParamsSlug) return true;

      // Also check if slug matches legacy mock slug for this community
      const mockMatch = mockCommunities.find(m => normalizeSlug(m.slug) === cleanParamsSlug || normalizeSlug(m.name) === cleanParamsSlug);
      if (mockMatch) {
        const mockSlug = normalizeSlug(mockMatch.name);
        if (slug === mockSlug || name.toLowerCase().includes(mockMatch.name.toLowerCase())) {
          return true;
        }
      }
      return false;
    });

    if (dbCommunity) {
      const name = dbCommunity.community_type ? dbCommunity.community_type.trim() : (dbCommunity.full_name?.trim() || 'Anonymous Creator');
      const cleanCountry = dbCommunity.country ? dbCommunity.country.trim().toLowerCase() : '';
      const flag = cleanCountry ? (countryFlags[cleanCountry] || "🌍") : "🌍";

      community = {
        slug: cleanParamsSlug,
        name: name,
        country: dbCommunity.country || "Unknown",
        flag: flag,
        category: dbCommunity.community_role || "Community",
        description: dbCommunity.story || `The official community page for ${name}.`,
        insta: dbCommunity.community_insta || dbCommunity.social_url || "#",
        members: dbCommunity.participation_size || "Growing every day",
        logo: dbCommunity.community_photo_url || null,
        loveMost: dbCommunity.what_we_love_most || null,
        proudOf: dbCommunity.proudest_moment || null,
        featuredReel: dbCommunity.featured_reel || null,
        coverPhoto: dbCommunity.cover_photo_url || null,
        city: dbCommunity.city || null,
        facebook: dbCommunity.community_facebook || null,
      };
    }
  }

  // 2. Fallback to mock data only if not found in Supabase
  if (!community) {
    community = mockCommunities.find(c => normalizeSlug(c.slug) === cleanParamsSlug || normalizeSlug(c.name) === cleanParamsSlug);
  }

  if (!community) {
    notFound();
  }

  // Helper to fix Google Drive links so they can be used as images
  let finalCoverPhoto = (community as any).coverPhoto;
  if (finalCoverPhoto && finalCoverPhoto.includes('drive.google.com')) {
    const match = finalCoverPhoto.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      finalCoverPhoto = `https://lh3.googleusercontent.com/d/${match[1]}=w2000`;
    }
  }

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-foreground">
      {/* Hero */}
      <section className="relative w-full pt-36 sm:pt-40 pb-20 border-b border-gray-200 bg-[#1E1B18] overflow-hidden">
        {finalCoverPhoto ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={finalCoverPhoto} 
              alt="Cover" 
              className="absolute inset-0 w-full h-full object-cover z-0" 
            />
            {/* Subtle gradient overlay to keep text crystal clear */}
            <div className="absolute inset-0 bg-black/50 z-0" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#2C1A14] via-[#1E1B18] to-[#141210] z-0" />
        )}
        <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center text-4xl md:text-5xl shadow-sm border border-gray-100 shrink-0 overflow-hidden">
              {/* @ts-ignore - logo might not exist on all items yet */}
              {community.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={(community as any).logo} alt={`${community.name} logo`} className="w-full h-full object-cover" />
              ) : (
                community.flag
              )}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-[#222222] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  {community.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                {community.name}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="w-full py-16 bg-[#FDFBF7]">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <div className="md:col-span-2 space-y-12">
              <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
                <h3 className="text-xl font-bold text-[#222222] mb-4">Upcoming Events</h3>
                <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <p className="text-gray-500 font-medium">No upcoming events listed yet.</p>
                  <button className="mt-4 bg-[#222222] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-black transition-colors">
                    Get Notified
                  </button>
                </div>
              </div>

              {/* Mobile-only Community Info — shown right below Upcoming Events */}
              <div className="md:hidden">
                <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
                  <h3 className="font-bold text-[#222222] text-lg mb-5 tracking-tight">Community Info</h3>

                  {/* Flag + Location */}
                  <div className="flex items-center gap-3 mb-5 bg-gradient-to-r from-gray-50 to-transparent p-3 rounded-xl">
                    <span className="text-4xl leading-none">{community.flag}</span>
                    <div>
                      {(community as any).city && (
                        <p className="text-sm font-semibold text-[#222222]">{(community as any).city}</p>
                      )}
                      <p className="text-sm text-slate-500">{community.country}</p>
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Category</span>
                      <span className="text-sm font-semibold text-[#222222]">{community.category}</span>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Members</span>
                      <span className="text-sm font-semibold text-[#222222]">{(community as any).members || "Growing every day"}</span>
                    </div>
                  </div>

                  {/* Social Handles */}
                  {((community.insta && community.insta !== '#') || (community as any).facebook) && (
                    <div className="flex items-center gap-3 mb-5">
                      {community.insta && community.insta !== '#' && (
                        <a
                          href={community.insta}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] text-white text-xs font-bold px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                          Instagram
                        </a>
                      )}
                      {(community as any).facebook && (
                        <a
                          href={(community as any).facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-[#1877F2] text-white text-xs font-bold px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                          Facebook
                        </a>
                      )}
                    </div>
                  )}

                  <JoinCommunityModal
                    communityName={community.name}
                    communitySlug={community.slug}
                    defaultCountry={community.country !== 'Unknown' ? community.country : ''}
                  />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#222222] mb-6">About the Community</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {community.description}
                </p>
              </div>

              {/* Featured Reel from Admin Dashboard */}
              {(community as any).featuredReel && (
                <div>
                  <h3 className="text-xl font-bold text-[#222222] mb-4">Featured Reel</h3>
                  <div className="w-full sm:w-[400px] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 bg-white">
                    <iframe 
                      src={(community as any).featuredReel.split('?')[0].replace(/\/$/, '') + '/embed'} 
                      width="100%" 
                      height="500" 
                      style={{ border: 'none' }}
                      scrolling="no" 
                      allow="encrypted-media"
                    ></iframe>
                  </div>
                </div>
              )}

              {/* @ts-ignore */}
              {(community as any).loveMost && (
                <div>
                  <h3 className="text-xl font-bold text-[#222222] mb-4">What we love most</h3>
                  <p className="text-lg text-slate-600 leading-relaxed bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
                    {/* @ts-ignore */}
                    {(community as any).loveMost}
                  </p>
                </div>
              )}

              {/* @ts-ignore */}
              {(community as any).proudOf && (
                <div>
                  <h3 className="text-xl font-bold text-[#222222] mb-4">Proudest moment</h3>
                  <p className="text-lg text-slate-600 leading-relaxed bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
                    {/* @ts-ignore */}
                    {(community as any).proudOf}
                  </p>
                </div>
              )}
            </div>

            {/* Desktop sidebar — hidden on mobile */}
            <div className="hidden md:block md:col-span-1">
              <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 sticky top-24">
                <h3 className="font-bold text-[#222222] mb-6 tracking-tight">Community Info</h3>
                
                {/* Flag + Location */}
                <div className="flex items-center gap-3 mb-6 bg-gradient-to-r from-gray-50 to-transparent p-3 rounded-xl">
                  <span className="text-4xl leading-none">{community.flag}</span>
                  <div>
                    {(community as any).city && (
                      <p className="text-sm font-semibold text-[#222222]">{(community as any).city}</p>
                    )}
                    <p className="text-sm text-slate-500">{community.country}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1">Category</span>
                    <span className="text-[#222222] font-medium">{community.category}</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1">Members</span>
                    <span className="text-[#222222] font-medium">{(community as any).members || "Growing every day"}</span>
                  </div>
                </div>

                {/* Social Handles */}
                {((community.insta && community.insta !== '#') || (community as any).facebook) && (
                  <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-100">
                    {community.insta && community.insta !== '#' && (
                      <a 
                        href={community.insta} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] text-white hover:opacity-90 transition-opacity"
                        title="Instagram"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    )}
                    {(community as any).facebook && (
                      <a 
                        href={(community as any).facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1877F2] text-white hover:opacity-90 transition-opacity"
                        title="Facebook"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                )}

                <div className="mt-6">
                  <JoinCommunityModal 
                    communityName={community.name}
                    communitySlug={community.slug}
                    defaultCountry={community.country !== 'Unknown' ? community.country : ''}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
