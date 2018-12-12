#!/usr/bin/env node
const fs = require('fs-extra');
const sharp = require('sharp');
const sizeOf = require('image-size');
const glob = require('glob');
const chalk = require('chalk');
const ora = require('ora');

const helpers = require('./lib/helper');

const argv = require('yargs').command('convert <path> [borderSize] [borderColor] [borderRadius]', 'Convert images')
  .help().argv;

if (!helpers.checkIfPathValid(argv.path)) {
  console.log(chalk.red(`Trying to fool Inko is not a smart move. Inko knows his paths, and '${argv.path}' is not a valid one!`));
  return;
}

if (argv.borderSize === undefined && argv.borderColor !== undefined  && argv.borderRadius === undefined) {
  console.log(chalk.yellow(`Do not waste Inko's time. He can not put 0px borders, anyways nice color: ${argv.borderColor}`));
  return;
}

if (argv.borderSize === undefined && argv.borderColor === undefined && argv.borderRadius === undefined) {
  console.log(chalk.yellow(`It's not nice to waste Inko's time. He is a busy man`));
  return;
}

if (!Number.isInteger(argv.borderSize) && argv.borderRadius === undefined) {
  console.log(chalk.red(`Provided border size '${typeof argv.borderSize}' is not a type integer.`));
  return;
}

if (!Number.isInteger(argv.borderRadius)) {
  console.log(chalk.red(`Provided border radius '${typeof argv.borderRadius}' is not a type integer.`));
  return;
}

let borderColor = '#222';

if (argv.borderColor !== undefined) {
  try {
    if (helpers.isValidColor(argv.borderColor)) {
      borderColor = argv.borderColor
    } else {
      console.log(chalk.red(`Provided border color '${argv.borderColor}' is not a valid.`));
      return;
    }
  } catch (e) {
    console.log(chalk.red(e.message));
    return;
  }
} else if (argv.borderRadius === undefined) {
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

        let pad;
        if (argv.borderSize !== undefined) {
           pad = argv.borderSize;
        } else {
          pad = 0;
        }

        let shadow;
        let roundedCorners;
        let fileName = file;

        if (argv.borderRadius !== undefined) {
          const name = helpers.stripExtension(file);
          borderColor = {r: 0, g: 0, b: 0, alpha: 0};
          fileName = `${name}.png`;

          if (argv.borderSize !== undefined) {
            console.log(chalk.yellow('Currently adding a border to an image that has border-radius is not supported.'))
          }

          roundedCorners = Buffer.from(
            `<svg><rect x="0" y="0" width="${dimensions.width}" height="${dimensions.height}" rx="${argv.borderRadius}" ry="${argv.borderRadius}"/></svg>`
          );
        } else {
          roundedCorners = Buffer.from(
            `<svg><rect x="0" y="0" width="${dimensions.width}" height="${dimensions.height}"/></svg>`
          );
        }

        fs.ensureDir('out').then(() => {
          sharp(file)
            .extend({top: pad, left: pad, bottom: pad, right: pad, background: borderColor })
            .overlayWith(shadow)
            .overlayWith(roundedCorners, { cutout: true })
            .toFile(`out/${fileName}`)
            .then(() => {
              processingFile.succeed(`File '${file}' successfully converted`);
            })
            .catch(e => {
              processingFile.fail(`File '${file}' FAILED to convert`);
            });
        })

      })
    })
  }
})
