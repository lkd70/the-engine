'use strict'

const names = [
    'error',
    'handled',
    'pluginName',
]

for (const name of names) {
    exports[name] = Symbol(`symbols.${name}`)
}

Object.freeze(exports)
