"use client"

import { useEffect, useRef } from "react"

import { trackSectionView } from "@/lib/gtag"

const LANDING_SECTIONS = [
  { targetId: "hero", sectionName: "히어로", sectionOrder: 1 },
  { targetId: "problem", sectionName: "문제", sectionOrder: 2 },
  { targetId: "guide", sectionName: "가이드", sectionOrder: 3 },
  { targetId: "plan", sectionName: "계획", sectionOrder: 4 },
  { targetId: "success", sectionName: "성공", sectionOrder: 5 },
  { targetId: "contact-form", sectionName: "폼", sectionOrder: 6 },
] as const

export function SectionViewTracker() {
  const trackedRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    for (const { targetId, sectionName, sectionOrder } of LANDING_SECTIONS) {
      const el = document.getElementById(targetId)
      if (!el) continue

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            if (trackedRef.current.has(sectionName)) continue

            trackedRef.current.add(sectionName)
            trackSectionView(sectionName, sectionOrder)
            observer.disconnect()
          }
        },
        { threshold: 0.3 },
      )

      observer.observe(el)
      observers.push(observer)
    }

    return () => {
      for (const observer of observers) {
        observer.disconnect()
      }
    }
  }, [])

  return null
}
