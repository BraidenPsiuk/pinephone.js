// vite.config.js
const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
    build: {
        outDir: "build",
        lib: {
            entry: path.resolve(__dirname, 'src/pinephone.mjs'),
            name: 'PINEPHONE',
            fileName: (format) => `pinephone.${format}.js`
        }
    }
})

//
// Reasons for not providing any rollupOptions:
//     Externalizing: I don't think we have anything to externalize since we have no deps, only dev-deps
//     Output globals: Look into possible benefits of adding these, but for now I don't think it's necessary