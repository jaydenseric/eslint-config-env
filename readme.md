# eslint-config-env

[![Build status](https://travis-ci.org/jaydenseric/eslint-config-env.svg)](https://travis-ci.org/jaydenseric/eslint-config-env) [![npm version](https://img.shields.io/npm/v/eslint-config-env.svg)](https://npm.im/eslint-config-env)

[ESLint](https://eslint.org) config optimized for authoring packages that adapts to the project environment, supporting:

- [Babel](https://babeljs.io)
- [Prettier](https://prettier.io)
- [React](https://reactjs.org)
- [Next.js](https://nextjs.org)

## Install

To install [`eslint-config-env`](https://npm.im/eslint-config-env) and required[\*](https://github.com/eslint/eslint/issues/3458) peer dependencies [`eslint-plugin-import`](https://npm.im/eslint-plugin-import) and [`eslint-plugin-node`](https://npm.im/eslint-plugin-node) from [npm](https://npmjs.com) run:

```sh
npm install eslint-config-env eslint-plugin-import eslint-plugin-node --save-dev
```

### Babel

For a [Babel](https://babeljs.io) project, also install [`babel-eslint`](https://npm.im/babel-eslint):

```sh
npm install babel-eslint --save-dev
```

### Prettier

For a [Prettier](https://prettier.io) project, also install [`eslint-plugin-prettier`](https://npm.im/eslint-plugin-prettier) and [`eslint-config-prettier`](https://npm.im/eslint-config-prettier):

```sh
npm install eslint-plugin-prettier eslint-config-prettier --save-dev
```

### React

For a [React](https://reactjs.org) project, also install [`eslint-plugin-react`](https://npm.im/eslint-plugin-react):

```sh
npm install eslint-plugin-prettier eslint-config-prettier --save-dev
```

### Next.js

A [Next.js](https://nextjs.org) project does not require additional installations.

## Config

Configure ESLint in your project:

```json
{
  "extends": ["env"]
}
```

A Node.js environment is always supported. To also support browsers:

```json
{
  "extends": ["env"],
  "env": {
    "browser": true
  }
}
```
