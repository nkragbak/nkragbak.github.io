// Visuel sammenligning: tager skærmbilleder af alle sider i en tidligere
// version (standard: HEAD) og i arbejdskopien og sammenligner dem pixel for pixel.
//
// Brug:   node tools/visuel-sammenligning.mjs [git-ref] [output-mappe]
// Kræver: Playwright med Chromium (require('playwright')).
//
// Alle <details> foldes ud før skærmbilledet, så indhold i foldefelter
// (fx diagrammet under Demokrati & magt) også bliver sammenlignet.
// Forskelle på højst TOLERANCE (af 255) i en farvekanal ignoreres: de opstår
// ved kantudglatning og er usynlige. Scriptet afslutter med kode 1, hvis en
// side er ændret.

import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { createServer } from 'node:http';
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, extname, resolve } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const TOLERANCE = 2;
const ref = process.argv[2] || 'HEAD';
const out = resolve(process.argv[3] || mkdtempSync(join(tmpdir(), 'visuel-')));
const repo = execSync('git rev-parse --show-toplevel').toString().trim();

const viewports = [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'mobil', width: 390, height: 844 }
];

const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.md': 'text/markdown; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.woff2': 'font/woff2'
};

function serve(root) {
  return new Promise(done => {
    const server = createServer((req, res) => {
      const file = join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
      if (!file.startsWith(root) || !existsSync(file) || statSync(file).isDirectory()) {
        res.writeHead(404).end();
        return;
      }
      res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
      res.end(readFileSync(file));
    });
    server.listen(0, () => done(server));
  });
}

async function shoot(browser, root, label) {
  const server = await serve(root);
  const base = `http://localhost:${server.address().port}`;
  const pages = readdirSync(root).filter(f => f.endsWith('.html') && !f.startsWith('google'));
  const shots = {};
  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    for (const file of pages) {
      await page.goto(`${base}/${file}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.querySelectorAll('details').forEach(d => { d.open = true; }));
      await page.waitForTimeout(200);
      const key = `${file.replace('.html', '')}-${vp.name}`;
      shots[key] = await page.screenshot({ fullPage: true, path: join(out, label, `${key}.png`) });
    }
    await page.close();
  }
  server.close();
  return shots;
}

// Sammenligner to PNG'er i browseren og returnerer det område, der er ændret.
async function compare(browser, a, b) {
  const page = await browser.newPage();
  const result = await page.evaluate(async ([a, b, tolerance]) => {
    const load = src => new Promise(ok => { const i = new Image(); i.onload = () => ok(i); i.src = src; });
    const [ia, ib] = await Promise.all([load(a), load(b)]);
    if (ia.width !== ib.width || ia.height !== ib.height) {
      return { size: `${ia.width}×${ia.height} → ${ib.width}×${ib.height}` };
    }
    const data = img => {
      const c = document.createElement('canvas');
      c.width = img.width; c.height = img.height;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);
      return ctx.getImageData(0, 0, img.width, img.height).data;
    };
    const da = data(ia), db = data(ib);
    const differs = i => Math.abs(da[i] - db[i]) > tolerance;
    let top = -1, bottom = -1;
    for (let i = 0; i < da.length; i += 4) {
      if (differs(i) || differs(i + 1) || differs(i + 2)) {
        const y = Math.floor(i / 4 / ia.width);
        if (top < 0) top = y;
        bottom = y;
      }
    }
    return top < 0 ? null : { rows: `y ${top}–${bottom}` };
  }, [`data:image/png;base64,${a.toString('base64')}`, `data:image/png;base64,${b.toString('base64')}`, TOLERANCE]);
  await page.close();
  return result;
}

const before = join(out, 'kilde-foer');
mkdirSync(before, { recursive: true });
mkdirSync(join(out, 'foer'), { recursive: true });
mkdirSync(join(out, 'efter'), { recursive: true });
execSync(`git -C "${repo}" archive ${ref} | tar -x -C "${before}"`);

const browser = await chromium.launch();
const a = await shoot(browser, before, 'foer');
const b = await shoot(browser, repo, 'efter');

let changed = 0;
for (const key of Object.keys(b)) {
  if (!a[key]) { console.log(`NY      ${key}`); continue; }
  const diff = await compare(browser, a[key], b[key]);
  if (diff) changed += 1;
  console.log(`${diff ? 'ÆNDRET ' : 'ens    '} ${key}${diff ? `  (${diff.size || diff.rows})` : ''}`);
}
await browser.close();

console.log(`\nSkærmbilleder: ${out}/foer og ${out}/efter`);
process.exit(changed ? 1 : 0);
