import { COLEGIO, WA_DEFAULT } from '../data/site'
import { SplitHeading } from '../components/SplitHeading'
import { IconClock, IconMail, IconPhone, IconPin, IconWhatsApp } from '../components/Icons'

export function Ubicacion() {
  const { lat, lng } = COLEGIO.coords
  const d = 0.006
  const osm = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - d}%2C${lat - d * 0.7}%2C${lng + d}%2C${lat + d * 0.7}&layer=mapnik&marker=${lat}%2C${lng}`
  const items = [
    { icon: IconPin, label: 'Dirección', value: COLEGIO.direccion, href: COLEGIO.maps },
    { icon: IconPhone, label: 'Central', value: COLEGIO.telefono, href: COLEGIO.telefonoHref },
    { icon: IconWhatsApp, label: 'Admisión (WhatsApp)', value: COLEGIO.whatsapp, href: WA_DEFAULT },
    { icon: IconMail, label: 'Correo', value: `${COLEGIO.emailInformes} · ${COLEGIO.emailAdmision}`, href: `mailto:${COLEGIO.emailAdmision}` },
    { icon: IconClock, label: 'Atención', value: `${COLEGIO.horario}*` },
  ]
  return (
    <section id="contacto" aria-labelledby="cont-titulo" className="relative bg-crema py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="kicker text-rojo">Visítenos</p>
          <SplitHeading id="cont-titulo" className="mt-4 text-[clamp(2.3rem,5vw,4.2rem)] leading-[0.98] tracking-[-0.02em] text-vino" lines={['En el corazón', 'de San Borja']} />
          <ul className="mt-10 divide-y divide-vino/10 border-y border-vino/10">
            {items.map((it) => {
              const inner = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-papel text-rojo"><it.icon className="h-5 w-5" /></span>
                  <span>
                    <span className="block text-xs font-bold tracking-[0.18em] text-rojo uppercase">{it.label}</span>
                    <span className="mt-0.5 block font-semibold break-words text-vino">{it.value}</span>
                  </span>
                </>
              )
              return (
                <li key={it.label}>
                  {it.href ? (
                    <a href={it.href} target={it.href.startsWith('http') ? '_blank' : undefined} rel="noopener" className="flex items-center gap-4 py-4 transition-colors hover:text-rojo">{inner}</a>
                  ) : (
                    <div className="flex items-center gap-4 py-4">{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>
          <p className="mt-4 text-xs text-tinta/55">* Horario según ficha de Google; otra fuente indica hasta las 17:00. Confirmar con el colegio.</p>
        </div>
        <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-vino/10 bg-papel shadow-[0_40px_80px_-40px_rgba(59,7,16,.45)]">
          <iframe
            title="Mapa: Colegio San Francisco de Borja, Calle Velásquez, San Borja"
            src={osm}
            loading="lazy"
            className="absolute inset-0 h-full w-full [filter:sepia(.35)_saturate(1.2)_hue-rotate(-12deg)]"
          />
          <div className="pointer-events-none absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-vino/95 p-4 text-crema backdrop-blur sm:inset-x-6 sm:bottom-6">
            <span>
              <span className="block font-serif text-lg">Colegio San Francisco de Borja</span>
              <span className="text-sm text-crema/70">Calle Velásquez cdra. 3, San Borja</span>
            </span>
            <a href={COLEGIO.maps} target="_blank" rel="noopener" className="btn btn-oro pointer-events-auto !py-2.5 text-sm">Cómo llegar</a>
          </div>
        </div>
      </div>
    </section>
  )
}
