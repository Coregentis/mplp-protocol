# Version Management Guide

## Overview

This document describes the version management system for the Multi-Agent Project Lifecycle Protocol (MPLP). Our versioning follows [Semantic Versioning](https://semver.org/) principles and uses [Conventional Commits](https://www.conventionalcommits.org/) for automated changelog generation.

## Versioning Strategy

### Semantic Versioning

We follow the `MAJOR.MINOR.PATCH` format:

- **MAJOR**: Breaking changes that are not backward compatible
- **MINOR**: New features that are backward compatible
- **PATCH**: Bug fixes that are backward compatible
- **PRERELEASE**: Pre-release versions (e.g., `1.0.0-alpha.1`)

### Version Types

| Type | Description | Example |
|------|-------------|----------|
| `patch` | Bug fixes, documentation updates | `1.0.0` → `1.0.1` |
| `minor` | New features, schema enhancements | `1.0.0` → `1.1.0` |
| `major` | Breaking changes, API changes | `1.0.0` → `2.0.0` |
| `prerelease` | Alpha, beta, rc versions | `1.0.0` → `1.0.1-alpha.0` |

## Commit Message Format

### Conventional Commits

All commit messages must follow the Conventional Commits specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types

| Type | Description | Version Impact |
|------|-------------|----------------|
| `feat` | New feature | Minor |
| `fix` | Bug fix | Patch |
| `docs` | Documentation only | Patch |
| `style` | Code style changes | Patch |
| `refactor` | Code refactoring | Patch |
| `perf` | Performance improvements | Patch |
| `test` | Adding or updating tests | Patch |
| `build` | Build system changes | Patch |
| `ci` | CI/CD changes | Patch |
| `chore` | Other changes | Patch |
| `revert` | Revert previous commit | Patch |
| `schema` | Schema changes | Minor/Major* |
| `example` | Example updates | Patch |
| `release` | Release commits | - |

*Schema changes may be Major if they introduce breaking changes.

### Scopes

Common scopes include:

- `schema` - Schema definitions
- `core` - Core functionality
- `api` - API changes
- `docs` - Documentation
- `ci` - CI/CD
- `test` - Testing
- `examples` - Examples
- `tools` - Development tools

### Examples

```bash
# Feature addition
feat(schema): add validation for agent capabilities

# Bug fix
fix(api): resolve authentication timeout issue

# Documentation update
docs(readme): update installation instructions

# Breaking change
feat(schema)!: redesign protocol structure

BREAKING CHANGE: The protocol structure has been completely redesigned.
Existing implementations will need to be updated.
```

## Version Management Commands

### Using npm scripts

```bash
# Patch version (1.0.0 → 1.0.1)
npm run version:patch

# Minor version (1.0.0 → 1.1.0)
npm run version:minor

# Major version (1.0.0 → 2.0.0)
npm run version:major

# Prerelease version (1.0.0 → 1.0.1-alpha.0)
npm run version:prerelease

# Custom version bump
npm run version:bump -- minor --dry-run
```

### Using version manager directly

```bash
# Basic usage
node scripts/version-manager.js patch
node scripts/version-manager.js minor
node scripts/version-manager.js major
node scripts/version-manager.js prerelease

# With options
node scripts/version-manager.js minor --dry-run
node scripts/version-manager.js prerelease --prerelease-id beta
node scripts/version-manager.js patch --skip-checks
```

### Options

- `--dry-run`: Show what would be done without making changes
- `--skip-checks`: Skip pre-release checks (not recommended)
- `--prerelease-id ID`: Set prerelease identifier (default: alpha)

## Release Process

### Automated Release (Recommended)

1. **Create commits** following conventional commit format
2. **Push to main branch**
3. **Create and push tag**:
   ```bash
   git tag v1.2.3
   git push origin v1.2.3
   ```
4. **GitHub Actions** automatically:
   - Validates version format
   - Runs compatibility checks
   - Generates changelog
   - Creates release package
   - Publishes GitHub release

### Manual Release

1. **Run version bump**:
   ```bash
   npm run version:minor
   ```

2. **Review changes**:
   ```bash
   git show v1.2.3
   ```

3. **Push to remote**:
   ```bash
   git push origin main
   git push origin v1.2.3
   ```

4. **Create release package**:
   ```bash
   npm run release:create
   ```

## Pre-release Checks

Before any version bump, the following checks are performed:

### 1. Working Directory
- Ensures git working directory is clean
- No uncommitted changes

### 2. Tests
- All unit tests pass
- Integration tests pass
- Example validation succeeds

### 3. Compatibility
- Backward compatibility analysis
- Schema compatibility validation
- Breaking change detection

### 4. Quality Gates
- Code quality metrics
- Documentation coverage
- Security audit

## Changelog Generation

### Automatic Generation

Changelogs are automatically generated from commit messages:

```bash
# Generate changelog for current version
npm run changelog:generate

# Update existing changelog
npm run changelog:update
```

### Multilingual Support

Changelogs are generated in multiple languages:
- English (`CHANGELOG.md`)
- Chinese (`CHANGELOG.zh.md`)
- Japanese (`CHANGELOG.ja.md`)
- Korean (`CHANGELOG.ko.md`)

### Manual Editing

After automatic generation, you can manually edit changelogs to:
- Add more context
- Reorganize sections
- Add migration guides
- Include additional notes

## Compatibility Management

### Compatibility Matrix

The `version-compatibility.json` file tracks:
- Version compatibility relationships
- Breaking changes
- Deprecation status
- Migration paths

### Compatibility Checks

```bash
# Run compatibility check
npm run version:check

# Check specific version
node scripts/compatibility-checker.js v1.2.3
```

### Breaking Changes

When introducing breaking changes:

1. **Use `!` in commit message**:
   ```
   feat(schema)!: redesign agent structure
   ```

2. **Add BREAKING CHANGE footer**:
   ```
   feat(schema): redesign agent structure
   
   BREAKING CHANGE: Agent structure has been redesigned.
   Update your implementations accordingly.
   ```

3. **Update compatibility matrix**
4. **Provide migration guide**

## Git Hooks

### Pre-commit
- Runs lint-staged checks
- Validates staged files
- Runs quick tests

### Commit-msg
- Validates commit message format
- Ensures conventional commits compliance

### Setup Hooks

```bash
# Install hooks (automatic after npm install)
npm run prepare

# Manual installation
npx husky install
```

## Configuration Files

### Version Management
- `.versionrc.json` - Standard-version configuration
- `commitlint.config.js` - Commit message validation
- `.lintstagedrc.json` - Staged files validation

### Git Hooks
- `.husky/pre-commit` - Pre-commit checks
- `.husky/commit-msg` - Commit message validation

## Troubleshooting

### Common Issues

#### Commit Message Validation Fails
```bash
# Check commit message format
echo "feat(schema): add new feature" | npx commitlint

# Fix last commit message
git commit --amend -m "feat(schema): add new feature"
```

#### Version Bump Fails
```bash
# Check working directory status
git status

# Run with dry-run to see what would happen
npm run version:patch -- --dry-run

# Skip checks if necessary (not recommended)
npm run version:patch -- --skip-checks
```

#### Compatibility Check Fails
```bash
# Run detailed compatibility check
node scripts/compatibility-checker.js --verbose

# Check specific schema changes
node scripts/compatibility-checker.js --schema-only
```

### Getting Help

```bash
# Version manager help
node scripts/version-manager.js --help

# Available npm scripts
npm run help

# Commitlint help
npx commitlint --help
```

## Best Practices

### 1. Commit Frequently
- Make small, focused commits
- Use descriptive commit messages
- Follow conventional commit format

### 2. Test Before Release
- Run full test suite
- Validate examples
- Check compatibility

### 3. Document Changes
- Update relevant documentation
- Add migration guides for breaking changes
- Include examples for new features

### 4. Review Before Push
- Use `--dry-run` to preview changes
- Review generated changelog
- Verify version number is correct

### 5. Coordinate Releases
- Communicate breaking changes
- Plan major releases
- Consider deprecation periods

## Integration with CI/CD

### GitHub Actions

Our CI/CD pipeline includes:

1. **Commit Validation** - Validates all commit messages
2. **Version Management** - Automated releases on tag push
3. **Quality Gates** - Ensures code quality before release
4. **Compatibility Checks** - Validates backward compatibility

### Workflow Triggers

- **Push to main**: Runs validation and quality checks
- **Pull Request**: Validates commits and PR title
- **Tag Push**: Triggers automated release process
- **Manual Trigger**: Allows manual release initiation

## References

- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Standard Version](https://github.com/conventional-changelog/standard-version)
- [Commitlint](https://commitlint.js.org/)
- [Husky](https://typicode.github.io/husky/)