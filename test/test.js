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
})
