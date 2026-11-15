#!/bin/sh
set -eu

repo_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
temp_dir=$(mktemp -d)
trap 'rm -rf "$temp_dir"' EXIT HUP INT TERM

cd "$repo_dir"
npm pack . --pack-destination "$temp_dir" >/dev/null
cd "$temp_dir"
npm install --ignore-scripts --no-audit --no-fund ./emojizer-*.tgz
node --input-type=module -e "import {replaceEmojiCodes} from 'emojizer'; if (replaceEmojiCodes(':wink:') !== '😉') process.exit(1)"
test "$(./node_modules/.bin/emojizer ':wink:')" = '😉'
test "$(./node_modules/.bin/emojize ':wink:')" = '😉'
