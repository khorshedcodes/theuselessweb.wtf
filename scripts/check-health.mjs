import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const REGISTRY_PATH = path.join(process.cwd(), 'src/data/registry.json');
const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'));

async function checkHealth() {
  console.log('🌀 Starting Health Check for External Sites...\n');
  
  const externalSites = registry.filter(site => site.type === 'external');
  const results = [];

  for (const site of externalSites) {
    try {
      const response = await fetch(site.external_url, { method: 'HEAD', timeout: 5000 });
      const status = response.ok ? '✅ ONLINE' : `❌ OFFLINE (${response.status})`;
      console.log(`${status.padEnd(15)} | ${site.title} (${site.external_url})`);
      results.push({ ...site, status: response.ok ? 'online' : 'offline' });
    } catch (error) {
      console.log(`${'❌ ERROR'.padEnd(15)} | ${site.title} (${site.external_url}) - ${error.message}`);
      results.push({ ...site, status: 'error' });
    }
  }

  console.log('\n✨ Health Check Complete.');
}

checkHealth();
