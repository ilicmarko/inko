const expect = require('chai').expect;
const fs = require('fs');

const helpers = require('../lib/helper');

describe('Path utils', () => {
  describe('Path validation', () => {
    it('should return `false` if `undefined` is sent', () => {
      const res = helpers.checkIfPathValid(undefined);
      expect(res).to.be.false;
    });
    it('should return `false` if `null` is sent', () => {
      const res = helpers.checkIfPathValid(null);
      expect(res).to.be.false;
    });
    it('should return `true` if the path is valid', () => {
      const res = helpers.checkIfPathValid('fixture/valid.png');
      expect(res).to.be.true;
    });
    it('should return `true` if glob is valid', () => {
      const res = helpers.checkIfPathValid('**/.jpg')
      expect(res).to.be.true;
    });
    it('should return `false` if path is invalid', () => {
      const res = helpers.checkIfPathValid('marko')
      expect(res).to.be.false;
    })
  });

  describe('Image validation', () => {
    it('should throw and an error if `Buffer` or `Uint8Array` not provided', () => {
      expect(() => helpers.isImage('fixture/valid.png')).to.throw(TypeError)
    });
    it('should return `false` if `Buffer` is empty', () => {
      const emptyBuff = new Buffer('');
      expect(helpers.isImage(emptyBuff)).to.be.false;
    });
    it('should return `true` if `jpg` is valid', () => {
      const buffer = fs.readFileSync('fixture/valid.jpg');
      expect(helpers.isImage(buffer)).to.be.true;
    });
    it('should return `true` if `JPEG` is valid', () => {
      const buffer = fs.readFileSync('fixture/valid.JPEG');
      expect(helpers.isImage(buffer)).to.be.true;
    });
    it('should return `true` if `png` is valid', () => {
      const buffer = fs.readFileSync('fixture/valid.png');
      expect(helpers.isImage(buffer)).to.be.true;
    });
    it('should return `true` if `webp` is valid', () => {
      const buffer = fs.readFileSync('fixture/valid.webp');
      expect(helpers.isImage(buffer)).to.be.true;
    });
    it('should return `false` if `jpg` is invalid', () => {
      const buffer = fs.readFileSync('fixture/invalid.jpg');
      expect(helpers.isImage(buffer)).to.be.false;
    });
    it('should return `false` if `JPEG` is invalid', () => {
      const buffer = fs.readFileSync('fixture/invalid.JPEG');
      expect(helpers.isImage(buffer)).to.be.false;
    });
    it('should return `false` if `png` is invalid', () => {
      const buffer = fs.readFileSync('fixture/invalid.png');
      expect(helpers.isImage(buffer)).to.be.false;
    });
    it('should return `false` if `webp` is invalid', () => {
      const buffer = fs.readFileSync('fixture/invalid.webp');
      expect(helpers.isImage(buffer)).to.be.false;
    });
  })

  describe('Color validation', () => {
    it('should throw `TypeError` if parameter is not a string', () => {
      expect(() => helpers.isValidColor(null)).to.throw(TypeError);

      expect(() => helpers.isValidColor(undefined)).to.throw(TypeError);

      expect(() => helpers.isValidColor(Object())).to.throw(TypeError);

      expect(() => helpers.isValidColor(Number())).to.throw(TypeError);

      expect(() => helpers.isValidColor(Boolean())).to.throw(TypeError);
    });
    it('should return `true` if color is valid and String object (#RGB)', () => {
      const hexObject = String('#fff');
      expect(helpers.isValidColor(hexObject)).to.be.true;
    });
    describe('HEX colors', () => {
      it('should return `true` if color is valid hex (#RGB)', () => {
        const hex = '#222';
        expect(helpers.isValidColor(hex)).to.be.true;
      });
      it('should return `false` if color is not valid hex (#RGB)', () => {
        const hex = '#we1';
        expect(helpers.isValidColor(hex)).to.be.false;
      });
      it('should return `true` if color is valid hex (#RRGGBB)', () => {
        const hex = '#222222';
        expect(helpers.isValidColor(hex)).to.be.true;
      });
      it('should return `false` if color is not valid hex (#RRGGBB)', () => {
        const hex = '#w31eFp';
        expect(helpers.isValidColor(hex)).to.be.false;
      });
      it('should return `false` if color is not valid hex length', () => {
        expect(helpers.isValidColor('#22')).to.be.false;
        expect(helpers.isValidColor('#2222')).to.be.false;
        expect(helpers.isValidColor('#22222')).to.be.false;
      });
      it('should return `true` if color is valid hex case insensitive (#RgB)', () => {
        const hex = '#FfF';
        expect(helpers.isValidColor(hex)).to.be.true;
      });
    });

    describe('HTML named colors', () => {
      it('should return `true` if color is valid HTML name', () => {
        const color = 'rebeccapurple';
        expect(helpers.isValidColor(color)).to.be.true;
      });
      it('should return `true` if color is valid HTML name with case', () => {
        const color = 'RebeccaPurple';
        expect(helpers.isValidColor(color)).to.be.true;
      });
    })
  })
})
