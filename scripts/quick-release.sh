#!/bin/bash

# MPLP Quick Release Script
# This script provides a convenient way to trigger different types of releases

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Default values
RELEASE_TYPE="patch"
ENVIRONMENT="staging"
DRY_RUN=false
ENHANCED=false
SKIP_SECURITY=false
SKIP_APPROVAL=false

# Function to print colored output
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Function to show help
show_help() {
    cat << EOF
MPLP Quick Release Script

Usage: $0 [OPTIONS]

Options:
    -t, --type TYPE         Release type: patch, minor, major (default: patch)
    -e, --environment ENV   Target environment: staging, production (default: staging)
    -v, --version VERSION   Specific version to release (auto-generated if not provided)
    --enhanced             Use enhanced release process with security checks
    --dry-run              Perform dry run without making actual changes
    --skip-security        Skip security checks (not recommended)
    --skip-approval        Skip manual approval process
    --github-actions       Trigger GitHub Actions workflow instead of local script
    -h, --help             Show this help message

Examples:
    $0 --type patch --environment staging
    $0 --type minor --environment production --enhanced
    $0 --type major --dry-run
    $0 --github-actions --type minor --environment production

Release Types:
    patch    - Bug fixes and small improvements (1.0.X)
    minor    - New features, backward compatible (1.X.0)
    major    - Breaking changes (X.0.0)

Environments:
    staging     - Staging environment for testing
    production  - Production environment

EOF
}

# Function to get next version
get_next_version() {
    local type=$1
    local current_version
    
    # Get current version from package.json
    if [ -f "$PROJECT_ROOT/package.json" ]; then
        current_version=$(node -p "require('$PROJECT_ROOT/package.json').version")
    else
        print_error "package.json not found"
        exit 1
    fi
    
    # Parse version components
    IFS='.' read -ra VERSION_PARTS <<< "$current_version"
    major=${VERSION_PARTS[0]}
    minor=${VERSION_PARTS[1]}
    patch=${VERSION_PARTS[2]}
    
    # Calculate next version
    case $type in
        "patch")
            patch=$((patch + 1))
            ;;
        "minor")
            minor=$((minor + 1))
            patch=0
            ;;
        "major")
            major=$((major + 1))
            minor=0
            patch=0
            ;;
        *)
            print_error "Invalid release type: $type"
            exit 1
            ;;
    esac
    
    echo "v$major.$minor.$patch"
}

# Function to validate prerequisites
validate_prerequisites() {
    print_info "Validating prerequisites..."
    
    # Check if we're in the right directory
    if [ ! -f "$PROJECT_ROOT/package.json" ]; then
        print_error "Not in MPLP project root directory"
        exit 1
    fi
    
    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed"
        exit 1
    fi
    
    # Check if npm is installed
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed"
        exit 1
    fi
    
    # Check if git is installed
    if ! command -v git &> /dev/null; then
        print_error "git is not installed"
        exit 1
    fi
    
    # Check if dependencies are installed
    if [ ! -d "$PROJECT_ROOT/node_modules" ]; then
        print_warning "Dependencies not installed, running npm install..."
        cd "$PROJECT_ROOT"
        npm install
    fi
    
    print_success "Prerequisites validated"
}

# Function to run local release
run_local_release() {
    local version=$1
    local type=$2
    
    print_info "Running local release process..."
    
    cd "$PROJECT_ROOT"
    
    # Build command
    local cmd="node scripts/release.js --version $version --type $type"
    
    if [ "$DRY_RUN" = true ]; then
        cmd="$cmd --dry-run"
    fi
    
    if [ "$ENHANCED" = true ]; then
        cmd="$cmd --enhanced"
    fi
    
    print_info "Executing: $cmd"
    eval $cmd
}

# Function to run enhanced release
run_enhanced_release() {
    local version=$1
    local type=$2
    
    print_info "Running enhanced release process..."
    
    cd "$PROJECT_ROOT"
    
    # Build command
    local cmd="node scripts/release-enhanced.js --version $version --type $type --environment $ENVIRONMENT"
    
    if [ "$DRY_RUN" = true ]; then
        cmd="$cmd --dry-run"
    fi
    
    if [ "$SKIP_SECURITY" = true ]; then
        cmd="$cmd --skip-security"
    fi
    
    if [ "$SKIP_APPROVAL" = true ]; then
        cmd="$cmd --skip-approval"
    fi
    
    print_info "Executing: $cmd"
    eval $cmd
}

# Function to trigger GitHub Actions
trigger_github_actions() {
    local version=$1
    local type=$2
    
    print_info "Triggering GitHub Actions workflow..."
    
    # Check if gh CLI is installed
    if ! command -v gh &> /dev/null; then
        print_error "GitHub CLI (gh) is not installed. Please install it to use GitHub Actions integration."
        print_info "Install from: https://cli.github.com/"
        exit 1
    fi
    
    # Check if user is authenticated
    if ! gh auth status &> /dev/null; then
        print_error "Not authenticated with GitHub. Please run 'gh auth login'"
        exit 1
    fi
    
    # Build workflow inputs
    local inputs="version=$version,release_type=$type,environment=$ENVIRONMENT"
    
    if [ "$DRY_RUN" = true ]; then
        inputs="$inputs,dry_run=true"
    fi
    
    if [ "$SKIP_SECURITY" = true ]; then
        inputs="$inputs,skip_security=true"
    fi
    
    if [ "$SKIP_APPROVAL" = true ]; then
        inputs="$inputs,skip_approval=true"
    fi
    
    print_info "Triggering workflow with inputs: $inputs"
    
    cd "$PROJECT_ROOT"
    gh workflow run "Enhanced Release Process" --field "$inputs"
    
    print_success "GitHub Actions workflow triggered successfully!"
    print_info "You can monitor the progress at: https://github.com/$(gh repo view --json owner,name -q '.owner.login + "/" + .name')/actions"
}

# Function to show release summary
show_release_summary() {
    local version=$1
    local type=$2
    
    echo
    echo "==========================================="
    echo "           RELEASE SUMMARY"
    echo "==========================================="
    echo "Version:      $version"
    echo "Type:         $type"
    echo "Environment:  $ENVIRONMENT"
    echo "Enhanced:     $ENHANCED"
    echo "Dry Run:      $DRY_RUN"
    echo "Skip Security: $SKIP_SECURITY"
    echo "Skip Approval: $SKIP_APPROVAL"
    echo "==========================================="
    echo
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -t|--type)
            RELEASE_TYPE="$2"
            shift 2
            ;;
        -e|--environment)
            ENVIRONMENT="$2"
            shift 2
            ;;
        -v|--version)
            VERSION="$2"
            shift 2
            ;;
        --enhanced)
            ENHANCED=true
            shift
            ;;
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --skip-security)
            SKIP_SECURITY=true
            shift
            ;;
        --skip-approval)
            SKIP_APPROVAL=true
            shift
            ;;
        --github-actions)
            USE_GITHUB_ACTIONS=true
            shift
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Validate release type
if [[ ! "$RELEASE_TYPE" =~ ^(patch|minor|major)$ ]]; then
    print_error "Invalid release type: $RELEASE_TYPE"
    print_info "Valid types: patch, minor, major"
    exit 1
fi

# Validate environment
if [[ ! "$ENVIRONMENT" =~ ^(staging|production)$ ]]; then
    print_error "Invalid environment: $ENVIRONMENT"
    print_info "Valid environments: staging, production"
    exit 1
fi

# Get version if not provided
if [ -z "$VERSION" ]; then
    VERSION=$(get_next_version "$RELEASE_TYPE")
    print_info "Auto-generated version: $VERSION"
fi

# Validate prerequisites
validate_prerequisites

# Show release summary
show_release_summary "$VERSION" "$RELEASE_TYPE"

# Confirm before proceeding (unless dry run)
if [ "$DRY_RUN" != true ]; then
    read -p "Do you want to proceed with this release? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "Release cancelled by user"
        exit 0
    fi
fi

# Execute release based on mode
if [ "$USE_GITHUB_ACTIONS" = true ]; then
    trigger_github_actions "$VERSION" "$RELEASE_TYPE"
elif [ "$ENHANCED" = true ]; then
    run_enhanced_release "$VERSION" "$RELEASE_TYPE"
else
    run_local_release "$VERSION" "$RELEASE_TYPE"
fi

print_success "Release process completed!"

# Show next steps
echo
print_info "Next steps:"
if [ "$USE_GITHUB_ACTIONS" = true ]; then
    echo "  1. Monitor the GitHub Actions workflow progress"
    echo "  2. Review the deployment in $ENVIRONMENT environment"
    echo "  3. Verify the release functionality"
else
    echo "  1. Review the generated release package"
    echo "  2. Test the release in $ENVIRONMENT environment"
    echo "  3. Monitor system metrics after deployment"
fi

if [ "$ENVIRONMENT" = "staging" ] && [ "$DRY_RUN" != true ]; then
    echo "  4. Consider promoting to production after validation"
fi

echo
print_success "MPLP $VERSION release process completed successfully! 🎉"