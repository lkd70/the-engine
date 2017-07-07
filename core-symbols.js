'use strict'

const names = [
    'error',
    'pluginName',
]

for (const name of names) {
    exports[name] = Symbol(`symbols.${name}`)
}

Object.freeze(exports)
