export default {
  topics: [
    {
      id: "scalars",
      title: "Scalars & Strings",
      sections: [
        {
          heading: "Basic scalars",
          description: "YAML infers types automatically. Strings, numbers, booleans, and null all have unquoted forms.",
          language: "yaml",
          code: `# Strings — quotes optional unless value is ambiguous
name: Vineet Chandel
city: "Mumbai"          # forced string
phone: "9876543210"     # forced string (would be a number otherwise)

# Numbers
port: 3000
version: 1.2.3          # treated as string (has >1 dot)
pi: 3.14159

# Booleans — true/false (YAML 1.2)
debug: false
enabled: true

# Null
db_password: null
timeout: ~              # also null`,
        },
        {
          heading: "Multi-line strings",
          description: "| preserves literal newlines; > folds newlines into spaces (good for long descriptions).",
          language: "yaml",
          code: `# Literal block — newlines preserved
script: |
  echo "Building..."
  npm install
  npm run build
  echo "Done!"

# Folded block — newlines become spaces
description: >
  This is a long description that wraps
  across multiple lines in the YAML file
  but will be a single paragraph of text.

# Trailing newline control
no_newline: |−
  No trailing newline here`,
        },
      ],
    },
    {
      id: "collections",
      title: "Collections",
      sections: [
        {
          heading: "Mappings (objects)",
          description: "Mappings are key: value pairs, equivalent to JSON objects. Indent 2 spaces for nesting.",
          language: "yaml",
          code: `server:
  host: localhost
  port: 8080
  tls:
    enabled: true
    cert: /etc/ssl/cert.pem
    key:  /etc/ssl/key.pem

# Inline (flow) style — for compact nested values
point: { x: 10, y: 20 }
color: { r: 59, g: 130, b: 246 }`,
        },
        {
          heading: "Sequences (arrays)",
          description: "Sequences use - as list items. Flow style uses square brackets.",
          language: "yaml",
          code: `# Block sequence
technologies:
  - HTML
  - CSS
  - JavaScript
  - TypeScript

# Sequence of mappings
team:
  - name: Vineet
    role: founder
    skills: [react, typescript, node]
  - name: Priya
    role: designer
    skills: [figma, css]

# Inline (flow) sequence
ports: [3000, 5173, 8080]`,
        },
        {
          heading: "Nested structures",
          description: "Combine mappings and sequences freely to represent complex config schemas.",
          language: "yaml",
          code: `# docker-compose.yml style
version: "3.9"
services:
  web:
    image: node:20-alpine
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      PORT: 3000
    volumes:
      - ./src:/app/src
    depends_on:
      - db
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret`,
        },
      ],
    },
    {
      id: "anchors",
      title: "Anchors & Aliases",
      sections: [
        {
          heading: "Anchors & aliases",
          description: "& defines an anchor; * references it — avoids repeating the same block.",
          language: "yaml",
          code: `# Define an anchor with &
defaults: &defaults
  image: node:20-alpine
  restart: unless-stopped
  environment:
    NODE_ENV: production

# Re-use with * alias
services:
  web:
    <<: *defaults        # merge anchor contents
    ports: ["3000:3000"]

  worker:
    <<: *defaults
    command: node worker.js`,
        },
        {
          heading: "Multiple documents",
          description: "--- separates documents in a single YAML stream; ... marks the end of a document.",
          language: "yaml",
          code: `---
# Document 1
name: development
database:
  url: postgres://localhost/dev_db

---
# Document 2
name: production
database:
  url: postgres://prod-host/prod_db
  pool_size: 20
...`,
        },
      ],
    },
    {
      id: "github-actions",
      title: "YAML in CI/CD",
      sections: [
        {
          heading: "GitHub Actions workflow",
          description: "A complete, real-world YAML structure for a Node.js CI workflow.",
          language: "yaml",
          code: `name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build`,
        },
      ],
    },
  ],
};
