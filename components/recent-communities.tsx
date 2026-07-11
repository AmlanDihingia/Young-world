import { createClient } from '@/utils/supabase/server'
import { MapPin, Clock } from 'lucide-react'

// Simple time ago utility function
function timeAgo(dateString: string) {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    let interval = seconds / 31536000
    if (interval > 1) return Math.floor(interval) + " years ago"
    
    interval = seconds / 2592000
    if (interval > 1) return Math.floor(interval) + " months ago"
    
    interval = seconds / 86400
    if (interval > 1) return Math.floor(interval) + " days ago"
    
    interval = seconds / 3600
    if (interval > 1) return Math.floor(interval) + " hours ago"
    
    interval = seconds / 60
    if (interval > 1) return Math.floor(interval) + " minutes ago"
    
    return Math.floor(seconds) + " seconds ago"
}

export default async function RecentCommunities() {
    const supabase = await createClient()

    // Fetch the 6 most recent profiles
    const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, full_name, community_type, city, country, created_at')
        .not('created_at', 'is', null)
        .order('created_at', { ascending: false })
        .limit(6)

    if (error || !profiles || profiles.length === 0) {
        return null // Hide section if there's an error or no data
    }

    return (
        <section className="relative w-full py-16 md:py-24 bg-gradient-to-b from-white to-sky-50/30 text-slate-800 border-t border-sky-50 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-100/40 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-white/60 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
                <div className="text-center mb-12 md:mb-16">
                    <div className="inline-block bg-white text-sky-600 border border-sky-200 px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
                        Live Feed
                    </div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight mb-4 text-slate-800">
                        Recently Joined
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
                        The wave is spreading in real-time. Welcome to our newest communities across the globe.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profiles.map((p) => {
                        const name = p.community_type ? p.community_type : (p.full_name || 'Anonymous Creator');
                        const location = [p.city, p.country].filter(Boolean).join(', ') || 'Unknown Location';
                        
                        return (
                            <div 
                                key={p.id}
                                className="group relative bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-sky-200/50 hover:shadow-[0_20px_40px_rgba(212,156,7,0.12)] hover:border-sky-300 hover:-translate-y-1.5 transition-all duration-500 overflow-hidden"
                            >
                                {/* Premium glowing background effect */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-400/10 rounded-full blur-3xl group-hover:bg-sky-400/20 transition-all duration-500 pointer-events-none -mr-10 -mt-10" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-sky-200/30 rounded-full blur-2xl transition-all duration-500 pointer-events-none -ml-6 -mb-6" />
                                
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100 flex items-center justify-center text-sky-500 shrink-0 shadow-inner border border-sky-50 group-hover:scale-110 transition-transform duration-500">
                                            {p.community_type ? (
                                                <svg className="w-7 h-7 drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-7 h-7 drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wide uppercase text-slate-500 bg-slate-50/80 backdrop-blur-sm border border-slate-100 px-3.5 py-1.5 rounded-full shadow-sm">
                                            <Clock className="w-3.5 h-3.5 text-sky-500" />
                                            {timeAgo(p.created_at)}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-slate-800 mb-2.5 leading-tight group-hover:text-sky-700 transition-colors duration-300">
                                        {name}
                                    </h3>
                                    
                                    <div className="flex items-center gap-2 text-slate-500 font-medium">
                                        <MapPin className="w-4 h-4 shrink-0 text-sky-500" />
                                        <span className="truncate tracking-wide">{location}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
