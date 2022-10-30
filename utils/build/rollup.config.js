import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

export default [
    {
        input: "src/pinephone.js",
        plugins: [
            nodeResolve()
        ],
        output: [
            {
                format: "cjs",
                file: "build/pinephone.cjs"
            },
            {
                format: "esm",
                file: "build/pinephone.module.js"
            }
        ]
    },
    {
        input: "src/pinephone.js",
        plugins: [
            nodeResolve(),
            terser()
        ],
        output: [
            {
                format: "cjs",
                file: "build/pinephone.min.js"
            }
        ]
    }
];