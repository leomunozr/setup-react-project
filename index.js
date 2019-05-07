#!/usr/bin/env node

'use strict';
const fs = require('fs');
const EOL = require('os').EOL;
const execSync = require('child_process').execSync;

const reactDependencies = [
  'react',
  'react-dom'
].join(' ');
const devDependencies = [
  '@babel/core',
  '@babel/preset-env',
  '@babel/preset-react',
  'babel-loader',
  'babel-plugin-transform-object-rest-spread',
  'css-loader',
  'html-loader',
  'html-webpack-plugin',
  'style-loader',
  'webpack',
  'webpack-cli',
  'webpack-dev-server'
].join(' ');
console.log(`Installing dependencies ${reactDependencies}...`);
execSync(`npm install --save ${reactDependencies}`);
console.log();
console.log(`Installing dev dependencies ${devDependencies}...`);
execSync(`npm install --save-dev ${devDependencies}`);
console.log();


console.log('.gitignore');
let ignoreFiles = ['node_modules', 'dist/'];
if (fs.existsSync('.gitignore')) {
  console.log('File .gitignore already exists. Merging content...');
  const gitIgnore = fs
    .readFileSync('.gitignore', { encoding: 'utf8' })
    .split(/\r?\n/g);
  ignoreFiles = ignoreFiles.filter(f => !gitIgnore.includes(f));
} else {
  console.log('Creating file .gitignore...');
}
const fdG = fs.openSync('.gitignore', 'a');
ignoreFiles.forEach(f => fs.writeSync(fdG, `${f}${EOL}`));
console.log('File .gitignore updated.');
console.log();


console.log('.babelrc');
let babelrc = {
  presets: ['@babel/preset-env', '@babel/preset-react']
};
if (fs.existsSync('.babelrc')) {
  console.log('File .babelrc already exists. Merging content...');
  const preexistingBabelrcFile = JSON.parse(
    fs.readFileSync('.babelrc', { encoding: 'utf8' })
  );
  babelrc.presets = !preexistingBabelrcFile['presets'] ?
    babelrc.presets :
    babelrc.presets
      .filter(p => !preexistingBabelrcFile.presets.includes(p))
      .concat(preexistingBabelrcFile.presets)
      .sort();
  babelrc = Object.assign({}, preexistingBabelrcFile, babelrc);
} else {
  console.log('Creating file .babelrc...');
}
const fdB = fs.openSync('.babelrc', 'w');
fs.writeSync(fdB, `${JSON.stringify(babelrc, null, 2)}`);
console.log('File .babelrc updated.');
console.log();


console.log('webpack');
const webpack =
`const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: 'public',
    sourceMapFilename: "bundle.map"
  },
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};`;
console.log('Writing file webpack.config.js...');
const fdW = fs.openSync('webpack.config.js', 'w');
fs.writeSync(fdW, `${webpack}`);
console.log('File webpack.config.js updated');
console.log();


console.log('package.json');
const scripts = {
  "start": "npx webpack-dev-server --open --mode development",
  "prestart": "npx webpack --mode development",
  "build": "npx webpack --mode production"
};
const packageJson = JSON.parse(
  fs.readFileSync('package.json', { encoding: 'utf8' })
);
if (packageJson.hasOwnProperty('scripts')) {
  const existingScripts = Object.keys(packageJson.scripts);
  Object.keys(scripts).forEach(s =>
    existingScripts.includes(s) ?
      packageJson.scripts[`react-${s}`] = scripts[s] :
      packageJson.scripts[s] = scripts[s]
  );
}
else {
  packageJson['scripts'] = scripts;
}
const fdP = fs.openSync('package.json', 'w');
fs.writeSync(fdP, `${JSON.stringify(packageJson, null, 2)}`);
console.log('File package.json updated.');
