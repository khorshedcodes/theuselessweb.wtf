import fs from 'fs';
import path from 'path';

const REGISTRY_PATH = path.join(process.cwd(), 'src/data/registry.json');
const SUBMISSIONS_DIR = path.join(process.cwd(), 'public/submissions');
const MAX_FOLDER_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

// Blocklist of file extensions that must never appear in a submission folder
const DANGEROUS_EXTENSIONS = new Set([
  '.php', '.phtml', '.php3', '.php4', '.php5', '.phar',
  '.sh', '.bash', '.zsh', '.fish',
  '.py', '.pyc', '.rb', '.pl', '.go',
  '.exe', '.dll', '.bat', '.cmd', '.com', '.msi',
  '.jar', '.war', '.class',
  '.asp', '.aspx', '.cfm',
  '.htaccess', '.htpasswd',
  '.env',
]);

function scanForDangerousFiles(dirPath, relativeTo) {
  const dangerous = [];
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const relPath = path.relative(relativeTo, filePath);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      dangerous.push(...scanForDangerousFiles(filePath, relativeTo));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (DANGEROUS_EXTENSIONS.has(ext)) {
        dangerous.push(relPath);
      }
    }
  }
  return dangerous;
}

function getFolderSize(dirPath) {
  let totalSize = 0;
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      totalSize += getFolderSize(filePath);
    } else {
      totalSize += stats.size;
    }
  }

  return totalSize;
}

function validatePR() {
  console.log('🔍 Running PR Submission Validation script...\n');

  if (!fs.existsSync(REGISTRY_PATH)) {
    console.error('❌ Error: registry.json not found!');
    process.exit(1);
  }

  let registry;
  try {
    const rawData = fs.readFileSync(REGISTRY_PATH, 'utf-8');
    registry = JSON.parse(rawData);
  } catch (err) {
    console.error('❌ Error: registry.json is not valid JSON!', err.message);
    process.exit(1);
  }

  if (!Array.isArray(registry)) {
    console.error('❌ Error: registry.json must be a JSON Array!');
    process.exit(1);
  }

  const registeredSlugs = new Set();
  let errorsFound = false;

  for (const [index, item] of registry.entries()) {
    const itemLabel = `Item #${index} (${item.slug || 'no-slug'})`;

    // 1. Basic Fields validation
    if (!item.slug) {
      console.error(`❌ ${itemLabel}: Missing "slug" field.`);
      errorsFound = true;
      continue;
    }

    if (registeredSlugs.has(item.slug)) {
      console.error(`❌ ${itemLabel}: Duplicate slug "${item.slug}" detected.`);
      errorsFound = true;
    }
    registeredSlugs.add(item.slug);

    if (!item.type || !['internal', 'external', 'sponsor'].includes(item.type)) {
      console.error(`❌ ${itemLabel}: "type" must be "internal", "external", or "sponsor".`);
      errorsFound = true;
    }

    if (!item.title) {
      console.error(`❌ ${itemLabel}: Missing "title" field.`);
      errorsFound = true;
    }

    if (!item.author) {
      console.error(`❌ ${itemLabel}: Missing "author" field.`);
      errorsFound = true;
    }

    if (!Array.isArray(item.tags) || item.tags.length === 0) {
      console.error(`❌ ${itemLabel}: "tags" must be a non-empty array.`);
      errorsFound = true;
    }

    // 2. Type-specific validation
    if (item.type === 'internal') {
      if (!item.path) {
        console.error(`❌ ${itemLabel}: Missing "path" for internal app.`);
        errorsFound = true;
      } else {
        const expectedPath = `/submissions/${item.slug}/index.html`;
        if (item.path !== expectedPath) {
          console.error(`❌ ${itemLabel}: "path" must be exactly "${expectedPath}". Got: "${item.path}"`);
          errorsFound = true;
        }

        const physicalFolder = path.join(SUBMISSIONS_DIR, item.slug);
        const physicalIndex = path.join(physicalFolder, 'index.html');

        if (!fs.existsSync(physicalFolder)) {
          console.error(`❌ ${itemLabel}: Physical directory "${physicalFolder}" not found for slug "${item.slug}".`);
          errorsFound = true;
        } else if (!fs.existsSync(physicalIndex)) {
          console.error(`❌ ${itemLabel}: Missing "index.html" inside "${physicalFolder}".`);
          errorsFound = true;
        } else {
          // Folder size validation
          try {
            const size = getFolderSize(physicalFolder);
            if (size > MAX_FOLDER_SIZE_BYTES) {
              console.error(`❌ ${itemLabel}: Directory size (${(size / 1024 / 1024).toFixed(2)}MB) exceeds 5MB limit.`);
              errorsFound = true;
            }
          } catch (sizeErr) {
            console.error(`❌ ${itemLabel}: Failed to calculate directory size.`, sizeErr.message);
            errorsFound = true;
          }

          // Dangerous file extension scan
          const dangerousFiles = scanForDangerousFiles(physicalFolder, physicalFolder);
          if (dangerousFiles.length > 0) {
            console.error(`❌ ${itemLabel}: Submission contains dangerous file(s): ${dangerousFiles.join(', ')}`);
            errorsFound = true;
          }
        }
      }
    } else if (item.type === 'external') {
      if (!item.external_url) {
        console.error(`❌ ${itemLabel}: Missing "external_url" for external site.`);
        errorsFound = true;
      } else {
        const urlLower = item.external_url.trim().toLowerCase();
        // Reject javascript: protocol (XSS vector)
        if (urlLower.startsWith('javascript:')) {
          console.error(`❌ ${itemLabel}: "external_url" must not use the javascript: protocol.`);
          errorsFound = true;
        } else if (!urlLower.startsWith('http://') && !urlLower.startsWith('https://')) {
          console.error(`❌ ${itemLabel}: "external_url" must start with http:// or https://. Got: "${item.external_url}"`);
          errorsFound = true;
        }
      }
    }
  }

  // 3. Physical folder consistency validation (warn if folder exists but not in registry)
  if (fs.existsSync(SUBMISSIONS_DIR)) {
    const folders = fs.readdirSync(SUBMISSIONS_DIR);
    for (const folder of folders) {
      if (folder === '_template') continue;
      const folderPath = path.join(SUBMISSIONS_DIR, folder);
      if (fs.statSync(folderPath).isDirectory()) {
        if (!registeredSlugs.has(folder)) {
          console.warn(`⚠️ Warning: Folder "public/submissions/${folder}" exists but is not registered in registry.json!`);
        }
      }
    }
  }

  if (errorsFound) {
    console.error('\n🛑 Validation Failed. Please fix the errors listed above.');
    process.exit(1);
  } else {
    console.log('\n✅ Validation Successful! All registry entries and folders are correct.');
    process.exit(0);
  }
}

validatePR();
