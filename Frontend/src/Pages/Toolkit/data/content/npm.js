export default {
  topics: [
    {
      id: "commands",
      title: "Core Commands",
      sections: [
        {
          heading: "Installing packages",
          description: "npm install fetches packages from the registry and writes them to node_modules + package-lock.json.",
          language: "bash",
          code: `# Install all dependencies (from package.json)
npm install
npm ci           # clean install — faster, for CI; never updates lock file

# Install and add to dependencies
npm install express
npm install react react-dom

# Install and add to devDependencies
npm install -D typescript vite @types/node
npm install --save-dev eslint prettier

# Install globally
npm install -g create-react-app
npm install -g npm@latest     # update npm itself

# Install exact version
npm install react@18.2.0
npm install "react@^18"       # semver range`,
        },
        {
          heading: "Managing packages",
          description: "Update, remove, and audit packages to keep dependencies clean and secure.",
          language: "bash",
          code: `# Remove a package
npm uninstall lodash
npm uninstall -D eslint

# Update packages
npm update             # update all within semver ranges
npm update react       # update one package
npm install react@latest  # upgrade beyond semver

# Audit for vulnerabilities
npm audit
npm audit fix          # auto-fix where possible
npm audit fix --force  # force-fix (may break things)

# List installed packages
npm list               # full tree
npm list --depth=0     # direct dependencies only

# Show outdated packages
npm outdated`,
        },
        {
          heading: "Useful flags",
          description: "Flags that change npm's default behaviour.",
          language: "bash",
          code: `# Suppress extra output (CI-friendly)
npm install --silent
npm install -q

# Don't save to package.json
npm install --no-save some-tool

# Use a specific registry
npm install --registry https://registry.npmjs.org

# Dry run — see what would happen
npm publish --dry-run
npm install --dry-run

# Show npm config
npm config list
npm config get registry`,
        },
      ],
    },
    {
      id: "package-json",
      title: "package.json",
      sections: [
        {
          heading: "Key fields",
          description: "A well-configured package.json is essential for a robust Node project.",
          language: "json",
          code: `{
  "name":        "my-app",
  "version":     "1.0.0",
  "description": "A great app",
  "author":      "Vineet Chandel <v@devcheats.in>",
  "license":     "MIT",
  "type":        "module",
  "main":        "./dist/index.js",
  "exports": {
    ".":       "./dist/index.js",
    "./utils": "./dist/utils.js"
  },
  "engines": { "node": ">=20" },
  "files":   ["dist", "README.md"],
  "keywords": ["cli", "tool"],
  "repository": {
    "type": "git",
    "url":  "https://github.com/user/my-app"
  }
}`,
        },
        {
          heading: "Scripts",
          description: "npm run <script> executes any command. Pre/post hooks run automatically.",
          language: "json",
          code: `{
  "scripts": {
    "dev":      "vite",
    "build":    "tsc && vite build",
    "preview":  "vite preview",
    "test":     "vitest",
    "test:ci":  "vitest run --coverage",
    "lint":     "eslint src --ext .ts,.tsx",
    "format":   "prettier --write src",
    "typecheck":"tsc --noEmit",

    "prebuild": "npm run lint",     // runs before build
    "postbuild": "npm run test:ci"  // runs after build
  }
}`,
        },
      ],
    },
    {
      id: "publishing",
      title: "Publishing",
      sections: [
        {
          heading: "Publishing a package",
          description: "npm publish pushes your package to the registry. Use .npmignore to exclude dev files.",
          language: "bash",
          code: `# Log in to npm
npm login

# Check what will be published
npm pack --dry-run

# Publish
npm publish              # public package
npm publish --access public  # if scoped (@org/pkg)

# Bump version (updates package.json + creates git tag)
npm version patch    # 1.0.0 → 1.0.1
npm version minor    # 1.0.0 → 1.1.0
npm version major    # 1.0.0 → 2.0.0

# Publish a pre-release
npm version prerelease --preid=beta
npm publish --tag beta   # install with: npm install pkg@beta`,
        },
        {
          heading: "npx — run without installing",
          description: "npx runs a package's binary without a permanent global install.",
          language: "bash",
          code: `# Run a package binary without installing
npx create-react-app my-app
npx prettier --write src/

# Run a specific version
npx typescript@5 tsc --version

# Run from a GitHub repo
npx github:user/repo

# Run a local binary
npx tsc            # uses ./node_modules/.bin/tsc`,
        },
      ],
    },
  ],
};
