import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const isDev = process.env.NODE_ENV === 'development';

export default [
    // UMD build (for browsers via script tag)
    {
        input: 'src/index.js',
        output: {
            file: isDev ? 'dist/mailto-handler.js' : 'dist/mailto-handler.min.js',
            format: 'umd',
            name: 'MailtoHandler',
            sourcemap: isDev
        },
        plugins: [
            nodeResolve(),
            !isDev && terser({
                compress: {
                    drop_console: true,
                    drop_debugger: true
                },
                mangle: {
                    properties: {
                        regex: /^_/
                    }
                }
            })
        ].filter(Boolean)
    },

    // ES Module build (for bundlers)
    {
        input: 'src/index.js',
        output: {
            file: 'dist/mailto-handler.esm.js',
            format: 'esm',
            sourcemap: isDev
        },
        plugins: [
            nodeResolve(),
            !isDev && terser()
        ].filter(Boolean)
    },

    {
        input: 'src/index.js',
        output: {
            file: 'dist/mailto-handler.cjs.js',
            format: 'cjs',
            sourcemap: isDev
        },
        plugins: [
            nodeResolve(),
            !isDev && terser()
        ].filter(Boolean)
    }
];