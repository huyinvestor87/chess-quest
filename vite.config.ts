import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const buildVersion = process.env.VITE_APP_VERSION ?? 'dev'

export default defineConfig({
  base: '/chess-quest/',
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(buildVersion),
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-${buildVersion}-[hash].js`,
        chunkFileNames: `assets/[name]-${buildVersion}-[hash].js`,
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name?.split('.').pop() ?? 'asset'
          return `assets/[name]-${buildVersion}-[hash].${ext}`
        },
      },
    },
  },
})
