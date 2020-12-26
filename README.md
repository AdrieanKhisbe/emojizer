# emojilzer


[![Npm version](https://img.shields.io/npm/v/emojizer.svg)](https://www.npmjs.com/package/emojizer)
[![Build Status](https://travis-ci.com/AdrieanKhisbe/emojizer.svg?branch=master)](https://travis-ci.com/AdrieanKhisbe/emojizer)
[![codecov](https://codecov.io/gh/AdrieanKhisbe/emojizer/branch/master/graph/badge.svg)](https://codecov.io/gh/AdrieanKhisbe/emojizer)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

### CLI

Just place it between your program, and your eventual pager.

```bash
echo "Something with emojies :upside_down_face:" | emojizer
# Something with emojies 🙃

echo "Insert before your pager :pager:" | emojizer | less
```

Using zsh, you can for instance define a global alias that combine `emojizer` and `less` or the pager you use.
```bash
alias -g eless="emojizer|less"
```
Note that used with `git log` you might have to force color output, with `--color` flag for instance

### API

Provided API is so far limited, but it expose:
- a function to replace emoji code with corresponding emoji caracter: `replaceEmojiCodes`
- a function to create a `Transform` stream: `getEmojizerStream`

```js
const {replaceEmojiCodes} = require('emojizer');

console.log(replaceEmojiCodes('some text with :symbols:'));

// for getEmojizerStream, see the source or the tests 📃
```

## Abou
original release under name `emojiless`
> Less is more with emojies :wink:
