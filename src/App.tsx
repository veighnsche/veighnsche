export function App() {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Veighnsche</title>
        <link href="/styles.css" rel="stylesheet" />
        <link rel="icon" type="image/png" href="favicon/favicon.ico" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body>
        <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
          <div className="flex flex-wrap justify-center items-center">
            {[
              '/images/logo.png',
              ...Array.from(
                { length: 31 },
                (_, i) => `/images/logo_${String(i + 1).padStart(5, '0')}_.png`
              ),
            ].map((src, idx) => (
              <img
                key={src}
                src={src}
                alt={`Image ${idx === 0 ? 'Logo' : idx}`}
                className="max-w-xs w-full h-auto"
                style={{ maxWidth: 200, margin: 4 }}
              />
            ))}
          </div>
        </main>
      </body>
    </html>
  )
}
