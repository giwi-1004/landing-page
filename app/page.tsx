"use client"

import { useState } from "react"

import { SuccessModal } from "@/components/landing/success-modal"
import { SectionContactForm } from "@/components/section-contact-form"
import { SectionGuide } from "@/components/section-guide"
import { SectionHero } from "@/components/section-hero"
import { SectionPlan } from "@/components/section-plan"
import { SectionProblem } from "@/components/section-problem"
import { SectionSuccess } from "@/components/section-success"
import { SiteFooter } from "@/components/site-footer"

export default function LandingPage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  return (
    <main className="landing-page mx-auto min-h-screen w-full max-w-full overflow-x-hidden bg-[#F8F9FA] md:max-w-[480px]">
      <SectionHero />
      <SectionProblem />
      <SectionGuide />
      <SectionPlan />
      <SectionSuccess />
      <SectionContactForm onSubmit={() => setShowSuccessModal(true)} />
      <SiteFooter />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </main>
  )
}
