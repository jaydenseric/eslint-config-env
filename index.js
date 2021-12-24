"use strict";

const { path: projectRootPath } = require("app-root-path");
const readPkgUp = require("read-pkg-up");

const {
  packageJson: {
    type,
    browserslist,
    peerDependencies = {},
    dependencies = {},
    devDependencies = {},
  } = {},
} = readPkgUp.sync({ cwd: projectRootPath });

const env = {
  browser: !!browserslist,
  babel: !!devDependencies["@babel/core"] || !!dependencies.next,
  prettier: !!devDependencies.prettier,
  react: !!peerDependencies.react || !!dependencies.react,
  next: !!dependencies.next,
  jsdocMd: !!devDependencies["jsdoc-md"],
};

/**
 * Checks packages are dev dependencies.
 * @param {Array<string>} packageNames Package names.
 */
function checkDevDependencies(packageNames) {
  for (const packageName of packageNames)
    if (!devDependencies[packageName])
      throw new Error(
        `Install missing project dev dependency \`${packageName}\`.`
      );
}

checkDevDependencies([
  // Although the fact this config is being used implies ESLint is present, it
  // may still be missing from dev dependencies in the case of a global
  // installation or an editor plugin.
  "eslint",
  "eslint-plugin-node",
  "eslint-plugin-import",
  "eslint-plugin-jsdoc",
]);

/**
 * A list of JSDoc tags allowed by jsdoc-md.
 * @see [jsdoc-md docs](https://github.com/jaydenseric/jsdoc-md#tag-subset).
 */
const JSDOC_MD_SUPPORTED_TAGS = [
  "desc",
  "description",
  "kind",
  "name",
  "typedef",
  "callback",
  "type",
  "prop",
  "property",
  "arg",
  "argument",
  "param",
  "return",
  "returns",
  "emits",
  "fires",
  "see",
  "example",
  "ignore",
];

/**
 * Preferred JSDoc tag names.
 */
const JSDOC_TAG_NAME_PREFERENCE = {
  property: "prop",
  arg: "param",
  argument: "param",
  return: "returns",
  emits: "fires",
};

/**
 * Generates a `settings.jsdoc.tagNamePreference` object suitable for a project
 * using jsdoc-md.
 * @returns {object} Tag name preference.
 */
function jsdocMdTagNamePreference() {
  const { jsdocTags } = require("eslint-plugin-jsdoc/dist/tagNames");
  const tagNamePreference = {
    ...JSDOC_TAG_NAME_PREFERENCE,
  };

  for (const [name, aliases] of Object.entries(jsdocTags))
    for (const tagName of [name, ...aliases])
      if (!JSDOC_MD_SUPPORTED_TAGS.includes(tagName))
        tagNamePreference[tagName] = {
          message: `The JSDoc tag \`@${tagName}\` is unsupported by jsdoc-md.`,
        };

  return tagNamePreference;
}

// Base config assumes a vanilla Node.js project. Note: Only external plugins
// and config referenced in the base config can be package.json
// peerDependencies.
const config = {
  settings: {
    jsdoc: {
      tagNamePreference: env.jsdocMd
        ? jsdocMdTagNamePreference()
        : JSDOC_TAG_NAME_PREFERENCE,
      preferredTypes: {
        ".<>": "<>",
        "[]": "Array<>",
      },
    },
  },
  env: {
    es2021: true,
    node: true,
  },
  plugins: ["jsdoc"],
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:import/recommended",
  ],
  rules: {
    "no-return-await": "error",
    "no-console": [
      "error",
      {
        allow: [
          "error",
          "group",
          "groupCollapsed",
          "groupEnd",
          "info",
          "table",
          "warn",
        ],
      },
    ],
    curly: ["error", "multi"],
    "sort-imports": ["error", { ignoreDeclarationSort: true }],
    "require-unicode-regexp": "error",
    strict: "error",

    "node/file-extension-in-import": ["error", "always"],

    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-useless-path-segments": "error",
    "import/no-unresolved": "off",
    "import/order": [
      "error",
      {
        alphabetize: { order: "asc" },
        "newlines-between": "never",
      },
    ],

    "jsdoc/check-alignment": "error",
    "jsdoc/check-param-names": "error",
    "jsdoc/check-property-names": "error",
    "jsdoc/check-tag-names": "error",
    "jsdoc/check-types": "error",
    "jsdoc/empty-tags": "error",
    "jsdoc/implements-on-classes": "error",
    "jsdoc/newline-after-description": ["error", "never"],
    "jsdoc/require-description": ["error", { checkConstructors: false }],
    "jsdoc/require-jsdoc": "error",
    "jsdoc/require-param": "error",
    "jsdoc/require-param-description": "error",
    "jsdoc/require-param-name": "error",
    "jsdoc/require-param-type": "error",
    "jsdoc/require-property": "error",
    "jsdoc/require-property-description": "error",
    "jsdoc/require-property-name": "error",
    "jsdoc/require-property-type": "error",
    "jsdoc/require-returns": "error",
    "jsdoc/require-returns-check": "error",
    "jsdoc/require-returns-description": "error",
    "jsdoc/require-returns-type": "error",
    "jsdoc/valid-types": "error",
  },

  // These base options apply to all linted files, including .js and .jsx.
  parserOptions: {
    // While setting `env.es2021` is supposed to default this to `12`, the
    // `plugin:node/recommended` and `plugin:import/recommended` configs
    // override it to a lower version. Hard-coding the version here overrides
    // that again.
    ecmaVersion: 2021,

    // If a consumer’s package.json specifies a `type`, respect it, otherwise
    // try to suit the project environment. See:
    // https://nodejs.org/api/packages.html#packages_type
    sourceType: type
      ? type === "module"
        ? "module"
        : "script"
      : // Next.js projects allow ESM in non .mjs files.
      env.next
      ? "module"
      : "script",
  },

  // Enforce file extension specific Node.js standards. eslint-plugin-node
  // attempts to do this, but `parserOptions.sourceType` gets overridden by
  // eslint-plugin-import and @babel/eslint-parser setting `module`. Since
  // ESLint v6+ parent configs take priority, so these overrides should be final
  // unless overridden by the consumer’s config.
  overrides: [
    {
      files: ["*.cjs"],
      parserOptions: {
        sourceType: "script",
      },
    },
    {
      files: ["*.mjs"],
      parserOptions: {
        sourceType: "module",
      },
    },
  ],
};

if (env.browser) {
  config.env.browser = true;

  if (!env.babel) {
    checkDevDependencies(["eslint-plugin-compat"]);
    config.extends.push("plugin:compat/recommended");
  }
}

if (env.babel || !env.browser) {
  // It would be nice to also prefer modern ES syntax for browser projects, when
  // available in all browsers supported in the project’s browserslist config.
  config.rules["prefer-destructuring"] = "error";
  config.rules["object-shorthand"] = [
    "error",
    "always",
    { avoidExplicitReturnArrows: true },
  ];
}

if (env.babel) {
  checkDevDependencies(["@babel/eslint-parser"]);
  config.parser = "@babel/eslint-parser";

  // Prevent a parsing error when linting a file not under the scope of a Babel
  // config file.
  config.parserOptions.requireConfigFile = false;

  // Assume all unsupported Node.js features used are transpiled. It would be
  // nice if there was a way to check Babel config and only disable checking
  // features known to be transpiled.
  config.rules["node/no-unsupported-features/es-builtins"] = "off";
  config.rules["node/no-unsupported-features/es-syntax"] = "off";
}

if (env.react) {
  checkDevDependencies(["eslint-plugin-react", "eslint-plugin-react-hooks"]);
  config.extends.push("plugin:react/recommended");

  // Prevents an eslint-plugin-react warning, see:
  // https://github.com/yannickcr/eslint-plugin-react/issues/1955#issuecomment-450771510
  config.settings.react = { version: "detect" };

  config.rules["react/prop-types"] = "off";
  config.rules["react/jsx-boolean-value"] = "error";
  config.rules["react/jsx-curly-brace-presence"] = "error";
  config.rules["react/jsx-fragments"] = "error";
  config.rules["react/jsx-no-useless-fragment"] = "error";
  config.rules["react/no-array-index-key"] = "error";

  config.plugins.push("react-hooks");
  config.rules["react-hooks/rules-of-hooks"] = "error";
  config.rules["react-hooks/exhaustive-deps"] = "error";
}

if (env.prettier) {
  checkDevDependencies(["eslint-config-prettier", "eslint-plugin-prettier"]);
  config.extends.push("plugin:prettier/recommended");
}

if (env.next) {
  checkDevDependencies(["@next/eslint-plugin-next"]);
  config.extends.push("plugin:@next/next/recommended");

  // Don’t warn when vanilla `img` elements are used in JSX as they have many
  // valid uses.
  config.rules["@next/next/no-img-element"] = "off";

  // Next.js projects allow ESM in non .mjs files.
  config.rules["node/no-extraneous-import"] = "error";
  config.rules["node/no-missing-import"] = "error";
  config.rules["node/no-unpublished-import"] = "error";

  // Next.js projects allow extensionless import specifiers.
  config.rules["node/file-extension-in-import"] = "off";

  // Next.js uses https://npm.im/babel-plugin-react-require.
  config.rules["react/react-in-jsx-scope"] = "off";
}

module.exports = config;
