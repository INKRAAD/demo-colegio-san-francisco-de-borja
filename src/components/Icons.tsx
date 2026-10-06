import type { SVGProps } from 'react'
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export const IconWhatsApp = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.09c-.24.68-1.42 1.3-1.96 1.35-.5.05-1.13.07-1.83-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36h.56c.18 0 .42-.07.66.5.24.58.82 2.01.89 2.15.07.15.12.32.02.51-.1.19-.14.31-.29.48-.14.17-.3.38-.43.5-.14.15-.29.3-.12.59.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.44.29.15.46.12.63-.07.17-.19.73-.85.92-1.15.19-.29.39-.24.65-.15.27.1 1.69.8 1.98.94.29.15.48.22.55.34.08.12.08.7-.16 1.38Z"/></svg>
)
export const IconArrow = (p: SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" aria-hidden {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>)
export const IconPin = (p: SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" aria-hidden {...base} {...p}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>)
export const IconPhone = (p: SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" aria-hidden {...base} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>)
export const IconMail = (p: SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" aria-hidden {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>)
export const IconClock = (p: SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" aria-hidden {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>)
export const IconStar = (p: SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" aria-hidden {...p}><path fill="currentColor" d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z" /></svg>)
export const IconFacebook = (p: SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" aria-hidden {...p}><path fill="currentColor" d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.87.25-1.46 1.5-1.46h1.6V4.46A21 21 0 0 0 14.3 4.3c-2.3 0-3.85 1.4-3.85 3.97v2.23H7.9v3h2.55V21z" /></svg>)
export const IconInstagram = (p: SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" aria-hidden {...base} {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r=".9" fill="currentColor" stroke="none" /></svg>)
export const IconShield = (p: SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" aria-hidden {...base} {...p}><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6z" /><path d="m9 12 2 2 4-4" /></svg>)
export const IconHeart = (p: SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" aria-hidden {...base} {...p}><path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20Z" /></svg>)
export const IconChat = (p: SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" aria-hidden {...base} {...p}><path d="M4 5h16v11H9l-5 4z" /><path d="M8 10h8M8 13h5" /></svg>)
export const IconCheck = (p: SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" aria-hidden {...base} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>)
export const IconPlus = (p: SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" aria-hidden {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>)
export const IconClose = (p: SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" aria-hidden {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>)
