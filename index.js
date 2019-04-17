#!/usr/bin/env node

const fs = require('fs');
const EOL = require('os').EOL;
console.log(EOL);
const execSync = require('child_process').execSync;

const reactDependencies = ['react', 'react-dom'].join(' ');

const devDependencies = [
  '@babel/core',
  '@babel/preset-env',
  '@babel/preset-react',
  'babel-loader',
  'babel-plugin-transform-object-rest-spread',
  'css-loader',
  'style-loader',
  'webpack',
  'webpack-cli',
  'webpack-dev-server'
].join(' ');

console.log(`Installing dependencies ${reactDependencies}...`);
// execSync(`npm install --save ${reactDependencies}`);
console.log();
console.log(`Installing dev dependencies ${devDependencies}...`);
// execSync(`npm install --save-dev ${devDependencies}`);

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
  presets: ['@babel/preset-env', '@babel/preset-react', 'new']
};

if (fs.existsSync('.babelrc')) {
  console.log('File .babelrc already exists. Merging content...');

  const babelrcFile = JSON.parse(fs.readFileSync('.babelrc', { encoding: 'utf8' }));
  
  babelrc.presets = !babelrcFile['presets'] ?
    babelrc.presets :
    babelrc.presets
      .filter(p => !babelrcFile.presets.includes(p))
      .concat(babelrcFile.presets)
      .sort();

  babelrc = Object.assign({}, babelrcFile, babelrc);
} else {
  console.log('Creating file .babelrc...');
}

const fdB = fs.openSync('.babelrc', 'w');
fs.writeSync(fdB, `${JSON.stringify(babelrc, null, 2)}`);

console.log('File .babelrc updated.');
