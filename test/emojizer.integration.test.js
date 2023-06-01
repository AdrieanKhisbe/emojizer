import path from 'path';
import {fileURLToPath} from 'url';
import childProcess from 'child_process';
import {promisify} from 'util';
import test from 'ava';

const exec = promisify(childProcess.exec);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EMOJIIZER_CLI = path.join(path.dirname(__dirname), 'bin', 'emojizer.js');

test('emojizer cli stdin', async t => {
  const {stdout, stderr} = await exec(`echo "shell is here :ocean: :shell:" | ${EMOJIIZER_CLI}`);
  t.is(stderr.trim(), '');
  t.is(stdout.trim(), 'shell is here 🌊 🐚');
});

test('emojizer cli provided values', async t => {
  const {stdout, stderr} = await exec(`${EMOJIIZER_CLI} "lol :+1:" ":-1:"`);

  t.is(stderr.trim(), '');
  t.is(stdout.trim(), 'lol 👍\n👎');
});

test('emojizer cli with single file', async t => {
  const {stdout, stderr} = await exec(`${EMOJIIZER_CLI} -f data/test-one.txt`, {cwd: __dirname});
  t.is(stderr.trim(), '');
  t.is(stdout.trim(), 'First 🥇');
});

test('emojizer cli with missing file', async t => {
  try {
    await exec(`${EMOJIIZER_CLI} -f data/test-AWOL.txt`, {cwd: __dirname});
  } catch (err) {
    t.not(err, null);
    t.is(err.killed, false);
    t.is(err.code, 1);
    t.is(err.stderr.trim(), "Provided file path does not exists: 'data/test-AWOL.txt'");
    t.is(err.stdout.trim(), '');
  }
});

test('emojizer cli with file list', async t => {
  const {stdout, stderr} = await exec(
    `${EMOJIIZER_CLI} -f data/test-one.txt data/test-two.txt data/test-three.txt`,
    {cwd: __dirname}
  );

  t.is(stderr.trim(), '');
  t.is(stdout.trim(), 'First 🥇\nSecond 🥈\nThird 🥉');
});
