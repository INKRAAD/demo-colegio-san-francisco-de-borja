import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, Sparkles } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import { CREST3D } from '../data/crest'

/* ------------------------------------------------------------------
 * Escudo CSFB en 3D: cada pieza del logo oficial (borde dorado, campo
 * rojo, iniciales SFB y trazos del crismón) llega desde el espacio y se
 * ensambla. Luego flota y sigue al puntero / al scroll.
 * ------------------------------------------------------------------ */

const loader = new SVGLoader()
function shapesFrom(d: string) {
  const data = loader.parse(`<svg xmlns="http://www.w3.org/2000/svg"><path d="${d}"/></svg>`)
  return data.paths.flatMap((p) => SVGLoader.createShapes(p))
}

type Piece = {
  key: string
  geo: THREE.BufferGeometry
  mat: 'oro' | 'rojo' | 'crema'
  pos?: [number, number, number]
  rot?: [number, number, number]
  from: { p: [number, number, number]; r: [number, number, number]; s?: number }
  delay: number
  dur: number
}

const easeOutBack = (x: number) => {
  const c1 = 1.4, c3 = c1 + 1
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
}
const easeOutExpo = (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x))

function capsuleBetween(a: [number, number], b: [number, number], r = 3.25) {
  const dx = b[0] - a[0], dy = b[1] - a[1]
  const len = Math.hypot(dx, dy)
  const g = new THREE.CapsuleGeometry(r, Math.max(0.01, len - 2 * r * 0.2), 6, 16)
  g.rotateZ(Math.atan2(dy, dx) - Math.PI / 2)
  g.translate((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, 0)
  return g
}

function usePieces(): Piece[] {
  return useMemo(() => {
    const outer = shapesFrom(CREST3D.outer)[0]
    const inner = shapesFrom(CREST3D.inner)[0]
    const ring = outer.clone()
    ring.holes = [new THREE.Path(inner.getPoints(64))]

    const borde = new THREE.ExtrudeGeometry(ring, { depth: 14, bevelEnabled: true, bevelThickness: 2.2, bevelSize: 1.6, bevelSegments: 5, curveSegments: 48 })
    const campo = new THREE.ExtrudeGeometry(inner, { depth: 8, bevelEnabled: true, bevelThickness: 0.8, bevelSize: 0.6, bevelSegments: 3, curveSegments: 48 })
    const letra = (d: string) => new THREE.ExtrudeGeometry(shapesFrom(d), { depth: 3.5, bevelEnabled: true, bevelThickness: 0.9, bevelSize: 0.55, bevelSegments: 3, curveSegments: 10 })

    const Z = 8.8 // frente del campo
    const chiA = capsuleBetween([-85, 1], [52, -60.5])
    const chiB = capsuleBetween([85, 1], [-52, -60.5])
    const asta = capsuleBetween([0, 9.7], [0, -102])
    const barra = capsuleBetween([-23, 6.5], [10, 6.5])
    const pie = capsuleBetween([0, -13.5], [10, -13.5])
    const lazo = new THREE.TorusGeometry(10, 3.25, 14, 40, Math.PI)
    lazo.rotateZ(-Math.PI / 2)
    lazo.translate(10, -3.5, 0)
    for (const g of [chiA, chiB, asta, barra, pie, lazo]) g.translate(0, 0, Z)

    const P: Piece[] = [
      { key: 'campo', geo: campo, mat: 'rojo', from: { p: [0, -40, -600], r: [1.2, -0.8, 0.4], s: 0.4 }, delay: 0, dur: 1.6 },
      { key: 'borde', geo: borde, mat: 'oro', from: { p: [0, 0, 380], r: [0, 0, Math.PI * 0.75], s: 1.8 }, delay: 0.35, dur: 1.7 },
      { key: 'S', geo: letra(CREST3D.S), mat: 'oro', pos: [0, 0, Z], from: { p: [-220, 260, 120], r: [0, 0, -1.2] }, delay: 0.95, dur: 1.2 },
      { key: 'F', geo: letra(CREST3D.F), mat: 'oro', pos: [0, 0, Z], from: { p: [0, 320, 160], r: [1.4, 0, 0] }, delay: 1.07, dur: 1.2 },
      { key: 'B', geo: letra(CREST3D.B), mat: 'oro', pos: [0, 0, Z], from: { p: [220, 260, 120], r: [0, 0, 1.2] }, delay: 1.19, dur: 1.2 },
      { key: 'asta', geo: asta, mat: 'crema', from: { p: [0, -320, 60], r: [0, 0, 0] }, delay: 1.35, dur: 1.1 },
      { key: 'chiA', geo: chiA, mat: 'crema', from: { p: [-320, 120, 40], r: [0, 0, 0.5] }, delay: 1.5, dur: 1.1 },
      { key: 'chiB', geo: chiB, mat: 'crema', from: { p: [320, 120, 40], r: [0, 0, -0.5] }, delay: 1.58, dur: 1.1 },
      { key: 'barra', geo: barra, mat: 'crema', from: { p: [-160, 40, 90], r: [0, 0, 0] }, delay: 1.72, dur: 1 },
      { key: 'lazo', geo: lazo, mat: 'crema', from: { p: [0, 0, 260], r: [0, Math.PI, 0], s: 0.2 }, delay: 1.8, dur: 1.1 },
      { key: 'pie', geo: pie, mat: 'crema', from: { p: [140, -20, 90], r: [0, 0, 0] }, delay: 1.86, dur: 1 },
    ]
    return P
  }, [])
}

function CrestModel({ start, onAssembled }: { start: boolean; onAssembled?: () => void }) {
  const pieces = usePieces()
  const group = useRef<THREE.Group>(null)
  const refs = useRef<(THREE.Mesh | null)[]>([])
  const t0 = useRef<number | null>(null)
  const done = useRef(false)
  const flash = useRef<THREE.PointLight>(null)
  const { pointer, size } = useThree()
  const mats = useMemo(
    () => ({
      oro: new THREE.MeshStandardMaterial({ color: '#F9CB24', metalness: 0.92, roughness: 0.26, envMapIntensity: 1.25 }),
      rojo: new THREE.MeshPhysicalMaterial({ color: '#D30128', metalness: 0.05, roughness: 0.38, clearcoat: 1, clearcoatRoughness: 0.18 }),
      crema: new THREE.MeshPhysicalMaterial({ color: '#FDF5CC', metalness: 0, roughness: 0.32, clearcoat: 0.6 }),
    }),
    [],
  )
  const total = Math.max(...pieces.map((p) => p.delay + p.dur))
  const baseScale = size.width < 900 ? 0.0105 : 0.0122

  useFrame((state, dt) => {
    if (!group.current) return
    const now = state.clock.elapsedTime
    if (start && t0.current === null) t0.current = now
    const t = t0.current === null ? -1 : now - t0.current
    pieces.forEach((pc, i) => {
      const m = refs.current[i]
      if (!m) return
      const k = t < 0 ? 0 : Math.min(1, Math.max(0, (t - pc.delay) / pc.dur))
      const e = pc.key === 'campo' || pc.key === 'borde' ? easeOutExpo(k) : easeOutBack(k)
      const [px, py, pz] = pc.pos ?? [0, 0, 0]
      m.position.set(px + pc.from.p[0] * (1 - e), py + pc.from.p[1] * (1 - e), pz + pc.from.p[2] * (1 - e))
      m.rotation.set(pc.from.r[0] * (1 - e), pc.from.r[1] * (1 - e), pc.from.r[2] * (1 - e))
      const s0 = pc.from.s ?? 1
      m.scale.setScalar(s0 + (1 - s0) * e)
      m.visible = t >= pc.delay - 0.02
    })
    // destello dorado al cerrar el ensamblaje
    if (flash.current) {
      const f = t - total + 0.25
      flash.current.intensity = f > 0 && f < 1.4 ? Math.sin((f / 1.4) * Math.PI) * 60 : 0
    }
    if (!done.current && t > total) { done.current = true; onAssembled?.() }

    // giro de presentación + seguimiento de puntero + scroll
    const intro = t < 0 ? 0 : Math.min(1, t / (total + 0.6))
    const spin = (1 - easeOutExpo(intro)) * Math.PI * 1.25
    const scroll = Math.min(1.2, window.scrollY / window.innerHeight)
    const ty = spin + pointer.x * 0.38 + scroll * 0.9
    const tx = -pointer.y * 0.22 + scroll * 0.25
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, ty, 4, dt)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, tx, 4, dt)
    group.current.position.y = Math.sin(now * 0.9) * 0.06 - scroll * 0.6
    group.current.scale.setScalar(baseScale * (1 - scroll * 0.18))
  })

  return (
    <group ref={group} scale={baseScale}>
      <pointLight ref={flash} position={[0, 40, 160]} color="#ffd75e" intensity={0} distance={0} decay={0} />
      {pieces.map((pc, i) => (
        <mesh
          key={pc.key}
          ref={(m) => { refs.current[i] = m }}
          geometry={pc.geo}
          material={mats[pc.mat]}
          visible={false}
        />
      ))}
    </group>
  )
}

export default function Crest3D({ start, onReady, onAssembled }: { start: boolean; onReady?: () => void; onAssembled?: () => void }) {
  const wrap = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '100px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6.2], fov: 34 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.05
          onReady?.()
        }}
        aria-hidden
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} color="#fff3dc" />
        <directionalLight position={[-4, -2, 3]} intensity={0.8} color="#ffb36b" />
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={2.6} position={[0, 4, -4]} scale={[12, 3, 1]} color="#fff2d0" />
          <Lightformer form="rect" intensity={2.2} position={[-5, 0.5, 1]} rotation-y={Math.PI / 2} scale={[10, 2.2, 1]} color="#ffd36b" />
          <Lightformer form="rect" intensity={1.6} position={[5, -0.5, 1]} rotation-y={-Math.PI / 2} scale={[10, 2.2, 1]} color="#ffffff" />
          <Lightformer form="ring" intensity={3} position={[0, 1, 6]} scale={2.6} color="#fff8e6" />
          <Lightformer form="rect" intensity={1.2} position={[0, -5, 2]} rotation-x={-Math.PI / 2} scale={[10, 4, 1]} color="#ef922b" />
        </Environment>
        <CrestModel start={start} onAssembled={onAssembled} />
        <Sparkles count={70} scale={[6, 4, 3]} size={2.4} speed={0.35} opacity={0.75} color="#F9CB24" noise={0.6} />
      </Canvas>
    </div>
  )
}
