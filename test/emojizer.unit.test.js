const test = require('ava');
const {replaceEmojiCodes} = require('..');

test('parse a string with emoji', t => {
  t.is(replaceEmojiCodes('lol :wink: :x:'), 'lol 😉 ❌');
  t.is(replaceEmojiCodes('Consecutive :white_check_mark::x: emojies'), 'Consecutive ✅❌ emojies');
});
