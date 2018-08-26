# eslint-config-env changelog

## Next

- Support Node.js v6+, from v6.4+.

## 1.0.0

- Update `eslint-plugin-node` peer dependency from `^6.0.0` to `^7.0.0` and support the new API.
- Update dev dependencies.

## 0.5.0

- Support repos with multiple packages. Instead of assuming the CWD is at or below the package directory, config is derived from the first `package.json` above the nested `node_modules` `eslint-config-env` is installed in.

## 0.4.0

- Updated dependencies.
- Fixed React installation instructions.
- Throw an error if the `eslint` peer dependency is not a project dev dependency.
- New browser project setup:
  - Use [eslint-plugin-compat](https://npm.im/eslint-plugin-compat).
  - `env.browser` is now automatically set.
- Rules preferring modern ES syntax only apply if the syntax is supported:
  - For Babel projects, support is assumed.
  - For non-Babel browser projects, no support is assumed.
  - For non-Babel Node.js projects, support for each syntax is determined against the `package.json` `engines.node` field (now documented as required for all projects).
- Ensure the [`node/no-unsupported-features` rule](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unsupported-features.md) is also off in `.mjs` files for Babel projects.
- Support [Next.js](https://nextjs.org) projects:
  - `parserOptions.sourceType` is `module`, as Next.js only supports ESM in `.js` files. Once Next.js updates to `webpack` >= 4 this will be reverted and `.mjs` should be used for ESM source files instead.
  - Disabled the [`react/react-in-jsx-scope` rule](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md), as Next.js uses [`babel-plugin-react-require`](https://npm.im/babel-plugin-react-require).

## 0.3.0

- Updated dependencies.

## 0.2.0

- Updated dependencies.
- Updated preferred JSDoc tag synonyms:
  - `@param`
  - `@prop`
  - `@returns`

## 0.1.1

- Fix a crash when a package is missing `peerDependencies`, `dependencies` or `devDependencies` fields.

## 0.1.0

- Initial release.
