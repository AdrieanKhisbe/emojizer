# emojiless

> Less is more with emojies :wink:

[![Npm version](https://img.shields.io/npm/v/emojiless.svg)](https://www.npmjs.com/package/emojiless)
[![Build Status](https://travis-ci.com/AdrieanKhisbe/emojiless.svg?branch=master)](https://travis-ci.com/AdrieanKhisbe/emojiless)
[![codecov](https://codecov.io/gh/AdrieanKhisbe/emojiless/branch/master/graph/badge.svg)](https://codecov.io/gh/AdrieanKhisbe/emojiless)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

### CLI

Just place it between your program, and your eventual pager.

```bash
echo "Something with emojies :upside_down_face:" | emojiless
# Something with emojies 🙃

echo "Insert before your pager :pager:" | emojiless | less
```

Using zsh, you can for instance define a global alias that combine `emojiless` and `less` or the pager you use.
```bash
alias -g eless="emojiless|less"
```
Note that used with `git log` you might have to force color output, with `--color` flag for instance

### API

Provided API is so far limited, but it expose:
- a function to replace emoji code with corresponding emoji caracter: `replaceEmojiCodes`
- a function to create a `Transform` stream: `getEmojilessStream`

```js
const {replaceEmojiCodes} = require('emojiless');

console.log(replaceEmojiCodes('some text with :symbols:'));

// for getEmojilessStream, see the source or the tests 📃
```
