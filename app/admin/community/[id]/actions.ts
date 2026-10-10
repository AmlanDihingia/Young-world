'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function updateCommunity(id: string, formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== 'admin@youngworld.life') {
        throw new Error("Unauthorized")
    }

    const name = formData.get('name') as string
    const category = formData.get('category') as string
    const members = formData.get('members') as string
    const story = formData.get('story') as string
    const instagram = formData.get('instagram') as string
    const photoUrl = formData.get('photo_url') as string
    const country = formData.get('country') as string
    const whatWeLoveMost = formData.get('what_we_love_most') as string
    const proudestMoment = formData.get('proudest_moment') as string
    const featuredReel = formData.get('featured_reel') as string
    const coverPhotoUrl = formData.get('cover_photo_url') as string

    // Update the profile in the database
    // We are mapping the admin inputs to the correct columns we use on the community page
    const { error } = await supabase
        .from('profiles')
        .update({
            community_type: name, // We map name to community_type
            community_role: category, // We map category to community_role
            participation_size: members,
            story: story,
            community_insta: instagram,
            community_photo_url: photoUrl,
            country: country,
            what_we_love_most: whatWeLoveMost,
            proudest_moment: proudestMoment,
            featured_reel: featuredReel,
            cover_photo_url: coverPhotoUrl
        })
        .eq('id', id)

    if (error) {
        console.error("Error updating community:", error)
        throw new Error(`Failed to update community: ${error.message} - ${error.details || ''}`)
    }

    revalidatePath('/communities')
    revalidatePath(`/community/[slug]`)
    revalidatePath('/admin')
    
    redirect('/admin')
}
