#!/usr/bin/env node

import {main} from '../src/emojilib.js';

try {
  main();
} catch (err) {
  // note: this only cover initialisation errors
  console.error(err.message);
  process.exit(1);
}
