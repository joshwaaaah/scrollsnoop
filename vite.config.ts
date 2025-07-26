import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [dts({
    outDir: 'dist',
    rollupTypes: true
  })],
  build: {
    lib: {
      entry: 'lib/scrollsnoop.ts',
      formats: ['es'],
      name: 'ScrollSnoop',
      fileName: 'scrollsnoop',
    },
  }
})