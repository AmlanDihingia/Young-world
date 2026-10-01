'use client'

import { motion } from 'framer-motion'
import NewsletterForm from '@/components/newsletter-form'

export default function NewsletterSection() {
    return (
        <section id="waitlist" className="w-full px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md mx-auto"
            >
                <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-4 text-center">Join the movement</p>
                <NewsletterForm />
            </motion.div>
        </section>
    )
}
