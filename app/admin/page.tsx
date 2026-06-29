import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LogOut, ExternalLink, Image as ImageIcon, Users, Clock, Map, Activity, Shield, MoreHorizontal, ChevronRight, Search } from 'lucide-react'
import Image from 'next/image'

const ADMIN_EMAIL = 'admin@youngworld.life'

function getInitials(name: string | null) {
    if (!name) return '?'
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
}

// Helper to get a consistent color based on a string
function getColorClass(str: string) {
    const colors = ['bg-blue-100 text-blue-700', 'bg-indigo-100 text-indigo-700', 'bg-violet-100 text-violet-700', 'bg-purple-100 text-purple-700', 'bg-fuchsia-100 text-fuchsia-700']
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
}

export default async function AdminDashboardPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    if (user.email !== ADMIN_EMAIL) {
        return redirect('/dashboard')
    }

    const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    let recentRegistrations = 0
    const communities = new Set<string>()

    profiles?.forEach(p => {
        if (new Date(p.created_at) >= sevenDaysAgo) recentRegistrations++
        if (p.community_type && p.community_type.trim() !== '') {
            communities.add(p.community_type.trim().toLowerCase())
        }
    })

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-20 selection:bg-blue-200">
            {/* Minimalist Topbar */}
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-6">
                            <Link href="/dashboard" className="flex items-center gap-2 group">
                                <div className="relative w-24 h-8">
                                    <Image
                                        src="/logo.png"
                                        alt="Young World Logo"
                                        fill
                                        className="object-contain object-left opacity-90 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            </Link>
                            <div className="h-4 w-[1px] bg-slate-300 hidden sm:block"></div>
                            <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600">
                                <Shield className="w-4 h-4 text-blue-600" />
                                Admin Console
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <div className="hidden sm:flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                                <span className="text-sm font-medium text-slate-600">{user.email}</span>
                            </div>
                            <form action="/auth/signout" method="post">
                                <button className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                                    Sign out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Header section with KPIs */}
                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900">Roll Call Overview</h1>
                        <p className="text-sm text-slate-500 mt-1">Manage and view all registered users and communities.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-slate-500">
                                <Users className="w-4 h-4" />
                                <span className="text-xs font-semibold uppercase tracking-wider">Total Users</span>
                            </div>
                            <span className="text-3xl font-semibold text-slate-900">{profiles?.length || 0}</span>
                        </div>
                        
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-slate-500">
                                <Activity className="w-4 h-4" />
                                <span className="text-xs font-semibold uppercase tracking-wider">New (7d)</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-semibold text-slate-900">{recentRegistrations}</span>
                                {recentRegistrations > 0 && <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+{recentRegistrations} active</span>}
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-slate-500">
                                <Map className="w-4 h-4" />
                                <span className="text-xs font-semibold uppercase tracking-wider">Communities</span>
                            </div>
                            <span className="text-3xl font-semibold text-slate-900">{communities.size}</span>
                        </div>
                    </div>
                </div>

                {/* Professional Data Table */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    {/* Table Header Controls (Fake search/filter for aesthetics) */}
                    <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                        <div className="relative w-64">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input type="text" placeholder="Search users..." disabled className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent opacity-60 cursor-not-allowed" />
                        </div>
                        <div className="text-xs font-medium text-slate-500">
                            Showing {profiles?.length || 0} results
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    <th className="px-6 py-3">User</th>
                                    <th className="px-6 py-3">Contact</th>
                                    <th className="px-6 py-3">Location</th>
                                    <th className="px-6 py-3">Community</th>
                                    <th className="px-6 py-3 min-w-[200px]">Story</th>
                                    <th className="px-6 py-3">Media</th>
                                    <th className="px-6 py-3">Joined</th>
                                    <th className="px-4 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {profiles && profiles.length > 0 ? (
                                    profiles.map((profile) => (
                                        <tr key={profile.id} className="hover:bg-slate-50/80 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${getColorClass(profile.full_name || profile.id)}`}>
                                                        {getInitials(profile.full_name)}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-slate-900">{profile.full_name || 'Anonymous'}</span>
                                                        <span className="text-[11px] text-slate-500 font-mono">{profile.id.substring(0, 8)}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    {profile.mobile ? (
                                                        <span className="text-slate-600">{profile.mobile}</span>
                                                    ) : (
                                                        <span className="text-slate-400 italic">No phone</span>
                                                    )}
                                                    {profile.social_url && (
                                                        <a href={profile.social_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-[11px] font-medium flex items-center gap-1 transition-colors">
                                                            Instagram <ExternalLink className="w-3 h-3" />
                                                        </a>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-slate-900 font-medium">{profile.city || '-'}</span>
                                                    <span className="text-slate-500 text-xs">{profile.country || '-'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col items-start gap-1.5">
                                                    {profile.community_type ? (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200 whitespace-normal">
                                                            {profile.community_type}
                                                        </span>
                                                    ) : (
                                                        <span className="text-slate-400 text-xs">-</span>
                                                    )}
                                                    
                                                    {profile.community_role && (
                                                        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">
                                                            {profile.community_role}
                                                        </span>
                                                    )}

                                                    {profile.community_insta && (
                                                        <a href={profile.community_insta} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-800 text-[11px] font-medium flex items-center gap-1 transition-colors mt-0.5">
                                                            Comm. Insta <ExternalLink className="w-3 h-3" />
                                                        </a>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-normal min-w-[200px] max-w-[250px]">
                                                {profile.story ? (
                                                    <p className="text-xs text-slate-600 line-clamp-3" title={profile.story}>
                                                        &quot;{profile.story}&quot;
                                                    </p>
                                                ) : (
                                                    <span className="text-slate-400 text-xs italic">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    {profile.profile_photo_url ? (
                                                        <a href={profile.profile_photo_url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-300 transition-all shadow-sm" title="View Profile Photo">
                                                            <ImageIcon className="w-4 h-4" />
                                                        </a>
                                                    ) : (
                                                        <div className="p-1.5 rounded-md bg-slate-50 border border-slate-100 text-slate-300" title="No Profile Photo">
                                                            <ImageIcon className="w-4 h-4 opacity-50" />
                                                        </div>
                                                    )}
                                                    {profile.community_photo_url ? (
                                                        <a href={profile.community_photo_url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-sm" title="View Community Photo">
                                                            <Users className="w-4 h-4" />
                                                        </a>
                                                    ) : (
                                                        <div className="p-1.5 rounded-md bg-slate-50 border border-slate-100 text-slate-300" title="No Community Photo">
                                                            <Users className="w-4 h-4 opacity-50" />
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-slate-900 font-medium">
                                                        {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </span>
                                                    <span className="text-slate-500 text-[11px]">
                                                        {new Date(profile.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <button className="p-1 text-slate-400 hover:text-slate-600 rounded">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-3">
                                                    <Clock className="w-6 h-6 text-slate-400" />
                                                </div>
                                                <h3 className="text-sm font-medium text-slate-900">No records found</h3>
                                                <p className="text-xs text-slate-500 mt-1">Registrations will appear here.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}
