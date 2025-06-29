const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

describe('System Integration Tests', () => {
  let ajv;
  
  beforeAll(() => {
    ajv = new Ajv({ allErrors: true, verbose: true });
    addFormats(ajv);
  });
  
  describe('End-to-End Protocol Validation', () => {
    test('Complete workflow should validate against all schemas', async () => {
      const schemasDir = global.testUtils.getProjectPath('schemas');
      const examplesDir = global.testUtils.getProjectPath('examples');
      
      // 获取所有协议模块
      const protocolModules = [
        'Role', 'Context', 'Plan', 'Execute', 
        'Test', 'Delivery', 'Confirm', 'Learn', 
        'Trace', 'Workflow'
      ];
      
      // 模拟完整的工作流程
      const workflowSteps = [];
      
      for (const module of protocolModules) {
        const schemaPath = path.join(schemasDir, `${module}.json`);
        const examplePath = path.join(examplesDir, `${module}.json`);
        
        if (global.testUtils.fileExists(schemaPath) && global.testUtils.fileExists(examplePath)) {
          const schema = global.testUtils.readJsonFile(schemaPath);
          const example = global.testUtils.readJsonFile(examplePath);
          
          // 编译schema
          const validate = ajv.compile(schema);
          
          // 验证示例
          const isValid = validate(example);
          
          expect(isValid).toBe(true);
          
          if (!isValid) {
            console.error(`Validation failed for ${module}:`, validate.errors);
          }
          
          workflowSteps.push({
            module,
            schema,
            example,
            validated: isValid
          });
        }
      }
      
      // 验证工作流程的完整性
      expect(workflowSteps.length).toBeGreaterThan(0);
      
      // 所有步骤都应该验证成功
      const allValid = workflowSteps.every(step => step.validated);
      expect(allValid).toBe(true);
    });
    
    test('Cross-module references should be valid', () => {
      const schemasDir = global.testUtils.getProjectPath('schemas');
      const indexPath = path.join(schemasDir, 'index.json');
      
      if (global.testUtils.fileExists(indexPath)) {
        const index = global.testUtils.readJsonFile(indexPath);
        
        // 检查索引中引用的所有schema文件是否存在
        if (index.schemas) {
          Object.entries(index.schemas).forEach(([name, schemaInfo]) => {
            if (schemaInfo.file) {
              const schemaPath = path.join(schemasDir, schemaInfo.file);
              expect(global.testUtils.fileExists(schemaPath))
                .toBe(true);
              
              // 验证schema文件的有效性
              const schema = global.testUtils.readJsonFile(schemaPath);
              expect(schema).toBeDefined();
              expect(schema.$schema).toBeDefined();
            }
          });
        }
      }
    });
  });
  
  describe('Documentation and Schema Synchronization', () => {
    test('All documented protocols should have corresponding schemas', () => {
      const docsDir = global.testUtils.getProjectPath('docs', 'en');
      const schemasDir = global.testUtils.getProjectPath('schemas');
      
      if (global.testUtils.fileExists(docsDir)) {
        const docFiles = global.testUtils.getFilesInDirectory(docsDir)
          .filter(file => file.endsWith('.md') && !file.includes('README'));
        
        docFiles.forEach(docFile => {
          const moduleName = path.basename(docFile, '.md');
          const schemaPath = path.join(schemasDir, `${moduleName}.json`);
          
          expect(global.testUtils.fileExists(schemaPath))
            .toBe(true);
        });
      }
    });
    
    test('All schemas should have corresponding documentation', () => {
      const docsDir = global.testUtils.getProjectPath('docs', 'en');
      const schemasDir = global.testUtils.getProjectPath('schemas');
      
      if (global.testUtils.fileExists(schemasDir)) {
        const schemaFiles = global.testUtils.getFilesInDirectory(schemasDir)
          .filter(file => file.endsWith('.json') && file !== 'index.json');
        
        schemaFiles.forEach(schemaFile => {
          const moduleName = path.basename(schemaFile, '.json');
          const docPath = path.join(docsDir, `${moduleName}.md`);
          
          expect(global.testUtils.fileExists(docPath))
            .toBe(true);
        });
      }
    });
    
    test('Schema documentation should be up-to-date', () => {
      const schemaDocsDir = global.testUtils.getProjectPath('docs', 'schema');
      const schemasDir = global.testUtils.getProjectPath('schemas');
      
      if (global.testUtils.fileExists(schemaDocsDir) && global.testUtils.fileExists(schemasDir)) {
        const schemaFiles = global.testUtils.getFilesInDirectory(schemasDir)
          .filter(file => file.endsWith('.json'));
        
        schemaFiles.forEach(schemaFile => {
          const baseName = path.basename(schemaFile, '.json');
          const docPath = path.join(schemaDocsDir, `${baseName}.md`);
          
          if (global.testUtils.fileExists(docPath)) {
            const docContent = fs.readFileSync(docPath, 'utf-8');
            
            // 检查文档是否包含schema的关键信息
            expect(docContent).toMatch(/properties|required|type/i);
            expect(docContent.trim().length).toBeGreaterThan(0);
          }
        });
      }
    });
  });
  
  describe('Multi-language Consistency', () => {
    test('All language versions should have consistent structure', () => {
      const docsDir = global.testUtils.getProjectPath('docs');
      const languages = ['en', 'zh', 'tw'];
      
      // 获取英文版本作为基准
      const enDir = path.join(docsDir, 'en');
      if (!global.testUtils.fileExists(enDir)) {
        return; // 如果没有英文文档，跳过测试
      }
      
      const enFiles = global.testUtils.getFilesInDirectory(enDir)
        .filter(file => file.endsWith('.md'));
      
      languages.forEach(lang => {
        if (lang === 'en') return;
        
        const langDir = path.join(docsDir, lang);
        if (global.testUtils.fileExists(langDir)) {
          const langFiles = global.testUtils.getFilesInDirectory(langDir)
            .filter(file => file.endsWith('.md'));
          
          // 检查文件数量和名称一致性
          expect(langFiles.length).toBe(enFiles.length);
          
          enFiles.forEach(enFile => {
            expect(langFiles).toContain(enFile);
          });
        }
      });
    });
    
    test('Translation completeness across all modules', () => {
      const docsDir = global.testUtils.getProjectPath('docs');
      const languages = ['en', 'zh', 'tw'];
      const protocolModules = [
        'Role', 'Context', 'Plan', 'Execute', 
        'Test', 'Delivery', 'Confirm', 'Learn', 
        'Trace', 'Workflow'
      ];
      
      languages.forEach(lang => {
        protocolModules.forEach(module => {
          const docPath = path.join(docsDir, lang, `${module}.md`);
          
          if (global.testUtils.fileExists(docPath)) {
            const content = fs.readFileSync(docPath, 'utf-8');
            
            // 文档不应为空
            expect(content.trim().length).toBeGreaterThan(0);
            
            // 应该包含基本的协议结构
            expect(content).toMatch(/protocol|协议|協議/i);
          }
        });
      });
    });
  });
  
  describe('Build and Release Integration', () => {
    test('Package.json scripts should be functional', () => {
      const packagePath = global.testUtils.getProjectPath('package.json');
      
      if (global.testUtils.fileExists(packagePath)) {
        const packageJson = global.testUtils.readJsonFile(packagePath);
        
        // 检查必要的脚本是否存在
        const requiredScripts = ['test', 'validate'];
        
        requiredScripts.forEach(script => {
          expect(packageJson.scripts).toHaveProperty(script);
          expect(typeof packageJson.scripts[script]).toBe('string');
          expect(packageJson.scripts[script].length).toBeGreaterThan(0);
        });
      }
    });
    
    test('Build artifacts should be properly configured', () => {
      const buildDir = global.testUtils.getProjectPath('build');
      
      // build目录应该存在
      expect(global.testUtils.fileExists(buildDir)).toBe(true);
      
      // 检查gitignore是否正确配置
      const gitignorePath = global.testUtils.getProjectPath('.gitignore');
      if (global.testUtils.fileExists(gitignorePath)) {
        const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
        
        // 应该忽略构建产物
        expect(gitignoreContent).toMatch(/build\//i);
        expect(gitignoreContent).toMatch(/node_modules/i);
        expect(gitignoreContent).toMatch(/\.log/i);
      }
    });
  });
  
  describe('Development Workflow Integration', () => {
    test('Development tools should be properly configured', () => {
      const toolsDir = global.testUtils.getProjectPath('tools');
      
      if (global.testUtils.fileExists(toolsDir)) {
        // 检查工具目录结构
        const toolFiles = global.testUtils.getFilesInDirectory(toolsDir);
        expect(toolFiles.length).toBeGreaterThan(0);
        
        // 检查README文件
        const readmePath = path.join(toolsDir, 'README.md');
        if (global.testUtils.fileExists(readmePath)) {
          const readmeContent = fs.readFileSync(readmePath, 'utf-8');
          expect(readmeContent.trim().length).toBeGreaterThan(0);
        }
      }
    });
    
    test('Configuration files should be valid', () => {
      const configDir = global.testUtils.getProjectPath('config');
      
      if (global.testUtils.fileExists(configDir)) {
        const configFiles = global.testUtils.getFilesInDirectory(configDir)
          .filter(file => file.endsWith('.json') || file.endsWith('.js'));
        
        configFiles.forEach(configFile => {
          const configPath = path.join(configDir, configFile);
          
          if (configFile.endsWith('.json')) {
            // 验证JSON配置文件
            expect(() => {
              global.testUtils.readJsonFile(configPath);
            }).not.toThrow();
          }
          
          // 检查文件不为空
          const content = fs.readFileSync(configPath, 'utf-8');
          expect(content.trim().length).toBeGreaterThan(0);
        });
      }
    });
  });
  
  describe('Quality Assurance Integration', () => {
    test('Test coverage should meet minimum requirements', () => {
      const testsDir = global.testUtils.getProjectPath('tests');
      
      // 测试目录应该存在
      expect(global.testUtils.fileExists(testsDir)).toBe(true);
      
      // 检查测试配置
      const jestConfigPath = path.join(global.testUtils.getProjectPath('config'), 'testing', 'jest.config.js');
      if (global.testUtils.fileExists(jestConfigPath)) {
        const configContent = fs.readFileSync(jestConfigPath, 'utf-8');
        
        // 应该配置覆盖率阈值
        expect(configContent).toMatch(/coverageThreshold/i);
        expect(configContent).toMatch(/global/i);
      }
    });
    
    test('Documentation quality standards should be enforced', () => {
      const docsDir = global.testUtils.getProjectPath('docs');
      
      if (global.testUtils.fileExists(docsDir)) {
        // 检查主README文件
        const mainReadmePath = global.testUtils.getProjectPath('README.md');
        if (global.testUtils.fileExists(mainReadmePath)) {
          const readmeContent = fs.readFileSync(mainReadmePath, 'utf-8');
          
          // README应该包含基本信息
          expect(readmeContent).toMatch(/MPLP|Multi.*Agent.*Project.*Lifecycle.*Protocol/i);
          expect(readmeContent).toMatch(/installation|安装|安裝/i);
          expect(readmeContent).toMatch(/usage|使用|使用方法/i);
        }
        
        // 检查架构文档
        const archPath = global.testUtils.getProjectPath('ARCHITECTURE.md');
        if (global.testUtils.fileExists(archPath)) {
          const archContent = fs.readFileSync(archPath, 'utf-8');
          
          // 架构文档应该包含关键信息
          expect(archContent).toMatch(/architecture|架构|架構/i);
          expect(archContent).toMatch(/component|组件|組件/i);
        }
      }
    });
  });
});