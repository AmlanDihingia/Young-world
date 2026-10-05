import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

// Quick helper to map some common country names to flags
// For others, it will fallback to a generic world emoji.
const countryFlags: Record<string, string> = {
  "South Africa": "🇿🇦",
  "Kenya": "🇰🇪",
  "India": "🇮🇳",
  "DRC": "🇨🇩",
  "Mexico": "🇲🇽",
  "Nepal": "🇳🇵",
  "Ghana": "🇬🇭",
  "Jamaica": "🇯🇲",
  "Rwanda": "🇷🇼",
  "France": "🇫🇷",
  "United States": "🇺🇸",
  "United Kingdom": "🇬🇧",
  "Canada": "🇨🇦",
  "Australia": "🇦🇺",
  "Brazil": "🇧🇷",
  "Japan": "🇯🇵",
  "Germany": "🇩🇪",
  "Nigeria": "🇳🇬"
}

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

            {/* Grid */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {communities.map((community) => {
                            const name = community.community_type ? community.community_type : (community.full_name || 'Anonymous Creator');
                            const location = [community.city, community.country].filter(Boolean).join(', ');
                            const flag = community.country ? (countryFlags[community.country] || "🌍") : "🌍";
                            
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
