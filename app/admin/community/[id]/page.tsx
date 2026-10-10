import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { updateCommunity } from './actions'
import { ArrowLeft } from 'lucide-react'

export default async function EditCommunityPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== 'admin@youngworld.life') {
        return redirect('/login')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single()

    if (!profile) {
        return redirect('/admin')
    }

    // Prepare update action with ID binding
    const updateAction = updateCommunity.bind(null, id)

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-20">
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-4 flex items-center">
                    <Link href="/admin" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Admin Dashboard
                    </Link>
                </div>
            </nav>

            <main className="max-w-[800px] mx-auto px-4 sm:px-6 py-12">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Edit Community Details</h1>
                    <p className="text-sm text-slate-500 mb-8">
                        Update the information that will be displayed on this community's public page.
                    </p>

                    <form action={updateAction} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Community Name</label>
                                <input 
                                    name="name" 
                                    type="text" 
                                    defaultValue={profile.community_type || profile.full_name || ''} 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Category (e.g., Dance, Skate, Run)</label>
                                <input 
                                    name="category" 
                                    type="text" 
                                    defaultValue={profile.community_role || 'Community'} 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Country</label>
                                <input 
                                    name="country" 
                                    type="text" 
                                    defaultValue={profile.country || ''} 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Members (e.g., "Growing every day", "50+")</label>
                                <input 
                                    name="members" 
                                    type="text" 
                                    defaultValue={profile.participation_size || ''} 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Instagram URL</label>
                            <input 
                                name="instagram" 
                                type="url" 
                                defaultValue={profile.community_insta || profile.social_url || ''} 
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Logo Image URL</label>
                            <p className="text-xs text-slate-500 mb-2">Paste a public URL to their logo, or upload it to Supabase storage manually and paste the link here.</p>
                            <input 
                                name="photo_url" 
                                type="url" 
                                defaultValue={profile.community_photo_url || ''} 
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">About the Community</label>
                            <textarea 
                                name="story" 
                                rows={5}
                                defaultValue={profile.story || ''} 
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">What We Love Most</label>
                            <textarea 
                                name="what_we_love_most" 
                                rows={3}
                                defaultValue={profile.what_we_love_most || ''} 
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Proudest Moment</label>
                            <textarea 
                                name="proudest_moment" 
                                rows={3}
                                defaultValue={profile.proudest_moment || ''} 
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Featured Reel (Instagram URL)</label>
                            <input 
                                name="featured_reel" 
                                type="url" 
                                defaultValue={profile.featured_reel || ''} 
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Cover Photo URL</label>
                            <p className="text-xs text-slate-500 mb-2">Public URL for the community page cover image.</p>
                            <input 
                                name="cover_photo_url" 
                                type="url" 
                                defaultValue={profile.cover_photo_url || ''} 
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                            <Link href="/admin" className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                                Cancel
                            </Link>
                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors shadow-sm">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}
