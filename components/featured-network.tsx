'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import countryFlagsData from '@/utils/flags.json';

const countryFlags: Record<string, string> = {};
for (const [key, value] of Object.entries(countryFlagsData)) {
  countryFlags[key.trim().toLowerCase()] = value as string;
}
countryFlags["bénin"] = "🇧🇯";
countryFlags["nuevo león méxico"] = "🇲🇽";

type Community = {
  id: string;
  full_name: string | null;
  community_type: string | null;
  city: string | null;
  country: string | null;
  community_photo_url: string | null;
  community_role: string | null;
  story: string | null;
};

type Props = {
  foundingCommunities: Community[];
  totalCommunities: number;
};

export default function FeaturedNetwork({ foundingCommunities, totalCommunities }: Props) {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // We want to shuffle through all communities
  useEffect(() => {
    if (foundingCommunities.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setFeaturedIndex((prev) => (prev + 1) % foundingCommunities.length);
        setIsAnimating(false);
      }, 300); // 300ms for fade out
    }, 3000); // Every 3 seconds

    return () => clearInterval(interval);
  }, [foundingCommunities.length]);

  if (!foundingCommunities.length) return null;

  const featured = foundingCommunities[featuredIndex];
  if (!featured) return null;

  const featuredName = featured.community_type || featured.full_name || 'Community';
  const featuredCleanCountry = featured.country ? featured.country.trim().toLowerCase() : '';
  const featuredFlag = featuredCleanCountry ? (countryFlags[featuredCleanCountry] || "🌍") : "🌍";
  const featuredCategory = featured.community_role || 'COMMUNITY';
  const featuredLocationStr = [featured.city, featured.country].filter(Boolean).join(' - ').toUpperCase();
  const featuredSlug = featuredName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  // Get 5 communities to show in the list (starting from the current featured)
  const visibleList = [];
  for (let i = 0; i < Math.min(5, foundingCommunities.length); i++) {
    visibleList.push(foundingCommunities[(featuredIndex + i) % foundingCommunities.length]);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
      {/* Featured Community (Left) */}
      <Link 
        href={`/community/${featuredSlug}`} 
        className={`flex-1 bg-[#2C1A14] text-white rounded-[24px] p-8 md:p-12 shadow-sm flex flex-col items-start justify-end min-h-[400px] lg:min-h-[500px] hover:shadow-md transition-all duration-300 group relative overflow-hidden ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
      >
        {featured.community_photo_url && (
            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none">
              <img src={featured.community_photo_url} className="w-full h-full object-cover" alt="" />
            </div>
        )}
        <div className="relative z-10 w-full mt-auto">
          <p className="text-[#F2B04E] font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 mb-3">
            <span>{featuredFlag}</span> {featuredLocationStr} - {featuredCategory.toUpperCase()} - FEATURED
          </p>
          <h3 className="text-4xl md:text-5xl font-serif font-bold mb-4">{featuredName}</h3>
          <p className="text-gray-300 font-medium line-clamp-3 mb-2 leading-relaxed">
            {featured.story || 'A room full of strangers becomes a room full of friends.'}
          </p>
        </div>
      </Link>

      {/* List of Communities (Right) */}
      <div className="flex-1 flex flex-col gap-3">
        {visibleList.map((c, idx) => {
          const name = c.community_type || c.full_name || 'Community';
          const cleanCountry = c.country ? c.country.trim().toLowerCase() : '';
          const flag = cleanCountry ? (countryFlags[cleanCountry] || "🌍") : "🌍";
          const initials = name.split(' ').map((n: string) => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
          const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
          const category = c.community_role || 'COMMUNITY';
          const loc = [c.city, c.country].filter(Boolean).join(', ');
          const isActive = idx === 0;

          return (
            <Link 
              href={`/community/${slug}`} 
              key={c.id} 
              className={`bg-white border rounded-[16px] p-4 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-sm transition-all text-slate-800 ${isActive ? 'border-[#C49232] shadow-sm' : 'border-gray-200'}`}
            >
              {c.community_photo_url ? (
                <img src={c.community_photo_url} alt={name} className={`w-12 h-12 rounded-full object-cover shrink-0 shadow-sm border bg-white transition-colors ${isActive ? 'border-[#C49232]' : 'border-gray-100'}`} />
              ) : (
                <div className={`w-12 h-12 rounded-full text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-inner transition-colors ${isActive ? 'bg-[#C49232]' : 'bg-[#4A3B32]'}`}>
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
          + {totalCommunities > 6 ? totalCommunities - 6 : 45} more — explore all →
        </Link>
      </div>
    </div>
  );
}
