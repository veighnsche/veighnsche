import { spawn } from 'child_process'
import { Command } from 'commander'

const program = new Command()

program
  .name('dev_server')
  .description('Overengineered dev orchestrator for static sites')
  .version('0.1.0')

program
  .command('dev')
  .description('Run the dev server with Tailwind, SWC watch, and Wrangler')
  .action(() => {
    const run = (label: string, command: string, args: string[]) => {
      const proc = spawn(command, args, { stdio: 'inherit', shell: true })
      proc.on('close', (code) => {
        console.log(`💥 ${label} exited with code ${code}`)
      })
    }

    run('tailwind', 'tailwindcss', [
      '-i',
      './src/styles.css',
      '-o',
      './public/styles.css',
      '--watch',
    ])

    run('ts+html', 'nodemon', [
      '--watch',
      'src',
      '--ext',
      'ts,tsx',
      '--exec',
      'pnpm run build:scripts && node dist/scripts/build-html.js',
    ])

    run('wrangler', 'wrangler', ['dev'])
  })

program.parse()
