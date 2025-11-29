import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        admin: './src/admin/login.html',
        dashboard: './src/admin/dashboard.html'
      }
    }
  }
})
