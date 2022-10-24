import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

    return {
        plugins: [ vue() ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            strictPort: true,
            port: 8080,
            host: "::", //'0.0.0.0',
        },
        esbuild: {
            drop: mode == "production" ? [ "console", "debugger" ] : []
        }
    };

})
