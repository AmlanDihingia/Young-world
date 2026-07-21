'use client'

import { signup } from './actions'
import Link from 'next/link'
import { useState, useRef, useTransition, use } from 'react'
import { step1Schema, step2CreatorSchema, step2CommunitySchema } from './schemas'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function CheckYourCommunityInPage({
    searchParams,
}: {
    searchParams: Promise<{ message: string; error: string }>
}) {
    const { message, error } = use(searchParams)
    const [step, setStep] = useState(1)
    const [joinType, setJoinType] = useState<'creator' | 'community' | null>(null)
    const [isPending, startTransition] = useTransition()
    const [errors, setErrors] = useState<Record<string, string>>({})
    const formRef = useRef<HTMLFormElement>(null)

    function handleNextStep() {
        if (!formRef.current) return
        const formData = new FormData(formRef.current)
        const data = Object.fromEntries(formData.entries())
        
        let result
        if (step === 1) {
            result = step1Schema.safeParse(data)
        } else if (step === 2) {
            if (joinType === 'creator') {
                result = step2CreatorSchema.safeParse(data)
            } else if (joinType === 'community') {
                result = step2CommunitySchema.safeParse(data)
            } else {
                setErrors({ joinType: "Please select how you are joining" })
                return
            }
        }
        
        if (result && !result.success) {
            const formattedErrors: Record<string, string> = {}
            result.error.issues.forEach(issue => {
                formattedErrors[issue.path[0] as string] = issue.message
            })
            setErrors(formattedErrors)
            return
        }

        setErrors({})
        setStep(s => s + 1)
    }

    function handleBack() {
        setStep(s => s - 1)
    }

    function handleSignup() {
        if (!formRef.current) return
        const formData = new FormData(formRef.current)

        startTransition(() => {
            signup(formData)
        })
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-sky-50 relative overflow-x-hidden px-4 selection:bg-sky-200 selection:text-sky-900">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-100/50 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse fixed" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none animate-pulse fixed" style={{ animationDelay: '2s' }} />

            <div className="w-full transition-all duration-500 ease-in-out relative z-10 py-12 max-w-3xl space-y-8">
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
                        Join the Roll Call
                    </h1>
                    <p className="text-slate-500 text-xs md:text-sm font-medium tracking-widest uppercase max-w-xs mx-auto md:max-w-none text-balance leading-relaxed">
                        Make sure your community isn't left out
                    </p>
                </div>

                <motion.form
                    ref={formRef}
                    noValidate
                    onSubmit={e => e.preventDefault()}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-sky-100 shadow-[0_8px_40px_rgba(212,156,7,0.06)] space-y-6"
                >
                    {/* Step Progress Bar */}
                    <div className="flex gap-2 w-full mb-2">
                        <div className={`h-1.5 w-full rounded-full transition-colors duration-500 ${step >= 1 ? 'bg-sky-500' : 'bg-slate-100'}`} />
                        <div className={`h-1.5 w-full rounded-full transition-colors duration-500 ${step >= 2 ? 'bg-sky-500' : 'bg-slate-100'}`} />
                    </div>

                    {/* ---- STEP 1: YOUR DETAILS ---- */}
                    <section className={step === 1 ? 'space-y-4' : 'hidden'}>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-sky-600 mb-6 border-b border-sky-100 pb-2">Step 1: Your Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="full_name" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Full Name</label>
                                <input id="full_name" name="full_name" type="text" className={`w-full bg-sky-50/50 border rounded-lg px-4 py-3 text-slate-800 focus:outline-none transition-colors font-medium ${errors.full_name ? 'border-red-400 focus:border-red-500' : 'border-sky-100 focus:border-sky-400'}`} />
                                {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Email Address</label>
                                <input id="email" name="email" type="email" className={`w-full bg-sky-50/50 border rounded-lg px-4 py-3 text-slate-800 focus:outline-none transition-colors font-medium ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-sky-100 focus:border-sky-400'}`} />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="mobile" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Mobile Number (Optional)</label>
                                <input id="mobile" name="mobile" type="tel" className={`w-full bg-sky-50/50 border rounded-lg px-4 py-3 text-slate-800 focus:outline-none transition-colors font-medium ${errors.mobile ? 'border-red-400 focus:border-red-500' : 'border-sky-100 focus:border-sky-400'}`} />
                                {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">City</label>
                                <input id="city" name="city" type="text" className={`w-full bg-sky-50/50 border rounded-lg px-4 py-3 text-slate-800 focus:outline-none transition-colors font-medium ${errors.city ? 'border-red-400 focus:border-red-500' : 'border-sky-100 focus:border-sky-400'}`} />
                                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                            </div>
                            <div>
                                <label htmlFor="country" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Country</label>
                                <input id="country" name="country" type="text" className={`w-full bg-sky-50/50 border rounded-lg px-4 py-3 text-slate-800 focus:outline-none transition-colors font-medium ${errors.country ? 'border-red-400 focus:border-red-500' : 'border-sky-100 focus:border-sky-400'}`} />
                                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                            </div>
                            <div>
                                <label htmlFor="insta_url" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Instagram URL</label>
                                <input id="insta_url" name="insta_url" type="url" className={`w-full bg-sky-50/50 border rounded-lg px-4 py-3 text-slate-800 focus:outline-none transition-colors font-medium ${errors.insta_url ? 'border-red-400 focus:border-red-500' : 'border-sky-100 focus:border-sky-400'}`} />
                                {errors.insta_url && <p className="text-red-500 text-xs mt-1">{errors.insta_url}</p>}
                            </div>
                            <div>
                                <label htmlFor="other_url" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Other Social Media URL (Optional)</label>
                                <input id="other_url" name="other_url" type="url" className={`w-full bg-sky-50/50 border rounded-lg px-4 py-3 text-slate-800 focus:outline-none transition-colors font-medium ${errors.other_url ? 'border-red-400 focus:border-red-500' : 'border-sky-100 focus:border-sky-400'}`} />
                                {errors.other_url && <p className="text-red-500 text-xs mt-1">{errors.other_url}</p>}
                            </div>
                        </div>
                    </section>

                    {/* ---- STEP 2: HOW ARE YOU JOINING ---- */}
                    <div className={step === 2 ? 'space-y-8' : 'hidden'}>
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-sky-600 mb-6 border-b border-sky-100 pb-2">Step 2: How are you joining?</h3>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    type="button"
                                    onClick={() => setJoinType('creator')}
                                    className={`flex-1 p-6 rounded-2xl border-2 transition-all text-center ${joinType === 'creator' ? 'border-sky-500 bg-sky-50 text-sky-700 shadow-md' : 'border-sky-100 bg-white text-slate-500 hover:border-sky-200'}`}
                                >
                                    <span className="block font-bold text-lg mb-1">Check-in as Creator</span>
                                    <span className="text-xs font-light">I am joining as an individual creator.</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setJoinType('community')}
                                    className={`flex-1 p-6 rounded-2xl border-2 transition-all text-center ${joinType === 'community' ? 'border-sky-500 bg-sky-50 text-sky-700 shadow-md' : 'border-sky-100 bg-white text-slate-500 hover:border-sky-200'}`}
                                >
                                    <span className="block font-bold text-lg mb-1">Check-in as Community</span>
                                    <span className="text-xs font-light">I am representing a larger group.</span>
                                </button>
                            </div>
                            {errors.joinType && <p className="text-red-500 text-xs mt-2 text-center font-medium uppercase tracking-wide">{errors.joinType}</p>}
                        </section>

                        <div className={joinType === 'community' ? 'space-y-8' : 'hidden'}>
                            <section>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-sky-600 mb-6 border-b border-sky-100 pb-2">Your Community</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="community_type" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">NAME OF YOUR COMMUNITY</label>
                                        <input id="community_type" name="community_type" type="text" className={`w-full bg-sky-50/50 border rounded-lg px-4 py-3 text-slate-800 focus:outline-none transition-colors font-medium ${errors.community_type ? 'border-red-400 focus:border-red-500' : 'border-sky-100 focus:border-sky-400'}`} />
                                        {errors.community_type && <p className="text-red-500 text-xs mt-1">{errors.community_type}</p>}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="community_insta" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Community Instagram URL</label>
                                            <input id="community_insta" name="community_insta" type="url" className={`w-full bg-sky-50/50 border rounded-lg px-4 py-3 text-slate-800 focus:outline-none transition-colors font-medium ${errors.community_insta ? 'border-red-400 focus:border-red-500' : 'border-sky-100 focus:border-sky-400'}`} />
                                            {errors.community_insta && <p className="text-red-500 text-xs mt-1">{errors.community_insta}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="community_other" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Other Social Media URL</label>
                                            <input id="community_other" name="community_other" type="url" className={`w-full bg-sky-50/50 border rounded-lg px-4 py-3 text-slate-800 focus:outline-none transition-colors font-medium ${errors.community_other ? 'border-red-400 focus:border-red-500' : 'border-sky-100 focus:border-sky-400'}`} />
                                            {errors.community_other && <p className="text-red-500 text-xs mt-1">{errors.community_other}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="community_role" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">Your Role</label>
                                        <p className="text-[11px] text-slate-400 mb-2">Examples: Founder, Captain, Cultural Secretary, Community Leader, Member, Creator, Trainer, Owner, Other</p>
                                        <input id="community_role" name="community_role" type="text" className={`w-full bg-sky-50/50 border rounded-lg px-4 py-3 text-slate-800 focus:outline-none transition-colors font-medium ${errors.community_role ? 'border-red-400 focus:border-red-500' : 'border-sky-100 focus:border-sky-400'}`} />
                                        {errors.community_role && <p className="text-red-500 text-xs mt-1">{errors.community_role}</p>}
                                    </div>
                                </div>
                            </section>
                            <section>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-sky-600 mb-6 border-b border-sky-100 pb-2">Your Story</h3>
                                <div>
                                    <label htmlFor="story" className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">In one sentence: Why does your community matter to you?</label>
                                    <textarea id="story" name="story" rows={3} className={`w-full bg-sky-50/50 border rounded-lg px-4 py-3 text-slate-800 focus:outline-none transition-colors font-medium resize-none ${errors.story ? 'border-red-400 focus:border-red-500' : 'border-sky-100 focus:border-sky-400'}`}></textarea>
                                    {errors.story && <p className="text-red-500 text-xs mt-1">{errors.story}</p>}
                                </div>
                            </section>
                        </div>

                        {/* Stay Connected */}
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

                    {/* Error / Message banners */}
                    {error && (
                        <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wide text-center">{error}</div>
                    )}
                    {message && (
                        <div className="p-3 rounded bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold uppercase tracking-wide text-center">{message}</div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="w-full sm:w-1/3 bg-white border border-sky-200 text-sky-600 hover:bg-sky-50 transition-all py-4 rounded-xl text-sm font-bold uppercase tracking-widest"
                            >
                                Back
                            </button>
                        )}
                        {step < 2 ? (
                            <button
                                type="button"
                                onClick={handleNextStep}
                                className="w-full bg-sky-500 text-white hover:bg-sky-600 active:scale-[0.98] transition-all py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-[0_4px_14px_rgba(212,156,7,0.39)]"
                            >
                                Next Step
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleSignup}
                                disabled={isPending}
                                className="w-full bg-sky-500 text-white hover:bg-sky-600 active:scale-[0.98] transition-all py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-[0_4px_14px_rgba(212,156,7,0.39)] disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isPending ? 'Submitting...' : 'Complete Registration'}
                            </button>
                        )}
                    </div>
                </motion.form>
            </div>
        </div>
    )
}
