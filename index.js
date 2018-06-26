const readPkgUp = require('read-pkg-up')

const {
  pkg: { name, peerDependencies = {}, dependencies = {}, devDependencies = {} }
} = readPkgUp.sync()

/**
 * Checks packages are dev dependencies.
 * @param {string[]} packageNames Package names.
 * @private
 */
const checkDevDependencies = packageNames => {
  packageNames.forEach(packageName => {
    if (!devDependencies[packageName])
      throw new Error(`Add ${packageName} to ${name} devDependencies.`)
  })
}

const env = {
  babel: !!(devDependencies['@babel/core'] || dependencies['next']),
  react: !!(peerDependencies.react || dependencies.react),
  prettier: !!devDependencies.prettier
}

// External plugins and config referenced in the base config are
// peerDependencies, while those that are the result of sniffing the consumer
// package are optionalDependencies.

checkDevDependencies(['eslint-plugin-import', 'eslint-plugin-node'])

const config = {
  parserOptions: {
    ecmaVersion: 2018
  },
  env: {
    es6: true,
    node: true
  },
  plugins: ['import', 'node'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:node/recommended'
  ],
  rules: {
    'require-jsdoc': [
      'error',
      {
        require: {
          ArrowFunctionExpression: true,
          ClassDeclaration: true,
          FunctionDeclaration: true,
          MethodDefinition: true
        }
      }
    ],
    'valid-jsdoc': [
      'error',
      {
        requireReturn: false,
        prefer: {
          // Ensure consistent use of tag synonyms, generally preferring
          // shortest complete words.
          // See: http://usejsdoc.org

          arg: 'param',
          argument: 'param',
          augments: 'extends',
          const: 'constant',
          defaultvalue: 'default',
          desc: 'description',
          exception: 'throws',
          fileoverview: 'file',
          overview: 'file',
          fires: 'emits',
          func: 'function',
          host: 'external',
          property: 'prop',
          return: 'returns',
          var: 'member',
          yields: 'yield'
        },
        preferType: {
          // Ensure consistent type capitalization.
          // See: https://github.com/documentationjs/documentation/blob/v8.0.0/src/lint.js#L9

          array: 'Array',
          Boolean: 'boolean',
          date: 'Date',
          Number: 'number',
          object: 'Object',
          String: 'string',
          Undefined: 'undefined'
        }
      }
    ],
    'require-await': 'error',
    'no-return-await': 'error',
    'arrow-body-style': 'error',
    'prefer-arrow-callback': 'error',
    'object-shorthand': [
      'error',
      'always',
      {
        avoidExplicitReturnArrows: true
      }
    ],
    curly: ['error', 'multi'],
    'prefer-destructuring': 'error',
    quotes: ['error', 'single'],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-useless-path-segments': 'error',
    'import/order': 'error'
  },
  overrides: [
    {
      files: ['*.mjs'],
      parserOptions: {
        sourceType: 'module'
      },
      rules: {
        'node/no-unsupported-features': [
          'error',
          {
            ignores: ['modules']
          }
        ]
      }
    }
  ]
}

if (env.babel) {
  checkDevDependencies(['babel-eslint'])
  config.parser = 'babel-eslint'
  // Undo babel-eslint defaulting to 'module'.
  config.parserOptions.sourceType = 'script'
}

if (env.react) {
  checkDevDependencies(['eslint-plugin-react'])
  config.plugins.push('react')
  config.extends.push('plugin:react/recommended')
}

if (env.prettier) {
  checkDevDependencies(['eslint-config-prettier', 'eslint-plugin-prettier'])
  config.plugins.push('prettier')
  config.extends.push('prettier')
  if (env.react) config.extends.push('prettier/react')
  config.rules['prettier/prettier'] = 'error'
}

module.exports = config
