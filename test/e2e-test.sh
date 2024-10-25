#!/bin/zsh
set -e

echo "Invocation safety net :shield:"
diff <(echo "Hello there :wink:" | npm --silent start) <(echo "Hello there 😉")
