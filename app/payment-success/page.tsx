import Link from 'next/link'
import GrainOverlay from '@/components/grain-overlay'
import { CheckCircle, Trophy } from 'lucide-react'

export default function PaymentSuccessPage() {
    return (
        <main className="min-h-screen flex flex-col relative bg-black selection:bg-primary selection:text-black font-sans">
            <GrainOverlay />

            <div className="flex-grow flex items-center justify-center relative z-10 px-4 pt-20 pb-20">
                <div className="max-w-3xl w-full text-center">

                    {/* Animated Icon */}
                    <div className="mb-12 flex justify-center">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full group-hover:bg-primary/30 transition-all duration-500" />
                            <CheckCircle className="w-24 h-24 sm:w-32 sm:h-32 text-primary relative z-10 animate-pulse drop-shadow-[0_0_15px_rgba(255,197,0,0.5)]" />
                        </div>
                    </div>

                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-black uppercase tracking-tighter text-white mb-8 leading-[0.9]">
                        Transaction <br />
                        <span className="text-primary text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary/80">Completed</span>
                    </h1>

                    <p className="text-lg sm:text-2xl text-gray-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                        Welcome to the <span className="text-primary font-black uppercase tracking-wide">Heat Check Challenge</span>.
                    </p>

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-16 backdrop-blur-md max-w-2xl mx-auto transform hover:scale-[1.02] transition-transform duration-500">
                        <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto mb-6" />
                        <p className="text-lg sm:text-xl text-white/90 font-medium leading-relaxed">
                            You&apos;re in. Your spot is secured. <br />
                            <span className="text-white/50 text-base mt-2 block">Now it&apos;s time to show the world what you&apos;ve got.</span>
                        </p>
                    </div>

                    <Link
                        href="/jointherollcall"
                        className="inline-flex items-center justify-center bg-[var(--color-button)] text-white px-12 py-6 rounded-full text-xl sm:text-2xl font-black uppercase tracking-widest hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(253,7,4,0.4)] hover:shadow-[0_0_60px_rgba(253,7,4,0.6)]"
                    >
                        Create Your Profile
                    </Link>

                </div>
            </div>
        </main>
    )
}
