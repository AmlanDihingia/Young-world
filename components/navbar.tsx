'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs))
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "fixed top-0 w-full z-50 transition-all duration-300 border-b",
                    scrolled ? "bg-white/80 backdrop-blur-xl border-gray-200 py-3 shadow-sm" : "bg-transparent border-transparent py-5"
                )}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="relative w-64 h-24 -my-4">
                                <Image
                                    src="/logo.png"
                                    alt="Young World Logo"
                                    fill
                                    className="object-contain object-left group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </Link>



                        <div className="hidden md:flex items-center gap-4">
                            <Link
                                href="/login"
                                className="text-slate-800 hover:text-sky-600 transition-colors text-sm font-bold uppercase tracking-wide"
                            >
                                Login
                            </Link>
                            <Link
                                href="/login?mode=signup"
                                className="bg-[var(--color-button)] text-white hover:scale-105 transition-transform duration-300 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-[0_4px_14px_rgba(14,165,233,0.39)]"
                            >
                                Sign Up
                            </Link>
                        </div>

                        <button
                            className="md:hidden text-slate-800"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[60] bg-white/90 backdrop-blur-[60px] flex flex-col justify-center items-center md:hidden"
                    >
                        {/* Liquid Glass Subtle Highlights */}
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-transparent to-white pointer-events-none"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-200/40 rounded-full blur-[80px] pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-100/60 rounded-full blur-[80px] pointer-events-none"></div>

                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition-colors"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="flex flex-col gap-8 text-center relative z-10 w-full px-6">


                            <div className="flex flex-col gap-4 w-full mt-10">
                                <Link
                                    href="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full bg-sky-50 border border-sky-100 text-sky-900 py-4 rounded-full text-lg font-bold uppercase tracking-widest tracking-wide hover:bg-sky-100 transition-all shadow-sm"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/login?mode=signup"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full bg-[var(--color-button)] text-white py-4 rounded-full text-lg font-bold uppercase tracking-widest tracking-wide hover:scale-105 transition-all shadow-[0_4px_14px_rgba(14,165,233,0.39)]"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
