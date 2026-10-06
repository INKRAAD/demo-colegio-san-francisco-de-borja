import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { Crest2D } from './Crest2D'

/** Versión ligera (móvil / sin WebGL): el escudo SVG se ensambla pieza por pieza. */
export function CrestAssemble2D({ start, className = '' }: { start: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const q = (s: string) => el.querySelectorAll(`[data-part="${s}"]`)
    const letters = el.querySelectorAll('[data-part="sfb"] path')
    const strokes = el.querySelectorAll('[data-part="crismon"] path')
    if (prefersReducedMotion()) return
    gsap.set(el.querySelector('svg'), { transformOrigin: '50% 50%' })
    gsap.set(q('campo'), { scale: 0.3, opacity: 0, transformOrigin: '50% 50%', transformBox: 'fill-box' })
    gsap.set(q('borde'), { scale: 1.5, rotate: 90, opacity: 0, transformOrigin: '50% 50%', transformBox: 'fill-box' })
    gsap.set(letters, { y: -60, opacity: 0 })
    strokes.forEach((s) => {
      const len = (s as SVGPathElement).getTotalLength()
      gsap.set(s, { strokeDasharray: len, strokeDashoffset: len })
    })
    if (!start) return
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    tl.to(q('campo'), { scale: 1, opacity: 1, duration: 1.1 })
      .to(q('borde'), { scale: 1, rotate: 0, opacity: 1, duration: 1.2 }, 0.2)
      .to(letters, { y: 0, opacity: 1, duration: 0.9, ease: 'back.out(2)', stagger: 0.1 }, 0.7)
      .to(strokes, { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut', stagger: 0.12 }, 1)
      .fromTo(el.querySelector('svg'), { rotateY: -25 }, { rotateY: 0, duration: 2.2, ease: 'power3.out' }, 0)
    return () => { tl.kill() }
  }, [start])
  return (
    <div ref={ref} className={className} style={{ perspective: 800 }}>
      <Crest2D className="h-full w-full drop-shadow-[0_30px_40px_rgba(59,7,16,.35)]" />
    </div>
  )
}
