import typescript from 'rollup-plugin-typescript'
import {terser} from 'rollup-plugin-terser'

export default [{
    input: 'src/battlesort.ts',
    output: [{
        file: 'dist/battlesort.browser.min.js',
        name: 'Battlesort',
        format: 'iife',
        plugins: [terser()]
    },
    /*{
        file: 'dist/battlesort.node.min.js',
        name: 'Battlesort',
        format: 'cjs',
        plugins: [terser()]
    }*/],
    plugins: [typescript({tsconfig: 'tsconfig.json'})]
}]