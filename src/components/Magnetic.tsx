import { useRef, type ReactNode } from 'react'
import { gsap } from '../lib/motion'

/** Envuelve un CTA y lo atrae suavemente hacia el puntero (solo con puntero fino). */
export function Magnetic({ children, strength = 0.35, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const fine = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  return (
    <span
      ref={ref}
      className={`inline-block ${className}`}
      onPointerMove={(e) => {
        if (!fine || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        const x = (e.clientX - (r.left + r.width / 2)) * strength
        const y = (e.clientY - (r.top + r.height / 2)) * strength
        gsap.to(ref.current, { x, y, duration: 0.5, ease: 'power3.out' })
      }}
      onPointerLeave={() => ref.current && gsap.to(ref.current, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' })}
    >
      {children}
    </span>
  )
}
