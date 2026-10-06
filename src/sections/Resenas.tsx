import { COLEGIO } from '../data/site'
import { Counter } from '../components/Counter'
import { IconStar } from '../components/Icons'

export function Resenas() {
  const pct = (COLEGIO.rating / 5) * 100
  return (
    <section aria-labelledby="res-titulo" className="grain relative overflow-hidden bg-rojo py-24 text-crema md:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="kicker text-oro">Lo que dicen las familias</p>
          <h2 id="res-titulo" className="sr-only">Reseñas en Google</h2>
          <p className="mt-6 flex items-end gap-4 font-serif">
            <span className="text-[clamp(6rem,14vw,10rem)] leading-[0.8] font-light text-oro"><Counter to={COLEGIO.rating} decimals={1} /></span>
            <span className="pb-3 text-2xl text-crema/80">/ 5</span>
          </p>
          <div className="relative mt-5 inline-flex" role="img" aria-label={`Calificación ${COLEGIO.rating} de 5 estrellas`}>
            <div className="flex gap-1 text-crema/25">{Array.from({ length: 5 }).map((_, i) => <IconStar key={i} className="h-7 w-7" />)}</div>
            <div className="absolute inset-0 flex gap-1 overflow-hidden text-oro" style={{ width: `${pct}%` }}>{Array.from({ length: 5 }).map((_, i) => <IconStar key={i} className="h-7 w-7 shrink-0" />)}</div>
          </div>
          <p className="mt-4 text-lg font-semibold">≈{COLEGIO.resenas} reseñas en Google</p>
          <p className="mt-1 max-w-sm text-xs text-crema/65">Calificación y número de reseñas tomados de directorios que replican la ficha de Google (cityperu, tucolegioperu). Verificar en vivo antes de publicar.</p>
          <a href={COLEGIO.maps} target="_blank" rel="noopener" className="btn btn-oro mt-7">Ver reseñas en Google Maps</a>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <figure className="relative rounded-[2rem] bg-vino/40 p-8 backdrop-blur md:translate-y-8">
            <span aria-hidden className="absolute -top-6 left-6 font-serif text-8xl leading-none text-oro">“</span>
            <blockquote className="mt-4 font-serif text-3xl leading-tight">bien amplio y ordenado</blockquote>
            <figcaption className="mt-6 text-sm text-crema/70">Fragmento de una reseña de Google, citado por tucolegioperu.info</figcaption>
          </figure>
          <figure className="relative rounded-[2rem] border border-crema/20 p-8">
            <p className="text-xs font-bold tracking-[0.2em] text-oro uppercase">Resumen de reseñas</p>
            <p className="mt-4 font-serif text-2xl leading-snug">Excelentes profesores, buen ambiente y un coliseo bien equipado.</p>
            <figcaption className="mt-6 text-sm text-crema/70">Paráfrasis (no textual) del resumen publicado por tucolegioperu.info</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
