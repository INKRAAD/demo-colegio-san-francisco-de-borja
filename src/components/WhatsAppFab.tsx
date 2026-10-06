import { useEffect, useState } from 'react'
import { WA_DEFAULT } from '../data/site'
import { scrollToId } from '../lib/motion'
import { Magnetic } from './Magnetic'
import { IconWhatsApp } from './Icons'

/** Botón flotante de WhatsApp (escritorio) y barra inferior de admisión (móvil). */
export function WhatsAppFab() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.6)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <>
      <div className={`fixed bottom-6 right-6 z-[90] hidden transition-all duration-500 md:block ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}>
        <Magnetic strength={0.4}>
          <a href={WA_DEFAULT} target="_blank" rel="noopener" aria-label="Escribir a Admisión por WhatsApp" className="group flex items-center gap-3 rounded-full bg-[#1f8f4e] py-3 pl-3 pr-5 font-bold text-white shadow-[0_20px_40px_-12px_rgba(0,0,0,.45)]">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15"><IconWhatsApp className="h-6 w-6" /></span>
            Admisión 2027
          </a>
        </Magnetic>
      </div>
      <div className={`fixed inset-x-0 bottom-0 z-[90] flex gap-2 border-t border-vino/10 bg-papel/95 p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-500 md:hidden ${show ? 'translate-y-0' : 'translate-y-full'}`}>
        <a href="#admision" onClick={(e) => { e.preventDefault(); scrollToId('admision') }} className="btn btn-rojo flex-1 !py-3 text-sm">Postular 2027</a>
        <a href={WA_DEFAULT} target="_blank" rel="noopener" aria-label="WhatsApp Admisión" className="btn flex-1 bg-[#1f8f4e] !py-3 text-sm text-white"><IconWhatsApp className="h-5 w-5" /> WhatsApp</a>
      </div>
    </>
  )
}
