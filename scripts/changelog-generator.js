/**
 * Automated Changelog Generator for MPLP
 * Generates multilingual changelogs based on conventional commits
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ChangelogGenerator {
  constructor() {
    this.projectRoot = process.cwd();
    this.languages = ['en', 'zh', 'ja', 'ko'];
    this.changelogTemplates = {
      en: {
        title: '# Changelog',
        subtitle: 'All notable changes to this project will be documented in this file.',
        sections: {
          'feat': 'Features',
          'fix': 'Bug Fixes',
          'docs': 'Documentation',
          'refactor': 'Code Refactoring',
          'perf': 'Performance Improvements',
          'revert': 'Reverts',
          'breaking': 'BREAKING CHANGES'
        }
      },
      zh: {
        title: '# 更新日志',
        subtitle: '本项目的所有重要变更都将记录在此文件中。',
        sections: {
          'feat': '新功能',
          'fix': '问题修复',
          'docs': '文档更新',
          'refactor': '代码重构',
          'perf': '性能优化',
          'revert': '回滚变更',
          'breaking': '破坏性变更'
        }
      },
      ja: {
        title: '# 変更履歴',
        subtitle: 'このプロジェクトの重要な変更はすべてこのファイルに記録されます。',
        sections: {
          'feat': '新機能',
          'fix': 'バグ修正',
          'docs': 'ドキュメント',
          'refactor': 'リファクタリング',
          'perf': 'パフォーマンス改善',
          'revert': '変更の取り消し',
          'breaking': '破壊的変更'
        }
      },
      ko: {
        title: '# 변경 로그',
        subtitle: '이 프로젝트의 모든 중요한 변경사항이 이 파일에 기록됩니다.',
        sections: {
          'feat': '새로운 기능',
          'fix': '버그 수정',
          'docs': '문서',
          'refactor': '코드 리팩토링',
          'perf': '성능 개선',
          'revert': '변경사항 되돌리기',
          'breaking': '호환성을 깨는 변경'
        }
      }
    };
  }

  /**
   * Parse git commits since last tag
   */
  parseCommits(fromTag = null) {
    try {
      const range = fromTag ? `${fromTag}..HEAD` : 'HEAD';
      const gitLog = execSync(
        `git log ${range} --pretty=format:"%H|%s|%b|%an|%ad" --date=short`,
        { encoding: 'utf8' }
      );

      if (!gitLog.trim()) {
        return [];
      }

      return gitLog.split('\n').map(line => {
        const [hash, subject, body, author, date] = line.split('|');
        return this.parseCommit({ hash, subject, body, author, date });
      }).filter(commit => commit !== null);
    } catch (error) {
      console.warn('Warning: Could not parse git commits:', error.message);
      return [];
    }
  }

  /**
   * Parse individual commit using conventional commit format
   */
  parseCommit({ hash, subject, body, author, date }) {
    const conventionalRegex = /^(\w+)(\(.+\))?(!)?:\s*(.+)$/;
    const match = subject.match(conventionalRegex);

    if (!match) {
      return null; // Skip non-conventional commits
    }

    const [, type, scope, breaking, description] = match;
    const isBreaking = breaking === '!' || (body && body.includes('BREAKING CHANGE'));

    return {
      hash: hash.substring(0, 7),
      type,
      scope: scope ? scope.slice(1, -1) : null,
      description,
      body,
      author,
      date,
      breaking: isBreaking
    };
  }

  /**
   * Group commits by type
   */
  groupCommits(commits) {
    const groups = {};
    const breakingChanges = [];

    commits.forEach(commit => {
      if (commit.breaking) {
        breakingChanges.push(commit);
      }

      if (!groups[commit.type]) {
        groups[commit.type] = [];
      }
      groups[commit.type].push(commit);
    });

    if (breakingChanges.length > 0) {
      groups['breaking'] = breakingChanges;
    }

    return groups;
  }

  /**
   * Generate changelog for specific language
   */
  generateChangelog(version, commits, language = 'en') {
    const template = this.changelogTemplates[language];
    const groups = this.groupCommits(commits);
    const date = new Date().toISOString().split('T')[0];

    let changelog = `${template.title}\n\n${template.subtitle}\n\n`;
    changelog += `## [${version}] - ${date}\n\n`;

    // Add sections in order of importance
    const sectionOrder = ['breaking', 'feat', 'fix', 'perf', 'refactor', 'docs'];
    
    sectionOrder.forEach(type => {
      if (groups[type] && groups[type].length > 0) {
        changelog += `### ${template.sections[type]}\n\n`;
        
        groups[type].forEach(commit => {
          const scope = commit.scope ? `**${commit.scope}**: ` : '';
          const commitUrl = `https://github.com/Multi-Agent-io/Multi_Agent_Project_Lifecycle_Protocol/commit/${commit.hash}`;
          changelog += `- ${scope}${commit.description} ([${commit.hash}](${commitUrl}))\n`;
        });
        
        changelog += '\n';
      }
    });

    // Add other types
    Object.keys(groups).forEach(type => {
      if (!sectionOrder.includes(type) && template.sections[type]) {
        changelog += `### ${template.sections[type]}\n\n`;
        
        groups[type].forEach(commit => {
          const scope = commit.scope ? `**${commit.scope}**: ` : '';
          const commitUrl = `https://github.com/Multi-Agent-io/Multi_Agent_Project_Lifecycle_Protocol/commit/${commit.hash}`;
          changelog += `- ${scope}${commit.description} ([${commit.hash}](${commitUrl}))\n`;
        });
        
        changelog += '\n';
      }
    });

    return changelog;
  }

  /**
   * Update existing changelog file
   */
  updateChangelogFile(version, newContent, language = 'en') {
    const changelogPath = language === 'en' 
      ? path.join(this.projectRoot, 'CHANGELOG.md')
      : path.join(this.projectRoot, `docs/${language}/CHANGELOG.md`);

    let existingContent = '';
    if (fs.existsSync(changelogPath)) {
      existingContent = fs.readFileSync(changelogPath, 'utf8');
      
      // Remove the header from existing content
      const lines = existingContent.split('\n');
      const firstVersionIndex = lines.findIndex(line => line.match(/^## \[/));
      if (firstVersionIndex > 0) {
        existingContent = lines.slice(firstVersionIndex).join('\n');
      }
    }

    // Combine new content with existing
    const template = this.changelogTemplates[language];
    const header = `${template.title}\n\n${template.subtitle}\n\n`;
    const versionContent = newContent.split('\n').slice(3).join('\n'); // Remove header from new content
    const finalContent = header + versionContent + '\n' + existingContent;

    // Ensure directory exists
    const dir = path.dirname(changelogPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(changelogPath, finalContent);
    console.log(`✅ Updated changelog: ${changelogPath}`);
  }

  /**
   * Generate changelogs for all languages
   */
  async generateMultilingualChangelogs(version, fromTag = null) {
    console.log('\n📝 Generating multilingual changelogs...');
    
    const commits = this.parseCommits(fromTag);
    
    if (commits.length === 0) {
      console.log('No conventional commits found since last release.');
      return;
    }

    console.log(`Found ${commits.length} conventional commits`);

    for (const language of this.languages) {
      const changelog = this.generateChangelog(version, commits, language);
      this.updateChangelogFile(version, changelog, language);
    }

    console.log('✅ All changelogs generated successfully');
  }

  /**
   * Get last git tag
   */
  getLastTag() {
    try {
      return execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
    } catch (error) {
      return null;
    }
  }

  /**
   * Main execution function
   */
  async run() {
    const args = process.argv.slice(2);
    const version = args.find(arg => arg.startsWith('--version='))?.split('=')[1] || 'unreleased';
    const fromTag = args.find(arg => arg.startsWith('--from='))?.split('=')[1] || this.getLastTag();

    console.log(`🚀 Generating changelog for version ${version}`);
    if (fromTag) {
      console.log(`📅 Changes since ${fromTag}`);
    }

    await this.generateMultilingualChangelogs(version, fromTag);
  }
}

// Run if called directly
if (require.main === module) {
  const generator = new ChangelogGenerator();
  generator.run().catch(console.error);
}

module.exports = ChangelogGenerator;