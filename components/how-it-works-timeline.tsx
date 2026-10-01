'use client'

import { useEffect, useRef, useState } from 'react'
import { Users, Shirt, Camera, Hash, UserPlus, Share2, type LucideIcon } from 'lucide-react'

const steps: { number: string; title: string; description: string; icon: LucideIcon }[] = [
    {
        number: '01',
        title: 'Gather Your Community',
        description: 'Bring together your club, crew, team, class, group or circle.',
        icon: Users,
    },
    {
        number: '02',
        title: 'Wave Something White',
        description: 'A t-shirt, towel, bandana, handkerchief, flag or anything white.',
        icon: Shirt,
    },
    {
        number: '03',
        title: 'Check In',
        description: 'Post a reel on Friendship Day across Instagram, Youtube, Tiktok.',
        icon: Camera,
    },
    {
        number: '04',
        title: 'Use #WaveTheWhite',
        description: 'So the world can find your community.',
        icon: Hash,
    },
    {
        number: '05',
        title: 'Tag 3 Communities',
        description: "That shouldn't be left out. Help the wave grow.",
        icon: UserPlus,
    },
    {
        number: '06',
        title: 'Pass It On',
        description: 'Because nobody should be left out.',
        icon: Share2,
    },
]

function TimelineStep({
    step,
    index,
    isActive,
    isCurrent,
    stepRef,
}: {
    step: (typeof steps)[0]
    index: number
    isActive: boolean
    isCurrent: boolean
    stepRef: (el: HTMLDivElement | null) => void
}) {
    const isLeft = index % 2 === 0
    const Icon = step.icon

    return (
        <div ref={stepRef} className="relative md:grid md:grid-cols-[1fr_80px_1fr] md:gap-0 flex gap-5 items-start">
            {/* Left content (even steps) / empty (odd steps) */}
            <div className={`hidden md:flex ${isLeft ? 'justify-end' : ''}`}>
                {isLeft && (
                    <div
                        className={`text-right max-w-sm pr-8 transition-all duration-700 ${
                            isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                        }`}
                        style={{ transitionDelay: `${index * 60 + 100}ms` }}
                    >
                        <span className="text-6xl font-display font-black text-sky-300/40 leading-none block mb-1">
                            {step.number}
                        </span>
                        <h3 className="text-xl font-display font-bold uppercase tracking-tight text-slate-800 mb-2">
                            {step.title}
                        </h3>
                        <p className="text-slate-500 font-light leading-relaxed text-[15px]">
                            {step.description}
                        </p>
                    </div>
                )}
            </div>

            {/* Center dot + line */}
            <div className="flex flex-col items-center relative z-10 flex-shrink-0">
                {/* Dot */}
                <div
                    className={`
                        w-12 h-12 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center
                        transition-all duration-500
                        ${isActive
                            ? 'bg-sky-500 border-sky-400 shadow-[0_0_20px_rgba(212,156,7,0.4)] scale-110'
                            : 'bg-white border-sky-200 scale-100'
                        }
                    `}
                >
                    <Icon className={`w-5 h-5 transition-colors duration-500 ${isActive ? 'text-white' : 'text-sky-300'}`} />
                </div>
                {/* Pulse ring on current */}
                {isCurrent && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-sky-400 animate-ping opacity-20" />
                )}
                {/* Connecting line to next step */}
                {index < steps.length - 1 && (
                    <div className={`w-px flex-1 min-h-[40px] md:min-h-[60px] transition-colors duration-700 ${
                        isActive ? 'bg-gradient-to-b from-sky-400 to-sky-200' : 'bg-sky-100'
                    }`} />
                )}
            </div>

            {/* Right content (odd steps) / empty (even steps) — DESKTOP */}
            <div className={`hidden md:flex ${!isLeft ? 'justify-start' : ''}`}>
                {!isLeft && (
                    <div
                        className={`text-left max-w-sm pl-8 transition-all duration-700 ${
                            isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
                        }`}
                        style={{ transitionDelay: `${index * 60 + 100}ms` }}
                    >
                        <span className="text-6xl font-display font-black text-sky-300/40 leading-none block mb-1">
                            {step.number}
                        </span>
                        <h3 className="text-xl font-display font-bold uppercase tracking-tight text-slate-800 mb-2">
                            {step.title}
                        </h3>
                        <p className="text-slate-500 font-light leading-relaxed text-[15px]">
                            {step.description}
                        </p>
                    </div>
                )}
            </div>

            {/* Mobile content — always to the right of dot */}
            <div
                className={`md:hidden flex-1 pb-8 transition-all duration-700 ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 60 + 100}ms` }}
            >
                <span className="text-xs font-display font-bold text-sky-500 uppercase tracking-[0.2em]">
                    Step {step.number}
                </span>
                <h3 className="text-lg font-display font-bold uppercase tracking-tight text-slate-800 mt-1 mb-1.5">
                    {step.title}
                </h3>
                <p className="text-slate-500 font-light leading-relaxed text-sm">
                    {step.description}
                </p>
            </div>
        </div>
    )
}

export default function HowItWorksTimeline() {
    const [activeIndex, setActiveIndex] = useState(-1)
    const stepRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const observers: IntersectionObserver[] = []

        stepRefs.current.forEach((ref, index) => {
            if (!ref) return
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveIndex((prev) => Math.max(prev, index))
                    }
                },
                { threshold: 0.3, rootMargin: '0px 0px -10% 0px' }
            )
            observer.observe(ref)
            observers.push(observer)
        })

        return () => observers.forEach((o) => o.disconnect())
    }, [])

    return (
        <div className="relative max-w-3xl mx-auto">
            {steps.map((step, index) => (
                <TimelineStep
                    key={step.number}
                    step={step}
                    index={index}
                    isActive={index <= activeIndex}
                    isCurrent={index === activeIndex}
                    stepRef={(el) => { stepRefs.current[index] = el }}
                />
            ))}
        </div>
    )
}
