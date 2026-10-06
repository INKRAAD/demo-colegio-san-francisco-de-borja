import { CIFRAS } from '../data/site'
import { Counter } from '../components/Counter'

export function Cifras() {
  return (
    <section aria-label="El colegio en cifras" className="grain relative overflow-hidden bg-vino py-20 text-crema md:py-28">
      <svg aria-hidden viewBox="42 52 212 240" className="pointer-events-none absolute -right-24 -top-10 h-[130%] opacity-[0.06]">
        <path d="M63 169L200 230.5M233 169L96 230.5M148 160V272M125 163.5H158A10 10 0 0 1 158 183.5H148" fill="none" stroke="#F9CB24" strokeWidth="6" strokeLinecap="round" />
      </svg>
      <div className="container-x relative">
        <p className="kicker text-oro">El colegio en cifras</p>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {CIFRAS.map((c) => (
            <div key={c.label} className="border-l border-oro/25 pl-5">
              <p className="font-serif text-[clamp(3rem,6.5vw,5.6rem)] leading-none font-light text-oro tabular-nums">
                <Counter to={c.valor} prefix={c.prefijo} separator={!c.sinSeparador} />
              </p>
              <p className="mt-3 text-base font-semibold">{c.label}</p>
              {c.nota && <p className="mt-1 text-xs leading-snug text-crema/55">{c.nota}</p>}
            </div>
          ))}
        </div>
        <p className="mt-12 max-w-3xl text-xs text-crema/50">
          Cifras referenciales tomadas de fuentes públicas (fanpage oficial, MINEDU/ESCALE vía directorios). El colegio debe confirmarlas antes de publicar.
        </p>
      </div>
    </section>
  )
}
