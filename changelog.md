# eslint-config-env changelog

## Next

### Major

- Support Node.js v8.3+, from v8+.
- Updated the [`eslint`](https://npm.im/eslint) peer dependency to `^6.0.0`.
- To account for several [changes in ESLint v6](https://eslint.org/docs/6.0.0/user-guide/migrating-to-6.0.0#overrides-precedence), when `parserOptions.sourceType` is being set the `package.json` `type` field is respected and `overrides` is used to enforce file extension specific Node.js standards.
- Replaced [deprecated JSDoc rules](https://eslint.org/blog/2018/11/jsdoc-end-of-life) with a new peer dependency, [`eslint-plugin-jsdoc`](https://github.com/gajus/eslint-plugin-jsdoc).
- Preferred capitalization of types now matches the [`jsdoc/check-types`](https://github.com/gajus/eslint-plugin-jsdoc#check-types) rule defaults.
- Preferred tag names now match the [`jsdoc/check-tag-names`](https://github.com/gajus/eslint-plugin-jsdoc#check-tag-names) rule defaults, with the exception of `@prop`.
- Support [`jsdoc-md`](https://npm.im/jsdoc-md) projects by automatically restricting JSDoc tags to [the supported subset](https://github.com/jaydenseric/jsdoc-md#tag-subset).

### Patch

- Updated dependencies.
- Disabled the [`require-atomic-updates`](https://eslint.org/docs/rules/require-atomic-updates) rule [due to false positives](https://github.com/eslint/eslint/issues/11899).
- Improved the installation instructions in the readme.
- Updated the package `keywords` field for [`jsdoc-md`](https://npm.im/jsdoc-md).

## 6.0.0

### Major

- Use the ESLint [`sort-imports`](https://eslint.org/docs/rules/sort-imports) rule to sort named imports.
- Updated the [`eslint-plugin-node`](https://npm.im/eslint-plugin-node) peer dependency to `^9.0.0`.
- Remove `.mjs` file config overrides that [`eslint-plugin-node`](https://npm.im/eslint-plugin-node) now handles.

### Minor

- Bump the `parserOptions.ecmaVersion` config from `2018` to `2019`.

### Patch

- Updated dependencies.
- Adapted to the new [`read-pkg-up`](https://npm.im/read-pkg-up) API.
- Removed redundant `plugins` config, as the recommended configs already handle that.
- Ensure `.js` files (when not in a Next.js project) are parsed with a `script` source type, as [`eslint-plugin-import`](https://npm.im/eslint-plugin-import) was always setting it to `module`.
- Disable the [`import/no-unresolved`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md) rule, in favor of [`node/no-missing-import`](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-missing-import.md) and [`node/no-missing-require`](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-missing-require.md).
- Support `.mjs` files and the [`import/named`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/named.md) rule (see [benmosher/eslint-plugin-import#1359](https://github.com/benmosher/eslint-plugin-import/issues/1359)).

## 5.0.0

### Major

- Updated dependencies and peer dependencies.
- Dropped support for Node.js v6 and v7.

### Patch

- Reduced the size of the published `package.json` by moving dev tool config to files. This also prevents editor extensions such as Prettier and ESLint from detecting config and attempting to operate when opening package files installed in `node_modules`.
- Ensure `.js` files are linted on commit.

## 4.0.0

### Major

- Enabled the `react-hooks/exhaustive-deps` rule.

### Patch

- Updated dev dependencies.
- Added `hooks` to the package keywords.

## 3.0.0

### Major

- Use [`eslint-plugin-react-hooks`](https://npm.im/eslint-plugin-react-hooks) for React projects.

### Patch

- Updated dev dependencies.
- Prevent an [`eslint-plugin-react`](https://npm.im/eslint-plugin-react) warning.

## 2.0.0

### Major

- Use [`eslint-plugin-import-order-alphabetical`](https://npm.im/eslint-plugin-import-order-alphabetical), a new peer dependency.

### Patch

- Updated dev dependencies.

## 1.2.1

### Patch

- Updated dependencies.
- Updated [`eslint-plugin-node`](https://npm.im/eslint-plugin-node) peer dependency to `7 - 8`.

## 1.2.0

### Minor

- Removed the `quotes` rule, to prevent conflicts with Prettier config different to `singleQuote: true`.
- Added `esm` and `mjs` keywords to the package.

### Patch

- Updated dependencies.
- Updated package scripts and config for the new [`husky`](https://npm.im/husky) version.
- Prettier lint `.yml` files.
- Ensure the readme Travis build status badge only tracks `master` branch.
- Use [Badgen](https://badgen.net) instead of [shields.io](https://shields.io) for the npm version badge.

## 1.1.0

### Minor

- Support Node.js v6+, from v6.4+.

### Patch

- Updated dependencies.
- Changelog version entries now have “Major”, “Minor” and “Patch” subheadings.

## 1.0.0

### Major

- Updated `eslint-plugin-node` peer dependency from `^6.0.0` to `^7.0.0` and support the new API.

### Patch

- Updated dev dependencies.

## 0.5.0

### Minor

- Support repos with multiple packages. Instead of assuming the CWD is at or below the package directory, config is derived from the first `package.json` above the nested `node_modules` `eslint-config-env` is installed in.

## 0.4.0

### Minor

- Throw an error if the `eslint` peer dependency is not a project dev dependency.
- New browser project setup:
  - Use [eslint-plugin-compat](https://npm.im/eslint-plugin-compat).
  - `env.browser` is now automatically set.
- Support [Next.js](https://nextjs.org) projects:
  - `parserOptions.sourceType` is `module`, as Next.js only supports ESM in `.js` files. Once Next.js updates to `webpack` >= 4 this will be reverted and `.mjs` should be used for ESM source files instead.
  - Disabled the [`react/react-in-jsx-scope` rule](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md), as Next.js uses [`babel-plugin-react-require`](https://npm.im/babel-plugin-react-require).
- Rules preferring modern ES syntax only apply if the syntax is supported:
  - For Babel projects, support is assumed.
  - For non-Babel browser projects, no support is assumed.
  - For non-Babel Node.js projects, support for each syntax is determined against the `package.json` `engines.node` field (now documented as required for all projects).

### Patch

- Updated dependencies.
- Fixed React installation instructions.
- Ensure the [`node/no-unsupported-features` rule](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unsupported-features.md) is also off in `.mjs` files for Babel projects.

## 0.3.0

### Major

- Updated peer dependencies.

### Patch

- Updated dev dependencies.

## 0.2.0

### Major

- Updated preferred JSDoc tag synonyms:
  - `@param`
  - `@prop`
  - `@returns`

### Patch

- Updated dependencies.

## 0.1.1

### Patch

- Fix a crash when a package is missing `peerDependencies`, `dependencies` or `devDependencies` fields.

## 0.1.0

Initial release.
