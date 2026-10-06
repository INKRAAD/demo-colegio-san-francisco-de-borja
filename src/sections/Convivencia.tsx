import { SplitHeading } from '../components/SplitHeading'
import { IconChat, IconHeart, IconShield } from '../components/Icons'

/** EJEMPLO: pilares propuestos para comunicar la convivencia escolar; el colegio debe completar su protocolo real. */
const PILARES = [
  { icon: IconShield, titulo: 'Prevención', texto: 'Tutoría semanal, formación en valores y campañas de buen trato desde Inicial hasta Secundaria.' },
  { icon: IconHeart, titulo: 'Acompañamiento', texto: 'Equipo psicopedagógico y tutores que escuchan a estudiantes y familias, con seguimiento de cada caso.' },
  { icon: IconChat, titulo: 'Canales claros', texto: 'Protocolo publicado, libro de incidencias y respuesta oportuna, en el marco de la Ley N.° 29719.' },
]

export function Convivencia() {
  return (
    <section aria-labelledby="conv-titulo" className="relative overflow-hidden bg-papel py-24 md:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="kicker text-rojo">Convivencia escolar</p>
          <SplitHeading id="conv-titulo" className="mt-4 text-[clamp(2.3rem,5vw,4.2rem)] leading-[0.98] tracking-[-0.02em] text-vino" lines={['Una comunidad', 'que cuida a cada uno']} />
          <p className="mt-6 max-w-md text-tinta/70">Las familias quieren saber cómo se previene y atiende el acoso escolar. Una web propia permite explicarlo con transparencia.</p>
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-tinta/60"><span className="tag-ejemplo border-rojo/50 text-rojo">Ejemplo</span> Contenido propuesto: reemplazar por el protocolo oficial.</p>
        </div>
        <ol className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
          {PILARES.map((p, i) => (
            <li key={p.titulo} className="group relative flex gap-5 overflow-hidden rounded-[1.75rem] border border-vino/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-rojo/30 hover:shadow-[0_30px_60px_-30px_rgba(211,1,40,.35)] sm:flex-col lg:flex-row lg:items-center">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-crema text-rojo transition-colors duration-500 group-hover:bg-rojo group-hover:text-crema"><p.icon className="h-7 w-7" /></span>
              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-rojo uppercase">0{i + 1}</p>
                <h3 className="mt-1 font-serif text-2xl text-vino">{p.titulo}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-tinta/70">{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
