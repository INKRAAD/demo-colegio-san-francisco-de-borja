import { useEffect, useRef } from 'react'
import { CREST2D } from '../data/crest'
import { gsap, prefersReducedMotion } from '../lib/motion'

/** Loader de marca: el contorno del escudo se traza en oro mientras cuentan los 59 años. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const num = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = root.current!
    if (prefersReducedMotion()) { const t = setTimeout(onDone, 150); return () => clearTimeout(t) }
    const paths = el.querySelectorAll<SVGPathElement>('.draw')
    paths.forEach((p) => { const l = p.getTotalLength(); gsap.set(p, { strokeDasharray: l, strokeDashoffset: l }) })
    const o = { v: 0 }
    const tl = gsap.timeline()
    tl.to(paths, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut', stagger: 0.12 }, 0)
      .to(o, { v: 59, duration: 1.6, ease: 'power2.out', onUpdate: () => { if (num.current) num.current.textContent = String(Math.round(o.v)).padStart(2, '0') } }, 0)
      .to(el.querySelector('.fill'), { opacity: 1, duration: 0.5 }, 1.35)
      .to(el.querySelector('.inner'), { scale: 0.85, opacity: 0, duration: 0.6, ease: 'power3.in' }, 2.0)
      .to(el, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut', onStart: () => onDone() }, 2.35)
      .set(el, { display: 'none' })
    document.fonts?.ready.catch(() => {})
    return () => { tl.kill() }
  }, [onDone])

  return (
    <div
      ref={root}
      role="status"
      aria-label="Cargando Colegio San Francisco de Borja"
      className="fixed inset-0 z-[200] grid place-items-center bg-vino text-crema"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      <div className="inner flex flex-col items-center gap-6">
        <svg viewBox="42 52 212 240" className="w-24 sm:w-28" aria-hidden>
          <path className="fill" d={CREST2D.outer} fill="#F9CB24" opacity={0} />
          <path className="fill" d={CREST2D.inner} fill="#D30128" opacity={0} />
          <path className="draw" d={CREST2D.outer} fill="none" stroke="#F9CB24" strokeWidth={2} />
          <path className="draw" d={CREST2D.inner} fill="none" stroke="#F9CB24" strokeWidth={1.2} />
          <path className="draw" d="M63 169L148 207M233 169L148 207M148 160V268M125 163.5H158A10 10 0 0 1 158 183.5H148" fill="none" stroke="#FDF5CC" strokeWidth={5} strokeLinecap="round" />
        </svg>
        <p className="text-center font-serif">
          <span ref={num} className="block text-5xl tabular-nums text-oro">00</span>
          <span className="mt-1 block text-xs font-sans font-bold tracking-[0.3em] uppercase text-crema/70">años de familia borjina</span>
        </p>
      </div>
    </div>
  )
}
