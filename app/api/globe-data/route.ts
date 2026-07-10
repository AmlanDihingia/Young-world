import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
    const supabase = await createClient()

    // Fetch all profiles, now including lat and lng directly from the database!
    const { data: profiles, error } = await supabase
        .from('profiles')
        .select('full_name, city, country, community_type, lat, lng')

    if (error) {
        console.error('Globe data error:', error)
        return NextResponse.json(
            { points: [], stats: { totalMembers: 0, totalCountries: 0 }, error: error.message },
            { status: 500 }
        )
    }

    if (!profiles || profiles.length === 0) {
        return NextResponse.json({
            points: [],
            stats: { totalMembers: 0, totalCountries: 0 },
        })
    }

    const points: Array<{
        name: string
        city: string
        country: string
        type: string
        lat: number
        lng: number
    }> = []

    // Map to group profiles by location so we can apply tiny visual offsets if multiple people are in the exact same spot
    const locationCounts = new Map<string, number>()

    for (const p of profiles) {
        // Skip profiles that haven't been geocoded yet
        if (p.lat === null || p.lng === null || p.lat === undefined || p.lng === undefined) {
            continue;
        }

        const country = (p.country || '').trim()
        if (!country) continue
        
        const city = (p.city || '').trim()
        const locationKey = `${city.toLowerCase()}|${country.toLowerCase()}`
        
        const currentCount = locationCounts.get(locationKey) || 0
        locationCounts.set(locationKey, currentCount + 1)
        
        // Add tiny random offset so multiple users in the same exact coordinates don't completely overlap visually
        const offset = currentCount > 0 ? 0.02 : 0

        points.push({
            name: p.community_type ? p.community_type : (p.full_name || 'Anonymous'),
            city: city || 'Unknown',
            country: country,
            type: p.community_type ? 'community' : 'creator',
            lat: p.lat + (Math.random() - 0.5) * offset,
            lng: p.lng + (Math.random() - 0.5) * offset,
        })
    }

    const uniqueCountries = new Set(
        profiles.map((p) => (p.country || '').toLowerCase().trim()).filter(Boolean)
    ).size

    return NextResponse.json(
        {
            points,
            stats: {
                totalMembers: profiles.length,
                totalCountries: uniqueCountries,
            },
        },
        {
            headers: {
                'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300',
            },
        }
    )
}
