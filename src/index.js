const {Transform} = require('stream');
const pump = require('pump');
const emojiIndex = require('gemoji/name-to-emoji.json');

const EMOJI_REGEX = /(:[^\s:]+:)/g;

const splitAndReplaceEmojies = (string, accumulator = null) => {
  const parts = string.split(EMOJI_REGEX);

  const acc = accumulator || [];

  for (const part of parts) {
    if (part.startsWith(':')) {
      const emojiCode = part.slice(1, -1);
      const emoji = emojiIndex[emojiCode];
      acc.push(emoji || part);
    } else if (part) {
      acc.push(part);
    }
  }
  if (!accumulator) return acc;
};

const getEmojilessStream = () =>
  new Transform({
    transform(chunk, encoding, cb) {
      splitAndReplaceEmojies(chunk.toString('utf-8'), this);
      cb();
    }
  });

const replaceEmojiCodes = string => splitAndReplaceEmojies(string).join('');

const main = (input = process.stdin, output = process.stdout) => {
  input.setEncoding('utf8');
  output.setEncoding('utf8');
  pump(input, getEmojilessStream(), output);
};

module.exports = {replaceEmojiCodes, splitAndReplaceEmojies, getEmojilessStream, main};
