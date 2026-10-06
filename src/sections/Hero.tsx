import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { COLEGIO, WA_DEFAULT } from '../data/site'
import { gsap, hasWebGL, prefersReducedMotion, scrollToId, useMedia } from '../lib/motion'
import { SplitHeading } from '../components/SplitHeading'
import { Magnetic } from '../components/Magnetic'
import { CrestAssemble2D } from '../components/CrestAssemble2D'
import { IconArrow, IconStar, IconWhatsApp } from '../components/Icons'

const Crest3D = lazy(() => import('../components/Crest3D'))

export function Hero({ ready }: { ready: boolean }) {
  const desktop = useMedia('(min-width: 900px)')
  const use3D = useMemo(() => desktop && !prefersReducedMotion() && hasWebGL(), [desktop])
  const [glReady, setGlReady] = useState(false)
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ready || !root.current) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-fade', { y: 24, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.08, delay: 0.55 })
      gsap.fromTo('.hero-line', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2.4, ease: 'power2.inOut', delay: 1.2, stagger: 0.15 })
      // parallax de salida
      gsap.to('.hero-copy', { yPercent: -18, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [ready])

  return (
    <section id="inicio" ref={root} className="grain relative isolate min-h-[100svh] overflow-hidden bg-vino text-crema">
      {/* fondo: halo rojo + líneas del crismón extendidas */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_72%_45%,#d30128_0%,#8e0a1f_38%,#3b0710_75%)]" />
      <svg aria-hidden className="absolute inset-0 -z-10 h-full w-full opacity-60" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke="#F9CB24" strokeWidth="1" strokeOpacity=".35">
          <path className="hero-line" pathLength={1} strokeDasharray="1" d="M-60 230 L1500 930" />
          <path className="hero-line" pathLength={1} strokeDasharray="1" d="M1500 150 L-60 840" />
          <path className="hero-line" pathLength={1} strokeDasharray="1" d="M1040 -20 V940" />
        </g>
      </svg>

      <div className="container-x relative grid min-h-[100svh] items-center gap-6 pb-16 pt-[130px] md:grid-cols-[1.05fr_1fr] md:pt-[120px]">
        <div className="hero-copy relative z-10 max-w-[640px]">
          <p className="hero-fade mb-6 inline-flex items-center gap-2 rounded-full border border-oro/40 bg-vino/40 px-3.5 py-1.5 text-[0.75rem] font-bold tracking-[0.12em] text-oro uppercase backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-oro shadow-[0_0_12px_#F9CB24]" /> Admisiones 2027 · Inscripciones abiertas
          </p>
          <SplitHeading
            as="h1"
            play={ready}
            delay={0.15}
            className="text-[clamp(2.7rem,6.6vw,5.9rem)] leading-[0.95] font-medium tracking-[-0.02em]"
            lines={['Crecer en la', <em key="e" className="text-oro-shine font-normal italic">familia borjina</em>]}
          />
          <p className="hero-fade mt-7 max-w-[520px] text-[1.05rem] leading-relaxed text-crema/85 sm:text-lg">
            Colegio católico misionero de los Padres de la Preciosa Sangre en San Borja. Inicial, Primaria y Secundaria con fe, exigencia académica y una comunidad que acompaña.
          </p>
          <div className="hero-fade mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#admision" onClick={(e) => { e.preventDefault(); scrollToId('admision') }} className="btn btn-oro text-base">
                Postular a 2027 <IconArrow className="h-5 w-5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={WA_DEFAULT} target="_blank" rel="noopener" className="btn btn-linea text-base text-crema">
                <IconWhatsApp className="h-5 w-5 text-oro" /> Agendar visita
              </a>
            </Magnetic>
          </div>
          <dl className="hero-fade mt-12 grid max-w-[540px] grid-cols-3 gap-4 border-t border-crema/15 pt-6 text-sm">
            <div><dt className="text-crema/60">Niveles</dt><dd className="mt-1 font-semibold">Inicial · Primaria · Secundaria</dd></div>
            <div><dt className="text-crema/60">Distrito</dt><dd className="mt-1 font-semibold">San Borja, Lima</dd></div>
            <div>
              <dt className="text-crema/60">Google<sup>*</sup></dt>
              <dd className="mt-1 flex items-center gap-1 font-semibold"><IconStar className="h-4 w-4 text-oro" /> {COLEGIO.rating.toFixed(1).replace('.', ',')} · ≈{COLEGIO.resenas} reseñas</dd>
            </div>
          </dl>
          <p className="hero-fade mt-3 text-[0.7rem] text-crema/45">* Calificación según directorios que replican la ficha de Google; por verificar.</p>
        </div>

        <div className="relative order-first h-[38vh] min-h-[260px] md:order-none md:h-[78vh]">
          {use3D ? (
            <Suspense fallback={null}>
              <div className={`absolute inset-0 transition-opacity duration-700 ${glReady ? 'opacity-100' : 'opacity-0'}`}>
                <Crest3D start={ready && glReady} onReady={() => setGlReady(true)} />
              </div>
            </Suspense>
          ) : (
            <CrestAssemble2D start={ready} className="mx-auto h-full max-h-[360px] w-auto aspect-[212/240] md:max-h-[520px]" />
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToId('identidad')}
        className="hero-fade absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.7rem] font-bold tracking-[0.25em] text-crema/70 uppercase md:flex"
      >
        Recorrer el camino
        <span className="relative h-10 w-px overflow-hidden bg-crema/20"><span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-oro" /></span>
      </button>
      <style>{`@keyframes scrollcue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  )
}
