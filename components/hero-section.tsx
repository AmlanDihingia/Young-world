'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HeroSection() {
    return (
        <section className="relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-12 text-center min-h-[80vh]">


            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse z-10" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2 pointer-events-none animate-pulse z-10" style={{ animationDelay: '2s' }} />

            {/* Content */}
            <div className="relative z-20 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_var(--color-secondary)]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">Season 1 Coming Soon</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-6xl sm:text-8xl md:text-9xl font-display font-black tracking-tighter uppercase mb-6 leading-none text-primary"
                >
                    Heat Check <br />
                    <span className="text-primary">
                        Challenge
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-2xl mx-auto text-lg sm:text-xl text-primary/80 mb-12 font-medium leading-relaxed"
                >
                    Turn $1 into your biggest creator break. Get discovered, get featured, and get rewarded. The world is yours.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <button
                        disabled
                        className="inline-block bg-[var(--color-button)] text-white px-8 py-4 rounded-full text-lg font-black uppercase tracking-widest opacity-50 cursor-not-allowed min-w-[300px]"
                    >
                        Join the Heat Check
                    </button>
                    <Link
                        href="#waitlist"
                        className="inline-block bg-[var(--color-button)] text-white px-8 py-4 rounded-full text-lg font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_30px_rgba(253,7,4,0.3)] min-w-[300px]"
                    >
                        Join the Waitlist
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
