// src/scripts/build-project.ts
import { writeFileSync } from 'fs'
import { join } from 'path'
import { h } from 'preact'
import { render } from 'preact-render-to-string'
import { App } from '../App.js'
import { execSync } from 'child_process'

// Build browser-script.ts to public/script.js
function buildBrowserScript() {
  const src = join('src', 'browser-script.ts');
  const out = join('public', 'script.js');
  try {
    execSync(`npx swc ${src} -C module.type=es6 -o ${out}`, { stdio: 'inherit' });
    console.log('✅ browser-script.ts built to public/script.js');
  } catch (err) {
    console.error('❌ Failed to build browser-script.ts:', err);
    process.exit(1);
  }
}
buildBrowserScript();

let html = render(h(App, {}))
// Inject live-reload script before </head>
html = html.replace('</head>', '<script src="/script.js"></script></head>')
writeFileSync(join('public', 'index.html'), '<!DOCTYPE html>' + html, 'utf8')
