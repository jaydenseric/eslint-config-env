const { path: projectRootPath } = require('app-root-path')
const tagNames = require('eslint-plugin-jsdoc/dist/tagNames')
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
    type,
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
  next: !!dependencies.next,
  jsdocMd: !!devDependencies['jsdoc-md']
}

// Note: Only external plugins and config referenced in the base config can be
// package.json peerDependencies.

checkDevDependencies([
  // Although the fact this config is being used implies ESLint is present, it
  // may still be missing from dev dependencies in the case of a global
  // installation or an editor plugin.
  'eslint',
  'eslint-plugin-node',
  'eslint-plugin-import',
  'eslint-plugin-import-order-alphabetical',
  'eslint-plugin-jsdoc'
])

/**
 * The Node.js resolve extensions, in order of preference. Note that Node.js v12
 * --experimental-modules mode no longer scans for .mjs; we support the earlier
 * implementation that does and hope that a future Node.js release will restore
 * the behavior.
 */
const NODE_RESOLVE_EXTENSIONS = ['.mjs', '.js', '.json', '.node']

/**
 * A list of JSDoc tags allowed by jsdoc-md.
 * @see [jsdoc-md docs](https://github.com/jaydenseric/jsdoc-md#tag-subset).
 */
const JSDOC_MD_SUPPORTED_TAGS = [
  'kind',
  'name',
  'type',
  'prop',
  'param',
  'returns',
  'see',
  'example',
  'ignore'
]

/**
 * Generates a `settings.jsdoc.tagNamePreference` object suitable for a project
 * using jsdoc-md.
 * @returns {object} Tag name preference.
 */
const jsdocMdTagNamePreference = () => {
  const tagNamePreference = {}

  for (let [name, aliases] of Object.entries(tagNames)) {
    const nameVariations = [name, ...aliases]
    const supportedVariation = nameVariations.find(name =>
      JSDOC_MD_SUPPORTED_TAGS.includes(name)
    )

    nameVariations.forEach(name => {
      if (!JSDOC_MD_SUPPORTED_TAGS.includes(name))
        tagNamePreference[name] = supportedVariation
          ? supportedVariation
          : {
              message: `The JSDoc @${name} tag is unsupported by jsdoc-md.`
            }
    })
  }

  return tagNamePreference
}

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
    'import/resolver': { node: { extensions: NODE_RESOLVE_EXTENSIONS } },

    jsdoc: {
      tagNamePreference: env.jsdocMd
        ? jsdocMdTagNamePreference()
        : {
            // `@property` is too long, and is inconsistent with how `@param` is
            // abbreviated. Also, jsdoc-md only supports `@prop`.
            property: 'prop'
          }
    }
  },
  env: { es6: true, node: true },
  plugins: ['import-order-alphabetical', 'jsdoc'],
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:import/recommended'
  ],
  rules: {
    // This rule has too many false positives:
    // https://github.com/eslint/eslint/issues/11899
    'require-atomic-updates': 'off',
    'require-await': 'error',
    'no-return-await': 'error',
    'arrow-body-style': 'error',
    curly: ['error', 'multi'],
    'sort-imports': ['error', { ignoreDeclarationSort: true }],

    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-unresolved': 'off',

    // Hopefully this will not be necessary in the future:
    // https://github.com/benmosher/eslint-plugin-import/issues/389
    'import-order-alphabetical/order': [
      'error',
      { 'newlines-between': 'never' }
    ],

    'jsdoc/check-alignment': 'error',
    'jsdoc/check-examples': [
      'error',
      {
        captionRequired: true,

        // To only check the caption, reject literally any example. Perhaps in
        // the future checking examples will be doable:
        // https://github.com/gajus/eslint-plugin-jsdoc/issues/331
        rejectExampleCodeRegex: '[^]*'
      }
    ],
    'jsdoc/check-param-names': 'error',
    'jsdoc/check-tag-names': 'error',
    'jsdoc/check-types': 'error',
    'jsdoc/implements-on-classes': 'error',
    'jsdoc/require-description': 'error',
    'jsdoc/require-jsdoc': 'error',
    'jsdoc/require-param': 'error',
    'jsdoc/require-param-description': 'error',
    'jsdoc/require-param-name': 'error',
    'jsdoc/require-param-type': 'error',
    'jsdoc/require-returns': 'error',
    'jsdoc/require-returns-check': 'error',
    'jsdoc/require-returns-description': 'error',
    'jsdoc/require-returns-type': 'error',
    'jsdoc/valid-types': 'error'
  },

  // These base options apply to all linted files, including .js and .jsx.
  parserOptions: {
    ecmaVersion: 2019,

    // If a consumer’s package.json specifies a `type`, respect it, otherwise
    // try to suit the project environment.
    sourceType: type
      ? type
      : // Next.js projects allow ESM in non .mjs files.
      env.next
      ? 'module'
      : 'script'
  },

  // Enforce file extension specific Node.js standards. eslint-plugin-node
  // attempts to do this, but `parserOptions.sourceType` gets overridden by
  // eslint-plugin-import and babel-eslint setting `module`. Since ESLint v6+
  // parent configs take priority, so these overrides should be final unless
  // overridden by the consumer’s config.
  overrides: [
    {
      files: ['*.cjs'],
      parserOptions: {
        sourceType: 'script'
      }
    },
    {
      files: ['*.mjs'],
      parserOptions: {
        sourceType: 'module'
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
  // Next.js projects allow ESM in non .mjs files.
  config.rules['node/no-extraneous-import'] = 'error'
  config.rules['node/no-missing-import'] = 'error'
  config.rules['node/no-unpublished-import'] = 'error'

  // Next.js uses https://npm.im/babel-plugin-react-require.
  config.rules['react/react-in-jsx-scope'] = 'off'
}

module.exports = config
