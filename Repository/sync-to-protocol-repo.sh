#!/bin/bash

# MPLP Protocol Repository Sync Script
# Usage: ./sync-to-protocol-repo.sh v1.2.0
# Purpose: Sync release content from development repository to public protocol repository

VERSION=$1
DEV_REPO_PATH="$(pwd)"
PROTOCOL_REPO_PATH="../MPLP-Protocol"
RELEASE_PATH="release/${VERSION}"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}$1${NC}"
}

print_success() {
    echo -e "${GREEN}$1${NC}"
}

print_warning() {
    echo -e "${YELLOW}$1${NC}"
}

print_error() {
    echo -e "${RED}$1${NC}"
}

# Validation
if [ -z "$VERSION" ]; then
    print_error "❌ Error: Version parameter required"
    echo "Usage: $0 v1.2.0"
    exit 1
fi

if [ ! -d "$RELEASE_PATH" ]; then
    print_error "❌ Error: Release directory $RELEASE_PATH not found"
    print_warning "Please ensure the release has been prepared using the release guide."
    exit 1
fi

# Validate release content
if [ ! -f "$RELEASE_PATH/README.md" ] || [ ! -f "$RELEASE_PATH/VERSION.json" ]; then
    print_error "❌ Error: Invalid release structure in $RELEASE_PATH"
    print_warning "Missing required files: README.md or VERSION.json"
    exit 1
fi

print_status "🚀 Starting sync to Protocol Repository..."
print_status "📦 Version: $VERSION"
print_status "📁 Source: $RELEASE_PATH"
print_status "🎯 Target: https://github.com/Coregentis/MPLP-Protocol"

# Clone or update protocol repository
if [ ! -d "$PROTOCOL_REPO_PATH" ]; then
    print_status "📥 Cloning Protocol Repository..."
    git clone https://github.com/Coregentis/MPLP-Protocol.git "$PROTOCOL_REPO_PATH"
    if [ $? -ne 0 ]; then
        print_error "❌ Failed to clone protocol repository"
        exit 1
    fi
else
    print_status "🔄 Updating Protocol Repository..."
    cd "$PROTOCOL_REPO_PATH"
    git pull origin main
    if [ $? -ne 0 ]; then
        print_warning "⚠️  Warning: Failed to pull latest changes, continuing with existing state"
    fi
    cd "$DEV_REPO_PATH"
fi

# Sync content
print_status "📋 Syncing release content..."
cd "$PROTOCOL_REPO_PATH"

# Backup current state (optional)
print_status "💾 Creating backup of current state..."
git stash push -m "Backup before sync $VERSION"

# Clear existing content (except .git and .github)
print_status "🧹 Clearing existing content...
find . -maxdepth 1 ! -name '.git' ! -name '.github' ! -name '.' -exec rm -rf {} + 2>/dev/null

# Copy release content
print_status "📂 Copying release content..."
cp -r "${DEV_REPO_PATH}/${RELEASE_PATH}/"* .
if [ $? -ne 0 ]; then
    print_error "❌ Failed to copy release content"
    exit 1
fi

# Verify copied content
if [ ! -f "README.md" ] || [ ! -f "VERSION.json" ]; then
    print_error "❌ Error: Critical files missing after copy"
    exit 1
fi

# Configure git if needed
git config user.name "MPLP Release Bot" 2>/dev/null
git config user.email "release@coregentis.com" 2>/dev/null

# Check for changes
if git diff --quiet && git diff --cached --quiet; then
    print_warning "⚠️  No changes detected, skipping commit"
    cd "$DEV_REPO_PATH"
    exit 0
fi

# Commit and tag
print_status "💾 Committing changes..."
git add .
git commit -m "🚀 Release MPLP ${VERSION}

- Synchronized from development repository
- Version: ${VERSION}
- Release date: $(date -u +"%Y-%m-%d %H:%M:%S UTC")
- Source: MPLP-Protocol-Dev/release/${VERSION}"

if [ $? -ne 0 ]; then
    print_error "❌ Failed to commit changes"
    exit 1
fi

# Create annotated tag
print_status "🏷️  Creating release tag..."
git tag -a "$VERSION" -m "MPLP ${VERSION}

Multi-Agent Project Lifecycle Protocol
Release: ${VERSION}
Date: $(date -u +"%Y-%m-%d")
Repository: https://github.com/Coregentis/MPLP-Protocol"

if [ $? -ne 0 ]; then
    print_error "❌ Failed to create tag"
    exit 1
fi

# Push to remote
print_status "📤 Pushing to remote repository..."
git push origin main
if [ $? -ne 0 ]; then
    print_error "❌ Failed to push changes to main branch"
    exit 1
fi

git push origin "$VERSION"
if [ $? -ne 0 ]; then
    print_error "❌ Failed to push tag"
    exit 1
fi

print_success "✅ Sync completed successfully!"
print_success "🌐 Protocol Repository: https://github.com/Coregentis/MPLP-Protocol"
print_success "🏷️  Release Tag: $VERSION"
print_success "📊 Release URL: https://github.com/Coregentis/MPLP-Protocol/releases/tag/$VERSION"

# Return to development repository
cd "$DEV_REPO_PATH"

# Optional: Open release page
read -p "🌐 Open release page in browser? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if command -v xdg-open > /dev/null; then
        xdg-open "https://github.com/Coregentis/MPLP-Protocol/releases/tag/$VERSION"
    elif command -v open > /dev/null; then
        open "https://github.com/Coregentis/MPLP-Protocol/releases/tag/$VERSION"
    else
        print_status "Please visit: https://github.com/Coregentis/MPLP-Protocol/releases/tag/$VERSION"
    fi
fi

print_success "🎉 MPLP $VERSION has been successfully released to the public repository!"