# Configuration Deduplication Report

Generated on: 2025-06-29T04:28:41.035Z

## Summary

- Total configuration files: 14
- Duplicate patterns found: 4
- Potential lines saved: ~120

## Duplicate Patterns

### allowedLicenses (medium severity)

**Description:** Consolidate into unified security configuration

**Files involved:**
- security/.security-config.json
- release/release-config.json

### vulnerabilityThresholds (medium severity)

**Description:** Use single source for vulnerability limits

**Files involved:**
- security/.security-config.json
- release/release-config.json

### documentationChecks (medium severity)

**Description:** Merge documentation quality and monitoring configurations

**Files involved:**
- docs-quality.config.js
- monitoring-config.json

### releaseApproval (medium severity)

**Description:** Consolidate approval configurations into single file

**Files involved:**
- release/release-config.json
- release/release-approval-config.json

## Recommendations

### mergeReleaseConfigs (low priority)

**Description:** Merge release-config.json and release-approval-config.json

**Impact:** medium

### consolidateSecurity (medium priority)

**Description:** Move all security settings to .security-config.json

**Impact:** high

### unifyDocumentationConfig (high priority)

**Description:** Create single documentation configuration

**Impact:** high

