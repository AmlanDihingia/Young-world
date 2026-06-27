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
        <main className="min-h-screen flex flex-col relative bg-gradient-to-br from-white to-sky-50 text-slate-800 selection:bg-sky-200 selection:text-sky-900">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block bg-sky-100 backdrop-blur-md border border-sky-200 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-sky-800 mb-6 animate-pulse">
                            Global Creator Event
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight text-slate-800 mb-6 leading-none">
                            The $1 <br />
                            Global Creator <br />
                            Challenge
                        </h1>
                        <p className="text-xl text-slate-600 font-light leading-relaxed mb-8 max-w-xl">
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
                        <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-3xl overflow-hidden border border-sky-100 shadow-[0_8px_40px_rgba(212,156,7,0.1)] group">
                            <Image
                                src="/challenge-poster.jpg"
                                alt="Heat Check Challenge Poster"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
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
                            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-slate-800 mb-8">
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
                                        <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-5 h-5 text-sky-600" />
                                        </div>
                                        <p className="text-lg text-slate-600 font-medium">{item}</p>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="mt-12">
                                <p className="text-2xl font-light uppercase text-sky-600 mb-8">#HEATCHECKCHALLENGE</p>
                                <PaypalButton />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-sky-50 rounded-full blur-[100px]" />
                            <div className="relative bg-white/80 border border-sky-100 rounded-3xl p-8 backdrop-blur-sm shadow-[0_8px_40px_rgba(212,156,7,0.06)]">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-sky-50/50 p-6 rounded-2xl text-center border border-sky-100 transition-colors hover:bg-sky-100/50">
                                        <Music className="w-8 h-8 text-sky-500 mx-auto mb-2" />
                                        <p className="text-xs font-bold uppercase text-slate-500">Official Audio</p>
                                    </div>
                                    <div className="bg-sky-50/50 p-6 rounded-2xl text-center border border-sky-100 transition-colors hover:bg-sky-100/50">
                                        <Globe className="w-8 h-8 text-sky-500 mx-auto mb-2" />
                                        <p className="text-xs font-bold uppercase text-slate-500">Global Reach</p>
                                    </div>
                                    <div className="bg-sky-50/50 p-6 rounded-2xl text-center border border-sky-100 transition-colors hover:bg-sky-100/50">
                                        <Smartphone className="w-8 h-8 text-sky-500 mx-auto mb-2" />
                                        <p className="text-xs font-bold uppercase text-slate-500">Templates</p>
                                    </div>
                                    <div className="bg-sky-50/50 p-6 rounded-2xl text-center border border-sky-100 transition-colors hover:bg-sky-100/50">
                                        <Trophy className="w-8 h-8 text-sky-500 mx-auto mb-2" />
                                        <p className="text-xs font-bold uppercase text-slate-500">$15K Prizes</p>
                                    </div>
                                </div>
                                <div className="mt-8 text-center">
                                    <p className="text-slate-500 font-medium italic">&quot;All you need is one reel — your style, your heat.&quot;</p>
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
