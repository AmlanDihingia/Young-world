'use client'

import { motion } from 'framer-motion'
import { Zap, Trophy, Smartphone } from 'lucide-react'

export default function HowItWorks() {
    return (
        <section className="py-24 bg-white/5 border-y border-white/10 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-primary mb-4">
                        How It Works
                    </h2>
                    <p className="text-primary/60 font-bold uppercase tracking-widest">Three steps to glory</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Zap,
                            title: "Join for $1",
                            desc: "Get the official track, challenge kit, and access to the global leaderboard."
                        },
                        {
                            icon: Smartphone,
                            title: "Create Your Reel",
                            desc: "Use the sound. Show your vibe. Post and tag @youngworldentertainment + #HeatCheckChallenge."
                        },
                        {
                            icon: Trophy,
                            title: "Rise & Win",
                            desc: "Climb the leaderboard. Unlock prizes — creator trips, iPhones, mentorships, and global fame."
                        }
                    ].map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="bg-black/50 border border-white/10 p-8 rounded-3xl hover:border-primary/50 transition-colors group"
                        >
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-black transition-all text-primary">
                                <step.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black uppercase text-primary mb-4">{step.title}</h3>
                            <p className="text-primary/80 font-medium leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
