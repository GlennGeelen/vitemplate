import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      reporter: ['text', 'lcov'],
      all: true,
      include: ['src'],
      exclude: ['src/main.ts', 'src/*.d.ts']
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~formkit': resolve(process.cwd(), 'node_modules/@formkit')
    }
  },
  plugins: [
    vue(),
    vueI18n({
      include: resolve(__dirname, 'src/locales/**')
    })
  ]
})
