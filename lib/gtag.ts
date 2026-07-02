type GtagEventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (
      command: "event" | "config" | "js" | "set",
      targetOrEvent: string | Date,
      params?: GtagEventParams,
    ) => void
  }
}

function sendGtagEvent(eventName: string, params?: GtagEventParams) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return
  }
  window.gtag("event", eventName, params)
}

export function trackSectionView(sectionName: string) {
  sendGtagEvent("section_view", { section_name: sectionName })
}

export function trackFormSubmit(formName: string) {
  sendGtagEvent("form_submit", { form_name: formName })
}

export function trackCtaClick(buttonName: string, section: string) {
  sendGtagEvent("cta_click", {
    button_name: buttonName,
    section,
  })
}
