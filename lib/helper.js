const isGlob = require('is-glob');
const fs = require('fs');

/**
 * Check if given path is valid. Path can either be a glob or a file.
 * @param {string} path
 * @returns {boolean}
 */
exports.checkIfPathValid = function(path) {
  if (isGlob(path)) {
    return true
  }

  return fs.existsSync(path)
};

/**
 * Check if provided file is and image. This function relays on magic numbers.
 * Because checking mime type is not safe.
 * https://en.wikipedia.org/wiki/List_of_file_signatures
 * https://gist.github.com/leommoore/f9e57ba2aa4bf197ebc5
 * https://www.garykessler.net/library/file_sigs.html
 * @param {Buffer | Uint8Array} buffer
 */
exports.isImage = function(buffer) {
  const magicNumbers = {
    jpg: {header: [0xFF, 0xD8, 0xFF]},
    png: {header: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]},
    webp: {header: [0x57, 0x45, 0x42, 0x50], offset: 8 } // 52 49 46 46 xx xx xx xx 57 45 42 50
  };

  if (!(Buffer.isBuffer(buffer) || buffer instanceof Uint8Array)) {
    throw new TypeError(`Expected 'argument' to be type 'Buffer' or 'Uint8Array' got '${typeof buffer}'`)
  }
  const input = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);

  if (!(input && input.length > 1)) {
    return false
  }
  let res;
  let final = false;

  for (let key in magicNumbers) {
    let header = magicNumbers[key].header;
    let options = Object.assign({ offset: 0 }, magicNumbers[key])
    res = true;

    for (let i = 0; i < header.length; i++) {
      if (header[i] !== input[i + options.offset]) {
        res = false
      }
    }
    final = final || res
  }
  return final
};
