// Capturas con Chromium headless (Playwright). Uso: node scripts/screenshots.mjs [desktop|mobile|all]
import { chromium } from 'playwright'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
const URL = process.env.URL || 'http://localhost:3127/'
const OUT = new globalThis.URL('../screenshots/', import.meta.url).pathname
const TMP = '/tmp/csfb/shots'
fs.mkdirSync(TMP, { recursive: true })
const which = process.argv[2] || 'all'
const PY = process.env.PY || '/tmp/csfb/venv/bin/python'

const browser = await chromium.launch({
  executablePath: '/usr/bin/google-chrome',
  args: ['--enable-webgl', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader', '--use-angle=swiftshader'],
})
const allErrors = []

async function scrollThrough(page) {
  for (let pass = 0; pass < 2; pass++) {
    let y = 0
    while (true) {
      const sh = await page.evaluate(() => document.documentElement.scrollHeight)
      if (y > sh) break
      await page.evaluate((yy) => window.scrollTo(0, yy), y)
      await page.waitForTimeout(pass ? 70 : 140)
      y += pass ? 500 : 320
    }
    await page.waitForTimeout(600)
  }
}

async function shoot(name, viewport, opts = {}) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: opts.dpr || 1, isMobile: !!opts.mobile, hasTouch: !!opts.mobile, reducedMotion: opts.reduced ? 'reduce' : 'no-preference' })
  const page = await ctx.newPage()
  const errors = []
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`[${m.type()}] ${m.text()}`) })
  page.on('pageerror', (e) => errors.push('[pageerror] ' + e.message))
  await page.goto(URL, { waitUntil: 'domcontentloaded' })
  if (opts.preloader) { await page.waitForTimeout(1200); await page.screenshot({ path: OUT + name + '-preloader.png' }) }
  await page.waitForSelector('[aria-label="Cargando Colegio San Francisco de Borja"]', { state: 'hidden', timeout: 20000 })
  await page.waitForTimeout(opts.mobile ? 3200 : 4800)
  await page.screenshot({ path: OUT + name + '-hero.png' })
  if (opts.heroOnly) { allErrors.push(name + ': ' + (errors.join(' | ') || 'sin errores')); await ctx.close(); return }
  // desactiva el smooth scroll para capturas por tramos
  await scrollThrough(page)
  if (opts.extra) await opts.extra(page)
  if (opts.full) {
    // el scroll horizontal fijado se captura igual que lo ve el usuario: por tramos de pantalla
    const H = await page.evaluate(() => document.documentElement.scrollHeight)
    const parts = []
    const vh = viewport.height
    for (let y = 0, i = 0; y < H; y += vh, i++) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y)
      await page.waitForTimeout(650)
      const f = `${TMP}/${name}-${String(i).padStart(3, '0')}.png`
      await page.screenshot({ path: f })
      parts.push(f)
    }
    execFileSync(PY, ['-c', `
import sys
from PIL import Image
Image.MAX_IMAGE_PIXELS=None
fs=sys.argv[2:]; out=sys.argv[1]
ims=[Image.open(f).convert('RGB') for f in fs]
W=ims[0].width; H=sum(i.height for i in ims)
c=Image.new('RGB',(W,H)); y=0
for i in ims: c.paste(i,(0,y)); y+=i.height
scale=float(${opts.fullScale || 0.5})
c=c.resize((int(W*scale),int(H*scale)),Image.LANCZOS)
c.save(out,quality=82)
`, OUT + name + '-full.jpg', ...parts])
  }
  allErrors.push(name + ': ' + (errors.join(' | ') || 'sin errores'))
  await ctx.close()
}

if (which === 'all' || which === 'desktop') {
  await shoot('desktop-1440', { width: 1440, height: 900 }, { preloader: true, full: true, fullScale: 0.5 })
}
if (which === 'all' || which === 'mobile') {
  await shoot('mobile-390', { width: 390, height: 844 }, { mobile: true, dpr: 2, full: true, fullScale: 0.5, preloader: true })
}
if (which === 'all' || which === 'tablet') {
  await shoot('tablet-768', { width: 768, height: 1024 }, { heroOnly: true })
}
if (which === 'all' || which === 'reduced') {
  await shoot('desktop-reduced-motion', { width: 1440, height: 900 }, { heroOnly: true, reduced: true })
}
await browser.close()
fs.writeFileSync(OUT + 'console-errors.txt', allErrors.join('\n') + '\n')
console.log(allErrors.join('\n'))
