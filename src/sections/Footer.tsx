import { COLEGIO, NAV } from '../data/site'
import { scrollToId } from '../lib/motion'
import { Crest2D } from '../components/Crest2D'
import { IconFacebook, IconInstagram } from '../components/Icons'

export function Footer() {
  return (
    <footer className="bg-tinta pb-28 pt-16 text-crema/80 md:pb-12">
      <div className="container-x grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex gap-5">
          <Crest2D decorative className="h-20 w-auto shrink-0" />
          <div>
            <p className="font-serif text-2xl text-crema">Colegio San Francisco de Borja</p>
            <p className="mt-2 max-w-sm text-sm">Colegio católico misionero de la {COLEGIO.congregacion}. Inicial, Primaria y Secundaria.</p>
            <div className="mt-5 flex gap-2">
              <a href={COLEGIO.facebook} target="_blank" rel="noopener" aria-label="Facebook del colegio" className="grid h-11 w-11 place-items-center rounded-full border border-crema/20 transition hover:border-oro hover:text-oro"><IconFacebook className="h-5 w-5" /></a>
              <a href={COLEGIO.instagram} target="_blank" rel="noopener" aria-label="Instagram del colegio" className="grid h-11 w-11 place-items-center rounded-full border border-crema/20 transition hover:border-oro hover:text-oro"><IconInstagram className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        <nav aria-label="Pie de página">
          <p className="text-xs font-bold tracking-[0.2em] text-oro uppercase">Navegación</p>
          <ul className="mt-4 space-y-2">
            {NAV.map((n) => (
              <li key={n.id}><a href={`#${n.id}`} onClick={(e) => { e.preventDefault(); scrollToId(n.id) }} className="hover:text-oro">{n.label}</a></li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-oro uppercase">Contacto</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>{COLEGIO.direccion}</li>
            <li><a href={COLEGIO.telefonoHref} className="hover:text-oro">{COLEGIO.telefono}</a></li>
            <li><a href={`mailto:${COLEGIO.emailInformes}`} className="hover:text-oro">{COLEGIO.emailInformes}</a></li>
          </ul>
        </div>
      </div>
      <div className="container-x mt-14 border-t border-crema/10 pt-6 text-xs leading-relaxed text-crema/50">
        <p>
          <strong className="text-crema/70">Demo conceptual no oficial</strong> elaborada por INKRAAD como propuesta de rediseño para el Colegio San Francisco de Borja. El escudo es propiedad del colegio (recreación vectorial solo para esta propuesta). Fotos referenciales de Pexels y Unsplash. Datos marcados como ejemplo, referenciales o por verificar deben confirmarse con el colegio.
        </p>
        <p className="mt-2">© 2026 · Propuesta de diseño</p>
      </div>
    </footer>
  )
}
