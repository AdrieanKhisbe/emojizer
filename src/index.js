const {Transform} = require('stream');
const pump = require('pump');
const emojiIndex = require('gemoji/name-to-emoji.json');

const EMOJI_REGEX = /(:[^\s:]+:)/g;

const getEmojilessStream = () =>
  new Transform({
    transform(chunk, encoding, cb) {
      const parts = chunk.toString('utf-8').split(EMOJI_REGEX);

      for (const part of parts) {
        if (part.startsWith(':')) {
          const emojiCode = part.slice(1, -1);
          const emoji = emojiIndex[emojiCode];
          this.push(emoji || part);
        } else this.push(part);
      }
      cb();
    }
  });

const main = (input = process.stdin, output = process.stdout) => {
  input.setEncoding('utf8');
  output.setEncoding('utf8');
  pump(input, getEmojilessStream(), output);
};

module.exports = {getEmojilessStream, main};
