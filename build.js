import * as esbuild from 'esbuild'

const build = async () => {
  let ctx = await esbuild.context({
    entryPoints: {
      'contentScript': 'src/js/contentScript.js',
      'assets/application': 'src/js/controllers/index.js',
    },
    outdir: 'dist',
    outbase: 'src',
    bundle: true,
    logLevel: 'info',
    color: true,
    minify: true,
    loader: {
      '.woff': 'file',
      '.woff2': 'file',
      '.css': 'css'
    },
  })

  await ctx.watch()
  console.log('Watching for changes. 👀')
}

build().catch(() => process.exit(1))
