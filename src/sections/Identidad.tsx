import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { Crest2D } from '../components/Crest2D'
import { SplitHeading } from '../components/SplitHeading'

const MANIFIESTO =
  'Somos un colegio misionero de la Congregación de los Padres de la Preciosa Sangre. Desde San Borja acompañamos a cada estudiante a crecer en fe, conocimiento y servicio, de la mano de sus familias.'

const LECTURA = [
  {
    id: 'sfb',
    titulo: 'SFB',
    sub: 'Nuestro nombre',
    texto: 'Las iniciales de San Francisco de Borja, santo que da nombre al colegio, en oro sobre el campo rojo.',
    pos: 'left-[50%] top-[25%]',
  },
  {
    id: 'crismon',
    titulo: '☧ Crismón',
    sub: 'Cristo al centro',
    texto: 'El monograma de Cristo: las letras griegas Ji (X) y Rho (P) entrelazadas en el corazón del escudo.',
    pos: 'left-[50%] top-[64%]',
  },
  {
    id: 'colores',
    titulo: 'Rojo y oro',
    sub: 'Lectura propuesta',
    texto: 'El rojo evoca la Preciosa Sangre, carisma de la congregación; el oro, el valor de lo que se forma con paciencia. (Interpretación a validar con el colegio.)',
    pos: 'left-[86%] top-[40%]',
  },
]

export function Identidad() {
  const root = useRef<HTMLElement>(null)
  const [activo, setActivo] = useState('crismon')
  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      // palabras que se "encienden" con el scroll
      gsap.fromTo('.mani-word', { opacity: 0.16 }, {
        opacity: 1, stagger: 0.1, ease: 'none',
        scrollTrigger: { trigger: '.mani', start: 'top 80%', end: 'bottom 45%', scrub: true },
      })
      gsap.from('.crest-read', { rotateY: -35, rotateX: 10, scale: 0.9, opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.crest-read', start: 'top 80%', once: true } })
    }, root)
    return () => ctx.revert()
  }, [])
  const info = LECTURA.find((l) => l.id === activo)!
  return (
    <section id="identidad" ref={root} className="relative overflow-hidden bg-papel py-24 md:py-36">
      <div className="container-x grid items-center gap-16 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="kicker text-rojo">Identidad · Desde 1967<sup>*</sup></p>
          <p className="mani mt-6 font-serif text-[clamp(1.7rem,3.3vw,2.85rem)] leading-[1.18] tracking-[-0.01em] text-vino">
            {MANIFIESTO.split(' ').map((w, i) => (
              <span key={i} className="mani-word">{w} </span>
            ))}
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-vino/10 bg-white/60 p-6">
              <p className="font-serif text-xl text-vino">Colegio misionero</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-tinta/75">Parte de la obra educativa de los Misioneros de la Preciosa Sangre (C.PP.S.): fe que se vive en comunidad y se traduce en servicio.</p>
            </div>
            <div className="rounded-3xl border border-vino/10 bg-white/60 p-6">
              <p className="font-serif text-xl text-vino">Calidad acreditada</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-tinta/75">En 2015 fue reportado como el primer colegio privado del país acreditado por Sineace.<sup>*</sup></p>
            </div>
          </div>
          <p className="mt-6 text-xs text-tinta/55">* Año de fundación calculado a partir del 59.º aniversario (30-sep-2026). Vigencia de la acreditación Sineace por confirmar con el colegio.</p>
        </div>

        <div>
          <SplitHeading className="mb-6 text-3xl text-vino md:text-4xl" lines={['Lea nuestro escudo']} />
          <div className="relative mx-auto aspect-[212/240] w-full max-w-[420px]" style={{ perspective: 900 }}>
            <div className="crest-read h-full w-full">
              <Crest2D className="h-full w-full drop-shadow-[0_40px_50px_rgba(59,7,16,.25)]" />
            </div>
            {LECTURA.map((l, i) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setActivo(l.id)}
                onMouseEnter={() => setActivo(l.id)}
                aria-pressed={activo === l.id}
                aria-label={`${l.titulo}: ${l.sub}`}
                className={`absolute ${l.pos} grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${activo === l.id ? 'scale-110 border-vino bg-oro text-vino' : 'border-oro bg-vino/80 text-oro hover:scale-110'}`}
              >
                <span className="absolute inset-0 animate-ping rounded-full border border-oro/60" style={{ animationDuration: '2.4s', animationDelay: `${i * 0.4}s` }} />
                {i + 1}
              </button>
            ))}
          </div>
          <div className="mx-auto mt-8 max-w-[440px] rounded-3xl bg-vino p-6 text-crema" aria-live="polite">
            <p className="text-xs font-bold tracking-[0.2em] text-oro uppercase">{info.sub}</p>
            <p className="mt-1 font-serif text-2xl">{info.titulo}</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-crema/80">{info.texto}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
