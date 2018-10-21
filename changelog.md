# eslint-config-env changelog

## Next

### Minor

- Removed the `quotes` rule, to prevent conflicts with Prettier config different to `singleQuote: true`.

### Patch

- Updated dependencies.
- Updated package scripts and config for the new [`husky`](https://npm.im/husky) version.
- Prettier lint `.yml` files.

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
