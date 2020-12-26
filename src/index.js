const {Transform} = require('stream');
const pump = require('pump');
const emojiIndex = require('gemoji/name-to-emoji.json');
const yargs = require('yargs/yargs');

const EMOJI_REGEX = /(:[^\s:]+:)/g;

const parseArgs = argz =>
  yargs(argz)
    .usage(
      'Replace your emoji codes.\n\nUsage: cat something | $0\n       $0 "text with :slightly_smiling_face:"'
    )
    .alias('h', 'help').argv;

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

const getEmojizerStream = () =>
  new Transform({
    transform(chunk, encoding, cb) {
      splitAndReplaceEmojies(chunk.toString('utf-8'), this);
      cb();
    }
  });

const replaceEmojiCodes = string => splitAndReplaceEmojies(string).join('');

const main = (input = process.stdin, output = process.stdout) => {
  // eslint-disable-next-line no-unused-vars
  const args = parseArgs(process.argv.slice(2));
  input.setEncoding('utf8');
  output.setEncoding('utf8');
  pump(input, getEmojizerStream(), output);
};

module.exports = {replaceEmojiCodes, splitAndReplaceEmojies, getEmojizerStream, main};
