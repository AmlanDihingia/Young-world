import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LogOut, ExternalLink, Image as ImageIcon, CheckCircle, Clock } from 'lucide-react'
import Image from 'next/image'

// Replace this with your actual admin email!
const ADMIN_EMAIL = 'admin@youngworld.life'

export default async function AdminDashboardPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    // Security Check: Ensure only the admin email can access
    if (user.email !== ADMIN_EMAIL) {
        // You can redirect unauthorized users back to their dashboard
        return redirect('/dashboard')
    }

    // Fetch all profiles (registrations)
    const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-sky-200 selection:text-sky-900">
            {/* Navbar */}
            <nav className="border-b border-sky-100 bg-white sticky top-0 z-50 shadow-sm">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard" className="flex items-center gap-2 group">
                                <div className="relative w-40 h-16">
                                    <Image
                                        src="/logo.png"
                                        alt="Young World Logo"
                                        fill
                                        className="object-contain object-left group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </Link>
                            <span className="bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">Admin</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <span className="text-sm font-medium text-slate-500">{user.email}</span>
                            <form action="/auth/signout" method="post">
                                <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500 hover:text-red-500 transition-colors">
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="w-full px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-light uppercase tracking-tight text-slate-800 mb-2">Roll Call Registrations</h1>
                        <p className="text-slate-500">Overview of all community check-ins and registrations.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-sm font-medium text-slate-600">Total: {profiles?.length || 0}</span>
                        </div>
                    </div>
                </div>

                {/* Data Table Container */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                    <th className="px-6 py-4">User Details</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4">Community</th>
                                    <th className="px-6 py-4">Size</th>
                                    <th className="px-6 py-4">Story</th>
                                    <th className="px-6 py-4">Media</th>
                                    <th className="px-6 py-4">Registered</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {profiles && profiles.length > 0 ? (
                                    profiles.map((profile) => (
                                        <tr key={profile.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4 align-top">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-slate-800">{profile.full_name || 'N/A'}</span>
                                                    <span className="text-xs text-slate-500 mb-1">ID: {profile.id.substring(0, 8)}...</span>
                                                    {profile.mobile && <span className="text-xs text-slate-600">Tel: {profile.mobile}</span>}
                                                    {profile.social_url && (
                                                        <a href={profile.social_url} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-600 text-xs flex items-center gap-1 mt-1">
                                                            Instagram <ExternalLink className="w-3 h-3" />
                                                        </a>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 align-top">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-slate-700">{profile.city || 'N/A'}</span>
                                                    <span className="text-sm text-slate-500">{profile.country || 'N/A'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 align-top min-w-[200px]">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sky-700 text-sm">{profile.community_type || 'N/A'}</span>
                                                    <span className="text-xs text-slate-500 mt-0.5">Role: {profile.community_role || 'N/A'}</span>
                                                    {profile.community_insta && (
                                                        <a href={profile.community_insta} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-600 text-xs flex items-center gap-1 mt-2">
                                                            Comm. Insta <ExternalLink className="w-3 h-3" />
                                                        </a>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 align-top">
                                                <span className="inline-flex items-center justify-center bg-sky-100 text-sky-800 font-bold px-2.5 py-1 rounded-full text-xs">
                                                    {profile.participation_size || '?'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 align-top max-w-[250px]">
                                                <p className="text-sm text-slate-600 line-clamp-3" title={profile.story}>
                                                    &quot;{profile.story || 'No story provided.'}&quot;
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 align-top">
                                                <div className="flex flex-col gap-2">
                                                    {profile.profile_photo_url ? (
                                                        <a href={profile.profile_photo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-sky-600 bg-white border border-slate-200 px-2 py-1 rounded transition-colors">
                                                            <ImageIcon className="w-3.5 h-3.5 text-sky-500" />
                                                            Profile
                                                        </a>
                                                    ) : <span className="text-xs text-slate-400">No Profile Img</span>}

                                                    {profile.community_photo_url ? (
                                                        <a href={profile.community_photo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-sky-600 bg-white border border-slate-200 px-2 py-1 rounded transition-colors">
                                                            <ImageIcon className="w-3.5 h-3.5 text-sky-500" />
                                                            Community
                                                        </a>
                                                    ) : <span className="text-xs text-slate-400">No Comm. Img</span>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 align-top text-sm text-slate-500">
                                                {new Date(profile.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                                            <div className="flex flex-col items-center justify-center">
                                                <Clock className="w-8 h-8 mb-3 text-slate-300" />
                                                <p className="text-lg font-medium">No registrations yet.</p>
                                                <p className="text-sm">Once users join the roll call, they will appear here.</p>
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
