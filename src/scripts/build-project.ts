// src/scripts/build-project.ts
import { writeFileSync } from 'fs'
import { join } from 'path'
import { h } from 'preact'
import { render } from 'preact-render-to-string'
import { App } from '../App.js'
import { execSync } from 'child_process'

// Build browser-script.ts to public/script.js
execSync('node ./dist/scripts/build-browser-script.js', { stdio: 'inherit' })

let html = render(h(App, {}))
// Inject live-reload script before </head>
html = html.replace('</head>', '<script src="/script.js"></script></head>')
writeFileSync(join('public', 'index.html'), '<!DOCTYPE html>' + html, 'utf8')
