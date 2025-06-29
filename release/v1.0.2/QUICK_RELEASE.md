# 🚀 MPLP Quick Release Guide

## One-Click Release Commands

### 🎯 Main Release Commands

```bash
# Interactive release (recommended)
npm run release

# Specific version types
npm run release:patch    # Bug fixes (1.0.0 → 1.0.1)
npm run release:minor    # New features (1.0.0 → 1.1.0) 
npm run release:major    # Breaking changes (1.0.0 → 2.0.0)
```

### 📚 Documentation Commands

```bash
# Generate all documentation
npm run docs:generate

# Sync to all languages (9 languages supported)
npm run docs:sync
```

### ✅ Quality Assurance

```bash
# Run all pre-release checks
npm run pre-release

# Complete build pipeline
npm run build:all
```

## 🌐 Multi-Language Support

**Supported Languages**: English, 中文, 繁體中文, 日本語, 한국어, Español, Français, Deutsch, Italiano, Русский

**How it works**:
1. English docs in `docs/schemas/` are the source
2. `npm run docs:sync` creates translation templates for all languages
3. Each language gets proper headers with translation status
4. Existing translations are preserved during sync

## 🔄 What the Release Process Does

### Automated Steps:
1. **Validation** - Validates JSON examples, checks frozen versions, verifies compatibility
2. **Documentation** - Generates schema docs, syncs to all languages
3. **Versioning** - Updates version numbers, compatibility matrix
4. **Packaging** - Creates release artifacts
5. **Git Operations** - Tags, commits, pushes to repository

### Files Updated:
- `package.json` - Version number
- `versions.json` - Version registry
- `version-compatibility.json` - Compatibility matrix
- `docs/` - All documentation files
- Git tags and commits

## 🛠️ Manual Steps (if needed)

```bash
# 1. Check everything is ready
npm run pre-release

# 2. Generate documentation
npm run docs:generate

# 3. Run release
npm run release
```

## 📋 Quick Checklist

- [ ] Working directory is clean (`git status`)
- [ ] All tests pass (`npm run pre-release`)
- [ ] Documentation is current (`npm run docs:generate`)
- [ ] Ready to release (`npm run release`)

---

**🎉 That's it! The release process is now fully automated and supports 10 languages.**