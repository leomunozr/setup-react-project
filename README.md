# Setup React Project

This script is useful to help install React and it's dependencies into an existing project. It also creates the needed config files for Babel and Webpack.

## Use 
```js
npx setup-react-project
```

## What's included? 

Script will automatically install the dependencies for React:
- react
- react-dom

and the develpment dependencies for building the project:
- @babel/core
- @babel/preset-env
- @babel/preset-react
- babel-loader
- babel-plugin-transform-object-rest-spread
- css-loader
- style-loader
- webpack
- webpack-cli
- webpack-dev-server

You can use all ES6 features, including the spread operator `...`.

## Scripts

_npm_ scripts are added to _package.json_.
If the _package.json_ already contains scripts with the same name, the will be added with the prefix _react-_.

- _start_: opens the webpack-dev-server.
- _prestart_: compiles project using webpack.
- _build: compiles project for production.
