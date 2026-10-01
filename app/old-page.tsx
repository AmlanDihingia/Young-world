import GrainOverlay from '@/components/grain-overlay'
import HeroSection from '@/components/hero-section'
import NewsletterSection from '@/components/newsletter-section'
import StatsSection from '@/components/stats-section'
import HowItWorks from '@/components/how-it-works'
import LeaderboardSection from '@/components/leaderboard-section'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative bg-black selection:bg-primary selection:text-black overflow-x-hidden">
      <GrainOverlay />
      <HeroSection />
      <HowItWorks />
      <LeaderboardSection limit={5} className="mt-0" />
      <StatsSection />
      <NewsletterSection />
    </main>
  )
}
