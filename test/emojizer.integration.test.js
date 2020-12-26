const path = require('path');
const childProcess = require('child_process');
const test = require('ava');

const EMOJIIZER_CLI = path.join(path.dirname(__dirname), 'bin', 'emojizer');

test.cb('emojizer cli stdin', t => {
  childProcess.exec(
    `echo "shell is here :ocean: :shell:" | ${EMOJIIZER_CLI}`,
    (code, stdout, stderr) => {
      t.is(stderr.trim(), '');
      t.is(stdout.trim(), 'shell is here 🌊 🐚');
      t.end();
    }
  );
});

test.cb('emojizer cli provided values', t => {
  childProcess.exec(`${EMOJIIZER_CLI} "lol :+1:" ":-1:"`, (code, stdout, stderr) => {
    t.is(stderr.trim(), '');
    t.is(stdout.trim(), 'lol 👍\n👎');
    t.end();
  });
});
