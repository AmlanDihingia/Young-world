'use client'

import { useEffect, useState, useRef } from 'react'
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
    const [globeSize, setGlobeSize] = useState(500)

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
                setGlobeSize(compact ? Math.min(width, 400) : Math.min(width, 600))
            }
        }
        updateSize()
        window.addEventListener('resize', updateSize)
        return () => window.removeEventListener('resize', updateSize)
    }, [compact])

    // Auto-rotate
    useEffect(() => {
        if (globeRef.current) {
            const controls = globeRef.current.controls()
            if (controls) {
                controls.autoRotate = true
                controls.autoRotateSpeed = 0.8
                controls.enableZoom = true
                controls.minDistance = compact ? 200 : 180
                controls.maxDistance = compact ? 400 : 500
            }
        }
    }, [data, compact])

    const points = data?.points || []
    const stats = data?.stats || { totalMembers: 0, totalCountries: 0 }

    return (
        <div ref={containerRef} className="relative w-full flex flex-col items-center">
            {/* Live Counter */}
            <div className={`flex flex-wrap justify-center gap-4 sm:gap-8 ${compact ? 'mb-4' : 'mb-8'}`}>
                <div className="text-center">
                    <div className={`${compact ? 'text-3xl' : 'text-4xl sm:text-5xl'} font-display font-light text-sky-500 tracking-tight`}>
                        {stats.totalMembers}
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">
                        Communities & Creators
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

            {/* Globe */}
            <div className="relative" style={{ width: globeSize, height: globeSize }}>
                <Globe
                    ref={globeRef}
                    width={globeSize}
                    height={globeSize}
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                    backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                    // Glowing HTML markers
                    htmlElementsData={points}
                    htmlLat="lat"
                    htmlLng="lng"
                    htmlAltitude={0.01}
                    htmlElement={(d: object) => {
                        const point = d as GlobePoint
                        const color = point.type === 'community' ? '#38bdf8' : '#a78bfa'

                        const wrapper = document.createElement('div')
                        wrapper.style.position = 'relative'
                        wrapper.style.cursor = 'pointer'
                        wrapper.style.width = '0'
                        wrapper.style.height = '0'
                        wrapper.style.display = 'flex'
                        wrapper.style.alignItems = 'center'
                        wrapper.style.justifyContent = 'center'

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
                                    width: 32px; height: 32px;
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
                                    width: 32px; height: 32px;
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
                                    width: 20px; height: 20px;
                                    border-radius: 50%;
                                    background: ${color};
                                    opacity: 0.25;
                                    filter: blur(6px);
                                "></div>
                                <!-- Core dot -->
                                <div style="
                                    width: 8px; height: 8px;
                                    border-radius: 50%;
                                    background: ${color};
                                    box-shadow: 0 0 8px 2px ${color}, 0 0 20px 4px ${color}40;
                                "></div>
                            </div>
                        `

                        // Add tooltip on hover
                        const tooltipDiv = document.createElement('div')
                        tooltipDiv.style.cssText = `
                            position: absolute;
                            bottom: 24px; left: 50%;
                            transform: translateX(-50%);
                            background: rgba(255,255,255,0.95);
                            backdrop-filter: blur(12px);
                            border: 1px solid rgba(14,165,233,0.2);
                            border-radius: 12px;
                            padding: 10px 14px;
                            font-family: Inter, sans-serif;
                            box-shadow: 0 8px 32px rgba(0,0,0,0.12);
                            min-width: 140px;
                            opacity: 0;
                            pointer-events: none;
                            transition: opacity 0.2s;
                            z-index: 100;
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
