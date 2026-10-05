import Link from "next/link";
import { ArrowDown, Shirt, Music, Camera, Users, Hash, UserPlus, Share2 } from "lucide-react";
import InteractiveGlobe from '@/components/interactive-globe';
import HowItWorksTimeline from '@/components/how-it-works-timeline';
import RecentCommunities from '@/components/recent-communities';

export default function WaveTheWhite() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-sky-200 selection:text-sky-900">
      {/* 
        ========================================
        HERO SECTION
        ========================================
      */}
      <section className="relative w-full min-h-[85vh] flex flex-col justify-center overflow-hidden bg-[#FDFBF7]">
        {/* Hero Content */}
        <div className="relative z-10 container flex flex-col items-center justify-center text-center px-6 sm:px-8 pt-32 pb-24 w-full max-w-5xl mx-auto">
          
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
              href="#"
              className="bg-[#222222] text-white font-bold px-8 py-4 rounded-full hover:bg-black transition-colors flex items-center gap-2"
            >
              See community events
            </Link>
            <Link
              href="#"
              className="bg-transparent text-[#222222] border border-[#222222] font-bold px-8 py-4 rounded-full hover:bg-gray-50 transition-colors"
            >
              Meet the communities
            </Link>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        FOUNDING COMMUNITIES SECTION
        ========================================
      */}
      <section className="w-full py-12 md:py-16 bg-[#EFE9DF]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#222222] tracking-tight mb-3">
                The founding communities
              </h2>
              <p className="text-gray-600 font-medium text-sm md:text-base max-w-2xl">
                The ones who believed first — across 21 countries and five continents. Every one has a home here.
              </p>
            </div>
            <Link href="#" className="text-[#C49232] font-bold text-sm hover:underline flex items-center gap-1 shrink-0">
              Explore all &rarr;
            </Link>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/community/five6seven8" className="bg-white text-gray-800 rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"><span>🇿🇦</span> Five6seven8</Link>
            <Link href="/community/girlskate-nairobi" className="bg-white text-gray-800 rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"><span>🇰🇪</span> Girlskate Nairobi</Link>
            <Link href="/community/hycore-run-club" className="bg-white text-gray-800 rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"><span>🇮🇳</span> Hycore Run Club</Link>
            <Link href="/community/goma-breaking" className="bg-white text-gray-800 rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"><span>🇨🇩</span> Goma Breaking</Link>
            <Link href="/community/roller-dolls" className="bg-white text-gray-800 rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"><span>🇲🇽</span> Roller Dolls</Link>
            <Link href="/community/women-cycling-nepal" className="bg-white text-gray-800 rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"><span>🇳🇵</span> Women Cycling Nepal</Link>
            <Link href="/community/ghana-bmx" className="bg-white text-gray-800 rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"><span>🇬🇭</span> Ghana BMX</Link>
            <Link href="/community/caribbean-basketball" className="bg-white text-gray-800 rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"><span>🇯🇲</span> Caribbean Basketball</Link>
            <Link href="/community/kigali-skates" className="bg-white text-gray-800 rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"><span>🇷🇼</span> Kigali Skates</Link>
            <Link href="/community/guetapens-crew" className="bg-white text-gray-800 rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"><span>🇫🇷</span> Guetapens Crew</Link>
            <Link href="/communities" className="bg-white text-gray-600 rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">+ 40 more</Link>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        HAPPENING THIS WEEK SECTION
        ========================================
      */}
      <section className="w-full py-12 md:py-16 bg-[#FDFBF7]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
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
      <section className="w-full py-12 md:py-16 bg-[#FDFBF7]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
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
      <section className="w-full py-12 md:py-16 bg-[#FDFBF7]">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center">
          
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#C49232] mb-6">
            WHY YOUNG WORLD
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#222222] tracking-tight mb-6 leading-tight">
            It&apos;s not an app. It&apos;s a way<br />
            to <span className="text-[#C49232]">belong.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed mb-16">
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
      <section className="w-full bg-[#1E1B18] text-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <span className="text-5xl md:text-6xl font-black text-[#C49232] mb-2">100+</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">COMMUNITIES</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl md:text-6xl font-black text-[#C49232] mb-2">21</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">COUNTRIES</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl md:text-6xl font-black text-[#C49232] mb-2">5</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">CONTINENTS</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl md:text-6xl font-black text-[#C49232] mb-2">10+</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">CATEGORIES</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
            A living, global network
          </h2>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            <span className="bg-[#2A251D] border border-[#3A3328] rounded-full px-5 py-2.5 text-sm font-medium flex items-center gap-2"><span>🇰🇪</span> Girlskate Nairobi</span>
            <span className="bg-[#2A251D] border border-[#3A3328] rounded-full px-5 py-2.5 text-sm font-medium flex items-center gap-2"><span>🇮🇳</span> Hycore Run Club</span>
            <span className="bg-[#2A251D] border border-[#3A3328] rounded-full px-5 py-2.5 text-sm font-medium flex items-center gap-2"><span>🇨🇩</span> Goma Breaking</span>
            <span className="bg-[#2A251D] border border-[#3A3328] rounded-full px-5 py-2.5 text-sm font-medium flex items-center gap-2"><span>🇲🇽</span> Roller Dolls</span>
            <span className="bg-[#2A251D] border border-[#3A3328] rounded-full px-5 py-2.5 text-sm font-medium flex items-center gap-2"><span>🇿🇦</span> Five6seven8</span>
            <span className="bg-[#2A251D] border border-[#3A3328] rounded-full px-5 py-2.5 text-sm font-medium flex items-center gap-2"><span>🇳🇵</span> Women Cycling Nepal</span>
            <span className="bg-[#2A251D] border border-[#3A3328] rounded-full px-5 py-2.5 text-sm font-medium flex items-center gap-2"><span>🇬🇭</span> Ghana BMX</span>
            <span className="bg-[#2A251D] border border-[#3A3328] rounded-full px-5 py-2.5 text-sm font-medium flex items-center gap-2"><span>🇯🇲</span> Caribbean Basketball</span>
            <span className="bg-[#2A251D] border border-[#3A3328] rounded-full px-5 py-2.5 text-sm font-medium flex items-center gap-2"><span>🇫🇷</span> Guetapens Crew</span>
            <span className="bg-[#2A251D] border border-[#3A3328] rounded-full px-5 py-2.5 text-sm font-medium text-gray-400 flex items-center gap-2">+ many more</span>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        CALL TO ACTION CARDS SECTION
        ========================================
      */}
      <section className="w-full bg-[#FDFBF7] py-12 md:py-16">
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
        GLOBAL COMMUNITY GLOBE SECTION
        ========================================
      */}
      <section id="global-community" className="relative w-full py-12 md:py-16 bg-white text-slate-800 border-t border-sky-50 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-50/50 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-100/30 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block bg-sky-100 text-black border border-sky-200 px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Live Map
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight mb-4 text-slate-800">
              The Global Community
            </h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
              Watch the wave spread across the world. Every point is a community or creator who checked in.
            </p>
          </div>

          <InteractiveGlobe />
        </div>
      </section>

      <RecentCommunities />

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
            STAY CONNECTED SECTION
            ========================================
          */}
          <div className="max-w-3xl mx-auto mt-8 md:mt-12 text-center pb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Stay Connected</p>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 w-full">
              <a
                href="https://www.instagram.com/uncleyoung94/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-full border border-sky-100 bg-white hover:border-sky-400 hover:bg-sky-50 transition-all text-slate-700 text-sm font-medium shadow-sm hover:shadow-md group"
              >
                <svg className="w-5 h-5 text-pink-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Follow Uncle Young
              </a>

              <a
                href="https://www.instagram.com/youngworld.life/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-full border border-sky-100 bg-white hover:border-sky-400 hover:bg-sky-50 transition-all text-slate-700 text-sm font-medium shadow-sm hover:shadow-md group"
              >
                <svg className="w-5 h-5 text-pink-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Follow YWE on Instagram
              </a>

              <a
                href="https://www.youtube.com/channel/UCZXQF9XIs1vV5QwQpSBrrcw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-full border border-sky-100 bg-white hover:border-sky-400 hover:bg-sky-50 transition-all text-slate-700 text-sm font-medium shadow-sm hover:shadow-md group"
              >
                <svg className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
                </svg>
                Subscribe to YouTube
              </a>

              <span
                className="flex items-center gap-3 px-6 py-3 rounded-full border border-sky-100 bg-white text-slate-700 text-sm font-medium shadow-sm opacity-40 cursor-not-allowed pointer-events-none select-none"
              >
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </span>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
