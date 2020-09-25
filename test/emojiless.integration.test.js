const path = require('path');
const childProcess = require('child_process');
const test = require('ava');

const EMOJILESS = path.join(path.dirname(__dirname), 'bin', 'emojiless');

test.cb('emojiless cli', t => {
  childProcess.exec(
    `echo "shell is here :ocean: :shell:" | ${EMOJILESS}`,
    (code, stdout, stderr) => {
      t.is(stderr.trim(), '');
      t.is(stdout.trim(), 'shell is here 🌊 🐚');
      t.end();
    }
  );
});
