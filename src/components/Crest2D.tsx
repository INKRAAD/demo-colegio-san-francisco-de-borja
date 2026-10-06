import { useId, type SVGProps } from 'react'
import { CREST2D } from '../data/crest'

type Props = SVGProps<SVGSVGElement> & { title?: string; decorative?: boolean }

/** Escudo oficial CSFB recreado en SVG (fiel al logo de 300×350 px de su fanpage). */
export function Crest2D({ title = 'Escudo del Colegio San Francisco de Borja', decorative, ...rest }: Props) {
  const uid = useId().replace(/:/g, '')
  return (
    <svg
      viewBox="42 52 212 240"
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : title}
      {...rest}
    >
      <defs>
        <clipPath id={`c-${uid}`}>
          <path d={CREST2D.inner} />
        </clipPath>
      </defs>
      <path data-part="borde" d={CREST2D.outer} fill="#F9CB24" />
      <path data-part="campo" d={CREST2D.inner} fill="#D30128" />
      <g data-part="crismon" clipPath={`url(#c-${uid})`} fill="none" stroke="#FDF5CC" strokeWidth={6.5}>
        <path data-part="chi" d="M63 169L200 230.5M233 169L96 230.5" strokeLinecap="round" />
        <path data-part="asta" d="M148 160.3V272" />
        <path data-part="rho" d="M125 163.5H158A10 10 0 0 1 158 183.5H148" />
      </g>
      <g data-part="sfb" fill="#F9CB24">
        <path d={CREST2D.S} />
        <path d={CREST2D.F} />
        <path d={CREST2D.B} />
      </g>
    </svg>
  )
}
