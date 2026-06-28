'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { updatePassword } from './actions'

export default function UpdatePasswordPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string; message?: string }>
}) {
    const { error, message } = use(searchParams)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-sky-50 relative overflow-x-hidden px-4 selection:bg-sky-200 selection:text-sky-900">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-100/50 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse fixed" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none animate-pulse fixed" style={{ animationDelay: '2s' }} />

            <div className="w-full max-w-md transition-all duration-500 ease-in-out relative z-10 py-12 space-y-8">
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity group">
                        <div className="relative w-80 h-40">
                            <Image
                                src="/rollcall-logo.png"
                                alt="Roll Call Logo"
                                fill
                                className="object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </Link>
                    <h1 className="text-4xl font-display font-bold uppercase tracking-tight text-slate-800 mb-2">
                        New Password
                    </h1>
                    <p className="text-slate-500 text-xs md:text-sm font-medium tracking-widest uppercase max-w-xs mx-auto md:max-w-none text-balance leading-relaxed">
                        Create a new password for your account
                    </p>
                </div>

                <form noValidate className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-sky-100 shadow-[0_8px_40px_rgba(212,156,7,0.06)] space-y-5">
                    <div>
                        <label htmlFor="password" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">New Password</label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                minLength={6}
                                className="w-full bg-sky-50/50 border border-sky-100 rounded-lg px-4 py-3 pr-12 text-slate-800 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors font-medium"
                                placeholder="Min. 6 characters"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirm_password" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Confirm New Password</label>
                        <div className="relative">
                            <input
                                id="confirm_password"
                                name="confirm_password"
                                type={showConfirm ? 'text' : 'password'}
                                required
                                minLength={6}
                                className="w-full bg-sky-50/50 border border-sky-100 rounded-lg px-4 py-3 pr-12 text-slate-800 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors font-medium"
                                placeholder="Re-enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                aria-label={showConfirm ? 'Hide password' : 'Show password'}
                            >
                                {showConfirm ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wide text-center">{error}</div>
                    )}
                    {message && (
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold uppercase tracking-wide text-center">{message}</div>
                    )}

                    <div className="pt-2">
                        <button
                            formAction={updatePassword}
                            className="w-full bg-sky-500 text-white hover:bg-sky-600 active:scale-[0.98] transition-all py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-[0_4px_14px_rgba(212,156,7,0.39)]"
                        >
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
