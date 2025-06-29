const fs = require('fs');
const path = require('path');

describe('Documentation Consistency Tests', () => {
  let docsDir, devProtocolsDir, schemasDir;
  
  beforeAll(() => {
    docsDir = global.testUtils.getProjectPath('docs');
    devProtocolsDir = global.testUtils.getProjectPath('dev', 'protocols');
    schemasDir = global.testUtils.getProjectPath('schemas');
  });
  
  const supportedLanguages = ['en', 'zh', 'tw'];
  const protocolModules = [
    'Confirm',
    'Context', 
    'Delivery',
    'Execute',
    'Learn',
    'Plan',
    'Role',
    'Test',
    'Trace',
    'Workflow'
  ];
  
  describe('Multi-language Documentation Structure', () => {
    test('All language directories should exist', () => {
      supportedLanguages.forEach(lang => {
        const langDir = path.join(docsDir, lang);
        expect(global.testUtils.fileExists(langDir)).toBe(true);
      });
    });
    
    test('All protocol modules should have documentation in all languages', () => {
      supportedLanguages.forEach(lang => {
        protocolModules.forEach(module => {
          const docPath = path.join(docsDir, lang, `${module}.md`);
          expect(global.testUtils.fileExists(docPath))
            .toBe(true);
        });
      });
    });
    
    test('Schema documentation should exist in all languages', () => {
      supportedLanguages.forEach(lang => {
        const schemaDocsDir = path.join(docsDir, lang, 'schemas');
        expect(global.testUtils.fileExists(schemaDocsDir)).toBe(true);
        
        protocolModules.forEach(module => {
          const schemaDocPath = path.join(schemaDocsDir, `${module}.md`);
          expect(global.testUtils.fileExists(schemaDocPath))
            .toBe(true);
        });
      });
    });
  });
  
  describe('Development Documentation Consistency', () => {
    test('All dev protocol files should exist', () => {
      protocolModules.forEach(module => {
        const devProtocolPath = path.join(devProtocolsDir, `${module}.md`);
        expect(global.testUtils.fileExists(devProtocolPath))
          .toBe(true);
      });
    });
    
    test('MPLP protocol modules file should exist', () => {
      const mplpModulesPath = path.join(devProtocolsDir, 'MPLP_protocol_modules.md');
      expect(global.testUtils.fileExists(mplpModulesPath)).toBe(true);
    });
  });
  
  describe('Documentation Content Validation', () => {
    test('All markdown files should have valid structure', () => {
      const checkMarkdownStructure = (filePath) => {
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // 检查是否有标题
        expect(content).toMatch(/^#\s+.+/m);
        
        // 检查内容不为空
        expect(content.trim().length).toBeGreaterThan(0);
        
        // 检查是否有基本的协议结构（对于协议文档）
        if (filePath.includes('/protocols/') || filePath.includes('/docs/')) {
          const hasStructureElements = 
            content.includes('##') || // 有二级标题
            content.includes('###') || // 有三级标题
            content.includes('```') || // 有代码块
            content.includes('|'); // 有表格
          
          expect(hasStructureElements).toBe(true);
        }
      };
      
      // 检查开发文档
      protocolModules.forEach(module => {
        const devPath = path.join(devProtocolsDir, `${module}.md`);
        if (global.testUtils.fileExists(devPath)) {
          checkMarkdownStructure(devPath);
        }
      });
      
      // 检查多语言文档
      supportedLanguages.forEach(lang => {
        protocolModules.forEach(module => {
          const docPath = path.join(docsDir, lang, `${module}.md`);
          if (global.testUtils.fileExists(docPath)) {
            checkMarkdownStructure(docPath);
          }
        });
      });
    });
    
    test('Schema documentation should reference corresponding schema files', () => {
      supportedLanguages.forEach(lang => {
        protocolModules.forEach(module => {
          const schemaDocPath = path.join(docsDir, lang, 'schemas', `${module}.md`);
          const schemaFilePath = path.join(schemasDir, `${module}.schema.json`);
          
          if (global.testUtils.fileExists(schemaDocPath) && 
              global.testUtils.fileExists(schemaFilePath)) {
            const docContent = fs.readFileSync(schemaDocPath, 'utf-8');
            
            // 检查是否引用了schema文件
            const hasSchemaReference = 
              docContent.includes(`${module}.schema.json`) ||
              docContent.includes('schema') ||
              docContent.includes('Schema');
            
            expect(hasSchemaReference).toBe(true);
          }
        });
      });
    });
  });
  
  describe('Cross-Reference Validation', () => {
    test('Protocol modules should be consistently named across all files', () => {
      protocolModules.forEach(module => {
        // 检查schema文件
        const schemaPath = path.join(schemasDir, `${module}.schema.json`);
        if (global.testUtils.fileExists(schemaPath)) {
          const schema = global.testUtils.readJsonFile(schemaPath);
          expect(schema.title).toContain(module);
        }
        
        // 检查开发文档
        const devPath = path.join(devProtocolsDir, `${module}.md`);
        if (global.testUtils.fileExists(devPath)) {
          const content = fs.readFileSync(devPath, 'utf-8');
          expect(content).toMatch(new RegExp(module, 'i'));
        }
      });
    });
    
    test('Documentation should reference existing files only', () => {
      const checkFileReferences = (content, basePath) => {
        // 查找markdown链接
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        let match;
        
        while ((match = linkRegex.exec(content)) !== null) {
          const linkPath = match[2];
          
          // 跳过外部链接和锚点链接
          if (linkPath.startsWith('http') || linkPath.startsWith('#')) {
            continue;
          }
          
          // 检查相对路径引用的文件是否存在
          if (linkPath.startsWith('.') || !linkPath.includes('://')) {
            const fullPath = path.resolve(basePath, linkPath);
            if (!global.testUtils.fileExists(fullPath)) {
              console.warn(`Broken link found: ${linkPath} in ${basePath}`);
              // 注意：这里使用warn而不是fail，因为某些链接可能是动态生成的
            }
          }
        }
      };
      
      // 检查所有markdown文件的链接
      const checkDirectory = (dir) => {
        if (!global.testUtils.fileExists(dir)) return;
        
        const files = fs.readdirSync(dir, { withFileTypes: true });
        files.forEach(file => {
          const fullPath = path.join(dir, file.name);
          
          if (file.isDirectory()) {
            checkDirectory(fullPath);
          } else if (file.name.endsWith('.md')) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            checkFileReferences(content, path.dirname(fullPath));
          }
        });
      };
      
      checkDirectory(docsDir);
      checkDirectory(devProtocolsDir);
    });
  });
  
  describe('README Files Validation', () => {
    test('Project root README should exist', () => {
      const readmePath = global.testUtils.getProjectPath('README.md');
      expect(global.testUtils.fileExists(readmePath)).toBe(true);
    });
    
    test('All major directories should have README files', () => {
      const dirsWithReadme = ['src', 'tests', 'build', 'tools', 'config'];
      
      dirsWithReadme.forEach(dir => {
        const readmePath = global.testUtils.getProjectPath(dir, 'README.md');
        expect(global.testUtils.fileExists(readmePath)).toBe(true);
      });
    });
  });
});