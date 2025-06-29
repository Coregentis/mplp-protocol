/**
 * Version Updater for versions.json
 * Used by standard-version to update versions.json during release process
 */

const fs = require('fs');
const path = require('path');

module.exports.readVersion = function (contents) {
  try {
    const versions = JSON.parse(contents);
    const activeVersion = versions.find(v => v.status === 'active');
    return activeVersion ? activeVersion.version.replace('v', '') : '1.0.0';
  } catch (error) {
    console.warn('Warning: Could not read version from versions.json, defaulting to 1.0.0');
    return '1.0.0';
  }
};

module.exports.writeVersion = function (contents, version) {
  try {
    let versions = [];
    
    // Try to parse existing versions
    try {
      versions = JSON.parse(contents);
    } catch (error) {
      console.log('Creating new versions.json structure');
    }
    
    // Mark all existing versions as frozen
    versions.forEach(v => {
      if (v.status === 'active') {
        v.status = 'frozen';
        v.default = false;
      }
    });
    
    // Add new version
    const newVersion = {
      version: `v${version}`,
      path: `release/v${version}/`,
      status: 'active',
      releaseDate: new Date().toISOString().split('T')[0],
      default: true,
      description: `MPLP v${version} release with enhanced features and improvements`
    };
    
    versions.push(newVersion);
    
    return JSON.stringify(versions, null, 2);
  } catch (error) {
    console.error('Error updating versions.json:', error);
    throw error;
  }
};