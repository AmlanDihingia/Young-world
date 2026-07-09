import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

// In-memory cache for geocoded coordinates (persists across requests in the same server process)
const geocodeCache = new Map<string, { lat: number; lng: number } | null>()

// Geocode a city+country to exact lat/lng using Nominatim (OpenStreetMap)
async function geocode(city: string | null, country: string): Promise<{ lat: number; lng: number } | null> {
    const cacheKey = `${(city || '').trim().toLowerCase()}|${country.trim().toLowerCase()}`

    if (geocodeCache.has(cacheKey)) {
        return geocodeCache.get(cacheKey) ?? null
    }

    try {
        const query = encodeURIComponent(city ? `${city.trim()}, ${country.trim()}` : country.trim())
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
            {
                headers: { 
                    'User-Agent': 'WaveTheWhite/1.0 (office@youngworld.life)',
                    'Accept': 'application/json'
                },
            }
        )
        if (!res.ok) {
            console.error('Nominatim API error:', res.status, res.statusText)
            return null
        }
        
        const text = await res.text()
        if (text.startsWith('<')) {
            console.error('Nominatim returned XML instead of JSON. Request may be blocked or rate-limited.')
            return null
        }
        
        const results = JSON.parse(text)
        if (results && results.length > 0) {
            const coords = {
                lat: parseFloat(results[0].lat),
                lng: parseFloat(results[0].lon),
            }
            geocodeCache.set(cacheKey, coords)
            return coords
        }
    } catch (err) {
        console.error('Geocoding error:', err)
    }

    geocodeCache.set(cacheKey, null)
    return null
}

export async function GET() {
    const supabase = await createClient()

    // Fetch all profiles
    const { data: profiles, error } = await supabase
        .from('profiles')
        .select('full_name, city, country, community_type')

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

    // Geocode each unique city+country combination
    // Group profiles by city+country to minimize API calls
    const locationGroups = new Map<string, { city: string | null; country: string; profiles: typeof profiles }>()

    for (const p of profiles) {
        const country = (p.country || '').trim()
        if (!country) continue
        const city = (p.city || '').trim() || null
        const key = `${(city || '').toLowerCase()}|${country.toLowerCase()}`

        if (!locationGroups.has(key)) {
            locationGroups.set(key, { city, country, profiles: [] })
        }
        locationGroups.get(key)!.profiles.push(p)
    }

    // Geocode each unique location (with 1s delay between requests to respect Nominatim rate limit)
    const points: Array<{
        name: string
        city: string
        country: string
        type: string
        lat: number
        lng: number
    }> = []

    for (const [, group] of locationGroups) {
        const coords = await geocode(group.city, group.country)

        // Small delay between uncached requests to respect Nominatim's 1 req/s rate limit
        if (!geocodeCache.has(`${(group.city || '').trim().toLowerCase()}|${group.country.trim().toLowerCase()}`)) {
            await new Promise((resolve) => setTimeout(resolve, 1100))
        }

        if (coords) {
            for (const p of group.profiles) {
                // Add tiny random offset so multiple users in the same city don't overlap
                const offset = group.profiles.length > 1 ? 0.02 : 0
                points.push({
                    name: p.community_type ? p.community_type : (p.full_name || 'Anonymous'),
                    city: group.city || 'Unknown',
                    country: group.country,
                    type: p.community_type ? 'community' : 'creator',
                    lat: coords.lat + (Math.random() - 0.5) * offset,
                    lng: coords.lng + (Math.random() - 0.5) * offset,
                })
            }
        }
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
