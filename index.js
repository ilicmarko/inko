#!/usr/bin/env node
const fs = require('fs-extra');
const sharp = require('sharp');
const sizeOf = require('image-size');
const glob = require('glob');
const chalk = require('chalk');
const ora = require('ora');

const helpers = require('./lib/helper');

const argv = require('yargs').command('convert <path> [borderSize] [borderColor]', 'Convert images')
  .help().argv;

if (!helpers.checkIfPathValid(argv.path)) {
  console.log(chalk.red(`Trying to fool Inko is not a smart move. Inko knows his paths, and '${argv.path}' is not a valid one!`));
  return;
}

if (argv.borderSize === undefined && argv.borderColor !== undefined ) {
  console.log(chalk.yellow(`Do not waste Inko's time. He can not put 0px borders, anyways nice color: ${argv.borderColor}`));
  return;
}

if (argv.borderSize === undefined && argv.borderColor === undefined ) {
  console.log(chalk.yellow(`It's not nice to waste Inko's time. He is a busy man`));
  return;
}

let borderColor = '#222';

if (argv.borderColor !== undefined) {
  try {
    if (helpers.isValidColor(argv.borderColor)) {
      borderColor = argv.borderColor
    } else {
      console.log(chalk.red(`Provided border color '${argv.borderColor}' is not a valid.`));
      return ;
    }
  } catch (e) {
    console.log(chalk.red(e.message));
    return ;
  }
} else {
  console.log(chalk.yellow(`Border color not provided falling back to default '${borderColor}'.`));
}

const loadingFiles = ora('Loading files').start();
let processingFile = ora('Processing file');

glob(argv.path, function(err, files) {
  if (err) {
    loadingFiles.fail();
    console.error(err);
  } else {
    loadingFiles.succeed('Files successfully loaded');
    files.forEach(file => {
      sizeOf(file, (err, dimensions) => {
        processingFile.start(`Processing file '${file}'`);
        if (err) console.error(err);

        if (argv.borderSize !== undefined) {
          const pad = argv.borderSize;

          fs.ensureDir('out').then(() => {
            sharp(file)
              .extend({top: pad, left: pad, bottom: pad, right: pad, background: borderColor })
              .toFile(`out/${file}`)
              .then(() => {
                processingFile.succeed(`File '${file}' successfully converted`);
              })
              .catch(e => {
                processingFile.fail(`File '${file}' FAILED to convert`);
              });
          })
        }
      })
    })
  }
})
