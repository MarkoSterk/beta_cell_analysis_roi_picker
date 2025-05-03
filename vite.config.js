import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import topLevelAwait from 'vite-plugin-top-level-await'

// Vite configuration
// --------------------------------------------------
//  - "root"   : where your source code lives (e.g. ./src)
//  - "outDir" : where the production build will be emitted (e.g. ./dist)
//                This path is resolved *relative to project root* (not to "root").
// --------------------------------------------------
// Edit the two paths below to match your folder structure.

const configs = defineConfig({
    plugins: [
        topLevelAwait({
            // optional – names used in the helper code it injects
            promiseExportName: '__tla',
            promiseImportName: i => `__tla_${i}`
        })
    ],
  /**
   * Directory that contains your entry index.html and source files.
   * Use an absolute path so tooling and IDEs work consistently.
   */
  root: resolve(__dirname, 'frontend'),

  build: {
    /**
     * Directory for the built assets. If you keep the default "dist" Vite will
     * clean and recreate it on every build.
     */
    outDir: resolve(__dirname, 'backend', 'static', 'app'),

    // Remove all files in outDir before building
    emptyOutDir: true,
    rollupOptions: {
        output: {
          // entry JS files (index‑xxxxx.js → index.js)
          entryFileNames: 'assets/[name].js',
    
          // shared chunks created by code‑splitting
          chunkFileNames: 'assets/[name].js',
    
          // anything that isn’t JS (css, svg, fonts…)
          assetFileNames: 'assets/[name].[ext]'
        }
      }
  },
  
});
export default configs;
console.log(configs)
