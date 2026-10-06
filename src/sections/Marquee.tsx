import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion'

const WORDS = ['Fe', 'Ciencia', 'Comunidad', 'Deporte', 'Arte', 'Servicio', 'Familia borjina', 'Misión']

/** Cinta infinita cuya velocidad responde a la velocidad del scroll. */
export function Marquee() {
  const track = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = track.current
    if (!el || prefersReducedMotion()) return
    const tween = gsap.to(el, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 })
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const v = self.getVelocity() / 300
        gsap.to(tween, { timeScale: (self.direction === -1 ? -1 : 1) * Math.min(6, 1 + Math.abs(v)), duration: 0.2, overwrite: true })
        gsap.to(tween, { timeScale: self.direction === -1 ? -1 : 1, duration: 1.2, delay: 0.25 })
      },
    })
    return () => { tween.kill(); st.kill() }
  }, [])
  const row = WORDS.map((w, i) => (
    <span key={i} className="flex items-center gap-8 pr-8">
      <span className={i % 2 ? 'font-serif italic text-oro' : 'font-serif text-crema'}>{w}</span>
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-oro" aria-hidden><path fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" d="M5 7l14 10M19 7 5 17M12 3v18" /></svg>
    </span>
  ))
  return (
    <div className="relative overflow-hidden border-y border-oro/20 bg-rojo py-5 text-[clamp(1.6rem,3.4vw,2.8rem)] leading-none" aria-hidden>
      <div ref={track} className="marquee-track">{row}{row}</div>
    </div>
  )
}
