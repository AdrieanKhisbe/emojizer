#!/bin/zsh
set -e

test_content=$(mktemp)
cat > $test_content <<EOF
Hello there :wink:
EOF

echo "Invocation safety net 🛡️"
echo "- direct input"
diff <(npm --silent start "$(cat $test_content)") <(echo "Hello there 😉")
echo "- piping"
diff <(cat $test_content | npm --silent start) <(echo "Hello there 😉")
echo "- by file"
diff <(npm --silent -- start -f $test_content) <(echo "Hello there 😉")
