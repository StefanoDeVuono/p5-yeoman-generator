# p5 Yeoman Generator

[![NPM version](https://img.shields.io/npm/v/generator-p5js.svg)](https://www.npmjs.org/package/generator-p5js)
[![NPM downloads](https://img.shields.io/npm/dm/generator-p5js.svg)](https://npmjs.org/package/generator-p5js "View this project on NPM")
[![Coverage Status](https://coveralls.io/repos/github/StefanoDeVuono/p5-yeoman-generator/badge.svg)](https://coveralls.io/github/StefanoDeVuono/p5-yeoman-generator)

A [yeoman](http://yeoman.io) generator for a p5 project, based off of [pflannery's p5 generator](https://github.com/pflannery/p5-yeoman-generator/blob/master/README.md)

## Getting Started

http://yeoman.io/learning/

## Install Yeoman (and bower and gulp)

- (If you haven't already installed it, install yeoman: `npm install -g yo gulp bower`).
- If you're having trouble with permissions, [npm recommends the following](https://docs.npmjs.com/getting-started/fixing-npm-permissions):
  - `npm config get prefix` (**Important**: It should show `/usr/local` if not, follow option two [here]((https://docs.npmjs.com/getting-started/fixing-npm-permissions)))
  - `sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}`

## Usage

- Assuming you have a directory called $DIRECTORY_NAME:
- `npm install -g generator-p5js`
- `mkdir $DIRECTORY_NAME`
- `cd $DIRECTORY_NAME`
- `yo p5js`
- `gulp serve`
- Open $DIRECTORY_NAME up in your favourite text editor and live your life. Every time you save, your browser window will update the new sketch.

## Notes

- Feel free to run `git init` inside $DIRECTORY_NAME. We've already created a `.gitignore` for you.
- Also, `p5.dom.js` and `p5.sound.js` are included but commented out in `index.html`. You'll need to uncomment those.
- Finally, assets will be stored in and served from the `assets` folder. This is useful for sound files, images, and the like.

### License

Licensed under the MIT License. See LICENSE in the project root for license information.
