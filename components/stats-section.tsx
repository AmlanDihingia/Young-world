'use client'

import { motion } from 'framer-motion'

export default function StatsSection() {
    const stats = [
        { val: '$15K', label: 'Prize Pool' },
        { val: 'Global', label: 'Creator Trips' },
        { val: 'iPhone 17', label: 'Giveaways' },
        { val: 'Exclusive', label: 'Brand Deals' }
    ]

    return (
        <section className="w-full px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-5xl mx-auto border-t border-white/10 pt-16"
            >
                {stats.map((stat, i) => (
                    <div key={i} className="text-center group cursor-default">
                        <h3 className="text-4xl font-display font-black text-primary mb-2 group-hover:text-white transition-colors duration-300">{stat.val}</h3>
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/60 group-hover:text-primary transition-colors">{stat.label}</p>
                    </div>
                ))}
            </motion.div>
        </section>
    )
}
