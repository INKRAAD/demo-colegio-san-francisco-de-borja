import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { COLEGIO, DOCUMENTOS, FAQ, GRADOS, NIVELES, PASOS_ADMISION, WA_DEFAULT, waLink } from '../data/site'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { SplitHeading } from '../components/SplitHeading'
import { Crest2D } from '../components/Crest2D'
import { IconArrow, IconCheck, IconPlus, IconWhatsApp } from '../components/Icons'

type Errors = Partial<Record<'apoderado' | 'telefono' | 'email' | 'grado' | 'acepto', string>>

function Formulario() {
  const [errors, setErrors] = useState<Errors>({})
  const [enviado, setEnviado] = useState<null | { nombre: string; grado: string; postulante: string }>(null)
  const [enviando, setEnviando] = useState(false)

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const v = (k: string) => String(f.get(k) ?? '').trim()
    const err: Errors = {}
    if (v('apoderado').length < 3) err.apoderado = 'Ingrese su nombre completo.'
    if (!/^(\+?51)?\s?9\d{2}\s?\d{3}\s?\d{3}$/.test(v('telefono').replace(/[-.]/g, ' ').replace(/\s+/g, ' '))) err.telefono = 'Ingrese un celular peruano de 9 dígitos (ej. 987 654 321).'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v('email'))) err.email = 'Ingrese un correo válido.'
    if (!v('grado')) err.grado = 'Seleccione el grado al que postula.'
    if (!f.get('acepto')) err.acepto = 'Necesitamos su autorización para contactarle.'
    setErrors(err)
    if (Object.keys(err).length) {
      const first = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(err)[0]}"]`)
      first?.focus()
      return
    }
    setEnviando(true)
    // DEMO: no se envía a ningún servidor.
    setTimeout(() => { setEnviando(false); setEnviado({ nombre: v('apoderado').split(' ')[0], grado: v('grado'), postulante: v('postulante') }) }, 900)
  }

  const field = 'mt-1.5 w-full rounded-xl border border-crema/20 bg-white/[0.06] px-4 py-3 text-crema placeholder:text-crema/40 outline-none transition focus:border-oro focus:bg-white/[0.1] aria-[invalid=true]:border-[#ff8a8a]'
  const label = 'text-[0.8rem] font-semibold text-crema/85'
  const errorTxt = (k: keyof Errors) => errors[k] && <p id={`e-${k}`} className="mt-1 text-xs font-semibold text-[#ffb3b3]">{errors[k]}</p>

  return (
    <div className="grain relative overflow-hidden rounded-[2rem] bg-vino p-6 text-crema shadow-[0_40px_80px_-30px_rgba(59,7,16,.6)] sm:p-9">
      <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-rojo/40 blur-3xl" />
      <AnimatePresence mode="wait">
        {enviado ? (
          <motion.div key="ok" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative py-6 text-center" role="status">
            <motion.div initial={{ scale: 0.4, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 160, damping: 12 }} className="mx-auto w-24">
              <Crest2D decorative className="w-full" />
            </motion.div>
            <p className="mt-6 font-serif text-3xl">¡Gracias, {enviado.nombre}!</p>
            <p className="mx-auto mt-3 max-w-sm text-crema/80">
              Recibimos su solicitud para <strong className="text-oro">{enviado.grado}</strong>. El equipo de Admisión le contactará pronto.
            </p>
            <a
              className="btn btn-oro mt-7"
              target="_blank"
              rel="noopener"
              href={waLink(`Hola, soy ${enviado.nombre}. Acabo de dejar mis datos en la web: quisiera información de Admisiones 2027 para ${enviado.grado}${enviado.postulante ? ` (postulante: ${enviado.postulante})` : ''}.`)}
            >
              <IconWhatsApp className="h-5 w-5" /> Continuar por WhatsApp
            </a>
            <button type="button" onClick={() => setEnviado(null)} className="mt-4 block w-full text-sm text-crema/60 underline underline-offset-4">Enviar otra solicitud</button>
            <p className="mt-6 text-[0.7rem] text-crema/45">Demo: este formulario no envía datos a ningún servidor.</p>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} onSubmit={submit} noValidate className="relative" aria-labelledby="form-titulo">
            <p className="kicker text-oro">Solicitud de informes</p>
            <h3 id="form-titulo" className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">Reserve su lugar en <em className="text-oro italic">2027</em></h3>
            <p className="mt-2 text-sm text-crema/70">Le respondemos en horario de atención. Campos con * son obligatorios.</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="apoderado" className={label}>Nombre del padre, madre o apoderado *</label>
                <input id="apoderado" name="apoderado" autoComplete="name" className={field} placeholder="Nombre y apellidos" aria-invalid={!!errors.apoderado} aria-describedby={errors.apoderado ? 'e-apoderado' : undefined} />
                {errorTxt('apoderado')}
              </div>
              <div>
                <label htmlFor="telefono" className={label}>Celular / WhatsApp *</label>
                <input id="telefono" name="telefono" type="tel" inputMode="tel" autoComplete="tel" className={field} placeholder="987 654 321" aria-invalid={!!errors.telefono} aria-describedby={errors.telefono ? 'e-telefono' : undefined} />
                {errorTxt('telefono')}
              </div>
              <div>
                <label htmlFor="email" className={label}>Correo electrónico *</label>
                <input id="email" name="email" type="email" autoComplete="email" className={field} placeholder="familia@correo.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'e-email' : undefined} />
                {errorTxt('email')}
              </div>
              <div>
                <label htmlFor="postulante" className={label}>Nombre del postulante</label>
                <input id="postulante" name="postulante" className={field} placeholder="Opcional" />
              </div>
              <div>
                <label htmlFor="grado" className={label}>Grado al que postula *</label>
                <select id="grado" name="grado" defaultValue="" className={`${field} appearance-none bg-[length:14px] bg-[right_1rem_center] bg-no-repeat`} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23F9CB24' stroke-width='3'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }} aria-invalid={!!errors.grado} aria-describedby={errors.grado ? 'e-grado' : undefined}>
                  <option value="" disabled className="text-tinta">Seleccione…</option>
                  {GRADOS.map((g) => <option key={g} value={g} className="text-tinta">{g}</option>)}
                </select>
                {errorTxt('grado')}
              </div>
              <fieldset className="sm:col-span-2">
                <legend className={label}>Me interesa</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['Visita guiada', 'Charla informativa', 'Información de pensiones'].map((o) => (
                    <label key={o} className="cursor-pointer">
                      <input type="checkbox" name="interes" value={o} className="peer sr-only" />
                      <span className="inline-block rounded-full border border-crema/25 px-3.5 py-1.5 text-sm transition peer-checked:border-oro peer-checked:bg-oro peer-checked:text-vino peer-focus-visible:outline-2 peer-focus-visible:outline-oro">{o}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="sm:col-span-2">
                <label htmlFor="mensaje" className={label}>Mensaje</label>
                <textarea id="mensaje" name="mensaje" rows={3} className={field} placeholder="Cuéntenos qué le gustaría saber" />
              </div>
              <div className="sm:col-span-2">
                <label className="flex items-start gap-3 text-sm text-crema/80">
                  <input type="checkbox" name="acepto" className="mt-0.5 h-5 w-5 shrink-0 accent-[#F9CB24]" aria-invalid={!!errors.acepto} aria-describedby={errors.acepto ? 'e-acepto' : undefined} />
                  Autorizo al colegio a contactarme sobre el proceso de admisión (Ley N.° 29733 de Protección de Datos Personales). *
                </label>
                {errorTxt('acepto')}
              </div>
            </div>
            <button type="submit" disabled={enviando} className="btn btn-oro mt-7 w-full text-base disabled:opacity-70">
              {enviando ? 'Enviando…' : <>Enviar solicitud <IconArrow className="h-5 w-5" /></>}
            </button>
            <p className="mt-4 text-center text-[0.72rem] text-crema/50">Demo conceptual: el formulario valida pero no envía datos. ¿Prefiere hablar ya? <a href={WA_DEFAULT} target="_blank" rel="noopener" className="text-oro underline underline-offset-2">WhatsApp {COLEGIO.whatsapp}</a></p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Admisiones() {
  const root = useRef<HTMLElement>(null)
  const [faq, setFaq] = useState<number | null>(0)
  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const md = window.matchMedia('(min-width: 768px)').matches
      gsap.fromTo('.adm-line', md ? { scaleX: 0 } : { scaleY: 0 }, { ...(md ? { scaleX: 1 } : { scaleY: 1 }), ease: 'none', scrollTrigger: { trigger: '.adm-steps', start: 'top 75%', end: 'bottom 55%', scrub: true } })
      gsap.utils.toArray<HTMLElement>('.adm-step').forEach((s, i) => {
        gsap.from(s, { y: 40, opacity: 0, duration: 0.9, ease: 'expo.out', delay: i * 0.08, scrollTrigger: { trigger: '.adm-steps', start: 'top 75%', once: true } })
        gsap.to(s.querySelector('.adm-dot'), { backgroundColor: '#D30128', color: '#FFFBEF', borderColor: '#D30128', scale: 1.08, scrollTrigger: { trigger: s, start: 'top 62%', toggleActions: 'play none none reverse' } })
      })
      gsap.fromTo('.adm-year', { backgroundPosition: '0% 50%' }, { backgroundPosition: '100% 50%', ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="admision" ref={root} aria-labelledby="adm-titulo" className="relative overflow-hidden bg-papel py-24 md:py-36">
      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="kicker text-rojo">Proceso abierto</p>
            <h2 id="adm-titulo" className="mt-4 leading-[0.85] tracking-[-0.03em] text-vino">
              <span className="block text-[clamp(2.6rem,6vw,5.4rem)] font-medium">Admisiones</span>
              <span className="adm-year block bg-[linear-gradient(90deg,#d30128,#ef922b,#f9cb24,#d30128)] bg-[length:300%_100%] bg-clip-text font-serif text-[clamp(6rem,19vw,16rem)] font-black text-transparent">2027</span>
            </h2>
          </div>
          <div className="pb-4">
            <SplitHeading as="p" className="font-serif text-2xl leading-snug text-vino md:text-3xl" lines={['Los acompañamos en cada paso,', 'desde la primera visita hasta la matrícula.']} />
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={WA_DEFAULT} target="_blank" rel="noopener" className="btn btn-rojo"><IconWhatsApp className="h-5 w-5" /> Escribir a Admisión</a>
              <a href="#form-admision" className="btn btn-linea text-vino">Dejar mis datos</a>
            </div>
          </div>
        </div>

        {/* línea de tiempo */}
        <div className="adm-steps relative mt-20">
          <p className="mb-8 flex items-center gap-2 text-sm text-tinta/60"><span className="tag-ejemplo border-rojo/50 text-rojo">Ejemplo</span> Proceso referencial: fechas y requisitos por confirmar con el colegio.</p>
          <div aria-hidden className="absolute left-[27px] top-[86px] bottom-0 w-[2px] bg-vino/10 md:left-0 md:right-0 md:top-[113px] md:bottom-auto md:h-[2px] md:w-auto">
            <div className="adm-line absolute inset-0 origin-top bg-gradient-to-b from-oro via-naranja to-rojo md:origin-left md:bg-gradient-to-r" />
          </div>
          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            {PASOS_ADMISION.map((p) => (
              <li key={p.n} className="adm-step relative flex gap-5 md:block">
                <span className="adm-dot relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-vino/15 bg-papel font-serif text-lg font-semibold text-vino">{p.n}</span>
                <div className="md:mt-6">
                  <p className="text-xs font-bold tracking-[0.18em] text-rojo uppercase">{p.cuando}</p>
                  <h3 className="mt-1.5 font-serif text-2xl text-vino">{p.titulo}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-tinta/70">{p.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* info + formulario */}
        <div className="mt-24 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="space-y-12">
            <div>
              <h3 className="font-serif text-3xl text-vino">Pensiones referenciales</h3>
              <p className="mt-2 text-sm text-tinta/60">Montos mensuales registrados en MINEDU/Identicole (vía terceros). Los montos 2027, cuota de ingreso y matrícula se confirman en el proceso.</p>
              <div className="mt-6 divide-y divide-vino/10 overflow-hidden rounded-3xl border border-vino/10 bg-white">
                {NIVELES.map((n) => (
                  <div key={n.id} className="group flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-crema/60">
                    <div>
                      <p className="font-serif text-xl text-vino">{n.nombre}</p>
                      <p className="text-sm text-tinta/60">{n.edades}</p>
                    </div>
                    <p className="text-right">
                      <span className="font-serif text-3xl text-rojo tabular-nums">{n.pension}</span>
                      <span className="block text-xs text-tinta/50">mensual · referencial</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="flex flex-wrap items-center gap-3 font-serif text-3xl text-vino">Documentos habituales <span className="tag-ejemplo border-rojo/50 font-sans text-rojo">Ejemplo</span></h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {DOCUMENTOS.map((d) => (
                  <li key={d} className="flex gap-3 rounded-2xl bg-crema/70 p-4 text-[0.95rem] text-tinta/80"><IconCheck className="h-5 w-5 shrink-0 text-rojo" />{d}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-3xl text-vino">Preguntas frecuentes</h3>
              <div className="mt-5 divide-y divide-vino/10 border-y border-vino/10">
                {FAQ.map((f, i) => (
                  <div key={f.q}>
                    <h4>
                      <button type="button" aria-expanded={faq === i} aria-controls={`faq-${i}`} onClick={() => setFaq(faq === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold text-vino">
                        {f.q}
                        <IconPlus className={`h-5 w-5 shrink-0 text-rojo transition-transform duration-500 ${faq === i ? 'rotate-45' : ''}`} />
                      </button>
                    </h4>
                    <AnimatePresence initial={false}>
                      {faq === i && (
                        <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                          <p className="pb-5 text-[0.95rem] leading-relaxed text-tinta/70">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-tinta/50">Respuestas de ejemplo para la demo; el colegio debe validarlas.</p>
            </div>
          </div>
          <div id="form-admision" className="lg:sticky lg:top-24 lg:self-start">
            <Formulario />
          </div>
        </div>
      </div>
    </section>
  )
}
