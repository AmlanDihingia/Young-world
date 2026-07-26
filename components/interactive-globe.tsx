'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import react-globe.gl to avoid SSR issues (it requires window/WebGL)
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false })

interface GlobePoint {
    name: string
    city: string
    country: string
    type: 'creator' | 'community'
    lat: number
    lng: number
}

interface GlobeStats {
    totalMembers: number
    totalCountries: number
}

interface GlobeData {
    points: GlobePoint[]
    stats: GlobeStats
}

export default function InteractiveGlobe({ compact = false }: { compact?: boolean }) {
    const [data, setData] = useState<GlobeData | null>(null)
    const globeRef = useRef<any>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [globeSize, setGlobeSize] = useState(500)
    const [interacting, setInteracting] = useState(false)
    const [hintDismissed, setHintDismissed] = useState(false)
    const interactingRef = useRef(false)

    // Fetch globe data
    useEffect(() => {
        fetch('/api/globe-data')
            .then((res) => res.json())
            .then((d) => setData(d))
            .catch(console.error)
    }, [])

    // Responsive sizing
    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const width = containerRef.current.clientWidth
                setGlobeSize(compact ? Math.min(width, 400) : Math.min(width, 620))
            }
        }
        updateSize()
        window.addEventListener('resize', updateSize)
        return () => window.removeEventListener('resize', updateSize)
    }, [compact])

    // ─── KEY FIX: intercept wheel + touch events before the browser scroll handler ───
    useEffect(() => {
        const wrapper = wrapperRef.current
        if (!wrapper) return

        // Non-passive wheel: stops page from scrolling when user scrolls over the globe
        const onWheel = (e: WheelEvent) => {
            e.preventDefault()
            e.stopPropagation()
        }

        // Non-passive touch: lets Three.js receive pinch / pan
        const onTouchStart = (e: TouchEvent) => {
            if (e.touches.length >= 2) {
                e.preventDefault()
            }
        }
        const onTouchMove = (e: TouchEvent) => {
            e.preventDefault()
        }

        wrapper.addEventListener('wheel', onWheel, { passive: false })
        wrapper.addEventListener('touchstart', onTouchStart, { passive: false })
        wrapper.addEventListener('touchmove', onTouchMove, { passive: false })

        return () => {
            wrapper.removeEventListener('wheel', onWheel)
            wrapper.removeEventListener('touchstart', onTouchStart)
            wrapper.removeEventListener('touchmove', onTouchMove)
        }
    }, [])

    // ─── Set touch-action:none on the Three.js <canvas> as soon as it appears ───
    useEffect(() => {
        const wrapper = wrapperRef.current
        if (!wrapper) return

        const applyCanvasFix = () => {
            const canvas = wrapper.querySelector('canvas')
            if (canvas) {
                canvas.style.touchAction = 'none'
                canvas.style.outline = 'none'
            }
        }

        // Try immediately (canvas may already exist on re-renders)
        applyCanvasFix()

        // Watch for canvas being added to DOM by react-globe.gl
        const observer = new MutationObserver(() => applyCanvasFix())
        observer.observe(wrapper, { childList: true, subtree: true })
        return () => observer.disconnect()
    }, [])

    // ─── Globe controls: zoom, rotate, touch mapping ───
    const applyControls = useCallback(() => {
        if (!globeRef.current) return
        const controls = globeRef.current.controls()
        if (!controls) return

        controls.enableZoom = true
        controls.enableRotate = true
        controls.enablePan = false
        controls.zoomSpeed = 1.2
        controls.rotateSpeed = 0.6
        controls.minDistance = compact ? 160 : 140
        controls.maxDistance = compact ? 500 : 600
        controls.autoRotate = !interactingRef.current
        controls.autoRotateSpeed = 0.6
        // Map touch gestures: one-finger = rotate, two-finger = zoom
        controls.touches = {
            ONE: 2,  // THREE.TOUCH.ROTATE
            TWO: 1,  // THREE.TOUCH.DOLLY_PAN
        }
        controls.update()
    }, [compact])

    useEffect(() => {
        applyControls()
    }, [data, applyControls])

    // ─── Interaction events: pause auto-rotate, dismiss hint ───
    const handleInteractStart = useCallback(() => {
        interactingRef.current = true
        setInteracting(true)
        setHintDismissed(true)
        if (globeRef.current) {
            const c = globeRef.current.controls()
            if (c) { c.autoRotate = false; c.update() }
        }
    }, [])

    const handleInteractEnd = useCallback(() => {
        interactingRef.current = false
        setInteracting(false)
        // Resume auto-rotate after 2s of inactivity
        setTimeout(() => {
            if (!interactingRef.current && globeRef.current) {
                const c = globeRef.current.controls()
                if (c) { c.autoRotate = true; c.update() }
            }
        }, 2000)
    }, [])

    const points = data?.points || []
    const stats = data?.stats || { totalMembers: 0, totalCountries: 0 }

    return (
        <div ref={containerRef} className="relative w-full flex flex-col items-center">
            {/* Stats */}
            <div className={`flex flex-wrap justify-center gap-4 sm:gap-8 ${compact ? 'mb-4' : 'mb-8'}`}>
                <div className="text-center">
                    <div className={`${compact ? 'text-3xl' : 'text-4xl sm:text-5xl'} font-display font-light text-sky-500 tracking-tight`}>
                        {stats.totalMembers}
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">
                        Communities &amp; Creators
                    </div>
                </div>
                <div className="w-px bg-sky-100 hidden sm:block" />
                <div className="text-center">
                    <div className={`${compact ? 'text-3xl' : 'text-4xl sm:text-5xl'} font-display font-light text-sky-400 tracking-tight`}>
                        {stats.totalCountries}
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">
                        Countries
                    </div>
                </div>
            </div>

            {/* Globe wrapper — receives all pointer/touch/wheel events */}
            <div
                ref={wrapperRef}
                className="relative select-none"
                style={{
                    width: globeSize,
                    height: globeSize,
                    touchAction: 'none',   // belt-and-suspenders at the div level too
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    cursor: interacting ? 'grabbing' : 'grab',
                }}
                onMouseDown={handleInteractStart}
                onMouseUp={handleInteractEnd}
                onTouchStart={handleInteractStart}
                onTouchEnd={handleInteractEnd}
            >
                <Globe
                    ref={globeRef}
                    width={globeSize}
                    height={globeSize}
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                    backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                    htmlElementsData={points}
                    htmlLat="lat"
                    htmlLng="lng"
                    htmlAltitude={0.01}
                    htmlElement={(d: object) => {
                        const point = d as GlobePoint
                        const color = point.type === 'community' ? '#38bdf8' : '#a78bfa'
                        const isMobile = typeof window !== 'undefined' && window.innerWidth < 640
                        const ringSize = isMobile ? '18px' : '32px'
                        const haloSize = isMobile ? '12px' : '20px'
                        const dotSize  = isMobile ? '5px'  : '8px'
                        const blurPx   = isMobile ? '4px'  : '6px'

                        const wrapper = document.createElement('div')
                        wrapper.style.cssText = `
                            position: relative;
                            cursor: pointer;
                            width: 0; height: 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        `

                        wrapper.innerHTML = `
                            <div style="
                                position: absolute;
                                transform: translate(-50%, -50%);
                                pointer-events: auto;
                            ">
                                <!-- Outer pulse ring -->
                                <div style="
                                    position: absolute;
                                    top: 50%; left: 50%;
                                    transform: translate(-50%, -50%);
                                    width: ${ringSize}; height: ${ringSize};
                                    border-radius: 50%;
                                    border: 1.5px solid ${color};
                                    opacity: 0;
                                    animation: globePulse 2.5s ease-out infinite;
                                "></div>
                                <!-- Second pulse ring (delayed) -->
                                <div style="
                                    position: absolute;
                                    top: 50%; left: 50%;
                                    transform: translate(-50%, -50%);
                                    width: ${ringSize}; height: ${ringSize};
                                    border-radius: 50%;
                                    border: 1.5px solid ${color};
                                    opacity: 0;
                                    animation: globePulse 2.5s ease-out infinite 1.25s;
                                "></div>
                                <!-- Glow halo -->
                                <div style="
                                    position: absolute;
                                    top: 50%; left: 50%;
                                    transform: translate(-50%, -50%);
                                    width: ${haloSize}; height: ${haloSize};
                                    border-radius: 50%;
                                    background: ${color};
                                    opacity: 0.25;
                                    filter: blur(${blurPx});
                                "></div>
                                <!-- Core dot -->
                                <div style="
                                    width: ${dotSize}; height: ${dotSize};
                                    border-radius: 50%;
                                    background: ${color};
                                    box-shadow: 0 0 8px 2px ${color}, 0 0 20px 4px ${color}40;
                                "></div>
                            </div>
                        `

                        // Tooltip
                        const tooltipDiv = document.createElement('div')
                        tooltipDiv.style.cssText = `
                            position: absolute;
                            bottom: 24px; left: 50%;
                            transform: translateX(-50%);
                            background: rgba(255,255,255,0.97);
                            backdrop-filter: blur(12px);
                            border: 1px solid rgba(212,156,7,0.2);
                            border-radius: 12px;
                            padding: 10px 14px;
                            font-family: Inter, sans-serif;
                            box-shadow: 0 8px 32px rgba(0,0,0,0.12);
                            min-width: 140px;
                            opacity: 0;
                            pointer-events: none;
                            transition: opacity 0.2s;
                            z-index: 1000;
                            white-space: nowrap;
                        `
                        tooltipDiv.innerHTML = `
                            <div style="font-weight: 600; color: #0f172a; font-size: 13px; margin-bottom: 2px;">
                                ${point.name}
                            </div>
                            <div style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;">
                                ${point.city}, ${point.country}
                            </div>
                            <div style="
                                margin-top: 6px; font-size: 9px; text-transform: uppercase;
                                letter-spacing: 0.1em; font-weight: 700;
                                color: ${point.type === 'community' ? '#0284c7' : '#7c3aed'};
                            ">
                                ${point.type === 'community' ? '● Community' : '● Creator'}
                            </div>
                        `
                        wrapper.firstElementChild!.appendChild(tooltipDiv)
                        wrapper.addEventListener('mouseenter', () => { tooltipDiv.style.opacity = '1' })
                        wrapper.addEventListener('mouseleave', () => { tooltipDiv.style.opacity = '0' })

                        return wrapper
                    }}
                    atmosphereColor="#38bdf8"
                    atmosphereAltitude={0.18}
                />

                {/* Interaction hint overlay — shown until user first interacts */}
                {!hintDismissed && (
                    <div
                        className="absolute inset-0 flex flex-col items-center justify-end pb-6 pointer-events-none"
                        style={{ zIndex: 10 }}
                    >
                        <div className="flex flex-col items-center gap-2 animate-pulse">
                            <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-white/10">
                                {/* Desktop hint */}
                                <span className="hidden sm:flex items-center gap-2">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
                                    </svg>
                                    Drag to rotate · Scroll to zoom
                                </span>
                                {/* Mobile hint */}
                                <span className="flex sm:hidden items-center gap-2">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 11V6a2 2 0 00-2-2v0a2 2 0 00-2 2v0M14 10V4a2 2 0 00-2-2v0a2 2 0 00-2 2v4M10 10.5V6a2 2 0 00-2-2v0a2 2 0 00-2 2v8l3.5 3.5"/>
                                    </svg>
                                    Drag to rotate · Pinch to zoom
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-5 mt-4">
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Community</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_6px_#a78bfa]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Creator</span>
                </div>
            </div>

            {/* Empty state */}
            {data && points.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center bg-white/80 backdrop-blur-md rounded-2xl border border-sky-100 p-8 shadow-lg">
                        <p className="text-slate-600 font-medium text-lg mb-1">The globe awaits</p>
                        <p className="text-slate-400 text-sm">Be the first to check in and put your city on the map.</p>
                    </div>
                </div>
            )}
        </div>
    )
}
