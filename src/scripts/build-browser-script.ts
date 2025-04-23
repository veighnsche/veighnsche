// Build script to transpile src/browser-script.ts to public/script.js using swc
import { execSync } from 'child_process';
import { join } from 'path';

const src = join('src', 'browser-script.ts');
const out = join('public', 'script.js');

try {
  execSync(`npx swc ${src} -C module.type=es6 -o ${out}`, { stdio: 'inherit' });
  console.log('✅ browser-script.ts built to public/script.js');
} catch (err) {
  console.error('❌ Failed to build browser-script.ts:', err);
  process.exit(1);
}
