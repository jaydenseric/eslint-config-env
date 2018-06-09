# eslint-config-env

[![Build status](https://travis-ci.org/jaydenseric/eslint-config-env.svg)](https://travis-ci.org/jaydenseric/eslint-config-env) [![npm version](https://img.shields.io/npm/v/eslint-config-env.svg)](https://npm.im/eslint-config-env)

[ESLint](https://eslint.org) config optimized for authoring packages that adapts to the project environment, supporting:

- [Babel](https://babeljs.io)
- [Prettier](https://prettier.io)
- [React](https://reactjs.org)

## Install

To install [`eslint-config-env`](https://npm.im/eslint-config-env) and required[\*](https://github.com/eslint/eslint/issues/3458) peer dependencies [`eslint-plugin-import`](https://npm.im/eslint-plugin-import) and [`eslint-plugin-node`](https://npm.im/eslint-plugin-node) from [npm](https://npmjs.com) run:

```sh
npm install eslint-config-env eslint-plugin-import eslint-plugin-node --save-dev
```

### Babel

If you use [Babel](https://babeljs.io), also install [`babel-eslint`](https://npm.im/babel-eslint):

```sh
npm install babel-eslint --save-dev
```

### Prettier

If you use [Prettier](https://prettier.io), also install [`eslint-plugin-prettier`](https://npm.im/eslint-plugin-prettier) and [`eslint-config-prettier`](https://npm.im/eslint-config-prettier):

```sh
npm install eslint-plugin-prettier eslint-config-prettier --save-dev
```

### React

If you use [React](https://reactjs.org), also install [`eslint-plugin-react`](https://npm.im/eslint-plugin-react):

```sh
npm install eslint-plugin-prettier eslint-config-prettier --save-dev
```

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
