# Setup React Project

Install React and it's dependencies and create the needed configuration files for Babel and Webpack.

## Installation
```js
npx setup-react-project
```

## Usage 
In the root directory of the project you want to install React.
```sh
> setup-react
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
If the _package.json_ already contains scripts with the same name, they will be added with the prefix _react-_.

- _start_: opens the webpack-dev-server.
- _prestart_: compiles project using webpack.
- _build_: compiles project for production.
