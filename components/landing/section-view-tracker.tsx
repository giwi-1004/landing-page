"use client"

import { useEffect, useRef } from "react"

import { trackSectionView } from "@/lib/gtag"

const LANDING_SECTIONS = [
  { targetId: "hero", sectionName: "히어로" },
  { targetId: "problem", sectionName: "문제" },
  { targetId: "guide", sectionName: "가이드" },
  { targetId: "plan", sectionName: "계획" },
  { targetId: "success", sectionName: "성공" },
  { targetId: "contact-form", sectionName: "폼" },
] as const

export function SectionViewTracker() {
  const trackedRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    for (const { targetId, sectionName } of LANDING_SECTIONS) {
      const el = document.getElementById(targetId)
      if (!el) continue

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            if (trackedRef.current.has(sectionName)) continue

            trackedRef.current.add(sectionName)
            trackSectionView(sectionName)
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
