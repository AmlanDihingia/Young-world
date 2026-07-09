import GrainOverlay from '@/components/grain-overlay'
import LeaderboardSection from '@/components/leaderboard-section'

export const dynamic = 'force-dynamic'

export default function LeaderboardPage() {
    return (
        <main className="min-h-screen flex flex-col relative bg-gradient-to-br from-white to-sky-50 text-slate-800 selection:bg-sky-200 selection:text-sky-900">
            
            <div className="pt-20">
                <LeaderboardSection />
            </div>
        </main>
    )
}
