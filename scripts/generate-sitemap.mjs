import fs from 'fs';
import path from 'path';

const REGISTRY_PATH = path.join(process.cwd(), 'src/data/registry.json');
const SITEMAP_PATH = path.join(process.cwd(), 'public/sitemap.xml');
const EXTERNAL_DATA_URL = 'https://theuselessweb.wtf';

function generateSitemap() {
  console.log('🌀 Generating static sitemap.xml...');

  if (!fs.existsSync(REGISTRY_PATH)) {
    console.error('❌ Error: registry.json not found!');
    process.exit(1);
  }

  const rawData = fs.readFileSync(REGISTRY_PATH, 'utf-8');
  const registry = JSON.parse(rawData);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${EXTERNAL_DATA_URL}</loc>
  </url>
  <url>
    <loc>${EXTERNAL_DATA_URL}/about</loc>
  </url>
  <url>
    <loc>${EXTERNAL_DATA_URL}/submit</loc>
  </url>
  <url>
    <loc>${EXTERNAL_DATA_URL}/contact</loc>
  </url>
  <url>
    <loc>${EXTERNAL_DATA_URL}/privacy</loc>
  </url>
  ${registry
    .map(({ slug }) => {
      return `  <url>
    <loc>${EXTERNAL_DATA_URL}/site/${slug}</loc>
  </url>`;
    })
    .join('\n')}
</urlset>`;

  fs.writeFileSync(SITEMAP_PATH, sitemap);
  console.log('✅ Generated sitemap.xml in public folder.');
}

generateSitemap();
