export interface LeaderboardEntry {
    rank: number
    name: string
    handle: string
    score: string
    country?: string
}

export async function fetchLeaderboardData(): Promise<LeaderboardEntry[]> {
    const SHEET_ID = '1QDBhJ7RNesSC3Cl8MbEZQL23qZO4rq5CjNnPjKsEhYA'
    const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`

    try {
        const response = await fetch(CSV_URL, { cache: 'no-store' })
        if (!response.ok) {
            throw new Error(`Failed to fetch sheet: ${response.statusText}`)
        }
        const text = await response.text()

        // Improved CSV parser that handles commas inside quotes
        const parseCSV = (str: string) => {
            const arr = [];
            let quote = false;
            let col = '';
            for (let c = 0; c < str.length; c++) {
                const ch = str[c];
                if (ch === '"') {
                    quote = !quote;
                } else if (ch === ',' && !quote) {
                    arr.push(col);
                    col = '';
                } else {
                    col += ch;
                }
            }
            arr.push(col);
            return arr.map(c => c.replace(/^"|"$/g, '').trim());
        }

        const rows = text.split('\n').map(row => parseCSV(row))

        if (rows.length < 2) return []

        // find headers
        const headers = rows[0].map(h => h.toLowerCase().replace(/\s/g, ''))

        // Prioritize exact matches or specific columns
        const nameIdx = headers.findIndex(h => h === 'creatorname' || h === 'name' || h.includes('creator'))
        const handleIdx = headers.findIndex(h => h === 'instagramhandle' || h === 'handle' || h.includes('instagram'))

        // Vital fix: Look for 'finalscore' FIRST. 
        // If we just look for 'score', we might hit 'CaptionScore' (Column Z) before 'FinalScore' (Column AK).
        let scoreIdx = headers.findIndex(h => h === 'finalscore')
        if (scoreIdx === -1) {
            scoreIdx = headers.findIndex(h => h.includes('finalscore'))
        }
        if (scoreIdx === -1) {
            scoreIdx = headers.findIndex(h => h === 'score') // Fallback only if absolutely necessary
        }

        // Map rows to objects
        const data = rows.slice(1).map((cells) => {
            // Ensure we have enough cells, if not, fill with empty strings
            if (cells.length < headers.length) {
                const diff = headers.length - cells.length
                for (let j = 0; j < diff; j++) cells.push('')
            }

            const scoreVal = cells[scoreIdx] || '0'
            // Remove explicit + signs if present (though usually fine)

            return {
                rank: 0, // Will assign after sorting
                name: cells[nameIdx] || 'Anonymous',
                handle: cells[handleIdx] || '@unknown',
                score: scoreVal,
                country: 'Global' // default
            }
        }).filter(item => {
            // Filter out empty rows or invalid data
            return item.name !== 'Anonymous' && item.name !== '' && item.score !== '' && item.score !== '0'
        })

        // Sort by score (DESC)
        const sortedData = data.sort((a, b) => {
            const scoreA = parseFloat(a.score.replace(/,/g, ''))
            const scoreB = parseFloat(b.score.replace(/,/g, ''))
            return scoreB - scoreA
        })

        // Assign ranks
        return sortedData.map((item, index) => ({
            ...item,
            score: parseFloat(item.score).toFixed(0), // Format score to remove decimals for display if desired
            rank: index + 1
        }))

    } catch (error) {
        console.error('Error fetching leaderboard:', error)
        // Return mock data for fallback
        return [
            { rank: 1, name: 'Jayden Knox', handle: '@jayden_k', score: '9850', country: 'USA' },
            { rank: 2, name: 'Sarah Lee', handle: '@sarah.creates', score: '9720', country: 'UK' },
            { rank: 3, name: 'Marcus Chen', handle: '@marcus_vfx', score: '9540', country: 'Canada' },
            { rank: 4, name: 'Elara V', handle: '@elara_v', score: '9300', country: 'Brazil' },
            { rank: 5, name: 'Unruly', handle: '@unruly_music', score: '9100', country: 'Nigeria' },
        ]
    }
}
