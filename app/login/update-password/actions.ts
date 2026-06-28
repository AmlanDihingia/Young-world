'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function updatePassword(formData: FormData) {
    const supabase = await createClient()
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirm_password') as string

    if (!password || password.length < 6) {
        return redirect('/login/update-password?error=Password must be at least 6 characters')
    }

    if (password !== confirmPassword) {
        return redirect('/login/update-password?error=Passwords do not match')
    }

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
        return redirect(`/login/update-password?error=${encodeURIComponent(error.message)}`)
    }

    // Sign the user out so they can log in with their new password
    await supabase.auth.signOut()

    return redirect('/login?message=Password updated successfully. Please log in with your new password.')
}
