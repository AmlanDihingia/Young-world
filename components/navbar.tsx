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
                        <Link href="/" className="flex items-center group">
                            <div className="relative w-44 h-14">
                                <Image
                                    src="/logo.png"
                                    alt="Young World Logo"
                                    fill
                                    sizes="176px"
                                    className="object-contain object-left group-hover:scale-105 transition-transform duration-300"
                                    priority
                                />
                            </div>
                        </Link>



                        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                            <Link
                                href="/communities"
                                className="text-gray-600 hover:text-black transition-colors text-[15px] font-medium"
                            >
                                Communities
                            </Link>
                            <Link
                                href="/#explore"
                                className="text-gray-600 hover:text-black transition-colors text-[15px] font-medium"
                            >
                                Explore
                            </Link>
                            <Link
                                href="/#movement"
                                className="text-gray-600 hover:text-black transition-colors text-[15px] font-medium"
                            >
                                The Movement
                            </Link>
                            <Link
                                href="/about"
                                className="text-gray-600 hover:text-black transition-colors text-[15px] font-medium"
                            >
                                About Us
                            </Link>
                        </div>

                        <div className="hidden md:flex items-center">
                            <Link
                                href="/checkyourcommunityin"
                                className="bg-[#222222] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-black transition-colors"
                            >
                                List your community
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
                        className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-[60px] flex flex-col justify-between items-center md:hidden px-6 py-8 overflow-y-auto"
                    >
                        {/* Liquid Glass Subtle Highlights */}
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-transparent to-white pointer-events-none"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-200/40 rounded-full blur-[80px] pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-100/60 rounded-full blur-[80px] pointer-events-none"></div>

                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition-colors z-20"
                            aria-label="Close menu"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="flex flex-col gap-4 text-center relative z-10 w-full mt-12 my-auto">
                            <Link
                                href="/communities"
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full bg-white/70 border border-slate-100 text-slate-800 py-3.5 rounded-full text-base font-bold uppercase tracking-wider hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm"
                            >
                                Communities
                            </Link>
                            <Link
                                href="/#explore"
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full bg-white/70 border border-slate-100 text-slate-800 py-3.5 rounded-full text-base font-bold uppercase tracking-wider hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm"
                            >
                                Explore
                            </Link>
                            <Link
                                href="/#movement"
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full bg-white/70 border border-slate-100 text-slate-800 py-3.5 rounded-full text-base font-bold uppercase tracking-wider hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm"
                            >
                                The Movement
                            </Link>
                            <Link
                                href="/about"
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full bg-white/70 border border-slate-100 text-slate-800 py-3.5 rounded-full text-base font-bold uppercase tracking-wider hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm"
                            >
                                About Us
                            </Link>
                        </div>

                        {/* Bottom CTA for Mobile */}
                        <div className="relative z-10 w-full pt-6 pb-2">
                            <Link
                                href="/checkyourcommunityin"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block w-full text-center bg-[#222222] text-white py-4 rounded-full text-base font-bold hover:bg-black transition-colors shadow-lg"
                            >
                                List your community
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
