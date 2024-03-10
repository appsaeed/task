import react from '@vitejs/plugin-react-swc';
import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { defineConfig, loadEnv } from 'vite';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const env = loadEnv("mock", process.cwd(), "");
// Object.assign(process.env, loadEnv("mock", process.cwd(), ""));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: env.VITE_BASENAME || '',
  server: {
    port: 3000,
  },

  //build options
  build: {
    rollupOptions: {
      plugins: [
        {
          name: "404-html",
          async writeBundle(options) {
            const indexHtmlPath = resolve(options.dir || '', "index.html");
            const buildIndexHtmlPath = resolve(options.dir || '', "404.html");
            try {
              const indexHtmlContent = await readFile(indexHtmlPath, "utf-8");
              await writeFile(buildIndexHtmlPath, indexHtmlContent);
            } catch (error) {
              console.error("Error duplicating index.html:", error);
            }
          },
        },
      ],
    },
  },
})

