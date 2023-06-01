import {Transform} from 'stream';
import fs from 'fs';
import _ from 'lodash/fp.js';
import pump from 'pump';
import MultiStream from 'multistream';
import {nameToEmoji as emojiIndex} from 'gemoji';
import yargs from 'yargs';

export const EMOJI_REGEX = /(:[^\s:]+:)/g;
export const ENCODING = 'utf-8';

export const parseArgs = argz =>
  yargs(argz)
    .usage(
      `Replace your emoji codes with "real" emojies 😉

Usage:
    cat something | $0
    $0 "text with :slightly_smiling_face:" ":wink:"
    $0 -f README.md
`
    )
    .option('file', {
      alias: 'f',
      description: 'Treat args as files to read from',
      boolean: true,
      default: false
    })
    .alias('h', 'help').argv;

export const splitAndReplaceEmojies = (string, accumulator = null) => {
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

export const createReadStream = filePath => {
  if (!fs.existsSync(filePath))
    throw new Error(`Provided file path does not exists: '${filePath}'`);
  return fs.createReadStream(filePath, {encoding: ENCODING});
};

export const getEmojizerStream = () =>
  new Transform({
    transform(chunk, encoding, cb) {
      splitAndReplaceEmojies(chunk.toString(ENCODING), this);
      cb();
    }
  });

export const replaceEmojiCodes = string => splitAndReplaceEmojies(string).join('');

export const main = (stdin = process.stdin, stdout = process.stdout) => {
  const args = parseArgs(process.argv.slice(2));

  if (_.isEmpty(args._)) {
    return pump(stdin, getEmojizerStream(), stdout);
  }
  if (args.file) {
    const inputStream =
      _.size(args._) === 1
        ? createReadStream(args._[0])
        : new MultiStream(args._.map(createReadStream));
    return pump(inputStream, getEmojizerStream(), stdout);
  }

  for (const item of args._) {
    for (const transformedPart of splitAndReplaceEmojies(item)) {
      stdout.write(transformedPart);
    }
    stdout.write('\n');
  }
};
