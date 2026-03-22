/// <reference types="vitest" />
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GOOGLE_APP_SCRIPT_URL': JSON.stringify(env.GOOGLE_APP_SCRIPT_URL),
        'process.env.STUDIO_WHATSAPP_NUMBER': JSON.stringify(env.STUDIO_WHATSAPP_NUMBER),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './setupTests.ts'
      }
    };
});
