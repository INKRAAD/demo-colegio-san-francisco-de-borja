import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'

/** Número que cuenta al entrar en pantalla. */
export function Counter({ to, prefix = '', suffix = '', decimals = 0, separator = true, className = '' }: {
  to: number; prefix?: string; suffix?: string; decimals?: number; separator?: boolean; className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fmt = (v: number) => {
      const s = v.toFixed(decimals)
      return prefix + (separator ? Number(s).toLocaleString('es-PE', { minimumFractionDigits: decimals }) : s) + suffix
    }
    if (prefersReducedMotion()) { el.textContent = fmt(to); return }
    const o = { v: 0 }
    el.textContent = fmt(0)
    const ctx = gsap.context(() => {
      gsap.to(o, {
        v: to, duration: 2.2, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => { el.textContent = fmt(o.v) },
      })
    })
    return () => ctx.revert()
  }, [to, prefix, suffix, decimals, separator])
  return <span ref={ref} className={className}>{prefix}{to}{suffix}</span>
}
