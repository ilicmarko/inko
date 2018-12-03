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




/**
 * Check if a color is valid HEX color.
 * @param {string | String} color
 * @returns {boolean}
 */
function isValidHex(color) {
  const hexRe = /^#[0-9A-F]{3}$|^#[0-9A-F]{6}$/i;

  return !!color.match(hexRe);
}

/**
 * List of all valid HTML color names.
 * @type {string[]}
 */
const htmlColors = ['aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgrey', 'darkgreen', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'grey', 'green', 'greenyellow', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgrey', 'lightgreen', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen'];


/**
 * Checks if a color is a valid HEX or HTML color.
 * @param {string | String} color
 * @returns {boolean}
 */
exports.isValidColor = function (color) {
  if (!(typeof  color === 'string' || color instanceof String)) {
    throw new TypeError(`Expected 'color' to be type of 'string' got '${typeof color}'`);
  }

  if (isValidHex(color)) {
    return true;
  } else if (htmlColors.indexOf(color.toLowerCase()) !== -1) {
    return true
  }

  return false;
};
