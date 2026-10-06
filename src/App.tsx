import { useCallback, useEffect, useState } from 'react'
import { ScrollTrigger, useSmoothScroll } from './lib/motion'
import { Preloader } from './components/Preloader'
import { Header } from './components/Header'
import { Cursor } from './components/Cursor'
import { WhatsAppFab } from './components/WhatsAppFab'
import { Hero } from './sections/Hero'
import { Marquee } from './sections/Marquee'
import { Identidad } from './sections/Identidad'
import { Cifras } from './sections/Cifras'
import { Camino } from './sections/Camino'
import { Admisiones } from './sections/Admisiones'
import { VidaEscolar } from './sections/VidaEscolar'
import { Convivencia } from './sections/Convivencia'
import { Resenas } from './sections/Resenas'
import { Ubicacion } from './sections/Ubicacion'
import { CtaFinal } from './sections/CtaFinal'
import { Footer } from './sections/Footer'

export default function App() {
  const [ready, setReady] = useState(false)
  const onDone = useCallback(() => setReady(true), [])
  useSmoothScroll(true)
  useEffect(() => {
    // recalcula posiciones cuando cargan fuentes e imágenes
    const r = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(r)
    window.addEventListener('load', r)
    return () => window.removeEventListener('load', r)
  }, [])
  return (
    <>
      <Preloader onDone={onDone} />
      <Cursor />
      <Header />
      <main id="contenido">
        <Hero ready={ready} />
        <Marquee />
        <Identidad />
        <Cifras />
        <Camino />
        <Admisiones />
        <VidaEscolar />
        <Convivencia />
        <Resenas />
        <Ubicacion />
        <CtaFinal />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
