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
                            <div className="relative w-56 h-20">
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
                        <div className="bg-white/80 border border-sky-100 rounded-3xl p-8 backdrop-blur-sm sticky top-24 shadow-[0_8px_40px_rgba(14,165,233,0.06)]">
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
                                <h1 className="text-3xl font-display font-light uppercase tracking-tight mb-2 text-slate-800">
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
                        {/* Hype / Coming Soon Section */}
                        <div className="bg-white border border-sky-100 rounded-3xl p-12 relative overflow-hidden group min-h-[400px] flex flex-col justify-center items-center text-center shadow-sm">

                            <div className="relative z-10 space-y-6">
                                <div className="inline-block bg-sky-100 border border-sky-200 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-sky-800 mb-4 animate-bounce">
                                    Season 1 Loading...
                                </div>
                                <h2 className="text-5xl md:text-7xl font-display font-light uppercase tracking-tight text-slate-800 drop-shadow-sm">
                                    The Heat<br />Is Coming
                                </h2>
                                <p className="text-xl text-slate-500 max-w-xl mx-auto font-light leading-relaxed">
                                    $15,000 Prize Pool. Global Exposure. <br />
                                    Prepare your best clips. The world is watching.
                                </p>
                                <div className="pt-8">
                                    <button disabled className="bg-sky-50 text-sky-400 cursor-not-allowed border border-sky-100 px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-sky-100 transition-all">
                                        Submissions Opening Soon
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Globe Section */}
                        <div className="bg-white border border-sky-100 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-sm">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-sky-600 mb-6 text-center">Global Community Map</h3>
                            <InteractiveGlobe compact />
                        </div>

                        {/* Hype Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-8 rounded-3xl bg-white border border-sky-100 text-center relative overflow-hidden group hover:border-sky-300 transition-colors shadow-[0_4px_20px_rgba(14,165,233,0.03)]">
                                <div className="absolute inset-0 bg-sky-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="text-4xl font-display font-light text-sky-500 mb-2">$15K</div>
                                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Prize Pool</div>
                            </div>
                            <div className="p-8 rounded-3xl bg-white border border-sky-100 text-center relative overflow-hidden group hover:border-sky-300 transition-colors shadow-[0_4px_20px_rgba(14,165,233,0.03)]">
                                <div className="absolute inset-0 bg-sky-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="text-4xl font-display font-light text-sky-400 mb-2">Global</div>
                                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Competition</div>
                            </div>
                            <div className="p-8 rounded-3xl bg-white border border-sky-100 text-center relative overflow-hidden group hover:border-sky-300 transition-colors shadow-[0_4px_20px_rgba(14,165,233,0.03)]">
                                <div className="absolute inset-0 bg-sky-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="text-4xl font-display font-light text-slate-800 mb-2">Soon</div>
                                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Launch Date</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
