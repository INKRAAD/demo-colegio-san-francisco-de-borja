import { createElement, useEffect, useRef, type ReactNode } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'

type Props = {
  as?: 'h1' | 'h2' | 'h3' | 'p'
  lines: ReactNode[]
  className?: string
  id?: string
  /** Animar al entrar en viewport (por defecto) o manualmente con `play`. */
  play?: boolean
  delay?: number
}

/** Título con revelado por líneas/palabras (máscara + subida). Accesible: el texto sigue siendo texto real. */
export function SplitHeading({ as = 'h2', lines, className = '', id, play, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const words = el.querySelectorAll('.split-word')
    if (prefersReducedMotion()) { gsap.set(words, { yPercent: 0, opacity: 1 }); return }
    gsap.set(words, { yPercent: 110, rotate: 4, opacity: 0 })
    const anim = () => gsap.to(words, { yPercent: 0, rotate: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.06, delay })
    if (play === undefined) {
      const ctx = gsap.context(() => {
        gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } }).add(anim())
      })
      return () => ctx.revert()
    }
    if (play) anim()
  }, [play, delay])

  const content = lines.map((line, i) => (
    <span key={i} className="split-line">
      {typeof line === 'string'
        ? line.split(' ').map((w, j, arr) => (
            <span key={j} className="split-word">
              {w}
              {j < arr.length - 1 ? '\u00A0' : ''}
            </span>
          ))
        : <span className="split-word">{line}</span>}
    </span>
  ))
  return createElement(as, { ref, className, id }, content)
}
