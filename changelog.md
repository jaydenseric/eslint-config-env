# eslint-config-env changelog

## Next

### Patch

- Updated the JSDoc tag name preference config to support [`jsdoc-md`](https://npm.im/jsdoc-md) [v9.0.0](https://github.com/jaydenseric/jsdoc-md/releases/tag/v9.0.0).

## 16.0.0

### Major

- Updated peer dependencies:
  - [`eslint`](https://npm.im/eslint) to `^7.2.0`. While the ESLint config is compatible with v7.0.0+ the [`eslint-plugin-import`](https://npm.im/eslint-plugin-import) peer dependency demands v7.2.0+, see [benmosher/eslint-plugin-import@d84062e#commitcomment-45868154](https://github.com/benmosher/eslint-plugin-import/commit/d84062e290b1e2b80f459ecff7dde5ea5f8c0141#commitcomment-45868154).
  - [`eslint-plugin-import`](https://npm.im/eslint-plugin-import) to `^2.21.0`.
  - [`eslint-plugin-jsdoc`](https://npm.im/eslint-plugin-jsdoc) to `25 - 31`.
- Updated the ESLint `parserOptions.ecmaVersion` config from `2019` to `2021` in order to support linting code containing dynamic imports. This change breaks support for [`eslint`](https://npm.im/eslint) v6.

### Patch

- Updated dependencies.
- Updated GitHub Actions CI config:
  - Updated `actions/checkout` to v2.
  - Updated `actions/setup-node` to v2.
  - Also test Node.js v15.
  - Don’t specify the `CI` environment variable as it’s set by default.
- Removed `npm-debug.log` from the `.gitignore` file as npm [v4.2.0](https://github.com/npm/npm/releases/tag/v4.2.0)+ doesn’t create it in the current working directory.
- Updated a Node.js docs URL in a comment.

## 15.0.1

### Patch

- Updated the [`eslint-plugin-jsdoc`](https://npm.im/eslint-plugin-jsdoc) peer dependency to `15.11 - 30`.
- Updated dev dependencies.

## 15.0.0

### Major

- Enabled the [`react/no-array-index-key`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md) rule.

### Patch

- Updated the [`eslint-plugin-jsdoc`](https://npm.im/eslint-plugin-jsdoc) peer dependency to `15.11 - 29`.
- Updated dev dependencies.
- Simplified GitHub Actions CI config with the [`npm install-test`](https://docs.npmjs.com/cli/install-test.html) command.

## 14.0.4

### Patch

- Updated the [`eslint-plugin-jsdoc`](https://npm.im/eslint-plugin-jsdoc) peer dependency to `15.11 - 28`.
- Updated dev dependencies.

## 14.0.3

### Patch

- Updated dev dependencies.
- Allow the [`@fires`](https://jsdoc.app/tags-fires) JSDoc tag in [`jsdoc-md`](https://npm.im/jsdoc-md) projects as it’s supported in [v7.0.0](https://github.com/jaydenseric/jsdoc-md/releases/tag/v7.0.0).

## 14.0.2

### Patch

- Updated the [`eslint-plugin-jsdoc`](https://npm.im/eslint-plugin-jsdoc) peer dependency to `15.11 - 27`.
- Updated dev dependencies.
- Updated the EditorConfig.
- Stopped testing with Node.js v13.

## 14.0.1

### Patch

- Updated the package `engines.node` field to `^10.13.0 || >= 12.0.0`. This is mostly determined by what Node.js versions dev dependencies such as [`eslint`](https://npm.im/eslint) and [`prettier`](https://npm.im/prettier) support.
- Updated the [`eslint-plugin-jsdoc`](https://npm.im/eslint-plugin-jsdoc) peer dependency to `15.11 - 26`.
- Updated dev dependencies.

## 14.0.0

### Major

- Enforce file extensions in import specifiers for non Next.js environments via the [`node/file-extension-in-import`](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/file-extension-in-import.md) rule, as they are now [mandatory in Node.js](https://nodejs.org/api/esm.html#esm_mandatory_file_extensions).
- Enabled the [`react/jsx-boolean-value`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md) rule.
- Enabled the [`react/jsx-curly-brace-presence`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md) rule.
- Enabled the [`react/jsx-fragments`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md) rule.
- Enabled the [`react/jsx-no-useless-fragment`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/react/jsx-no-useless-fragment.md) rule.
- Removed configuration to resolve `.mjs`, as Node.js no longer does so.

### Patch

- Updated the [`eslint`](https://npm.im/eslint) peer dependency to `6 - 7`.
- Updated the [`eslint-plugin-jsdoc`](https://npm.im/eslint-plugin-jsdoc) peer dependency to `15.11 - 25`.
- Updated dependencies.
- Removed disabling the [`require-atomic-updates`](https://eslint.org/docs/rules/require-atomic-updates) rule, as it is no longer part of the `eslint:recommended` rule set.
- Fixed a comment typo.
- Fixed a v13.0.6 changelog entry typo.

## 13.0.6

### Patch

- Updated the [`eslint-plugin-jsdoc`](https://npm.im/eslint-plugin-jsdoc) peer dependency to `15.11 - 24`.
- Updated dependencies.
- Also run GitHub Actions with Node.js v14.

## 13.0.5

### Patch

- Updated the [`eslint-plugin-jsdoc`](https://npm.im/eslint-plugin-jsdoc) peer dependency to `15.11 - 23`.
- Updated dependencies.
- Updated the [`prettier`](https://npm.im/prettier) dev dependency, config and package `test:prettier` script.
- Ensure GitHub Actions run on pull request.

## 13.0.4

### Patch

- Updated the [`eslint-plugin-jsdoc`](https://npm.im/eslint-plugin-jsdoc) peer dependency to `15.11 - 22`, fixing [#1](https://github.com/jaydenseric/eslint-config-env/issues/1).
- Updated dependencies and dev dependencies.

## 13.0.3

### Patch

- Updated the [`eslint-plugin-jsdoc`](https://npm.im/eslint-plugin-jsdoc) peer dependency to `15.11 - 21`.
- Updated dev dependencies.

## 13.0.2

### Patch

- Updated the [`eslint-plugin-jsdoc`](https://npm.im/eslint-plugin-jsdoc) peer dependency to `15.11 - 20`, and updated it’s dev dependency.

## 13.0.1

### Patch

- Updated the [`eslint-plugin-jsdoc`](https://npm.im/eslint-plugin-jsdoc) peer dependency to `15.11 - 19`, and updated it’s dev dependency.
- Stop using [`husky`](https://npm.im/husky) and [`lint-staged`](https://npm.im/lint-staged).

## 13.0.0

### Major

- Updated Node.js support from v8.10+ to v10+.
- Updated dependencies, some of which require Node.js >= v10.

## 12.0.1

### Patch

- Removed the [`require-await`](https://eslint.org/docs/rules/require-await) rule as there are valid use cases for `async` functions that don’t contain `await`, particularly around errors and rejection.

## 12.0.0

### Major

- Updated the [`eslint-plugin-import`](https://npm.im/eslint-plugin-import) peer dependency to `^2.19.0`.
- Removed the [`eslint-plugin-import-order-alphabetical`](https://npm.im/eslint-plugin-import-order-alphabetical) peer dependency to use the new `import/order` rule sorting options available in [`eslint-plugin-import@2.19.0`](https://github.com/benmosher/eslint-plugin-import/blob/v2.19.0/CHANGELOG.md#2190---2019-12-08).
- Use the [`strict`](https://eslint.org/docs/rules/strict) rule to enforce strict mode in scripts.

### Minor

- Setup [GitHub Sponsors funding](https://github.com/sponsors/jaydenseric):
  - Added `.github/funding.yml` to display a sponsor button in GitHub.
  - Added a `package.json` `funding` field to enable npm CLI funding features.

### Patch

- Updated dependencies.
- Fixed a `package.json` `type` field value of `commonjs` setting `parserOptions.sourceType` to `commonjs`, instead of `script`.
- Remove `package-lock.json` from ignore files, as it is disabled via `.npmrc` anyway.
- Test Node.js v13 in CI GitHub Actions.

## 11.0.1

### Patch

- Updated dev dependencies.
- Updated the [`eslint-plugin-jsdoc`](https://npm.im/eslint-plugin-jsdoc) peer dependency to `15.11 - 18`.

## 11.0.0

### Major

- Updated the minimum supported Node.js version from v8.3 to v8.10, to match ESLint’s level of support.

### Patch

- Updated dependencies.
- Updated the [`eslint-plugin-jsdoc`](https://npm.im/eslint-plugin-jsdoc) peer dependency to `15.11 - 17`.
- Added a `gitattributes` file to enforce `LF` line endings in a Windows environment.
- Use double instead of single quotes in the `test:prettier` package script to support Windows.

## 10.0.0

### Major

- Updated the [`eslint-plugin-jsdoc`](https://npm.im/eslint-plugin-jsdoc) peer dependency to `^15.11.0`.
- Fixed a config load error for projects with a [`jsdoc-md`](https://npm.im/jsdoc-md) dev dependency, due to a [breaking change](https://github.com/gajus/eslint-plugin-jsdoc/commit/e791ec302052dd306021c10f360445ae0e3587f4#diff-1be37f0f54e3342877e3ea23a1c6ed64L1) published in [`eslint-plugin-jsdoc@15.11.0`](https://github.com/gajus/eslint-plugin-jsdoc/releases/tag/v15.11.0).

### Patch

- Updated the [`read-pkg-up`](https://npm.im/read-pkg-up) dependency and resolved it’s breaking changes.
- Removed a redundant `@private` JSDoc tag.

## 9.1.0

### Minor

- Updated the [`eslint-plugin-import-order-alphabetical`](https://npm.im/eslint-plugin-import-order-alphabetical) peer dependency to `0.0.1 - 1`.
- Updated the [`eslint-plugin-node`](https://npm.im/eslint-plugin-node) peer dependency to `9 - 10`.
- Additionally allow the `console` methods `group`, `groupCollapsed`, `groupEnd`, and `table`.

### Patch

- Updated dev dependencies.
- Use GitHub instead of Travis for CI.

## 9.0.0

### Major

- Enabled the [`no-console`](https://eslint.org/docs/rules/no-console) rule, erroring on `console.log` but allowing `info`, `warn` and `error`.

### Patch

- Updated dependencies.

## 8.0.0

### Major

- Updated the [`eslint-plugin-jsdoc`](https://npm.im/eslint-plugin-jsdoc) peer dependency to `^15.5.1`.
- Removed a no longer necessary workaround for [gajus/eslint-plugin-jsdoc#332](https://github.com/gajus/eslint-plugin-jsdoc/issues/332).
- Added the [`jsdoc/newline-after-description`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-newline-after-description) rule, now that [gajus/eslint-plugin-jsdoc#328](https://github.com/gajus/eslint-plugin-jsdoc/issues/328) is fixed.

## 7.0.1

### Patch

- Fixed `import` linting for Next.js projects.

## 7.0.0

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
