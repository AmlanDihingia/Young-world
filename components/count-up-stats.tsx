'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  end: number
  duration?: number
  label: string
}

function CountUpNumber({ end, duration = 2000, label }: CountUpProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  useEffect(() => {
    if (!hasAnimated) return

    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Ease-out cubic for a smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [hasAnimated, end, duration])

  return (
    <div ref={ref} className="flex flex-col items-center">
      <span className="text-5xl md:text-6xl font-black text-[#C49232] mb-2 tabular-nums">
        {count}
      </span>
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
        {label}
      </span>
    </div>
  )
}

interface CountUpStatsProps {
  communities: number
  countries: number
  continents: number
  categories: number
}

export default function CountUpStats({ communities, countries, continents, categories }: CountUpStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10 md:mb-16 text-center">
      <CountUpNumber end={communities} label="COMMUNITIES" />
      <CountUpNumber end={countries} label="COUNTRIES" />
      <CountUpNumber end={continents} label="CONTINENTS" duration={1500} />
      <CountUpNumber end={categories} label="CATEGORIES" />
    </div>
  )
}
