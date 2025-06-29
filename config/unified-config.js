/**
 * Unified Configuration Manager for MPLP
 * 
 * This file consolidates and manages all configuration settings across the project,
 * eliminating duplication and providing a single source of truth for configuration.
 */

const path = require('path');
const fs = require('fs');

// Load individual configuration files
const docsQualityConfig = require('./docs-quality.config.js');
const docsVersionConfig = require('./docs-version.config.js');
const monitoringConfig = require('./monitoring-config.json');
const securityConfig = require('./security/.security-config.json');
const releaseConfig = require('./release/release-config.json');
const releaseApprovalConfig = require('./release/release-approval-config.json');
const jestConfig = require('./testing/jest.config.js');
const commitlintConfig = require('./lint/commitlint.config.js');

/**
 * Unified configuration object that merges and organizes all settings
 */
const unifiedConfig = {
  // Project metadata
  project: {
    name: 'Multi Agent Project Lifecycle Protocol',
    version: '1.0.0',
    description: 'A universal open protocol suite for multi-agent project development'
  },

  // Documentation configuration (consolidated)
  documentation: {
    // Quality settings from docs-quality.config.js
    quality: {
      thresholds: docsQualityConfig.thresholds,
      rules: docsQualityConfig.rules,
      checks: docsQualityConfig.checks || {}
    },
    
    // Version control from docs-version.config.js
    versioning: {
      current: docsVersionConfig.version.current,
      format: docsVersionConfig.version.format,
      autoIncrement: docsVersionConfig.version.autoIncrement,
      baseline: docsVersionConfig.baseline
    },
    
    // Monitoring settings (from monitoring-config.json)
    monitoring: {
      enabled: monitoringConfig.documentationMonitoring?.enabled || true,
      paths: monitoringConfig.documentationMonitoring?.paths || [],
      excludePaths: monitoringConfig.documentationMonitoring?.excludePaths || [],
      checks: monitoringConfig.documentationMonitoring?.checks || {}
    }
  },

  // Security configuration (consolidated)
  security: {
    // From .security-config.json
    secretDetection: securityConfig.security.policies.secretDetection,
    dependencyScanning: securityConfig.security.policies.dependencyScanning,
    licenseCompliance: securityConfig.security.policies.licenseCompliance,
    
    // From release-config.json (merge with above)
    release: {
      enableSecurityScan: releaseConfig.security.enableSecurityScan,
      enableDependencyCheck: releaseConfig.security.enableDependencyCheck,
      enableLicenseCheck: releaseConfig.security.enableLicenseCheck,
      allowedLicenses: releaseConfig.security.allowedLicenses,
      maxCriticalVulnerabilities: releaseConfig.security.maxCriticalVulnerabilities,
      maxHighVulnerabilities: releaseConfig.security.maxHighVulnerabilities,
      securityPatterns: releaseConfig.security.securityPatterns
    }
  },

  // Release configuration (consolidated)
  release: {
    // Basic release settings
    validation: releaseConfig.validation,
    
    // Approval matrix (consolidated from both files)
    approval: {
      // Basic approval settings from release-config.json
      requireManualApproval: releaseConfig.approval.requireManualApproval,
      approvalTimeout: releaseConfig.approval.approvalTimeout,
      requiredApprovers: releaseConfig.approval.requiredApprovers,
      
      // Detailed approval matrix from release-approval-config.json
      matrix: releaseApprovalConfig.approval_matrix,
      
      // Merge approval matrix from release-config.json
      basicMatrix: releaseConfig.approval.approvalMatrix
    },
    
    // Environments and deployment
    environments: releaseApprovalConfig.environments || {},
    notifications: releaseApprovalConfig.notifications || {}
  },

  // Testing configuration
  testing: {
    jest: jestConfig,
    coverage: {
      directory: jestConfig.coverageDirectory,
      reporters: jestConfig.coverageReporters,
      collectFrom: jestConfig.collectCoverageFrom
    }
  },

  // Code quality and linting
  codeQuality: {
    commitlint: {
      extends: commitlintConfig.extends,
      rules: commitlintConfig.rules
    },
    
    // Lint staged configuration
    lintStaged: require('./lint/.lintstagedrc.json'),
    
    // Markdown lint configuration
    markdownlint: require('./lint/.markdownlint.json')
  },

  // Monitoring and maintenance
  monitoring: {
    documentation: monitoringConfig.documentationMonitoring,
    codeQuality: monitoringConfig.codeQualityMonitoring || {},
    performance: monitoringConfig.performanceMonitoring || {},
    security: monitoringConfig.securityMonitoring || {}
  }
};

/**
 * Configuration utility functions
 */
const configUtils = {
  /**
   * Get configuration for a specific domain
   * @param {string} domain - Configuration domain (e.g., 'documentation', 'security')
   * @returns {object} Domain-specific configuration
   */
  getDomainConfig(domain) {
    return unifiedConfig[domain] || {};
  },

  /**
   * Get merged security configuration
   * @returns {object} Consolidated security settings
   */
  getSecurityConfig() {
    const security = unifiedConfig.security;
    return {
      ...security.secretDetection,
      ...security.dependencyScanning,
      ...security.licenseCompliance,
      release: security.release
    };
  },

  /**
   * Get merged release approval configuration
   * @returns {object} Consolidated approval settings
   */
  getReleaseApprovalConfig() {
    const approval = unifiedConfig.release.approval;
    return {
      requireManualApproval: approval.requireManualApproval,
      timeout: approval.approvalTimeout,
      requiredApprovers: approval.requiredApprovers,
      matrix: approval.matrix,
      basicMatrix: approval.basicMatrix
    };
  },

  /**
   * Get documentation configuration with all quality and monitoring settings
   * @returns {object} Consolidated documentation settings
   */
  getDocumentationConfig() {
    return unifiedConfig.documentation;
  },

  /**
   * Validate configuration consistency
   * @returns {object} Validation results
   */
  validateConfig() {
    const issues = [];
    const warnings = [];

    // Check for conflicting security settings
    const securityLicenses = unifiedConfig.security.licenseCompliance.allowedLicenses;
    const releaseLicenses = unifiedConfig.security.release.allowedLicenses;
    
    if (JSON.stringify(securityLicenses) !== JSON.stringify(releaseLicenses)) {
      warnings.push('Security and release license configurations differ');
    }

    // Check for documentation monitoring overlap
    const docQualityChecks = Object.keys(unifiedConfig.documentation.quality.checks || {});
    const monitoringChecks = Object.keys(unifiedConfig.documentation.monitoring.checks || {});
    
    const overlap = docQualityChecks.filter(check => monitoringChecks.includes(check));
    if (overlap.length > 0) {
      warnings.push(`Documentation quality and monitoring have overlapping checks: ${overlap.join(', ')}`);
    }

    return {
      valid: issues.length === 0,
      issues,
      warnings
    };
  }
};

module.exports = {
  config: unifiedConfig,
  utils: configUtils
};