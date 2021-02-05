# eslint-config-env

[![npm version](https://badgen.net/npm/v/eslint-config-env)](https://npm.im/eslint-config-env) [![CI status](https://github.com/jaydenseric/eslint-config-env/workflows/CI/badge.svg)](https://github.com/jaydenseric/eslint-config-env/actions)

[ESLint](https://eslint.org) config optimized for authoring packages that adapts to the project environment, supporting:

- Node.js
- Browser
- [Babel](https://babeljs.io)
- [Prettier](https://prettier.io)
- [React](https://reactjs.org)
- [Next.js](https://nextjs.org)
- [jsdoc-md](https://npm.im/jsdoc-md)

## Install

To install [`eslint-config-env`](https://npm.im/eslint-config-env) and it’s peer dependencies from [npm](https://npmjs.com) run:

```sh
npm install eslint-config-env eslint-plugin-node eslint-plugin-import eslint-plugin-jsdoc --save-dev
```

Configure ESLint in your project:

```json
{
  "extends": ["env"]
}
```

Also follow the setup instructions that are relevant to your project below…

### Node.js

Every project **_must_** specify supported Node.js versions in the [`package.json` `engines.node` field](https://docs.npmjs.com/files/package.json#engines).

### Browser

Also install [`eslint-plugin-compat`](https://npm.im/eslint-plugin-compat):

```sh
npm install eslint-plugin-compat --save-dev
```

Supported browsers **_must_** be specified in the [`package.json` `browserslist` field](https://github.com/browserslist/browserslist#packagejson).

### Babel

Also install [`@babel/eslint-parser`](https://npm.im/@babel/eslint-parser):

```sh
npm install @babel/eslint-parser --save-dev
```

### Prettier

Also install [`eslint-plugin-prettier`](https://npm.im/eslint-plugin-prettier) and [`eslint-config-prettier`](https://npm.im/eslint-config-prettier):

```sh
npm install eslint-plugin-prettier eslint-config-prettier --save-dev
```

### React

Also install [`eslint-plugin-react`](https://npm.im/eslint-plugin-react) and [`eslint-plugin-react-hooks`](https://npm.im/eslint-plugin-react-hooks):

```sh
npm install eslint-plugin-react eslint-plugin-react-hooks --save-dev
```

### Next.js

Follow the [Babel setup instructions](#babel).

### jsdoc-md

A [`jsdoc-md`](https://npm.im/jsdoc-md) project does not require additional setup.
