const { path: projectRootPath } = require('app-root-path')
const readPkgUp = require('read-pkg-up')
const semver = require('semver')

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

/**
 * Determines if Node.js features available since a given version are supported
 * by the project.
 * @param {number} availableSinceVersion First Node.js version the features are available in.
 * @returns {boolean} Are the features supported.
 */
const nodeFeaturesSinceVersionSupported = availableSinceVersion =>
  !semver.intersects(engines.node, `<${availableSinceVersion}`)

const {
  package: {
    name,
    engines = {},
    browserslist,
    peerDependencies = {},
    dependencies = {},
    devDependencies = {}
  } = {}
} = readPkgUp.sync({ cwd: projectRootPath })

if (!('node' in engines))
  throw new Error(
    'Specify supported Node.js versions in the package.json field `engines.node`.'
  )

if (!semver.validRange(engines.node))
  throw new Error('Invalid semver range in package.json field `engines.node`.')

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
  'eslint-plugin-import-order-alphabetical',
  'eslint-plugin-node'
])

/**
 * The Node.js resolve extensions, in order of preference. Note that Node.js v12
 * --experimental-modules mode no longer scans for .mjs; we support the earlier
 * implementation that does and hope that a future Node.js release will restore
 * the behavior.
 */
const NODE_RESOLVE_EXTENSIONS = ['.mjs', '.js', '.json', '.node']

// Base config assumes a vanilla Node.js project.
const config = {
  settings: {
    node: {
      // By default, eslint-plugin-node does‘t support .mjs as it supports the
      // Node.js v12 --experimental-modules implementation.
      tryExtensions: NODE_RESOLVE_EXTENSIONS
    },

    // By default, eslint-plugin-import does‘t support .mjs:
    // https://github.com/benmosher/eslint-plugin-import/issues/1359
    'import/extensions': NODE_RESOLVE_EXTENSIONS,
    'import/resolver': { node: { extensions: NODE_RESOLVE_EXTENSIONS } }
  },
  parserOptions: {
    ecmaVersion: 2019,

    // Undo eslint-plugin-import and babel-eslint defaulting to 'module'.
    // eslint-plugin-node will override this to 'module' for .mjs files.
    sourceType: 'script'
  },
  env: { es6: true, node: true },
  plugins: ['import-order-alphabetical'],
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:import/recommended'
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
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-unresolved': 'off',
    'import-order-alphabetical/order': [
      'error',
      { 'newlines-between': 'never' }
    ]
  }
}

if (env.browser) {
  config.env.browser = true

  if (!env.babel) {
    checkDevDependencies(['eslint-plugin-compat'])
    config.extends.push('plugin:compat/recommended')
  }
}

// It would be nice to also prefer modern ES syntax for browser projects, when
// available in all browsers supported in the project’s browserslist config.

if (env.babel || (!env.browser && nodeFeaturesSinceVersionSupported('6.4')))
  config.rules['prefer-destructuring'] = 'error'

if (env.babel || (!env.browser && nodeFeaturesSinceVersionSupported('6')))
  config.rules['prefer-arrow-callback'] = 'error'

if (env.babel || (!env.browser && nodeFeaturesSinceVersionSupported('4')))
  config.rules['object-shorthand'] = [
    'error',
    'always',
    { avoidExplicitReturnArrows: true }
  ]

if (env.babel) {
  checkDevDependencies(['babel-eslint'])
  config.parser = 'babel-eslint'

  // Assume all unsupported Node.js features used are transpiled. It would be
  // nice if there was a way to check Babel config and only disable disable
  // checking features known to be transpiled.
  config.rules['node/no-unsupported-features/es-builtins'] = 'off'
  config.rules['node/no-unsupported-features/es-syntax'] = 'off'
}

if (env.react) {
  checkDevDependencies(['eslint-plugin-react', 'eslint-plugin-react-hooks'])
  config.extends.push('plugin:react/recommended')

  // Prevents an eslint-plugin-react warning, see:
  // https://github.com/yannickcr/eslint-plugin-react/issues/1955#issuecomment-450771510
  config.settings.react = { version: 'detect' }

  config.plugins.push('react-hooks')
  config.rules['react-hooks/rules-of-hooks'] = 'error'
  config.rules['react-hooks/exhaustive-deps'] = 'error'
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
