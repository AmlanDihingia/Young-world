import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import InteractiveGlobe from '@/components/interactive-globe'

import flagsData from '@/utils/flags.json';

// Comprehensive map of country names to flags
const countryFlags: Record<string, string> = {};
for (const [key, value] of Object.entries(flagsData)) {
    countryFlags[key.trim().toLowerCase()] = value as string;
}

// Add a few common variations just in case
countryFlags["bénin"] = "🇧🇯";
countryFlags["nuevo león méxico"] = "🇲🇽";

export default async function CommunitiesPage() {
    const supabase = await createClient()

    // Fetch all profiles from Supabase to show as communities
    const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, full_name, community_type, city, country, created_at')
        .not('community_type', 'is', null)
        .neq('community_type', '')
        .order('created_at', { ascending: false })

    const communities = profiles || [];
    const uniqueCountries = new Set(communities.map(c => c.country?.trim().toLowerCase()).filter(Boolean)).size;

    return (
        <main className="min-h-screen bg-[#FDFBF7] text-foreground">
            {/* Header */}
            <section className="pt-32 pb-16 bg-[#EFE9DF] border-b border-gray-200">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#222222] tracking-tight mb-4">
                        The Global Network
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                        Explore all the incredible communities from around the world that have joined the movement.
                    </p>
                </div>
            </section>

            {/* 
              ========================================
              OPTION A — SIDE BY SIDE GLOBE SECTION
              ========================================
            */}
            <section id="global-community" className="relative w-full py-12 md:py-16 bg-[#FDFBF7] overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <div className="bg-[#161413] rounded-[32px] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                        
                        {/* Left: Globe (Smaller) */}
                        <div className="w-full lg:w-[45%] aspect-square max-h-[450px] bg-[#0A0A0A] rounded-[24px] overflow-hidden flex items-center justify-center border border-white/5 shadow-inner relative shrink-0">
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                                <div className="w-full h-full flex items-center justify-center">
                                    <InteractiveGlobe />
                                </div>
                            </div>
                        </div>

                        {/* Right: Content & Stats */}
                        <div className="w-full lg:w-[55%] flex flex-col items-start text-left">
                            <div className="inline-block bg-[#2A2418] text-[#C49232] border border-[#3D3320] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                                LIVE MAP
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-black tracking-tight mb-6 text-white leading-[1.05]">
                                A living, global network.
                            </h2>
                            <p className="text-lg text-gray-400 font-medium leading-relaxed mb-12 max-w-lg">
                                Every point is a community or creator who joined the wave — across continents, in real cities.
                            </p>

                            <div className="flex items-center gap-8 md:gap-12 text-white w-full">
                                <div className="flex flex-col">
                                    <span className="text-4xl md:text-5xl font-black text-[#C49232] mb-1">{communities.length}</span>
                                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-500">COMMUNITIES</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-4xl md:text-5xl font-black text-[#C49232] mb-1">{uniqueCountries || 24}</span>
                                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-500">COUNTRIES</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-4xl md:text-5xl font-black text-[#C49232] mb-1">5</span>
                                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-500">CONTINENTS</span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>

            {/* Grid */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {communities.map((community) => {
                            const name = community.community_type ? community.community_type : (community.full_name || 'Anonymous Creator');
                            const location = [community.city, community.country].filter(Boolean).join(', ');
                            const cleanCountry = community.country ? community.country.trim().toLowerCase() : '';
                            const flag = cleanCountry ? (countryFlags[cleanCountry] || "🌍") : "🌍";

                            // Basic slugify for URL
                            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

                            return (
                                <Link href={`/community/${slug}`} key={community.id} className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col hover:-translate-y-1 hover:shadow-md transition-all group">
                                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">{flag}</div>
                                    <h3 className="text-xl font-bold text-[#222222] mb-2 leading-tight">
                                        {name}
                                    </h3>
                                    <p className="text-sm text-gray-500 font-medium mt-auto">
                                        {location || "Location Unknown"}
                                    </p>
                                </Link>
                            )
                        })}
                    </div>
                    {communities.length === 0 && !error && (
                        <div className="text-center py-20 text-gray-500 font-medium bg-white rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
                            No communities found yet. Be the first to join!
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}
