import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { NAV, WA_DEFAULT } from '../data/site'
import { getLenis, scrollToId } from '../lib/motion'
import { Crest2D } from './Crest2D'
import { Magnetic } from './Magnetic'
import { IconClose, IconWhatsApp } from './Icons'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    const l = getLenis()
    if (open) { l?.stop(); document.body.style.overflow = 'hidden' } else { l?.start(); document.body.style.overflow = '' }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    if (open) { setOpen(false); setTimeout(() => scrollToId(id), 80) } // espera a que Lenis se reanude
    else scrollToId(id)
  }

  return (
    <>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-oro focus:px-4 focus:py-2 focus:font-bold focus:text-vino">Saltar al contenido</a>
      <header className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-papel/85 text-tinta shadow-[0_10px_40px_-20px_rgba(59,7,16,.35)] backdrop-blur-xl' : 'text-crema'}`}>
        <div className={`overflow-hidden bg-oro text-vino transition-[max-height] duration-500 ${scrolled ? 'max-h-0' : 'max-h-10'}`}>
          <a href="#admision" onClick={go('admision')} className="container-x flex items-center justify-center gap-2 py-2 text-[0.78rem] font-bold">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rojo opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-rojo" /></span>
            Admisiones 2027 en curso · Agende su visita guiada <span aria-hidden>→</span>
          </a>
        </div>
        <div className="container-x flex h-[68px] items-center justify-between gap-6">
          <a href="#inicio" onClick={go('inicio')} className="group flex items-center gap-3" aria-label="Colegio San Francisco de Borja, ir al inicio">
            <Crest2D decorative className="h-10 w-auto shrink-0 transition-transform duration-500 group-hover:rotate-[-6deg]" />
            <span className="leading-tight whitespace-nowrap">
              <span className="block font-serif text-[0.98rem] font-semibold tracking-tight sm:text-[1.02rem]">San Francisco de Borja</span>
              <span className={`block text-[0.6rem] font-bold tracking-[0.2em] uppercase ${scrolled ? 'text-rojo' : 'text-oro'}`}>Colegio · San Borja</span>
            </span>
          </a>
          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} className="group relative rounded-full px-3.5 py-2 text-[0.88rem] font-semibold">
                {n.label}
                <span className="absolute inset-x-3.5 bottom-1 h-[2px] origin-left scale-x-0 rounded bg-current transition-transform duration-500 ease-out-expo group-hover:scale-x-100" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <Magnetic>
                <a href="#admision" onClick={go('admision')} className={`btn ${scrolled ? 'btn-rojo' : 'btn-oro'} !py-2.5 text-sm whitespace-nowrap`}>Postular 2027</a>
              </Magnetic>
            </span>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-current/25 lg:hidden"
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label="Abrir menú"
              onClick={() => setOpen(true)}
            >
              <span className="flex w-5 flex-col gap-1.5"><span className="h-[2px] w-full rounded bg-current" /><span className="h-[2px] w-3/4 rounded bg-current" /></span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            className="fixed inset-0 z-[150] flex flex-col bg-vino text-crema"
            initial={{ clipPath: 'circle(0% at 92% 6%)' }}
            animate={{ clipPath: 'circle(150% at 92% 6%)' }}
            exit={{ clipPath: 'circle(0% at 92% 6%)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container-x flex h-[108px] items-end justify-between pb-3">
              <Crest2D decorative className="h-12 w-auto" />
              <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-crema/30" aria-label="Cerrar menú" onClick={() => setOpen(false)} autoFocus>
                <IconClose className="h-5 w-5" />
              </button>
            </div>
            <nav aria-label="Menú móvil" className="container-x mt-6 flex flex-1 flex-col gap-1">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={go(n.id)}
                  className="border-b border-crema/10 py-3 font-serif text-4xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="mr-3 align-middle font-sans text-xs text-oro">0{i + 1}</span>{n.label}
                </motion.a>
              ))}
            </nav>
            <div className="container-x flex flex-col gap-3 pb-10">
              <a href="#admision" onClick={go('admision')} className="btn btn-oro w-full">Postular a Admisiones 2027</a>
              <a href={WA_DEFAULT} target="_blank" rel="noopener" className="btn btn-linea w-full"><IconWhatsApp className="h-5 w-5" /> WhatsApp Admisión</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
