'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const ADMIN_EMAIL = 'admin@youngworld.life'

export async function deleteProfile(id: string) {
    const supabase = await createClient()

    // Auth check
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user || user.email !== ADMIN_EMAIL) {
        throw new Error('Unauthorized')
    }

    const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting profile:', error)
        return { error: error.message }
    }

    revalidatePath('/admin')
    return { success: true }
}

export async function toggleHideProfile(id: string, isHidden: boolean) {
    const supabase = await createClient()

    // Auth check
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user || user.email !== ADMIN_EMAIL) {
        throw new Error('Unauthorized')
    }

    const { error } = await supabase
        .from('profiles')
        .update({ is_hidden: isHidden })
        .eq('id', id)

    if (error) {
        console.error('Error toggling hide profile:', error)
        return { error: error.message }
    }

    revalidatePath('/admin')
    revalidatePath('/')
    revalidatePath('/communities')
    return { success: true }
}
