import { useEffect, useRef } from 'react'
import { gsap } from '../lib/motion'

/** Cursor de marca: punto rojo + anillo dorado que crece sobre elementos interactivos. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce || !dot.current || !ring.current) return
    document.documentElement.classList.add('has-cursor')
    gsap.set([dot.current, ring.current], { opacity: 0 })
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.12 })
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.12 })
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' })
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' })
    const move = (e: PointerEvent) => {
      gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 })
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY)
      const t = e.target as HTMLElement
      ring.current!.classList.toggle('is-hover', !!t.closest('a,button,[role="button"],summary,label,select'))
    }
    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3 })
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])
  return (
    <>
      <div ref={ring} className="cursor-ring hidden [@media(hover:hover)_and_(pointer:fine)]:block" aria-hidden />
      <div ref={dot} className="cursor-dot hidden [@media(hover:hover)_and_(pointer:fine)]:block" aria-hidden />
    </>
  )
}
