import { spawn } from 'child_process'
import chokidar from 'chokidar'
import { createServer } from 'http'
import { WebSocketServer, WebSocket } from 'ws'

// Utility to run a command and stream its output
function run(cmd: string, args: string[] = []): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { stdio: 'inherit', shell: true })
    proc.on('exit', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`${cmd} ${args.join(' ')} exited with code ${code}`))
    })
  })
}

// Full build sequence: SWC, static render, Tailwind
async function buildAll() {
  console.log('🔨 Building scripts...')
  await run('pnpm', ['run', 'build:scripts'])

  console.log('🖋️ Rendering HTML...')
  await run('node', ['dist/scripts/build-project.js'])

  console.log('🎨 Building CSS...')
  await run('npx', ['tailwindcss', '-i', './src/styles.css', '-o', './public/styles.css'])

  console.log('✅ Build complete')
}

// --- Live reload server setup ---
const httpServer = createServer()
const wss = new WebSocketServer({ server: httpServer })
let sockets: Set<WebSocket> = new Set()
wss.on('connection', (ws) => {
  sockets.add(ws)
  ws.on('close', () => sockets.delete(ws))
})
httpServer.listen(35729, () => {
  console.log('🔄 Live reload server listening on ws://localhost:35729')
})
function triggerReload() {
  for (const ws of sockets) {
    if (ws.readyState === 1) ws.send('reload')
  }
}

async function startDevServer() {
  // Initial build
  await buildAll()

  // Start Wrangler Dev
  console.log('🚀 Starting Wrangler dev...')
  const wrangler = spawn('npx', ['wrangler', 'dev'], { stdio: 'inherit', shell: true })

  // Watch src/ for changes, debounce rebuilds
  let buildTimer: NodeJS.Timeout
  chokidar.watch('src', { ignoreInitial: true }).on('all', (event, filePath) => {
    console.log(`📄 ${event} detected in ${filePath}`)
    clearTimeout(buildTimer)
    buildTimer = setTimeout(() => {
      buildAll()
        .then(() => triggerReload())
        .catch((err) => console.error(err))
    }, 100)
  })

  // Watch public/ for changes (index.html, styles.css)
  chokidar
    .watch('public', {
      ignoreInitial: true,
      ignored: (path, stats) => {
        // Only watch .html and .css files
        if (stats?.isFile()) {
          return !/\.(html|css)$/.test(path)
        }
        return false
      },
    })
    .on('change', (filePath) => {
      console.log(`🔄 Public asset changed: ${filePath}`)
      triggerReload()
      // Wrangler dev should auto-reload assets
    })

  // Clean shutdown
  process.on('SIGINT', () => {
    console.log('\n👋 Shutting down dev server...')
    wrangler.kill()
    httpServer.close()
    wss.close()
    process.exit()
  })
}

// Kick things off
startDevServer().catch((err) => {
  console.error(err)
  process.exit(1)
})
