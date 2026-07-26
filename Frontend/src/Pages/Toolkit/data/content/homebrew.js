export default {
  topics: [
    {
      id: "install",
      title: "Install & Update',",
      sections: [
        {
          heading: "Installing Homebrew",
          description: "One-liner install — sets up Xcode Command Line Tools and the brew binary automatically.",
          language: "bash",
          code: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Add to PATH (Apple Silicon Macs)
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

# Verify
brew --version
brew doctor     # diagnose any issues`,
        },
        {
          heading: "Core commands",
          description: "brew install for CLI tools (formulae); brew install --cask for GUI apps.",
          language: "bash",
          code: `# Install formula (CLI tool)
brew install node
brew install git
brew install ripgrep
brew install fzf jq bat eza

# Install cask (GUI app)
brew install --cask visual-studio-code
brew install --cask iterm2
brew install --cask docker

# Search
brew search node
brew search --cask google-chrome

# Info about a package
brew info node`,
        },
        {
          heading: "Update & upgrade",
          description: "brew update updates the formula registry; brew upgrade installs newer versions.",
          language: "bash",
          code: `# Update Homebrew itself (refresh formula list)
brew update

# Upgrade all installed packages
brew upgrade

# Upgrade one package
brew upgrade node

# Pin a formula to prevent upgrades
brew pin node
brew unpin node

# Check for outdated packages
brew outdated
brew outdated --cask`,
        },
      ],
    },
    {
      id: "management",
      title: "Package Management',",
      sections: [
        {
          heading: "Listing & removing",
          description: "list shows what's installed; uninstall removes it. deps shows the dependency tree.",
          language: "bash",
          code: `# List installed packages
brew list              # all formulae
brew list --cask       # all casks

# Check dependencies
brew deps node         # what node depends on
brew uses --installed node  # what depends on node

# Remove
brew uninstall node
brew uninstall --cask visual-studio-code

# Cleanup — remove old versions and cache
brew cleanup
brew cleanup --prune=7   # remove files older than 7 days
brew cleanup -n          # dry run (see what would be removed)

# Disk usage
brew autoremove   # remove unused dependencies`,
        },
        {
          heading: "Tap — third-party repos",
          description: "Taps extend Homebrew with community or vendor formula repositories.",
          language: "bash",
          code: `# Add a tap (third-party formula repo)
brew tap homebrew/cask-fonts     # fonts
brew tap oven-sh/bun             # Bun runtime

# Install from a tap
brew install oven-sh/bun/bun
brew install --cask homebrew/cask-fonts/font-jetbrains-mono

# List active taps
brew tap

# Remove a tap
brew untap oven-sh/bun`,
        },
      ],
    },
    {
      id: "brewfile",
      title: "Brewfile',",
      sections: [
        {
          heading: "Brewfile — declarative setup",
          description: "A Brewfile lists all your packages — perfect for setting up a new Mac from scratch.",
          language: "bash",
          code: `# Brewfile (save in your home directory or repo)
tap "homebrew/cask-fonts"

# CLI tools
brew "git"
brew "node"
brew "ripgrep"
brew "fzf"
brew "jq"
brew "bat"          # better cat
brew "eza"          # better ls
brew "gh"           # GitHub CLI

# GUI apps (casks)
cask "visual-studio-code"
cask "iterm2"
cask "docker"
cask "raycast"

# Fonts
cask "font-jetbrains-mono"

# Mac App Store (requires mas CLI)
mas "Amphetamine", id: 937984704`,
        },
        {
          heading: "Using Brewfile",
          description: "Bundle install and dump commands make Brewfile-based workflows portable.",
          language: "bash",
          code: `# Install everything in Brewfile
brew bundle install
brew bundle install --file=~/dotfiles/Brewfile

# Generate a Brewfile from what's currently installed
brew bundle dump
brew bundle dump --force   # overwrite existing

# Check if all entries are installed
brew bundle check

# Cleanup packages not in Brewfile
brew bundle cleanup --force`,
        },
      ],
    },
  ],
};
