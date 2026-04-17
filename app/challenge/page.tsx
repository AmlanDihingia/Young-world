'use client'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import GrainOverlay from '@/components/grain-overlay'
import { motion } from 'framer-motion'
import Image from 'next/image'

import PaypalButton from '@/components/paypal-button'
import { Check, Globe, Music, Smartphone, Trophy } from 'lucide-react'
import HowItWorks from '@/components/how-it-works'

export default function ChallengePage() {
    return (
        <main className="min-h-screen flex flex-col relative bg-black selection:bg-primary selection:text-black">
            <Navbar />
            <GrainOverlay />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-primary mb-6 animate-pulse">
                            Global Creator Event
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-primary mb-6 leading-none">
                            The $1 <br />
                            Global Creator <br />
                            Challenge
                        </h1>
                        <p className="text-xl text-primary/80 font-medium leading-relaxed mb-8 max-w-xl">
                            A global $1 creator challenge where one reel can change everything. Get the official track, create your version, and climb the global leaderboard. Life-changing prizes — from all-paid creator trips to next-gen iPhones and mentorships. Your phone is the stage. Your moment starts now.
                        </p>
                        <div className="mt-8">
                            <PaypalButton />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                            <Image
                                src="/challenge-poster.jpg"
                                alt="Heat Check Challenge Poster"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
            <HowItWorks />

            {/* What You Get */}
            <section className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-primary mb-8">
                                Your $1 Access Pass
                            </h2>
                            <div className="space-y-6">
                                {[
                                    "Official “Heat Check” track (licensed & ready)",
                                    "Pre-edited reel templates for effortless posting",
                                    "Creator Growth Handbook (10 viral strategies)",
                                    "Entry to the global leaderboard + 50M reach",
                                    "Early access to brand collabs & merch drops",
                                    "Eligibility for $15,000+ in prizes"
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-5 h-5 text-primary" />
                                        </div>
                                        <p className="text-lg text-primary/80 font-bold">{item}</p>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="mt-12">
                                <p className="text-2xl font-black uppercase text-primary mb-8">#HEATCHECKCHALLENGE</p>
                                <PaypalButton />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-[100px]" />
                            <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-black/50 p-6 rounded-2xl text-center border border-white/5">
                                        <Music className="w-8 h-8 text-primary mx-auto mb-2" />
                                        <p className="text-xs font-bold uppercase text-primary/60">Official Audio</p>
                                    </div>
                                    <div className="bg-black/50 p-6 rounded-2xl text-center border border-white/5">
                                        <Globe className="w-8 h-8 text-secondary mx-auto mb-2" />
                                        <p className="text-xs font-bold uppercase text-primary/60">Global Reach</p>
                                    </div>
                                    <div className="bg-black/50 p-6 rounded-2xl text-center border border-white/5">
                                        <Smartphone className="w-8 h-8 text-white mx-auto mb-2" />
                                        <p className="text-xs font-bold uppercase text-primary/60">Templates</p>
                                    </div>
                                    <div className="bg-black/50 p-6 rounded-2xl text-center border border-white/5">
                                        <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
                                        <p className="text-xs font-bold uppercase text-primary/60">$15K Prizes</p>
                                    </div>
                                </div>
                                <div className="mt-8 text-center">
                                    <p className="text-primary/80 font-medium italic">&quot;All you need is one reel — your style, your heat.&quot;</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
