# MPLP Release Guide

## 🚀 One-Click Release Process

This guide describes the comprehensive release process for the Multi-Agent Project Lifecycle Protocol (MPLP).

## 📋 Available Scripts

### Core Release Commands

```bash
# Full automated release (interactive)
npm run release

# Specific version type releases
npm run release:patch    # 1.0.0 → 1.0.1
npm run release:minor    # 1.0.0 → 1.1.0
npm run release:major    # 1.0.0 → 2.0.0
```

### Documentation Management

```bash
# Generate schema documentation
npm run generate:schema-docs

# Sync documentation to all languages
npm run docs:sync

# Generate docs + sync languages
npm run docs:generate
```

### Quality Assurance

```bash
# Run all pre-release checks
npm run pre-release

# Individual validation commands
npm run validate:examples        # Validate JSON examples
npm run check:frozen             # Check frozen version integrity
npm run compatibility:validate   # Validate compatibility matrix
```

### Build Process

```bash
# Complete build pipeline
npm run build:all
```

## 🔄 Release Workflow

The automated release process follows these steps:

### 1. Pre-Release Validation
- ✅ Validate all JSON examples against schemas
- ✅ Check frozen version integrity
- ✅ Validate compatibility matrix
- ✅ Ensure working directory is clean

### 2. Documentation Generation
- 📝 Generate schema documentation from JSON schemas
- 🌐 Sync documentation to all supported languages
- 📚 Create translation templates with proper headers

### 3. Version Management
- 🏷️ Update version numbers
- 📊 Update compatibility matrix
- 🔒 Freeze previous versions

### 4. Release Package Creation
- 📦 Create release artifacts
- 🗂️ Package schemas and documentation
- 📋 Generate release notes

### 5. Git Operations
- 🏷️ Create version tags
- 📤 Push changes to repository
- 🔄 Update remote branches

## 🌐 Multi-Language Documentation

### Supported Languages

| Language | Code | Status |
|----------|------|--------|
| English | `en` | ✅ Complete |
| 中文 | `zh` | 🔄 Translation in progress |
| 繁體中文 | `tw` | 🔄 Translation in progress |
| 日本語 | `jp` | 🔄 Translation in progress |
| 한국어 | `kr` | 🔄 Translation in progress |
| Español | `es` | 🔄 Translation in progress |
| Français | `fr` | 🔄 Translation in progress |
| Deutsch | `de` | 🔄 Translation in progress |
| Italiano | `it` | 🔄 Translation in progress |
| Русский | `ru` | 🔄 Translation in progress |

### Documentation Structure

```
docs/
├── LANGUAGES.md              # Multi-language index
├── schemas/                   # English schema docs (source)
│   ├── Plan.md
│   ├── Test.md
│   ├── Trace.md
│   └── ...
├── en/                        # English protocol docs
│   ├── Plan.md
│   ├── Test.md
│   └── ...
├── zh/                        # Chinese translations
│   ├── schemas/
│   │   ├── Plan.md           # Schema docs with translation headers
│   │   └── ...
│   ├── Plan.md               # Protocol docs with translation headers
│   └── ...
└── [other languages]/         # Other language translations
    ├── schemas/
    └── ...
```

### Translation Process

1. **Automatic Template Generation**
   ```bash
   npm run docs:sync
   ```
   - Creates language directories
   - Copies source documentation
   - Adds translation headers with status
   - Preserves existing translations

2. **Translation Headers**
   Each translated file includes:
   - Translation status indicator
   - Link to original English version
   - Language-specific formatting

3. **Translation Workflow**
   - 📝 Templates are auto-generated with placeholders
   - 🔄 Translators replace content while preserving structure
   - ✅ Translation status is updated manually
   - 🔄 Re-running sync preserves completed translations

## 🛠️ Development Scripts

### Schema Management

```bash
# Generate schema documentation
node scripts/generate-schema-docs.js

# Generate schema relationship graph
node scripts/generate-schema-graph.js

# Validate examples against schemas
node scripts/validate-examples.js
```

### Version Control

```bash
# Check frozen version integrity
node scripts/check-frozen-integrity.js

# Update compatibility matrix
node scripts/update-compatibility-matrix.js

# Update version compatibility
node scripts/update-version-compatibility.js
```

### Documentation Sync

```bash
# Sync docs to all languages
node scripts/duplicate-docs-to-languages.js
```

## 🔧 Manual Release Process

If you need to perform a manual release:

### 1. Preparation
```bash
# Ensure clean working directory
git status

# Run pre-release checks
npm run pre-release
```

### 2. Documentation
```bash
# Generate and sync documentation
npm run docs:generate
```

### 3. Version Update
```bash
# Update version in package.json
# Update compatibility matrix
npm run compatibility:update
```

### 4. Git Operations
```bash
# Commit changes
git add .
git commit -m "Release v1.x.x"

# Create tag
git tag v1.x.x

# Push changes
git push origin main
git push origin v1.x.x
```

## 📊 Release Checklist

### Pre-Release
- [ ] All tests pass
- [ ] Examples validate against schemas
- [ ] Frozen versions integrity verified
- [ ] Compatibility matrix is valid
- [ ] Documentation is up to date
- [ ] Working directory is clean

### Release
- [ ] Version number updated
- [ ] Compatibility matrix updated
- [ ] Documentation generated and synced
- [ ] Release notes created
- [ ] Git tag created
- [ ] Changes pushed to repository

### Post-Release
- [ ] Release artifacts verified
- [ ] Documentation website updated
- [ ] Translation status reviewed
- [ ] Community notified

## 🚨 Troubleshooting

### Common Issues

1. **Pre-commit hooks failing**
   ```bash
   # Reinstall pre-commit
   pre-commit uninstall
   pre-commit install
   ```

2. **Git push failures**
   ```bash
   # Sync with remote
   git pull origin main
   git push origin main
   ```

3. **Schema validation errors**
   ```bash
   # Check specific example
   npm run validate:examples
   ```

4. **Documentation sync issues**
   ```bash
   # Force regenerate all docs
   npm run docs:generate
   ```

## 📝 Contributing

When contributing to releases:

1. Follow semantic versioning (SemVer)
2. Update documentation for any schema changes
3. Ensure all validation checks pass
4. Test the release process in a fork first
5. Update translation templates when needed

## 🔗 Related Files

- `scripts/release.js` - Main release automation script
- `scripts/duplicate-docs-to-languages.js` - Multi-language sync
- `package.json` - NPM scripts configuration
- `versions.json` - Version management
- `version-compatibility.json` - Compatibility matrix

---

**Note**: This release process is designed to be fully automated while maintaining quality and consistency across all supported languages and versions.