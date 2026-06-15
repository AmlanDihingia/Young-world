'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.error('Login Error:', error)
        return redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/', 'layout')

    if (email === 'admin@youngworld.life') {
        redirect('/admin')
    } else {
        redirect('/dashboard')
    }
}

import { step1Schema, step2CreatorSchema, step2CommunitySchema } from './schemas'
import { Resend } from 'resend'
import { getWelcomeEmailHtml } from './email'
import { getCreatorWelcomeEmailHtml } from './creator-email'

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const formEntries = Object.fromEntries(formData.entries())
    
    // Server-side Validation
    const step1Result = step1Schema.safeParse(formEntries)
    if (!step1Result.success) {
        return redirect(`/login?error=${encodeURIComponent(step1Result.error.issues[0].message)}&mode=signup`)
    }

    if (formEntries.community_type) {
        const step2Result = step2CommunitySchema.safeParse(formEntries)
        if (!step2Result.success) {
            return redirect(`/login?error=${encodeURIComponent(step2Result.error.issues[0].message)}&mode=signup`)
        }
    } else {
        const step2Result = step2CreatorSchema.safeParse(formEntries)
        if (!step2Result.success) {
            return redirect(`/login?error=${encodeURIComponent(step2Result.error.issues[0].message)}&mode=signup`)
        }
    }

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    // Original Fields
    const full_name = formData.get('full_name') as string
    const country = formData.get('country') as string
    const social_url = formData.get('social_url') as string
    
    // New Fields
    const mobile = formData.get('mobile') as string
    const city = formData.get('city') as string
    const other_url = formData.get('other_url') as string
    const community_type = formData.get('community_type') as string
    const community_insta = formData.get('community_insta') as string
    const community_other = formData.get('community_other') as string
    const community_role = formData.get('community_role') as string
    const story = formData.get('story') as string
    const participation_size = formData.get('participation_size') as string
    const nominee_1 = formData.get('nominee_1') as string
    const nominee_2 = formData.get('nominee_2') as string
    const nominee_3 = formData.get('nominee_3') as string
    const stay_connected = formData.get('stay_connected') === 'on'

    let profile_photo_url = ''
    let community_photo_url = ''

    // Helper to upload file
    const uploadFile = async (file: File | null, prefix: string) => {
        if (!file || file.size === 0) return ''
        
        const fileExt = file.name.split('.').pop()
        const fileName = `${prefix}_${Date.now()}.${fileExt}`
        
        const { data, error } = await supabase.storage
            .from('roll_call_media')
            .upload(fileName, file)
            
        if (error) {
            console.error('File upload error:', error)
            return ''
        }
        
        const { data: { publicUrl } } = supabase.storage
            .from('roll_call_media')
            .getPublicUrl(fileName)
            
        return publicUrl
    }

    // Upload Files if present
    const profilePhoto = formData.get('profile_photo') as File | null
    const communityPhoto = formData.get('community_photo') as File | null
    
    profile_photo_url = await uploadFile(profilePhoto, 'profile')
    community_photo_url = await uploadFile(communityPhoto, 'community')

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name,
                country,
                social_url,
                mobile,
                city,
                other_url,
                community_type,
                community_insta,
                community_other,
                community_role,
                story,
                participation_size,
                nominee_1,
                nominee_2,
                nominee_3,
                stay_connected,
                profile_photo_url,
                community_photo_url
            },
        },
    })

    if (error) {
        console.error('Signup Error:', error)
        return redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }

    if (data.user) {
        // Send Custom Welcome Email via Resend
        try {
            const resend = new Resend(process.env.RESEND_API_KEY)
            
            // Determine which email template to use based on join type
            const emailHtml = community_type 
                ? getWelcomeEmailHtml(full_name, community_type)
                : getCreatorWelcomeEmailHtml(full_name)

            await resend.emails.send({
                from: 'Uncle Young <uncleyoung@youngworld.life>',
                to: email,
                subject: '🤍 Thank You For Checking In',
                html: emailHtml
            })
        } catch (emailError) {
            console.error('Failed to send Resend email:', emailError)
        }

        if (!data.session) {
            return redirect('/login?message=Check your email to confirm your account')
        }
    }

    revalidatePath('/', 'layout')
    redirect('/thank-you')
}
