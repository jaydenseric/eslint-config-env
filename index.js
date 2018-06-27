const readPkgUp = require('read-pkg-up')

const {
  pkg: {
    name,
    peerDependencies = {},
    dependencies = {},
    devDependencies = {},
    browserslist
  }
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
  browser: !!browserslist,
  babel: !!devDependencies['@babel/core'] || !!dependencies.next,
  prettier: !!devDependencies.prettier,
  react: !!peerDependencies.react || !!dependencies.react,
  next: !!dependencies.next
}

// Note: Only external plugins and config referenced in the base config can be
// package.json peerDependencies.

checkDevDependencies([
  // Although the fact this config is being used implies ESLint is present, it
  // may still be missing from dev dependencies in the case of a global
  // installation or an editor plugin.
  'eslint',
  'eslint-plugin-import',
  'eslint-plugin-node'
])

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
    curly: ['error', 'multi'],
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

if (env.browser) {
  config.env.browser = true
  if (!env.babel) {
    checkDevDependencies(['eslint-plugin-compat'])
    config.extends.push('plugin:compat/recommended')
  }
}

// Only force modern ES syntax in a browser project if Babel is used.
if (!env.browser || env.babel) {
  config.rules['prefer-destructuring'] = 'error'
  config.rules['prefer-arrow-callback'] = 'error'
  config.rules['object-shorthand'] = [
    'error',
    'always',
    {
      avoidExplicitReturnArrows: true
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
  config.extends.push('plugin:react/recommended')
}

if (env.prettier) {
  checkDevDependencies(['eslint-config-prettier', 'eslint-plugin-prettier'])
  config.extends.push('plugin:prettier/recommended')
  if (env.react) config.extends.push('prettier/react')
}

if (env.next) {
  // Once Next.js updates to webpack >= 4 .mjs should be used for source files
  // instead.
  config.parserOptions.sourceType = 'module'

  // Next.js uses https://npm.im/babel-plugin-react-require.
  config.rules['react/react-in-jsx-scope'] = 'off'
}

module.exports = config
