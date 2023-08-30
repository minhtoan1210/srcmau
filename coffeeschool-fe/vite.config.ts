import react from '@vitejs/plugin-react'
import * as path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    drop: ['console', 'debugger'],
  },
  publicDir: 'public',
  resolve: {
    alias: [
      { find: 'containers', replacement: path.resolve(__dirname, 'src/containers') },
      { find: 'constants', replacement: path.resolve(__dirname, 'src/constants') },
      { find: 'components', replacement: path.resolve(__dirname, 'src/components') },
      { find: 'services', replacement: path.resolve(__dirname, 'src/services') },
      { find: 'store', replacement: path.resolve(__dirname, 'src/store') },
      { find: 'utils', replacement: path.resolve(__dirname, 'src/utils') },
      { find: 'types', replacement: path.resolve(__dirname, 'src/types') },
      { find: 'routes', replacement: path.resolve(__dirname, 'src/routes') },
    ],
  },
})
