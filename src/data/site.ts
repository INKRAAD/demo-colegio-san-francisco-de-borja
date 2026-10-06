/**
 * Contenido del sitio. Fuente: /brand/brand.md (investigación 06-oct-2026).
 * Convención: todo lo marcado con `ejemplo: true` o comentado como EJEMPLO es contenido
 * de demostración que el colegio debe validar/reemplazar. Lo marcado `verificar: true`
 * proviene de terceros (directorios, MINEDU vía terceros) y debe confirmarse.
 */

export const COLEGIO = {
  nombre: 'Colegio San Francisco de Borja',
  sigla: 'CSFB',
  congregacion: 'Congregación de los Misioneros de la Preciosa Sangre (C.PP.S.)',
  direccion: 'Calle Velásquez cdra. 3 s/n, San Borja 15037, Lima',
  coords: { lat: -12.09099, lng: -76.997932 },
  telefono: '(01) 476-5393',
  telefonoHref: 'tel:+5114765393',
  whatsapp: '+51 939 509 903',
  whatsappNum: '51939509903',
  emailInformes: 'informes@csfb.edu.pe',
  emailAdmision: 'admision@csfb.edu.pe',
  horario: 'Lunes a viernes · 7:00 – 16:00', // verificar: otra fuente indica hasta las 17:00
  facebook: 'https://www.facebook.com/PaginaFanpagesfb/',
  instagram: 'https://www.instagram.com/colegio_sanfranciscodeborja/',
  maps: 'https://www.google.com/maps/search/?api=1&query=Colegio+San+Francisco+de+Borja%2C+Calle+Vel%C3%A1squez%2C+San+Borja%2C+Lima',
  rating: 4.1, // verificar: dato de directorios derivado de Google
  resenas: 60, // aprox. (≈60) — verificar
}

export const waLink = (msg: string) =>
  `https://wa.me/${COLEGIO.whatsappNum}?text=${encodeURIComponent(msg)}`

export const WA_DEFAULT = waLink(
  'Hola, quisiera información sobre Admisiones 2027 en el Colegio San Francisco de Borja.',
)

export const NAV = [
  { id: 'identidad', label: 'Identidad' },
  { id: 'camino', label: 'Niveles' },
  { id: 'admision', label: 'Admisión 2027' },
  { id: 'vida', label: 'Vida escolar' },
  { id: 'contacto', label: 'Contacto' },
]

/** Cifras. Fuentes en el pie de la sección. */
export const CIFRAS = [
  { valor: 59, sufijo: '', label: 'años de historia', nota: 'Aniversario celebrado el 30-sep-2026 (fanpage oficial)' },
  { valor: 840, prefijo: '≈', label: 'estudiantes', nota: 'MINEDU/ESCALE vía terceros · referencial' },
  { valor: 3, label: 'niveles: Inicial, Primaria y Secundaria' },
  { valor: 2015, label: 'acreditación Sineace', nota: 'Reportado como primer colegio privado acreditado · vigencia por confirmar', sinSeparador: true },
]

export type Nivel = {
  id: string
  etapa: string
  nombre: string
  edades: string
  verbo: string
  lema: string
  texto: string
  puntos: string[]
  pension: string
  img: string
  img2: string
  alt: string
  alt2: string
  edadDesde: number
  edadHasta: number
}

export const NIVELES: Nivel[] = [
  {
    id: 'inicial',
    etapa: 'Capítulo I',
    nombre: 'Inicial',
    edades: '4 y 5 años',
    verbo: 'Descubrir',
    lema: 'Los primeros pasos, en un lugar que se siente casa.',
    texto:
      'Juego, arte, movimiento y las primeras oraciones. En Inicial, cada niño y niña descubre que aprender es una aventura compartida con su familia y sus maestras.',
    // EJEMPLO: énfasis pedagógicos propuestos, validar con el colegio
    puntos: ['Aprendizaje a través del juego', 'Psicomotricidad y arte', 'Primeros valores cristianos'],
    pension: 'S/ 1,300',
    img: '/img/inicial',
    img2: '/img/convivencia',
    alt: 'Niños de inicial pintando junto a su maestra en un aula luminosa (foto referencial)',
    alt2: 'Niñas con uniforme escolar eligiendo libros en el aula (foto referencial)',
    edadDesde: 4,
    edadHasta: 5,
  },
  {
    id: 'primaria',
    etapa: 'Capítulo II',
    nombre: 'Primaria',
    edades: '1.º a 6.º grado',
    verbo: 'Aprender',
    lema: 'Curiosidad que se convierte en hábito.',
    texto:
      'Lectura, ciencia, deporte y vida de fe. La primaria construye bases sólidas con acompañamiento cercano, para que cada estudiante gane confianza y autonomía.',
    puntos: ['Comprensión lectora y nueva biblioteca', 'Ciencia y razonamiento', 'Deporte en el coliseo'],
    pension: 'S/ 1,400',
    img: '/img/primaria',
    img2: '/img/lectura',
    alt: 'Estudiantes de primaria con uniforme levantando la mano con entusiasmo (foto referencial)',
    alt2: 'Niño con uniforme leyendo en la biblioteca escolar (foto referencial)',
    edadDesde: 6,
    edadHasta: 11,
  },
  {
    id: 'secundaria',
    etapa: 'Capítulo III',
    nombre: 'Secundaria',
    edades: '1.º a 5.º año',
    verbo: 'Proyectarse',
    lema: 'Jóvenes con criterio, fe y vocación de servicio.',
    texto:
      'Pensamiento crítico, liderazgo y espíritu misionero. La secundaria prepara para la universidad y para la vida, con una identidad que acompaña siempre.',
    puntos: ['Ciencias y laboratorio', 'Liderazgo y servicio misionero', 'Orientación vocacional'],
    pension: 'S/ 1,500',
    img: '/img/secundaria',
    img2: '/img/ciencia',
    alt: 'Estudiantes de secundaria escribiendo en un aula iluminada por el sol (foto referencial)',
    alt2: 'Estudiante realizando un experimento de química con su profesor (foto referencial)',
    edadDesde: 12,
    edadHasta: 16,
  },
]

/** EJEMPLO: pasos del proceso de admisión propuestos; el colegio debe confirmar fechas y requisitos. */
export const PASOS_ADMISION = [
  {
    n: '01',
    titulo: 'Conózcanos',
    texto: 'Solicite informes o agende una visita guiada al colegio por WhatsApp o con el formulario.',
    cuando: 'Desde hoy',
  },
  {
    n: '02',
    titulo: 'Inscripción',
    texto: 'Complete la ficha de postulación y entregue los documentos del postulante.',
    cuando: 'Según vacantes',
  },
  {
    n: '03',
    titulo: 'Entrevista y evaluación',
    texto: 'Entrevista con la familia y evaluación de acuerdo con el nivel al que postula.',
    cuando: 'Fecha por coordinar',
  },
  {
    n: '04',
    titulo: 'Resultados y matrícula',
    texto: 'Comunicación de resultados y matrícula para el año escolar 2027.',
    cuando: 'Antes del inicio 2027',
  },
]

/** EJEMPLO: documentos habituales en colegios de Lima; confirmar lista oficial. */
export const DOCUMENTOS = [
  'Partida o acta de nacimiento del postulante',
  'DNI del postulante y de los padres o apoderados',
  'Libreta de notas o informe del año en curso',
  'Partida de bautismo (si corresponde)',
]

export const GRADOS = [
  'Inicial · 4 años',
  'Inicial · 5 años',
  'Primaria · 1.º grado',
  'Primaria · 2.º grado',
  'Primaria · 3.º grado',
  'Primaria · 4.º grado',
  'Primaria · 5.º grado',
  'Primaria · 6.º grado',
  'Secundaria · 1.º año',
  'Secundaria · 2.º año',
  'Secundaria · 3.º año',
  'Secundaria · 4.º año',
  'Secundaria · 5.º año',
]

/** EJEMPLO: preguntas frecuentes con respuestas genéricas que remiten al colegio. */
export const FAQ = [
  {
    q: '¿Todavía hay vacantes para 2027?',
    a: 'Las vacantes dependen de cada grado. Escríbanos por WhatsApp o deje sus datos en el formulario y el equipo de Admisión le confirmará la disponibilidad.',
  },
  {
    q: '¿Puedo visitar el colegio antes de postular?',
    a: 'Sí. Recomendamos agendar una visita guiada para conocer las aulas, la nueva biblioteca y el coliseo, y conversar con el equipo de Admisión.',
  },
  {
    q: '¿Cuál es el monto de la pensión?',
    a: 'Las pensiones referenciales registradas en MINEDU son S/ 1,300 (Inicial), S/ 1,400 (Primaria) y S/ 1,500 (Secundaria). Los montos 2027, cuota de ingreso y matrícula se confirman en el proceso.',
  },
  {
    q: '¿Cómo acompaña el colegio la convivencia escolar?',
    a: 'Con tutoría, acompañamiento psicopedagógico y protocolos de convivencia en el marco de la Ley N.° 29719. Pida información detallada en su visita.',
  },
]

/** Galería. Fotos referenciales con licencia libre (ver README). */
export const GALERIA = [
  { src: '/img/danza', titulo: 'El mundo baila', texto: 'Festival de danzas del colegio', alt: 'Niños con trajes típicos peruanos bailando (foto referencial)', w: 2000, h: 1335 },
  { src: '/img/biblioteca', titulo: 'Nueva biblioteca', texto: 'Inaugurada en 2026', alt: 'Estudiantes leyendo entre estanterías de una biblioteca (foto referencial)', w: 2000, h: 1333 },
  { src: '/img/coliseo', titulo: 'Coliseo deportivo', texto: 'Deporte y formación integral', alt: 'Losa deportiva techada con tableros de básquet (foto referencial)', w: 2000, h: 1500 },
  { src: '/img/deporte', titulo: 'Equipos', texto: 'Disciplina y compañerismo', alt: 'Niñas jugando básquet en un coliseo cubierto (foto referencial)', w: 2000, h: 1333 },
  { src: '/img/fe', titulo: 'Vida de fe', texto: 'Misioneros de la Preciosa Sangre', alt: 'Velas encendidas frente a una cruz en una capilla (foto referencial)', w: 2000, h: 1333 },
  { src: '/img/promocion', titulo: 'Promoción', texto: 'El cierre de un camino', alt: 'Egresados lanzando sus birretes al aire (foto referencial)', w: 2000, h: 1333 },
]
