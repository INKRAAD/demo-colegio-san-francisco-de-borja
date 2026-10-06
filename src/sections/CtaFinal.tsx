import { useEffect, useRef } from 'react'
import { WA_DEFAULT } from '../data/site'
import { gsap, prefersReducedMotion, scrollToId } from '../lib/motion'
import { Crest2D } from '../components/Crest2D'
import { Magnetic } from '../components/Magnetic'
import { IconArrow, IconWhatsApp } from '../components/Icons'

export function CtaFinal() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-crest', { rotateY: -70, scale: 0.7 }, { rotateY: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'center center', scrub: true } })
      gsap.fromTo('.cta-ring', { scale: 0.6, opacity: 0 }, { scale: 1.25, opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} aria-labelledby="cta-titulo" className="grain relative overflow-hidden bg-vino py-28 text-center text-crema md:py-40">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_40%,#d30128_0%,#3b0710_70%)]" />
      {[0, 1, 2].map((i) => (
        <span key={i} aria-hidden className="cta-ring absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-oro/20" style={{ width: `${30 + i * 18}rem`, height: `${30 + i * 18}rem` }} />
      ))}
      <div className="container-x relative">
        <div className="mx-auto w-28 md:w-36" style={{ perspective: 800 }}>
          <Crest2D decorative className="cta-crest w-full drop-shadow-[0_30px_40px_rgba(0,0,0,.35)]" />
        </div>
        <h2 id="cta-titulo" className="mx-auto mt-10 max-w-4xl text-[clamp(2.6rem,6.5vw,6rem)] leading-[0.95] tracking-[-0.02em]">
          Su lugar en la familia borjina <em className="text-oro-shine italic">empieza aquí.</em>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-crema/80">Admisiones 2027 en curso para Inicial, Primaria y Secundaria. Agende hoy su visita.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Magnetic><a href="#admision" onClick={(e) => { e.preventDefault(); scrollToId('admision') }} className="btn btn-oro text-base">Postular a 2027 <IconArrow className="h-5 w-5" /></a></Magnetic>
          <Magnetic><a href={WA_DEFAULT} target="_blank" rel="noopener" className="btn btn-linea text-base"><IconWhatsApp className="h-5 w-5 text-oro" /> Hablar con Admisión</a></Magnetic>
        </div>
      </div>
    </section>
  )
}
