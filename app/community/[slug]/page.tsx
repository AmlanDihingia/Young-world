import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data - in a real app this would come from Supabase
const communities = [
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
    slug: "girlskate-nairobi",
    name: "Girlskate Nairobi",
    country: "Kenya",
    flag: "🇰🇪",
    category: "Skate",
    description: "Empowering girls and women through skateboarding in Nairobi. We build confidence, community, and shred the streets together.",
    insta: "https://instagram.com/girlskatenairobi",
  },
  {
    slug: "hycore-run-club",
    name: "Hycore Run Club",
    country: "India",
    flag: "🇮🇳",
    category: "Running",
    description: "A community of runners pushing limits, supporting each other, and taking over the streets of Guwahati.",
    insta: "https://instagram.com/hycorerunclub",
  },
  {
    slug: "goma-breaking",
    name: "Goma Breaking",
    country: "DRC",
    flag: "🇨🇩",
    category: "Dance",
    description: "Uniting youth in Goma through the art, discipline, and expression of breakdancing.",
    insta: "https://instagram.com/gomabreaking",
  },
  {
    slug: "roller-dolls",
    name: "Roller Dolls",
    country: "Mexico",
    flag: "🇲🇽",
    category: "Roller",
    description: "Fierce, fun, and fast. The premier roller derby and skating community in Mexico.",
    insta: "https://instagram.com/rollerdolls",
  },
  {
    slug: "women-cycling-nepal",
    name: "Women Cycling Nepal",
    country: "Nepal",
    flag: "🇳🇵",
    category: "Cycling",
    description: "Promoting women's health, independence, and environmental consciousness through cycling across the beautiful landscapes of Nepal.",
    insta: "https://instagram.com/womencyclingnepal",
  },
  {
    slug: "ghana-bmx",
    name: "Ghana BMX",
    country: "Ghana",
    flag: "🇬🇭",
    category: "BMX",
    description: "Taking BMX culture in Ghana to the next level. Tricks, community, and passion on two wheels.",
    insta: "https://instagram.com/ghanabmx",
  },
  {
    slug: "caribbean-basketball",
    name: "Caribbean Basketball",
    country: "Jamaica",
    flag: "🇯🇲",
    category: "Basketball",
    description: "Elevating the game of basketball across the Caribbean, fostering talent, teamwork, and community spirit.",
    insta: "https://instagram.com/caribbeanbasketball",
  },
  {
    slug: "kigali-skates",
    name: "Kigali Skates",
    country: "Rwanda",
    flag: "🇷🇼",
    category: "Skate",
    description: "Building a supportive and progressive skate scene in the heart of Kigali.",
    insta: "https://instagram.com/kigaliskates",
  },
  {
    slug: "guetapens-crew",
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

export default async function CommunityPage(props: Props) {
  const params = await props.params;
  const community = communities.find(c => c.slug === params.slug);

  if (!community) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-foreground">
      {/* Hero */}
      <section className="relative w-full pt-32 pb-20 bg-[#EFE9DF] border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <Link href="/" className="text-[#C49232] font-bold text-sm hover:underline mb-8 inline-block">
            &larr; Back to Home
          </Link>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mt-4">
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
                <span className="text-gray-500 font-medium text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {community.country}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-[#222222] tracking-tight mb-4">
                {community.name}
              </h1>
              <a 
                href={community.insta} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#C49232] hover:text-[#b0832d] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="w-full py-16 bg-[#FDFBF7]">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <div className="md:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-[#222222] mb-6">About the Community</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {community.description}
                </p>
              </div>

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
              
              <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
                <h3 className="text-xl font-bold text-[#222222] mb-4">Upcoming Events</h3>
                <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <p className="text-gray-500 font-medium">No upcoming events listed yet.</p>
                  <button className="mt-4 bg-[#222222] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-black transition-colors">
                    Get Notified
                  </button>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 sticky top-24">
                <h3 className="font-bold text-[#222222] mb-6 tracking-tight">Community Info</h3>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1">Location</span>
                    <span className="text-[#222222] font-medium">{community.country}</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1">Category</span>
                    <span className="text-[#222222] font-medium">{community.category}</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1">Members</span>
                    {/* @ts-ignore */}
                    <span className="text-[#222222] font-medium">{(community as any).members || "Growing every day"}</span>
                  </div>
                </div>

                <button className="w-full mt-8 bg-[#C49232] text-white font-bold py-4 rounded-full hover:bg-[#b0832d] transition-colors">
                  Join Community
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
