# emojizer

[![Npm version](https://img.shields.io/npm/v/emojizer.svg)](https://www.npmjs.com/package/emojizer)
[![Build Status](https://travis-ci.com/AdrieanKhisbe/emojizer.svg?branch=master)](https://travis-ci.com/AdrieanKhisbe/emojizer)
[![codecov](https://codecov.io/gh/AdrieanKhisbe/emojizer/branch/master/graph/badge.svg)](https://codecov.io/gh/AdrieanKhisbe/emojizer)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> Turn your :emoji_codes: into thier emoji character :wink:

## About
**`emojizer`** is a program filter that turn github emoji codes into associated character.

Wanna try before install? just `npx emojizer "Try me :wave:"`,
and if you want to install an standard global install will do it: `npm install -g emojizer`

### CLI

As a pipe, just place it between your program, and your eventual pager.
You can use either `emojizer` or its alias `emojize`.

```bash
echo "Something with emojies :upside_down_face:" | emojizer
# 📺 Something with emojies 🙃

echo "Insert before your pager :pager:" | emojizer | less
```

You can also provide input as argument, either as text, either as file using the `-f`/`--file` flag

```bash
emojizer "Some string" "with or without" "emojies :slightly_smiling_face:"
# 📺 Some string
#    with or without
#    emojies 🙂
emojizer -f README.md CHANGELOG.md
# 📺 ...README then CHANGELOG with emoji code replaces
```

Using zsh, you can for instance define a global alias that combine `emojizer` and `less` or any other pager you use.
```bash
alias -g eless="emojizer|less"
# then just
git log --oneline --color | eless
```

Note that used with `git log` you might have to force color output, with `--color` flag for instance.

#### Detailed help
Just provide the `-h` or `--help` flag and you'll have the help displayed:

```
Replace your emoji codes with "real" emojies 😉

Usage:
    cat something | emojizer
    emojizer "text with :slightly_smiling_face:" ":wink:"
    emojizer -f README.md


Options:
      --version  Show version number                                   [boolean]
  -f, --file     Treat args as file to read from      [boolean] [default: false]
  -h, --help     Show help                                             [boolean]
```

### API
Internal replacing logic is exposed and so functionality can be reuse.

Provided API is so far limited, but it expose:
- a function to replace emoji code with corresponding emoji caracter: `replaceEmojiCodes`
- a function to create a `Transform` stream: `getEmojizerStream`
- the `emojiIndex` used internaly and provided by the **[`gemoji`](https://github.com/wooorm/gemoji)** library (`emoji/name-to-emoji.json`)

```js
const {replaceEmojiCodes} = require('emojizer');

console.log(replaceEmojiCodes('some text with :symbols:'));

// for getEmojizerStream, see the source or the tests 📃
```

## Miscaleanous

Original release was made under the name `emojiless` with catchphrase
> Less is more with emojies :wink:

Named was changed as `less` was misleading, program not being a pager.
