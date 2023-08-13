import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 按需引入vant
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  // 按需引入
  plugins: [vue(), Components({
    resolvers: [VantResolver()],
  }),],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8000',
      '/imgs': 'http://localhost:8000',
    }
  }
})
