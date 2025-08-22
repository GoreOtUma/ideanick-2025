import { sentryVitePlugin } from '@sentry/vite-plugin'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'
import { parsePublicEnv } from './src/lib/parsePublicEnv'

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const publicEnv = parsePublicEnv(env)

  // Динамический импорт для legacy плагина
  let legacyPlugin: any = null
  try {
    const legacyModule = await import('@vitejs/plugin-legacy')
    legacyPlugin = legacyModule.default({
      targets: ['> 0.01%'],
    })
  } catch (error) {
    console.warn('Failed to load @vitejs/plugin-legacy:', error)
  }

  if (env.HOST_ENV !== 'local') {
    if (!env.SENTRY_AUTH_TOKEN) {
      throw new Error('SENTRY_AUTH_TOKEN is not defined')
    }
    if (!env.SOURCE_VERSION) {
      throw new Error('SOURCE_VERSION is not defined')
    }
  }

  return {
    plugins: [
      react(),
      svgr(),
      legacyPlugin, // Добавляем плагин, если он загрузился
      env.HOST_ENV !== 'local'
        ? undefined
        : visualizer({
            filename: './dist/bundle-stats.html',
            gzipSize: true,
            brotliSize: true,
          }),
      !env.SENTRY_AUTH_TOKEN
        ? undefined
        : sentryVitePlugin({
            org: 'university-yf',
            project: 'webapp',
            authToken: env.SENTRY_AUTH_TOKEN,
            release: { name: env.SOURCE_VERSION },
          }),
    ].filter(Boolean), // Фильтруем undefined плагины
    css: {
      postcss: {
        plugins: [autoprefixer({})],
      },
    },
    build: {
      sourcemap: true,
      chunkSizeWarningLimit: 900,
    },
    server: {
      port: +env.PORT,
    },
    preview: {
      port: +env.PORT,
    },
    define: {
      'process.env': publicEnv,
    },
  }
})
