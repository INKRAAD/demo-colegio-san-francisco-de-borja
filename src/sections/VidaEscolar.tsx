import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { GALERIA } from '../data/site'
import { gsap, getLenis, prefersReducedMotion } from '../lib/motion'
import { SplitHeading } from '../components/SplitHeading'
import { IconClose } from '../components/Icons'

const LAYOUT = [
  'md:col-span-7 md:row-span-2 aspect-[4/3] md:aspect-auto',
  'md:col-span-5 aspect-[4/3]',
  'md:col-span-5 aspect-[4/3]',
  'md:col-span-4 aspect-[4/3]',
  'md:col-span-4 aspect-[4/3]',
  'md:col-span-4 aspect-[4/3]',
]

export function VidaEscolar() {
  const root = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<number | null>(null)
  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.gal-item').forEach((it, i) => {
        gsap.fromTo(it, { clipPath: 'inset(18% 10% 18% 10% round 2rem)', opacity: 0.3 }, { clipPath: 'inset(0% 0% 0% 0% round 2rem)', opacity: 1, duration: 1.4, ease: 'expo.out', delay: (i % 3) * 0.08, scrollTrigger: { trigger: it, start: 'top 88%', once: true } })
        const img = it.querySelector('img')
        if (img) gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: it, start: 'top bottom', end: 'bottom top', scrub: true } })
      })
    }, root)
    return () => ctx.revert()
  }, [])
  useEffect(() => {
    const l = getLenis()
    if (open !== null) l?.stop(); else l?.start()
    const k = (e: KeyboardEvent) => {
      if (open === null) return
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen((open + 1) % GALERIA.length)
      if (e.key === 'ArrowLeft') setOpen((open - 1 + GALERIA.length) % GALERIA.length)
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open])

  return (
    <section id="vida" ref={root} aria-labelledby="vida-titulo" className="relative bg-crema py-24 md:py-36">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="kicker text-rojo">Vida escolar</p>
            <SplitHeading className="mt-4 text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[0.95] tracking-[-0.02em] text-vino" lines={['Un colegio que', 'se vive en comunidad']} id="vida-titulo" />
          </div>
          <p className="max-w-md text-tinta/70">Festival de danzas <em>El mundo baila</em>, la nueva biblioteca, el coliseo deportivo y la vida de fe: momentos que hacen de cada año escolar una historia compartida.</p>
        </div>
        <div className="mt-14 grid auto-rows-[minmax(0,1fr)] gap-4 md:grid-cols-12 md:gap-5">
          {GALERIA.map((g, i) => (
            <button
              key={g.src}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Ampliar foto: ${g.titulo}`}
              className={`gal-item group relative overflow-hidden rounded-[2rem] text-left ${LAYOUT[i]}`}
            >
              <img src={`${g.src}-${i === 0 ? 1600 : 800}.webp`} alt={g.alt} loading="lazy" decoding="async" className="absolute inset-0 h-[116%] w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-vino/85 via-vino/10 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-5 text-crema md:p-6">
                <span className="block font-serif text-2xl md:text-3xl">{g.titulo}</span>
                <span className="mt-1 block text-sm text-crema/80">{g.texto}</span>
              </span>
              <span className="absolute right-4 top-4 rounded-full bg-black/40 px-2.5 py-1 text-[0.65rem] font-semibold text-white backdrop-blur">Foto referencial</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={GALERIA[open].titulo}
            className="fixed inset-0 z-[160] grid place-items-center bg-vino/95 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.figure
              key={open}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[86vh] max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={`${GALERIA[open].src}-1600.webp`} alt={GALERIA[open].alt} className="max-h-[78vh] w-auto rounded-2xl object-contain" />
              <figcaption className="mt-4 flex items-center justify-between gap-4 text-crema">
                <span><span className="font-serif text-2xl">{GALERIA[open].titulo}</span> <span className="text-crema/70">· {GALERIA[open].texto} · foto referencial</span></span>
                <span className="flex gap-2">
                  <button type="button" className="rounded-full border border-crema/30 px-4 py-2 text-sm" onClick={() => setOpen((open - 1 + GALERIA.length) % GALERIA.length)} aria-label="Foto anterior">←</button>
                  <button type="button" className="rounded-full border border-crema/30 px-4 py-2 text-sm" onClick={() => setOpen((open + 1) % GALERIA.length)} aria-label="Foto siguiente">→</button>
                </span>
              </figcaption>
            </motion.figure>
            <button type="button" autoFocus className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-crema text-vino" aria-label="Cerrar" onClick={() => setOpen(null)}>
              <IconClose className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
