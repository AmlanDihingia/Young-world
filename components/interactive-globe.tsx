'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'

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
    const autoRotateTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    // ── Fetch ──────────────────────────────────────────────────────────────
    useEffect(() => {
        fetch('/api/globe-data')
            .then(r => r.json())
            .then(d => setData(d))
            .catch(console.error)
    }, [])

    // ── Responsive size ────────────────────────────────────────────────────
    useEffect(() => {
        const update = () => {
            if (containerRef.current) {
                const w = containerRef.current.clientWidth
                setGlobeSize(compact ? Math.min(w, 400) : Math.min(w, 620))
            }
        }
        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [compact])

    // ── Apply controls — poll until Three.js is ready ─────────────────────
    useEffect(() => {
        let rafId: number
        let attempts = 0
        const MAX = 120 // give up after ~4 s at 30fps

        const tryApply = () => {
            attempts++
            const ctrl = globeRef.current?.controls()
            if (ctrl) {
                ctrl.enableZoom      = true
                ctrl.enableRotate    = true
                ctrl.enablePan       = false
                ctrl.zoomSpeed       = 1.2
                ctrl.rotateSpeed     = 0.7
                ctrl.minDistance     = compact ? 160 : 140
                ctrl.maxDistance     = compact ? 500 : 600
                ctrl.autoRotate      = true
                ctrl.autoRotateSpeed = 0.6
                // THREE.TOUCH: ROTATE=0, PAN=1, DOLLY_PAN=2
                ctrl.touches = { ONE: 0, TWO: 2 }
                ctrl.update()
                return // done
            }
            if (attempts < MAX) rafId = requestAnimationFrame(tryApply)
        }

        rafId = requestAnimationFrame(tryApply)
        return () => cancelAnimationFrame(rafId)
    }, [data, compact])

    // ── Touch-action: none directly on the Three.js canvas ─────────────────
    useEffect(() => {
        const wrapper = wrapperRef.current
        if (!wrapper) return
        const patch = () => {
            const c = wrapper.querySelector('canvas')
            if (c) { c.style.touchAction = 'none'; c.style.outline = 'none' }
        }
        patch()
        const obs = new MutationObserver(patch)
        obs.observe(wrapper, { childList: true, subtree: true })
        return () => obs.disconnect()
    }, [])

    // ── Non-passive wheel: stop page scroll when hovering globe ────────────
    useEffect(() => {
        const el = wrapperRef.current
        if (!el) return
        const stop = (e: WheelEvent) => e.preventDefault()
        el.addEventListener('wheel', stop, { passive: false })
        return () => el.removeEventListener('wheel', stop)
    }, [])

    // ── Pause / resume auto-rotate on interaction ──────────────────────────
    const pauseRotate = useCallback(() => {
        if (autoRotateTimer.current) clearTimeout(autoRotateTimer.current)
        const ctrl = globeRef.current?.controls()
        if (ctrl) { ctrl.autoRotate = false; ctrl.update() }
    }, [])

    const resumeRotate = useCallback(() => {
        if (autoRotateTimer.current) clearTimeout(autoRotateTimer.current)
        autoRotateTimer.current = setTimeout(() => {
            const ctrl = globeRef.current?.controls()
            if (ctrl) { ctrl.autoRotate = true; ctrl.update() }
        }, 2500)
    }, [])

    // ── Programmatic zoom buttons (reliable on all mobile browsers) ────────
    const zoom = useCallback((direction: 'in' | 'out') => {
        const ctrl = globeRef.current?.controls()
        if (!ctrl) return
        const camera = globeRef.current.camera()
        if (!camera) return
        const step = direction === 'in' ? 0.8 : 1.25
        camera.position.multiplyScalar(step)
        ctrl.update()
    }, [])

    const points = data?.points || []
    const stats  = data?.stats  || { totalMembers: 0, totalCountries: 0 }

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

            {/* Globe + Zoom Buttons */}
            <div className="relative" style={{ width: globeSize }}>

                {/* Zoom Buttons — always visible, reliable on every device */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
                    <button
                        onPointerDown={e => { e.stopPropagation(); pauseRotate(); zoom('in') }}
                        onPointerUp={resumeRotate}
                        className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xl font-light flex items-center justify-center hover:bg-white/25 active:scale-95 transition-all shadow-lg select-none"
                        aria-label="Zoom in"
                    >
                        +
                    </button>
                    <button
                        onPointerDown={e => { e.stopPropagation(); pauseRotate(); zoom('out') }}
                        onPointerUp={resumeRotate}
                        className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xl font-light flex items-center justify-center hover:bg-white/25 active:scale-95 transition-all shadow-lg select-none"
                        aria-label="Zoom out"
                    >
                        −
                    </button>
                </div>

                {/* Globe canvas wrapper */}
                <div
                    ref={wrapperRef}
                    style={{
                        width: globeSize,
                        height: globeSize,
                        touchAction: 'none',
                        cursor: 'grab',
                        userSelect: 'none',
                    }}
                    onPointerDown={pauseRotate}
                    onPointerUp={resumeRotate}
                    onPointerLeave={resumeRotate}
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
                                position:relative; cursor:pointer;
                                width:0; height:0;
                                display:flex; align-items:center; justify-content:center;
                            `
                            wrapper.innerHTML = `
                                <div style="position:absolute;transform:translate(-50%,-50%);pointer-events:auto;">
                                    <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
                                        width:${ringSize};height:${ringSize};border-radius:50%;
                                        border:1.5px solid ${color};opacity:0;
                                        animation:globePulse 2.5s ease-out infinite;"></div>
                                    <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
                                        width:${ringSize};height:${ringSize};border-radius:50%;
                                        border:1.5px solid ${color};opacity:0;
                                        animation:globePulse 2.5s ease-out infinite 1.25s;"></div>
                                    <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
                                        width:${haloSize};height:${haloSize};border-radius:50%;
                                        background:${color};opacity:0.25;filter:blur(${blurPx});"></div>
                                    <div style="width:${dotSize};height:${dotSize};border-radius:50%;
                                        background:${color};
                                        box-shadow:0 0 8px 2px ${color},0 0 20px 4px ${color}40;"></div>
                                </div>
                            `
                            // Tooltip
                            const tip = document.createElement('div')
                            tip.style.cssText = `
                                position:absolute; bottom:24px; left:50%;
                                transform:translateX(-50%);
                                background:rgba(255,255,255,0.97);
                                backdrop-filter:blur(12px);
                                border:1px solid rgba(212,156,7,0.2);
                                border-radius:12px; padding:10px 14px;
                                font-family:Inter,sans-serif;
                                box-shadow:0 8px 32px rgba(0,0,0,0.12);
                                min-width:140px; opacity:0;
                                pointer-events:none; transition:opacity 0.2s;
                                z-index:1000; white-space:nowrap;
                            `
                            tip.innerHTML = `
                                <div style="font-weight:600;color:#0f172a;font-size:13px;margin-bottom:2px;">${point.name}</div>
                                <div style="color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:.05em;">${point.city}, ${point.country}</div>
                                <div style="margin-top:6px;font-size:9px;text-transform:uppercase;letter-spacing:.1em;font-weight:700;
                                    color:${point.type === 'community' ? '#0284c7' : '#7c3aed'};">
                                    ${point.type === 'community' ? '● Community' : '● Creator'}
                                </div>
                            `
                            wrapper.firstElementChild!.appendChild(tip)
                            wrapper.addEventListener('mouseenter', () => { tip.style.opacity = '1' })
                            wrapper.addEventListener('mouseleave', () => { tip.style.opacity = '0' })
                            return wrapper
                        }}
                        atmosphereColor="#38bdf8"
                        atmosphereAltitude={0.18}
                    />
                </div>
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
