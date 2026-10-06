import { useEffect, useRef } from 'react'
import { NIVELES, type Nivel } from '../data/site'
import { gsap, prefersReducedMotion, useMedia } from '../lib/motion'
import { Crest2D } from '../components/Crest2D'
import { IconCheck } from '../components/Icons'

const THEMES = [
  { bg: 'bg-crema', text: 'text-vino', sub: 'text-vino/70', chip: 'bg-vino text-crema', accent: 'text-rojo', line: 'border-vino/15' },
  { bg: 'bg-oro', text: 'text-vino', sub: 'text-vino/75', chip: 'bg-vino text-oro', accent: 'text-rojo-profundo', line: 'border-vino/20' },
  { bg: 'bg-rojo', text: 'text-crema', sub: 'text-crema/85', chip: 'bg-crema text-rojo', accent: 'text-oro', line: 'border-crema/25' },
]
const ROMAN = ['I', 'II', 'III']

function Panel({ n, i }: { n: Nivel; i: number }) {
  const t = THEMES[i]
  return (
    <article
      id={`nivel-${n.id}`}
      aria-labelledby={`t-${n.id}`}
      className={`camino-panel relative flex min-h-[100svh] w-full shrink-0 items-center overflow-hidden lg:h-screen lg:w-screen ${t.bg} ${t.text}`}
    >
      <span aria-hidden className={`pointer-events-none absolute -bottom-[0.18em] right-[-0.04em] font-serif text-[38vw] leading-none font-black opacity-[0.07] lg:text-[30vw]`}>{ROMAN[i]}</span>
      <div className="container-x grid items-center gap-10 py-24 lg:grid-cols-[1fr_1.05fr] lg:py-0">
        <div className="relative z-10 max-w-xl">
          <p className={`kicker ${t.accent}`}>{n.etapa} · {n.edades}</p>
          <h3 id={`t-${n.id}`} className="mt-4 text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.9] font-medium tracking-[-0.03em]">
            <span className="block text-[0.32em] font-semibold tracking-normal">{n.nombre}</span>
            <em className="font-normal italic">{n.verbo}</em>
          </h3>
          <p className="mt-5 font-serif text-xl md:text-2xl">{n.lema}</p>
          <p className={`mt-4 text-base leading-relaxed md:text-[1.05rem] ${t.sub}`}>{n.texto}</p>
          <ul className="mt-6 space-y-2">
            {n.puntos.map((p) => (
              <li key={p} className={`flex items-center gap-3 border-b pb-2 text-[0.95rem] font-semibold ${t.line}`}>
                <IconCheck className={`h-5 w-5 shrink-0 ${t.accent}`} /> {p}
              </li>
            ))}
          </ul>
          <p className="mt-6 flex flex-wrap items-center gap-2 text-sm">
            <span className={`rounded-full px-3 py-1.5 font-bold ${t.chip}`}>Pensión referencial {n.pension}</span>
            <span className={`text-xs ${t.sub}`}>MINEDU (vía terceros) · montos 2027 por confirmar</span>
          </p>
        </div>
        <div className="relative h-[52vh] min-h-[340px] lg:h-[72vh]">
          <figure className="camino-img absolute left-0 top-0 h-[78%] w-[78%] overflow-hidden rounded-[2rem] shadow-2xl">
            <img src={`${n.img}-1600.webp`} srcSet={`${n.img}-800.webp 800w, ${n.img}-1600.webp 1600w`} sizes="(min-width:1024px) 40vw, 80vw" alt={n.alt} loading="lazy" decoding="async" className="camino-parallax h-full w-[118%] max-w-none object-cover" />
          </figure>
          <figure className="camino-img2 absolute bottom-0 right-0 h-[46%] w-[48%] overflow-hidden rounded-[1.6rem] border-[6px] border-current/10 shadow-2xl">
            <img src={`${n.img2}-800.webp`} alt={n.alt2} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </figure>
          <span className="absolute bottom-2 left-2 rounded-full bg-black/45 px-2.5 py-1 text-[0.65rem] font-semibold text-white backdrop-blur">Fotos referenciales</span>
        </div>
      </div>
    </article>
  )
}

/** Scroll storytelling: el recorrido Inicial → Primaria → Secundaria (horizontal y fijado en escritorio). */
export function Camino() {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const edad = useRef<HTMLSpanElement>(null)
  const wide = useMedia('(min-width: 1024px)')

  useEffect(() => {
    const el = root.current, tr = track.current
    if (!el || !tr) return
    const reduce = prefersReducedMotion()
    const ctx = gsap.context(() => {
      if (wide && !reduce) {
        const panels = gsap.utils.toArray<HTMLElement>('.camino-panel')
        const dist = () => tr.scrollWidth - window.innerWidth
        const tween = gsap.to(tr, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            pin: true,
            scrub: 0.8,
            end: () => '+=' + dist(),
            invalidateOnRefresh: true,
            snap: { snapTo: 1 / (panels.length - 1), duration: { min: 0.25, max: 0.7 }, ease: 'power2.inOut', delay: 0.08 },
            onUpdate: (self) => {
              const age = Math.round(4 + self.progress * 12)
              if (edad.current) edad.current.textContent = String(age)
              gsap.set('.camino-progress', { scaleX: self.progress })
              gsap.set('.camino-token', { left: `${self.progress * 100}%` })
            },
          },
        })
        panels.forEach((p) => {
          const img = p.querySelector('.camino-parallax')
          if (img) gsap.fromTo(img, { xPercent: -12 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } })
          const img2 = p.querySelector('.camino-img2')
          if (img2) gsap.fromTo(img2, { y: 80 }, { y: -30, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } })
          const h = p.querySelector('h3 em')
          if (h) gsap.from(h, { xPercent: 30, opacity: 0, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left 85%', end: 'left 30%', scrub: true } })
        })
      } else if (!reduce) {
        gsap.utils.toArray<HTMLElement>('.camino-panel').forEach((p) => {
          gsap.from(p.querySelectorAll('h3, p, li, figure'), { y: 40, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.05, scrollTrigger: { trigger: p, start: 'top 70%', once: true } })
        })
      }
    }, el)
    return () => ctx.revert()
  }, [wide])

  return (
    <section id="camino" aria-labelledby="camino-titulo" className="relative bg-crema">
      <div className="container-x pb-6 pt-24 md:pt-32 lg:hidden">
        <p className="kicker text-rojo">El camino borjino</p>
        <h2 id="camino-titulo" className="mt-4 text-[clamp(2.4rem,7vw,4rem)] leading-[0.95] text-vino">De los 4 a los 16 años, <em className="italic text-rojo">un mismo escudo.</em></h2>
      </div>
      <div ref={root} className="relative overflow-hidden">
        <div ref={track} className="flex flex-col lg:h-screen lg:flex-row">
          {/* intro (solo escritorio) */}
          <div className="relative hidden h-screen w-[62vw] shrink-0 items-center bg-crema text-vino lg:flex">
            <div className="pl-[max(3rem,calc((100vw-1320px)/2+3rem))] pr-16">
              <p className="kicker text-rojo">El camino borjino</p>
              <h2 className="mt-5 text-[clamp(3rem,5.6vw,6rem)] leading-[0.92] tracking-[-0.02em]">De los 4 a los 16 años, <em className="italic text-rojo">un mismo escudo.</em></h2>
              <p className="mt-6 max-w-md text-lg text-vino/75">Tres etapas, una misma familia. Deslice para recorrer la vida escolar en el CSFB.</p>
              <div className="mt-10 flex items-center gap-4 text-sm font-bold text-rojo">
                <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-rojo">→</span> Desliza
              </div>
            </div>
          </div>
          {NIVELES.map((n, i) => <Panel key={n.id} n={n} i={i} />)}
          {/* cierre */}
          <div className="relative flex min-h-[80svh] w-full shrink-0 items-center overflow-hidden bg-vino text-crema lg:h-screen lg:w-[80vw]">
            <img src="/img/promocion-1600.webp" alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-r from-vino via-vino/80 to-transparent" />
            <div className="container-x relative lg:pl-24">
              <Crest2D decorative className="h-20 w-auto" />
              <p className="mt-6 max-w-xl font-serif text-[clamp(2.2rem,4.5vw,4.4rem)] leading-[1]">Y después, la vida. <em className="text-oro italic">Con el escudo en el corazón.</em></p>
              <p className="mt-5 max-w-md text-crema/75">Egresados con criterio, fe y vocación de servicio: la promoción borjina.</p>
            </div>
          </div>
        </div>

        {/* indicador de edad y progreso (escritorio) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden lg:block">
          <div className="container-x flex items-end gap-6 pb-8">
            <p className="rounded-2xl bg-vino/90 px-4 py-2 text-crema shadow-xl backdrop-blur">
              <span className="block text-[0.6rem] font-bold tracking-[0.25em] text-oro uppercase">Edad</span>
              <span className="font-serif text-3xl tabular-nums"><span ref={edad}>4</span> años</span>
            </p>
            <div className="relative mb-5 h-[3px] flex-1 rounded-full bg-vino/15">
              <div className="camino-progress absolute inset-0 origin-left scale-x-0 rounded-full bg-gradient-to-r from-oro via-naranja to-rojo" />
              <div className="camino-token absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: 0 }}>
                <Crest2D decorative className="h-8 w-auto drop-shadow" />
              </div>
              <div className="absolute -top-6 flex w-full justify-between text-[0.65rem] font-bold tracking-widest text-vino/60 uppercase">
                <span>Inicial</span><span>Primaria</span><span>Secundaria</span><span>Promoción</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
