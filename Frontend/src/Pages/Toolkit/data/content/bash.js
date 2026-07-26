export default {
  topics: [
    {
      id: "variables-control",
      title: "Variables & Control Flow",
      sections: [
        {
          heading: "Variables & types",
          description: "Bash variables are untyped strings. Quote variables to prevent word splitting.",
          language: "bash",
          code: `# Assignment — no spaces around =
NAME="Vineet"
PORT=3000
GREETING="Hello, $NAME"

# Read-only
readonly API_KEY="abc123"

# Arithmetic
count=5
((count++))
result=$((10 * 3 + 2))
echo $result   # 32

# Command substitution
DATE=$(date +%Y-%m-%d)
FILES=$(ls | wc -l)`,
        },
        {
          heading: "Conditionals",
          description: "Use [[ ]] (double brackets) — it's safer and supports regex and globbing.",
          language: "bash",
          code: `# if / elif / else
if [[ $PORT -gt 1024 ]]; then
  echo "User port"
elif [[ $PORT -eq 80 ]]; then
  echo "HTTP"
else
  echo "System port"
fi

# String comparisons
if [[ "$NAME" == "Vineet" ]]; then echo "Match"; fi
if [[ -z "$VAR" ]]; then echo "Empty"; fi    # -z = empty
if [[ -n "$VAR" ]]; then echo "Not empty"; fi # -n = non-empty

# File tests
if [[ -f "config.json" ]]; then echo "File exists"; fi
if [[ -d "src" ]];         then echo "Dir exists"; fi`,
        },
        {
          heading: "Loops",
          description: "for, while, and until — always quote loop variables to handle spaces in values.",
          language: "bash",
          code: `# For loop over list
for lang in html css javascript typescript; do
  echo "Language: $lang"
done

# For loop over files
for file in src/**/*.js; do
  echo "Processing: $file"
done

# C-style for
for ((i=0; i<5; i++)); do
  echo "i=$i"
done

# While loop
count=0
while [[ $count -lt 5 ]]; do
  echo "$count"
  ((count++))
done`,
        },
      ],
    },
    {
      id: "functions",
      title: "Functions",
      sections: [
        {
          heading: "Defining functions",
          description: "Functions capture $1..$N positional args. Return values via echo + command substitution.",
          language: "bash",
          code: `# Define
greet() {
  local name="\${1:-World}"   # local scope; default value
  echo "Hello, $name!"
}

# Call
greet "Vineet"    # Hello, Vineet!
greet             # Hello, World!

# Return value via stdout + command substitution
get_timestamp() {
  date +"%Y-%m-%dT%H:%M:%S"
}
TS=$(get_timestamp)

# Exit status — 0 = success, non-zero = failure
is_even() {
  [[ $(( $1 % 2 )) -eq 0 ]]
}
is_even 4 && echo "even"`,
        },
        {
          heading: "Error handling",
          description: "set -euo pipefail is the safety net for production scripts.",
          language: "bash",
          code: `#!/usr/bin/env bash
set -euo pipefail        # exit on error, unset var, pipe failure
IFS=$'\\n\\t'

# Trap for cleanup
cleanup() {
  echo "Cleaning up..."
  rm -f /tmp/work.$$
}
trap cleanup EXIT

# Custom error message
die() {
  echo "❌ Error: $1" >&2
  exit "\${2:-1}"
}

[[ -f "package.json" ]] || die "Not a Node project"`,
        },
      ],
    },
    {
      id: "strings-arrays",
      title: "Strings & Arrays",
      sections: [
        {
          heading: "String manipulation",
          description: "Parameter expansion handles substitution, slicing, and default values without external tools.",
          language: "bash",
          code: `filename="hello-world.js"

# Length
echo \${#filename}              # 14

# Substring — \${var:start:length}
echo \${filename:6:5}           # world

# Replace
echo \${filename/js/ts}         # hello-world.ts

# Remove prefix / suffix
echo \${filename#hello-}        # world.js
echo \${filename%.js}           # hello-world

# Default value
echo \${NAME:-"Anonymous"}      # use default if unset
NAME="\${NAME:=Anonymous}"      # assign default if unset`,
        },
        {
          heading: "Arrays",
          description: "Bash arrays are 0-indexed. Always quote \"${arr[@]}\" to preserve spacing.",
          language: "bash",
          code: `# Declare and populate
techs=("html" "css" "javascript")
techs+=("typescript")   # append

# Access
echo \${techs[0]}         # html
echo \${techs[@]}         # all elements
echo \${#techs[@]}        # length: 4

# Iterate
for tech in "\${techs[@]}"; do
  echo "Tech: $tech"
done

# Slice
echo "\${techs[@]:1:2}"  # css javascript

# Associative array (dict)
declare -A colors
colors[html]="#E34F26"
colors[css]="#2965F1"
echo \${colors[html]}`,
        },
      ],
    },
    {
      id: "io-pipes",
      title: "I/O & Pipes",
      sections: [
        {
          heading: "Redirection",
          description: "Redirect stdout (>), stderr (2>), or both (>&2 / &>) to files or /dev/null.",
          language: "bash",
          code: `# Redirect stdout to file (overwrite)
echo "log entry" > app.log

# Append
echo "another entry" >> app.log

# Redirect stderr
npm run build 2> errors.log

# Redirect both stdout + stderr
./script.sh > output.log 2>&1
./script.sh &> output.log      # shorthand

# Suppress output
npm install -q 2>/dev/null`,
        },
        {
          heading: "Pipes & text tools",
          description: "Chain commands with | to transform data streams without temp files.",
          language: "bash",
          code: `# Count JS files
find src -name "*.js" | wc -l

# Most-used git authors
git log --format="%an" | sort | uniq -c | sort -rn | head -10

# Find and replace in files
grep -rl "oldFunction" src | xargs sed -i 's/oldFunction/newFunction/g'

# Process JSON with jq
curl -s api.example.com/users | jq '.[] | {name: .name, email: .email}'

# Watch a log file
tail -f app.log | grep --line-buffered "ERROR"`,
        },
      ],
    },
  ],
};
