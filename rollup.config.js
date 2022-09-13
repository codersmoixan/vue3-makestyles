import path from "path";
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import inject from 'rollup-plugin-inject'
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'
import builtins from 'rollup-plugin-node-builtins'
import visualizer from 'rollup-plugin-visualizer'
import typescript from "@rollup/plugin-typescript"

const cjs = {
  exports: 'named',
  format: 'cjs',
  sourcemap: true,
};

const esm = {
  format: 'esm',
  sourcemap: true,
};

const getCJS = override => ({ ...cjs, ...override });
const getESM = override => ({ ...esm, ...override });

const minifierPlugin = terser({
  compress: {
    passes: 10,
    keep_infinity: true,
    pure_getters: true,
  },
  ecma: 5,
  format: {
    wrap_func_args: false,
    comments: /^\s*([@#]__[A-Z]+__\s*$|@cc_on)/,
    preserve_annotations: true,
  },
});

const extensions = [
  '.js',
  '.ts',
  '.tsx'
]

const processShim = '\0process-shim'

const prod = process.env.PRODUCTION
const mode = prod ? 'production' : 'development'

console.log(`Creating ${mode} bundle...`)

const moduleName = 'makestyles'
const exports = 'named'

const globals = { vue: 'Vue' }

const prodOutput = [
  { exports, file: 'dist/vue-makestyles.min.js', format: 'umd', name: moduleName },
  { exports, globals, file: 'dist/vue-makestyles.esm.js', format: 'es', name: moduleName }
]

const devOutput = [
  { exports, globals, file: 'dist/vue-makestyles.js', format: 'umd', name: moduleName },
  { exports, globals, file: 'dist/vue-makestyles.esm.js', format: 'es', name: moduleName }
]

const external = ['vue']

const output = prod ? prodOutput : devOutput

const plugins = [
  commonjs(),
  babel({
    babelrc: true
  }),
  // Unlike Webpack and Browserify, Rollup doesn't automatically shim Node
  // builtins like `process`. This ad-hoc plugin creates a 'virtual module'
  // which includes a shim containing just the parts the bundle needs.
  {
    resolveId (importee) {
      if (importee === processShim) return importee
      return null
    },
    load (id) {
      if (id === processShim) return 'export default { argv: [], env: {} }'
      return null
    }
  },
  builtins(),
  nodeResolve({
    mainFields: ['module', 'main', 'jsnext', 'browser']
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(prod ? 'production' : 'development')
  }),
  inject({
    process: processShim
  }),
  json(),
  typescript({
    outputToFilesystem: true,
    tsconfig: './tsconfig.json',
  })
]

if (prod) plugins.push(terser(), visualizer({ filename: './bundle-stats.html' }))

export default {
  input: 'src/index.ts',
  output,
  plugins,
  external
}

// export default {
//   input: 'src/index.ts',
//   output,
//   plugins: [
//     tsPlugin,
//     babel({
//       babelrc: true
//     }),
//     buble()
//   ],
//   external: ['vue'] // 将[模块]视为外部依赖项
// }
