# eslint-config-env

[![Build status](https://travis-ci.org/jaydenseric/eslint-config-env.svg)](https://travis-ci.org/jaydenseric/eslint-config-env) [![npm version](https://img.shields.io/npm/v/eslint-config-env.svg)](https://npm.im/eslint-config-env)

[ESLint](https://eslint.org) config optimized for authoring packages that adapts to the project environment, supporting:

- Node.js
- Browser
- [Babel](https://babeljs.io)
- [Prettier](https://prettier.io)
- [React](https://reactjs.org)
- [Next.js](https://nextjs.org)

## Install

To install [`eslint-config-env`](https://npm.im/eslint-config-env) from [npm](https://npmjs.com) run:

```sh
npm install eslint-config-env --save-dev
```

Configure ESLint in your project:

```json
{
  "extends": ["env"]
}
```

Unfortunately [sharable ESLint configs can’t declare their own plugin or config dependencies](https://github.com/eslint/eslint/issues/3458), so also follow the relevant setup instructions below…

### Node.js

Support for the Node.js environment is required in every project, so also install [`eslint-plugin-import`](https://npm.im/eslint-plugin-import) and [`eslint-plugin-node`](https://npm.im/eslint-plugin-node):

```sh
npm install eslint-plugin-import eslint-plugin-node --save-dev
```

### Browser

Also install [`eslint-plugin-compat`](https://npm.im/eslint-plugin-compat):

```sh
npm install eslint-plugin-compat --save-dev
```

Supported browsers **_must_** be specified in a [`package.json` `browserslist` field](https://github.com/browserslist/browserslist#packagejson).

### Babel

Also install [`babel-eslint`](https://npm.im/babel-eslint):

```sh
npm install babel-eslint --save-dev
```

### Prettier

Also install [`eslint-plugin-prettier`](https://npm.im/eslint-plugin-prettier) and [`eslint-config-prettier`](https://npm.im/eslint-config-prettier):

```sh
npm install eslint-plugin-prettier eslint-config-prettier --save-dev
```

### React

Also install [`eslint-plugin-react`](https://npm.im/eslint-plugin-react):

```sh
npm install eslint-plugin-react --save-dev
```

### Next.js

A [Next.js](https://nextjs.org) project does not require additional setup.
