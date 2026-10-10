import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import InteractiveGlobe from '@/components/interactive-globe'
import CommunitiesGrid from '@/components/communities-grid'

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
        .or('is_hidden.is.null,is_hidden.eq.false')
        .order('created_at', { ascending: false })

    const communities = profiles || [];
    const uniqueCountriesSet = new Set(communities.map(c => c.country?.trim().toLowerCase()).filter(Boolean));
    const uniqueCountries = uniqueCountriesSet.size > 0 ? uniqueCountriesSet.size : 0;

    const getContinent = (country: string) => {
      const c = country.toLowerCase().trim();
      const africa = ['algeria', 'angola', 'benin', 'botswana', 'burkina faso', 'burundi', 'cabo verde', 'cameroon', 'central african republic', 'chad', 'comoros', 'congo - kinshasa', 'congo - brazzaville', 'congo (kinshasa)', 'congo (brazzaville)', 'drc', "cote d'ivoire", 'djibouti', 'egypt', 'equatorial guinea', 'eritrea', 'eswatini', 'ethiopia', 'gabon', 'gambia', 'ghana', 'guinea', 'guinea-bissau', 'ivory coast', 'kenya', 'lesotho', 'liberia', 'libya', 'madagascar', 'malawi', 'mali', 'mauritania', 'mauritius', 'morocco', 'mozambique', 'namibia', 'niger', 'nigeria', 'rwanda', 'sao tome & principe', 'senegal', 'seychelles', 'sierra leone', 'somalia', 'south africa', 'south sudan', 'sudan', 'tanzania', 'togo', 'tunisia', 'uganda', 'zambia', 'zimbabwe', 'cape verde', 'réunion', 'western sahara', 'mayotte', 'st. helena'];
      const asia = ['afghanistan', 'armenia', 'azerbaijan', 'bahrain', 'bangladesh', 'bhutan', 'brunei', 'cambodia', 'china', 'cyprus', 'georgia', 'india', 'indonesia', 'iran', 'iraq', 'israel', 'japan', 'jordan', 'kazakhstan', 'kuwait', 'kyrgyzstan', 'laos', 'lebanon', 'malaysia', 'maldives', 'mongolia', 'myanmar (burma)', 'myanmar', 'nepal', 'north korea', 'oman', 'pakistan', 'palestinian territories', 'palestine', 'philippines', 'qatar', 'saudi arabia', 'singapore', 'south korea', 'sri lanka', 'syria', 'taiwan', 'tajikistan', 'thailand', 'timor-leste', 'turkey', 'turkmenistan', 'united arab emirates', 'uzbekistan', 'vietnam', 'yemen', 'macau sar china', 'hong kong sar china', 'british indian ocean territory'];
      const europe = ['albania', 'andorra', 'austria', 'belarus', 'belgium', 'bosnia & herzegovina', 'bulgaria', 'croatia', 'czechia', 'denmark', 'estonia', 'finland', 'france', 'germany', 'greece', 'hungary', 'iceland', 'ireland', 'italy', 'kosovo', 'latvia', 'liechtenstein', 'lithuania', 'luxembourg', 'malta', 'moldova', 'monaco', 'montenegro', 'netherlands', 'macedonia', 'norway', 'poland', 'portugal', 'romania', 'russia', 'san marino', 'serbia', 'slovakia', 'slovenia', 'spain', 'sweden', 'switzerland', 'ukraine', 'united kingdom', 'uk', 'england', 'scotland', 'wales', 'isle of man', 'jersey', 'guernsey', 'faroe islands', 'gibraltar', 'svalbard & jan mayen', 'åland islands'];
      const northAmerica = ['antigua & barbuda', 'bahamas', 'barbados', 'belize', 'canada', 'costa rica', 'cuba', 'dominica', 'dominican republic', 'el salvador', 'grenada', 'guatemala', 'haiti', 'honduras', 'jamaica', 'mexico', 'nicaragua', 'panama', 'st. kitts & nevis', 'st. lucia', 'st. vincent & grenadines', 'trinidad & tobago', 'united states', 'usa', 'us', 'america', 'bermuda', 'greenland', 'puerto rico', 'u.s. virgin islands', 'british virgin islands', 'cayman islands', 'turks & caicos islands', 'st. martin', 'sint maarten', 'aruba', 'curaçao', 'caribbean netherlands', 'st. barthélemy', 'martinique', 'guadeloupe', 'st. pierre & miquelon'];
      const southAmerica = ['argentina', 'bolivia', 'brazil', 'chile', 'colombia', 'ecuador', 'guyana', 'paraguay', 'peru', 'suriname', 'uruguay', 'venezuela', 'french guiana', 'falkland islands'];
      const oceania = ['australia', 'fiji', 'kiribati', 'marshall islands', 'micronesia', 'nauru', 'new zealand', 'palau', 'papua new guinea', 'samoa', 'solomon islands', 'tonga', 'tuvalu', 'vanuatu', 'french polynesia', 'new caledonia', 'guam', 'northern mariana islands', 'american samoa', 'wallis & futuna', 'cook islands', 'niue', 'tokelau', 'pitcairn islands', 'norfolk island'];
      
      if (africa.includes(c)) return 'Africa';
      if (asia.includes(c)) return 'Asia';
      if (europe.includes(c)) return 'Europe';
      if (northAmerica.includes(c)) return 'North America';
      if (southAmerica.includes(c)) return 'South America';
      if (oceania.includes(c)) return 'Oceania';
      return 'Unknown';
    };

    const uniqueContinentsSet = new Set(
      Array.from(uniqueCountriesSet)
        .map(country => getContinent(country as string))
        .filter(continent => continent !== 'Unknown')
    );
    const totalContinents = uniqueContinentsSet.size > 0 ? uniqueContinentsSet.size : 0;

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
                                    <span className="text-4xl md:text-5xl font-black text-[#C49232] mb-1">{totalContinents}</span>
                                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-500">CONTINENTS</span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>

            {/* Grid */}
            <CommunitiesGrid initialCommunities={communities} error={error} />
        </main>
    )
}
