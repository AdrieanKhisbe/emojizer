const path = require('path');
const childProcess = require('child_process');
const test = require('ava');

const EMOJIIZER_CLI = path.join(path.dirname(__dirname), 'bin', 'emojizer');

test.cb('emojizer cli stdin', t => {
  childProcess.exec(
    `echo "shell is here :ocean: :shell:" | ${EMOJIIZER_CLI}`,
    (err, stdout, stderr) => {
      t.is(err, null);
      t.is(stderr.trim(), '');
      t.is(stdout.trim(), 'shell is here 🌊 🐚');
      t.end();
    }
  );
});

test.cb('emojizer cli provided values', t => {
  childProcess.exec(`${EMOJIIZER_CLI} "lol :+1:" ":-1:"`, (err, stdout, stderr) => {
    t.is(err, null);
    t.is(stderr.trim(), '');
    t.is(stdout.trim(), 'lol 👍\n👎');
    t.end();
  });
});

test.cb('emojizer cli with single file', t => {
  childProcess.exec(
    `${EMOJIIZER_CLI} -f data/test-one.txt`,
    {cwd: __dirname},
    (err, stdout, stderr) => {
      t.is(err, null);
      t.is(stderr.trim(), '');
      t.is(stdout.trim(), 'First 🥇');
      t.end();
    }
  );
});

test.cb('emojizer cli with missing file', t => {
  childProcess.exec(
    `${EMOJIIZER_CLI} -f data/test-AWOL.txt`,
    {cwd: __dirname},
    (err, stdout, stderr) => {
      t.not(err, null);
      t.is(err.killed, false);
      t.is(err.code, 1);
      t.is(stderr.trim(), "Provided file path does not exists: 'data/test-AWOL.txt'");
      t.is(stdout.trim(), '');
      t.end();
    }
  );
});

test.cb('emojizer cli with file list', t => {
  childProcess.exec(
    `${EMOJIIZER_CLI} -f data/test-{one,two,three}.txt`,
    {cwd: __dirname, shell: true},
    (err, stdout, stderr) => {
      t.is(err, null);
      t.is(stderr.trim(), '');
      t.is(stdout.trim(), 'First 🥇\nSecond 🥈\nThird 🥉');
      t.end();
    }
  );
});
