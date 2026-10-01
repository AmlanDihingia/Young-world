'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { ArrowRight, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NewsletterForm() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [focused, setFocused] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        try {
            const { error } = await supabase
                .from('newsletter_subscribers')
                .insert({ email })

            if (error) {
                if (error.code === '23505') {
                    setMessage({ type: 'error', text: 'You are already subscribed!' })
                } else {
                    throw error
                }
            } else {
                setMessage({ type: 'success', text: 'Welcome to the movement.' })
                setEmail('')
            }
        } catch (error) {
            const err = error as Error;
            console.error('Newsletter Error:', err)
            setMessage({ type: 'error', text: err.message || 'Something went wrong. Try again.' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <motion.form
                onSubmit={handleSubmit}
                className="relative"
                initial={false}
                animate={focused ? { scale: 1.02 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <div
                    className={`
            flex items-center border-2 transition-all duration-300 py-2 px-1 rounded-full
            ${focused ? 'border-primary shadow-[0_0_30px_rgba(204,255,0,0.3)] bg-black/50' : 'border-white/20 bg-white/5'}
          `}
                >
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        placeholder="ENTER YOUR EMAIL"
                        required
                        className="appearance-none bg-transparent border-none w-full text-white ml-4 py-2 leading-tight focus:outline-none placeholder-white/30 font-bold tracking-wider"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-shrink-0 bg-[var(--color-button)] hover:scale-105 text-white text-sm font-bold py-3 px-6 rounded-full uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mr-1"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Join'}
                        {!loading && <ArrowRight className="w-4 h-4" />}
                    </button>
                </div>
            </motion.form>
            {message && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 text-sm font-bold uppercase tracking-wide text-center ${message.type === 'success' ? 'text-primary' : 'text-secondary'}`}
                >
                    {message.text}
                </motion.p>
            )}
        </div>
    )
}
