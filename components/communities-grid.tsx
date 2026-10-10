'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import flagsData from '@/utils/flags.json'

const countryFlags: Record<string, string> = {};
for (const [key, value] of Object.entries(flagsData)) {
    countryFlags[key.trim().toLowerCase()] = value as string;
}
countryFlags["bénin"] = "🇧🇯";
countryFlags["nuevo león méxico"] = "🇲🇽";

type Community = {
    id: string;
    full_name: string;
    community_type: string;
    city: string;
    country: string;
    created_at: string;
}

export default function CommunitiesGrid({ initialCommunities, error }: { initialCommunities: Community[], error?: any }) {
    const [searchQuery, setSearchQuery] = useState('')

    const filteredCommunities = initialCommunities.filter(community => {
        if (!searchQuery) return true;
        
        const name = community.community_type ? community.community_type : (community.full_name || 'Anonymous Creator');
        const city = community.city || '';
        const country = community.country || '';
        
        const searchTerm = searchQuery.toLowerCase();
        
        return name.toLowerCase().includes(searchTerm) || 
               city.toLowerCase().includes(searchTerm) || 
               country.toLowerCase().includes(searchTerm);
    })

    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                
                {/* Search Bar */}
                <div className="mb-12 max-w-2xl mx-auto relative">
                    <div className="relative flex items-center w-full h-14 rounded-full focus-within:shadow-lg bg-white overflow-hidden border border-gray-200 transition-shadow">
                        <div className="grid place-items-center h-full w-12 text-gray-400">
                            <Search className="w-5 h-5" />
                        </div>
                        <input
                            className="peer h-full w-full outline-none text-sm text-gray-700 pr-4 bg-transparent font-medium"
                            type="text"
                            id="search"
                            placeholder="Search by community name, city, country, or type..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredCommunities.map((community) => {
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
                
                {filteredCommunities.length === 0 && !error && (
                    <div className="text-center py-20 text-gray-500 font-medium bg-white rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
                        {searchQuery ? `No communities found matching "${searchQuery}".` : "No communities found yet. Be the first to join!"}
                    </div>
                )}
            </div>
        </section>
    )
}
