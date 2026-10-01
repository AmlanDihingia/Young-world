import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LogOut, User, MapPin, Globe, Trophy } from 'lucide-react'
import Image from 'next/image'
import InteractiveGlobe from '@/components/interactive-globe'

export default async function DashboardPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    // Profile photo is stored in auth user_metadata during signup
    const profilePhotoUrl: string | null =
        user.user_metadata?.profile_photo_url ||
        profile?.profile_photo_url ||
        null

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-sky-50 text-slate-800 selection:bg-sky-200 selection:text-sky-900 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-100/40 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-50 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

            {/* Navbar */}
            <nav className="border-b border-sky-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <Link href="/dashboard" className="flex items-center gap-2 group">
                            <div className="relative w-36 h-14">
                                <Image
                                    src="/logo.png"
                                    alt="Young World Logo"
                                    fill
                                    sizes="224px"
                                    className="object-contain object-left group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </Link>
                        <div className="flex items-center gap-4">
                            <form action="/auth/signout" method="post">
                                <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500 hover:text-sky-600 transition-colors">
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/80 border border-sky-100 rounded-3xl p-8 backdrop-blur-sm sticky top-24 shadow-[0_8px_40px_rgba(212,156,7,0.06)]">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-32 h-32 rounded-full bg-sky-200 p-1 mb-6 shadow-sm">
                                    <div className="w-full h-full rounded-full bg-sky-50 flex items-center justify-center overflow-hidden relative">
                                        {profilePhotoUrl ? (
                                            <Image
                                                src={profilePhotoUrl}
                                                alt={profile?.full_name || 'Profile Photo'}
                                                fill
                                                sizes="128px"
                                                unoptimized
                                                className="object-cover"
                                            />
                                        ) : (
                                            <User className="w-12 h-12 text-sky-400" />
                                        )}
                                    </div>
                                </div>
                                <h1 className="text-3xl font-display font-bold uppercase tracking-tight mb-2 text-slate-800">
                                    {profile?.full_name || 'Creator'}
                                </h1>
                                <p className="text-slate-500 font-medium text-sm uppercase tracking-widest mb-8">
                                    {user.email}
                                </p>

                                <div className="w-full space-y-4">
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-sky-50/50 border border-sky-100">
                                        <MapPin className="w-5 h-5 text-sky-500" />
                                        <div className="text-left">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Location</p>
                                            <p className="font-medium text-slate-700">{profile?.country || 'Unknown'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-sky-50/50 border border-sky-100">
                                        <Globe className="w-5 h-5 text-sky-400" />
                                        <div className="text-left overflow-hidden">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Social</p>
                                            <a href={profile?.social_url} target="_blank" rel="noopener noreferrer" className="font-medium text-slate-700 hover:text-sky-600 transition-colors truncate block">
                                                {profile?.social_url ? new URL(profile.social_url).hostname + new URL(profile.social_url).pathname : 'No Link'}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Welcome / Check-in Confirmation Section */}
                        <div className="bg-gradient-to-br from-sky-400 to-sky-600 rounded-3xl p-10 md:p-12 relative overflow-hidden group min-h-[320px] flex flex-col justify-center shadow-lg border border-sky-300">
                            {/* Decorative background elements */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[60px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-300/30 rounded-full blur-[60px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

                            <div className="relative z-10 space-y-6 text-white">
                                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white shadow-sm">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                    Successfully Checked In
                                </div>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight drop-shadow-md">
                                    Welcome to<br />Wave the White
                                </h2>
                                <p className="text-lg md:text-xl text-sky-50 max-w-xl font-light leading-relaxed">
                                    You&apos;re officially on the roll call for Friendship Day. Now, pass it on.
                                </p>
                                
                                <div className="pt-4 flex flex-wrap gap-4">
                                    <button disabled className="bg-white/50 text-sky-600/50 px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-widest cursor-not-allowed shadow-none">
                                        Anthem Dropping Soon
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Community Details */}
                        <div className="bg-white border border-sky-100 rounded-3xl p-8 relative overflow-hidden shadow-[0_4px_20px_rgba(212,156,7,0.03)] hover:shadow-[0_8px_30px_rgba(212,156,7,0.06)] transition-shadow">
                            <div className="flex items-center justify-between mb-6 border-b border-sky-50 pb-4">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-sky-600">Your Community Profile</h3>
                                {profile?.community_photo_url && (
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-green-500 flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                                        Photo Uploaded
                                    </div>
                                )}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Community Type</p>
                                    <p className="font-medium text-slate-800 text-lg capitalize">{profile?.community_type || 'Not specified'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Your Role</p>
                                    <p className="font-medium text-slate-800 text-lg capitalize">{profile?.community_role || 'Not specified'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Size</p>
                                    <p className="font-medium text-slate-800 text-lg">{profile?.participation_size || 'Not specified'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Instagram</p>
                                    {profile?.community_insta ? (
                                        <a href={profile.community_insta} target="_blank" rel="noopener noreferrer" className="font-medium text-sky-500 hover:text-sky-600 transition-colors truncate block text-lg">
                                            {profile.community_insta.replace(/https?:\/\/(www\.)?instagram\.com\//, '@').replace(/\/$/, '') || 'View Profile'}
                                        </a>
                                    ) : (
                                        <p className="font-medium text-slate-500 italic text-lg">Not linked</p>
                                    )}
                                </div>
                                
                                {profile?.story && (
                                    <div className="md:col-span-2 pt-2">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Community Story</p>
                                        <p className="text-slate-600 leading-relaxed italic border-l-2 border-sky-200 pl-4 py-1">
                                            &quot;{profile.story}&quot;
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Globe Section */}
                        <div className="bg-white border border-sky-100 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-sm">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-sky-600 mb-6 text-center">Global Community Map</h3>
                            <InteractiveGlobe compact />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
