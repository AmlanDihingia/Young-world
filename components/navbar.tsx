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
                            <div className="relative w-40 h-14 -my-2">
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
                                href="/about"
                                className="text-slate-800 hover:text-sky-600 transition-colors text-sm font-bold uppercase tracking-wide"
                            >
                                About Us
                            </Link>
                            <Link
                                href="/privacy"
                                className="text-slate-800 hover:text-sky-600 transition-colors text-sm font-bold uppercase tracking-wide"
                            >
                                Privacy
                            </Link>
                            <Link
                                href="/terms-of-participation"
                                className="text-slate-800 hover:text-sky-600 transition-colors text-sm font-bold uppercase tracking-wide"
                            >
                                Terms
                            </Link>
                            <Link
                                href="/contact"
                                className="text-slate-800 hover:text-sky-600 transition-colors text-sm font-bold uppercase tracking-wide"
                            >
                                Contact
                            </Link>
                            {/* Login and Sign Up links removed */}
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
                                    href="/about"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full bg-white/50 border border-slate-100 text-slate-800 py-4 rounded-full text-lg font-bold uppercase tracking-widest hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm"
                                >
                                    About Us
                                </Link>
                                <Link
                                    href="/privacy"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full bg-white/50 border border-slate-100 text-slate-800 py-4 rounded-full text-lg font-bold uppercase tracking-widest hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm"
                                >
                                    Privacy
                                </Link>
                                <Link
                                    href="/terms-of-participation"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full bg-white/50 border border-slate-100 text-slate-800 py-4 rounded-full text-lg font-bold uppercase tracking-widest hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm"
                                >
                                    Terms
                                </Link>
                                <Link
                                    href="/contact"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full bg-white/50 border border-slate-100 text-slate-800 py-4 rounded-full text-lg font-bold uppercase tracking-widest hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm"
                                >
                                    Contact
                                </Link>
                                {/* Mobile Login and Sign Up links removed */}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
