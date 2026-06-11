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
    const [step, setStep] = useState(1)
    const [joinType, setJoinType] = useState<'creator' | 'community' | null>(null)

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-sky-50 relative overflow-x-hidden px-4 selection:bg-sky-200 selection:text-sky-900">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-100/50 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse fixed" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none animate-pulse fixed" style={{ animationDelay: '2s' }} />

            <div className={`w-full transition-all duration-500 ease-in-out relative z-10 py-12 ${isLogin ? 'max-w-md' : 'max-w-3xl'} space-y-8`}>
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
                        {isLogin ? 'Welcome Back' : 'Join the Roll Call'}
                    </h1>
                    <p className="text-slate-500 text-sm font-medium tracking-widest uppercase">
                        {isLogin ? 'Enter your credentials to access your account' : 'Make sure your community isn\'t left out'}
                    </p>
                </div>

                <form className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-sky-100 shadow-[0_8px_40px_rgba(14,165,233,0.06)]">
                    
                    {/* LOGIN FIELDS */}
                    {isLogin && (
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Email</label>
                                <input id="email" name="email" type="email" required className="w-full bg-sky-50/50 border border-sky-100 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors font-medium" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Password</label>
                                <input id="password" name="password" type="password" required className="w-full bg-sky-50/50 border border-sky-100 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors font-medium" />
                            </div>
                        </div>
                    )}

                    {/* SIGNUP FIELDS */}
                    {!isLogin && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {/* Step Indicator */}
                            <div className="flex justify-between items-center mb-8">
                                <div className="flex gap-2 w-full">
                                    <div className={`h-1.5 w-full rounded-full ${step >= 1 ? 'bg-sky-500' : 'bg-slate-100'}`}></div>
                                    <div className={`h-1.5 w-full rounded-full ${step >= 2 ? 'bg-sky-500' : 'bg-slate-100'}`}></div>
                                    <div className={`h-1.5 w-full rounded-full ${step >= 3 ? 'bg-sky-500' : 'bg-slate-100'}`}></div>
                                </div>
                            </div>

                            {/* STEP 1: YOUR DETAILS */}
                            <div className={step === 1 ? 'space-y-12' : 'hidden'}>
                                <section>
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-sky-600 mb-6 border-b border-sky-100 pb-2">Step 1: Your Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="full_name" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Full Name</label>
                                            <input id="full_name" name="full_name" type="text" className="w-full bg-sky-50/50 border border-sky-100 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-sky-400 transition-colors font-medium" />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Email Address</label>
                                            <input id="email" name="email" type="email" className="w-full bg-sky-50/50 border border-sky-100 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-sky-400 transition-colors font-medium" />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Password</label>
                                            <input id="password" name="password" type="password" className="w-full bg-sky-50/50 border border-sky-100 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-sky-400 transition-colors font-medium" />
                                        </div>
                                        <div>
                                            <label htmlFor="mobile" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Mobile Number (Optional)</label>
                                            <input id="mobile" name="mobile" type="tel" className="w-full bg-sky-50/50 border border-sky-100 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-sky-400 transition-colors font-medium" />
                                        </div>
                                        <div>
                                            <label htmlFor="city" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">City</label>
                                            <input id="city" name="city" type="text" className="w-full bg-sky-50/50 border border-sky-100 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-sky-400 transition-colors font-medium" />
                                        </div>
                                        <div>
                                            <label htmlFor="country" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Country</label>
                                            <input id="country" name="country" type="text" className="w-full bg-sky-50/50 border border-sky-100 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-sky-400 transition-colors font-medium" />
                                        </div>
                                        <div>
                                            <label htmlFor="insta_url" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Instagram URL</label>
                                            <input id="insta_url" name="insta_url" type="url" className="w-full bg-sky-50/50 border border-sky-100 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-sky-400 transition-colors font-medium" />
                                        </div>
                                        <div>
                                            <label htmlFor="other_url" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Other Social Media URL (Optional)</label>
                                            <input id="other_url" name="other_url" type="url" className="w-full bg-sky-50/50 border border-sky-100 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-sky-400 transition-colors font-medium" />
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* STEP 2: YOUR COMMUNITY & STORY */}
                            <div className={step === 2 ? 'space-y-12' : 'hidden'}>
                                <section>
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-sky-600 mb-6 border-b border-sky-100 pb-2">Step 2: How are you joining?</h3>
                                    <div className="flex flex-col sm:flex-row gap-4 mb-2">
                                        <button
                                            type="button"
                                            onClick={() => setJoinType('creator')}
                                            className={`flex-1 p-6 rounded-2xl border-2 transition-all text-center ${joinType === 'creator' ? 'border-sky-500 bg-sky-50 text-sky-700 shadow-md' : 'border-sky-100 bg-white text-slate-500 hover:border-sky-200'}`}
                                        >
                                            <span className="block font-bold text-lg mb-1">Join as a Creator</span>
                                            <span className="text-xs font-light">I am joining as an individual creator.</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setJoinType('community')}
                                            className={`flex-1 p-6 rounded-2xl border-2 transition-all text-center ${joinType === 'community' ? 'border-sky-500 bg-sky-50 text-sky-700 shadow-md' : 'border-sky-100 bg-white text-slate-500 hover:border-sky-200'}`}
                                        >
                                            <span className="block font-bold text-lg mb-1">Join as a Community</span>
                                            <span className="text-xs font-light">I am representing a larger group.</span>
                                        </button>
                                    </div>
                                </section>

                                {joinType === 'community' && (
                                    <div className="space-y-12 animate-in fade-in duration-500">
                                        <section>
                                            <h3 className="text-sm font-bold uppercase tracking-widest text-sky-600 mb-6 border-b border-sky-100 pb-2">Your Community</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <label htmlFor="community_type" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">What community are you representing?</label>
                                                    <p className="text-[11px] text-slate-400 mb-2">Examples: Run Club, Dance Academy, Nursing Students, Photography Club, University, DJ Collective, Hospitality Team, Creator Community, Cabin Crew, Model Agency, Other etc.</p>
                                                    <input id="community_type" name="community_type" type="text" className="w-full bg-sky-50/50 border border-sky-100 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-sky-400 transition-colors font-medium" />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="community_insta" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Community Instagram URL</label>
                                                        <input id="community_insta" name="community_insta" type="url" className="w-full bg-sky-50/50 border border-sky-100 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-sky-400 transition-colors font-medium" />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="community_other" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Other Social Media URL</label>
                                                        <input id="community_other" name="community_other" type="url" className="w-full bg-sky-50/50 border border-sky-100 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-sky-400 transition-colors font-medium" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="community_role" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Your Role</label>
                                                    <p className="text-[11px] text-slate-400 mb-2">Examples: Founder, Captain, Cultural Secretary, Community Leader, Member, Creator, Trainer, Owner, Other</p>
                                                    <input id="community_role" name="community_role" type="text" className="w-full bg-sky-50/50 border border-sky-100 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-sky-400 transition-colors font-medium" />
                                                </div>
                                            </div>
                                        </section>

                                        <section>
                                            <h3 className="text-sm font-bold uppercase tracking-widest text-sky-600 mb-6 border-b border-sky-100 pb-2">Your Story</h3>
                                            <div>
                                                <label htmlFor="story" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">In one sentence: Why does your community matter to you?</label>
                                                <textarea id="story" name="story" rows={3} className="w-full bg-sky-50/50 border border-sky-100 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-sky-400 transition-colors font-medium resize-none"></textarea>
                                            </div>
                                        </section>
                                    </div>
                                )}
                            </div>

                            {/* STEP 3: MEDIA & STAY CONNECTED */}
                            <div className={step === 3 ? 'space-y-12' : 'hidden'}>
                                <section>
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-sky-600 mb-6 border-b border-sky-100 pb-2">Step 3: Media</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Upload a profile photo (Optional)</label>
                                            <input type="file" name="profile_photo" accept="image/*" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Upload a community photo (Optional)</label>
                                            <input type="file" name="community_photo" accept="image/*" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 transition-colors" />
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-sky-600 mb-6 border-b border-sky-100 pb-2">Stay Connected</h3>
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className="relative flex items-center justify-center w-5 h-5 rounded border border-sky-300 bg-sky-50 group-hover:border-sky-500 transition-colors mt-0.5 shrink-0">
                                            <input type="checkbox" name="stay_connected" defaultChecked className="peer sr-only" />
                                            <svg className="w-3 h-3 text-sky-500 opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium text-slate-600 leading-relaxed">
                                            I&apos;d like to stay connected with the Young World Network for future collaborations, events and community initiatives.
                                        </span>
                                    </label>
                                </section>
                            </div>
                        </motion.div>
                    )}

                    {/* STATUS MESSAGES */}
                    {error && (
                        <div className="mt-8 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wide text-center">
                            {error}
                        </div>
                    )}
                    {message && (
                        <div className="mt-8 p-3 rounded bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold uppercase tracking-wide text-center">
                            {message}
                        </div>
                    )}

                    {/* BUTTONS */}
                    <div className="pt-8 flex flex-col sm:flex-row gap-4">
                        {isLogin ? (
                            <button
                                formAction={login}
                                className="w-full bg-sky-500 text-white hover:bg-sky-600 active:scale-[0.98] transition-all py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-[0_4px_14px_rgba(14,165,233,0.39)]"
                            >
                                Log in
                            </button>
                        ) : (
                            <>
                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => setStep(step - 1)}
                                        className="w-full sm:w-1/3 bg-white border border-sky-200 text-sky-600 hover:bg-sky-50 transition-all py-4 rounded-xl text-sm font-bold uppercase tracking-widest"
                                    >
                                        Back
                                    </button>
                                )}
                                {step < 3 ? (
                                    <button
                                        type="button"
                                        onClick={() => setStep(step + 1)}
                                        className="w-full bg-sky-500 text-white hover:bg-sky-600 active:scale-[0.98] transition-all py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-[0_4px_14px_rgba(14,165,233,0.39)]"
                                    >
                                        Next Step
                                    </button>
                                ) : (
                                    <button
                                        formAction={signup}
                                        className="w-full bg-sky-500 text-white hover:bg-sky-600 active:scale-[0.98] transition-all py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-[0_4px_14px_rgba(14,165,233,0.39)]"
                                    >
                                        Complete Registration
                                    </button>
                                )}
                            </>
                        )}
                    </div>

                    {/* TOGGLE */}
                    <div className="text-center mt-6">
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-slate-500 hover:text-sky-600 text-xs font-medium uppercase tracking-widest transition-colors"
                        >
                            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                        </button>
                    </div>

                    {/* FINAL MESSAGE FOOTER */}
                    {!isLogin && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-16 pt-12 border-t border-sky-100 text-center flex flex-col items-center"
                        >
                            <div className="text-2xl mb-4">🤍</div>
                            <h4 className="text-lg font-medium text-slate-800 mb-2">Thank you for making sure your community isn&apos;t left out when the world checks in.</h4>
                            <p className="text-sky-600 font-bold tracking-widest uppercase text-sm mb-2">On Friendship Day: Wear White. Wave White. Pass It On.</p>
                            <p className="text-slate-500 italic text-sm mb-10">The world is checking in.</p>

                            <div className="flex flex-wrap justify-center gap-3">
                                <a href="#" className="text-xs font-bold uppercase tracking-widest bg-sky-50 text-sky-700 px-4 py-2 rounded-full hover:bg-sky-100 transition-colors">Follow Uncle Young on Instagram</a>
                                <a href="#" className="text-xs font-bold uppercase tracking-widest bg-sky-50 text-sky-700 px-4 py-2 rounded-full hover:bg-sky-100 transition-colors">Follow YWE on Instagram</a>
                                <a href="#" className="text-xs font-bold uppercase tracking-widest bg-slate-50 text-slate-700 px-4 py-2 rounded-full hover:bg-slate-100 transition-colors">Subscribe to YouTube</a>
                                <a href="#" className="text-xs font-bold uppercase tracking-widest bg-slate-50 text-slate-700 px-4 py-2 rounded-full hover:bg-slate-100 transition-colors">Facebook</a>
                            </div>
                        </motion.div>
                    )}
                </form>
            </div>
        </div>
    )
}
