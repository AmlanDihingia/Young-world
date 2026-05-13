'use client'

import { login, signup } from './actions'
import Link from 'next/link'
import { Zap } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

import { use } from 'react'

export default function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ message: string; error: string; mode?: string }>
}) {
    const { message, error, mode } = use(searchParams)
    const [isLogin, setIsLogin] = useState(mode !== 'signup')

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-sky-50 relative overflow-hidden px-4 selection:bg-sky-200 selection:text-sky-900">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-100/50 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="w-full max-w-md space-y-8 relative z-10">
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity group">
                        <div className="relative w-80 h-40">
                            <Image
                                src="/logo.png"
                                alt="Young World Logo"
                                fill
                                className="object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </Link>
                    <h1 className="text-4xl font-light uppercase tracking-tight text-slate-800 mb-2">
                        {isLogin ? 'Welcome Back' : 'Join the Movement'}
                    </h1>
                    <p className="text-slate-500 text-sm font-medium tracking-widest uppercase">
                        {isLogin ? 'Enter your credentials to access your account' : 'Create your creator profile today'}
                    </p>
                </div>

                <form className="space-y-4 bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-sky-100 shadow-[0_8px_40px_rgba(14,165,233,0.06)]">
                    <AnimatePresence mode="popLayout">
                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-4 overflow-hidden"
                            >
                                <div>
                                    <label htmlFor="full_name" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        id="full_name"
                                        name="full_name"
                                        type="text"
                                        required={!isLogin}
                                        className="w-full bg-sky-50/50 border border-sky-100 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors font-medium"
                                        placeholder="YOUR NAME"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="country" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">
                                        Country
                                    </label>
                                    <input
                                        id="country"
                                        name="country"
                                        type="text"
                                        required={!isLogin}
                                        className="w-full bg-sky-50/50 border border-sky-100 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors font-medium"
                                        placeholder="YOUR COUNTRY"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="social_url" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">
                                        Social Profile URL
                                    </label>
                                    <input
                                        id="social_url"
                                        name="social_url"
                                        type="url"
                                        required={!isLogin}
                                        className="w-full bg-sky-50/50 border border-sky-100 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors font-medium"
                                        placeholder="HTTPS://TIKTOK.COM/@YOU"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div>
                        <label htmlFor="email" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full bg-sky-50/50 border border-sky-100 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors font-medium"
                            placeholder="YOU@EXAMPLE.COM"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full bg-sky-50/50 border border-sky-100 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors font-medium"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wide text-center">
                            {error}
                        </div>
                    )}
                    {message && (
                        <div className="p-3 rounded bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold uppercase tracking-wide text-center">
                            {message}
                        </div>
                    )}

                    <div className="pt-4">
                        <button
                            formAction={isLogin ? login : signup}
                            className="w-full bg-sky-500 text-white hover:bg-sky-600 active:scale-[0.98] transition-all py-4 rounded-xl text-sm font-medium uppercase tracking-widest shadow-[0_4px_14px_rgba(14,165,233,0.39)]"
                        >
                            {isLogin ? 'Log in' : 'Create Account'}
                        </button>
                    </div>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-slate-500 hover:text-sky-600 text-xs font-medium uppercase tracking-widest transition-colors"
                        >
                            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
