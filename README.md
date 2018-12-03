<p align="center"><img width="100" src="https://imgur.com/zlA1iC7.jpg" alt="Inko logo"></p>

<p align="center">
  <a href="https://travis-ci.org/ilicmarko/inko"><img src="https://img.shields.io/travis/ilicmarko/inko/master.svg?style=flat-square" alt="Build Status" /></a>
  <a href="https://codecov.io/gh/ilicmarko/inko"><img src="https://img.shields.io/codecov/c/github/ilicmarko/inko.svg?style=flat-square" alt="Codecov" /></a>
  <a href="https://www.npmjs.com/package/@weareneopix/inko"><img src="https://img.shields.io/npm/v/@weareneopix/inko.svg?style=flat-square" alt="npm (scoped)" /></a>
  <a href="https://github.com/ilicmarko/inko"><img src="https://img.shields.io/github/license/ilicmarko/inko.svg?style=flat-square" alt="GitHub" /></a>
</p>

## Introducing

**Inko is like** a CLI made to help you with simple image manipulation. Inko hates when there is a white image on a
white background, he will pass the provided images through his strong hands and stylize them.

## Why?

Sometimes you have an image with a same background as the site you are posting it to. For that reason you want to add a
border around your image, for it to pop.

## Installation

When you have `node` and `npm` installed, install the module globally.

```bash
npm i  -g @weareneopix/inko
# OR
yarn global add @weareneopix/inko
```

## Usage

Inko has one simple command called `convert`.

```bash
inko convert <path> [borderSize] [borderColor]
```

- `<path>` - is required and can be either an image file ([check supported formats](#supported-formats)) or glob.
- `[borderSize]` - is optional its value must be a number. It is the width of the
border in **pixels**.
- `[borderColor]` - is optional its value must be valid HEX color. If not provided it will
default to `#222222`. 

Inko will output the image/s in the `./out/` folder

## Supported formats

Inko knows most common image formats like:
- JPG/JPEG
- PNG
- WEBP

## TODO

- [ ] Option to set output folder
- [ ] Add border radius
- [ ] Add shadow
- [ ] Smart convert option (convert to JPG or PNG)
