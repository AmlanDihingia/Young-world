import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

// Geocode city+country to lat/lng using Nominatim (OpenStreetMap)
async function geocode(city: string | null, country: string): Promise<{ lat: number; lng: number } | null> {
    try {
        const query = encodeURIComponent(city ? `${city}, ${country}` : country)
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
            {
                headers: { 'User-Agent': 'WaveTheWhite/1.0' },
            }
        )
        const results = await res.json()
        if (results && results.length > 0) {
            return {
                lat: parseFloat(results[0].lat),
                lng: parseFloat(results[0].lon),
            }
        }
    } catch (err) {
        console.error('Geocoding error:', err)
    }
    return null
}

export async function POST() {
    const supabase = await createClient()

    // Fetch profiles missing coordinates but having country
    const { data: profiles, error: fetchError } = await supabase
        .from('profiles')
        .select('id, full_name, city, country')
        .is('latitude', null)
        .not('country', 'is', null)

    if (fetchError) {
        return NextResponse.json({ error: fetchError.message }, { status: 500 })
    }

    if (!profiles || profiles.length === 0) {
        return NextResponse.json({ message: 'No profiles to backfill', updated: 0 })
    }

    const results: { name: string; status: string }[] = []

    for (const profile of profiles) {
        // Nominatim rate limit: max 1 request per second
        await new Promise((resolve) => setTimeout(resolve, 1100))

        const coords = await geocode(profile.city, profile.country)

        if (coords) {
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ latitude: coords.lat, longitude: coords.lng })
                .eq('id', profile.id)

            results.push({
                name: profile.full_name || profile.id,
                status: updateError ? `Error: ${updateError.message}` : `✅ ${coords.lat.toFixed(2)}, ${coords.lng.toFixed(2)}`,
            })
        } else {
            results.push({
                name: profile.full_name || profile.id,
                status: '❌ Could not geocode',
            })
        }
    }

    const updated = results.filter((r) => r.status.startsWith('✅')).length

    return NextResponse.json({
        message: `Backfilled ${updated}/${profiles.length} profiles`,
        updated,
        total: profiles.length,
        results,
    })
}
