const fs = require('fs');
const path = require('path');

describe('Translation Quality Tests', () => {
  let docsDir;
  
  beforeAll(() => {
    docsDir = global.testUtils.getProjectPath('docs');
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
  
  describe('Translation Completeness', () => {
    test('All languages should have the same set of files', () => {
      const baseLanguage = 'en';
      const baseDir = path.join(docsDir, baseLanguage);
      
      if (!global.testUtils.fileExists(baseDir)) {
        throw new Error(`Base language directory ${baseLanguage} not found`);
      }
      
      const getFilesRecursively = (dir, basePath = '') => {
        const files = [];
        const items = fs.readdirSync(dir, { withFileTypes: true });
        
        items.forEach(item => {
          const relativePath = path.join(basePath, item.name);
          if (item.isDirectory()) {
            files.push(...getFilesRecursively(path.join(dir, item.name), relativePath));
          } else {
            files.push(relativePath);
          }
        });
        
        return files;
      };
      
      const baseFiles = getFilesRecursively(baseDir);
      
      supportedLanguages.forEach(lang => {
        if (lang === baseLanguage) return;
        
        const langDir = path.join(docsDir, lang);
        if (!global.testUtils.fileExists(langDir)) {
          throw new Error(`Language directory ${lang} not found`);
        }
        
        const langFiles = getFilesRecursively(langDir);
        
        // 检查每个基础文件是否在目标语言中存在
        baseFiles.forEach(file => {
          expect(langFiles).toContain(file);
        });
        
        // 检查是否有多余的文件
        expect(langFiles.length).toBe(baseFiles.length);
      });
    });
    
    test('All protocol modules should be translated', () => {
      supportedLanguages.forEach(lang => {
        protocolModules.forEach(module => {
          const docPath = path.join(docsDir, lang, `${module}.md`);
          expect(global.testUtils.fileExists(docPath))
            .toBe(true);
          
          const content = fs.readFileSync(docPath, 'utf-8');
          expect(content.trim().length).toBeGreaterThan(0);
        });
      });
    });
  });
  
  describe('Translation Content Quality', () => {
    test('Translated files should not be empty or placeholder text', () => {
      const placeholderPatterns = [
        /TODO/i,
        /PLACEHOLDER/i,
        /\[TRANSLATE\]/i,
        /\[翻译\]/i,
        /待翻译/i,
        /需要翻译/i
      ];
      
      supportedLanguages.forEach(lang => {
        if (lang === 'en') return; // 跳过英文原文
        
        protocolModules.forEach(module => {
          const docPath = path.join(docsDir, lang, `${module}.md`);
          
          if (global.testUtils.fileExists(docPath)) {
            const content = fs.readFileSync(docPath, 'utf-8');
            
            // 检查内容不为空
            expect(content.trim().length).toBeGreaterThan(0);
            
            // 检查没有占位符文本
            placeholderPatterns.forEach(pattern => {
              expect(content).not.toMatch(pattern);
            });
          }
        });
      });
    });
    
    test('Technical terms should be consistent across translations', () => {
      const technicalTerms = {
        'Agent': ['Agent', 'Agent', 'Agent'], // en, zh, tw
        'Protocol': ['Protocol', '协议', '協議'],
        'Schema': ['Schema', 'Schema', 'Schema'],
        'Workflow': ['Workflow', '工作流', '工作流程'],
        'Context': ['Context', '上下文', '上下文'],
        'Execution': ['Execution', '执行', '執行'],
        'Validation': ['Validation', '验证', '驗證']
      };
      
      Object.entries(technicalTerms).forEach(([englishTerm, translations]) => {
        supportedLanguages.forEach((lang, index) => {
          const expectedTerm = translations[index];
          
          protocolModules.forEach(module => {
            const docPath = path.join(docsDir, lang, `${module}.md`);
            
            if (global.testUtils.fileExists(docPath)) {
              const content = fs.readFileSync(docPath, 'utf-8');
              
              // 如果文档包含英文术语，应该使用一致的翻译
              if (content.includes(englishTerm) && lang !== 'en') {
                // 这是一个软检查，记录不一致但不失败测试
                if (!content.includes(expectedTerm)) {
                  console.warn(
                    `Inconsistent translation in ${lang}/${module}.md: ` +
                    `Found "${englishTerm}" but expected "${expectedTerm}"`
                  );
                }
              }
            }
          });
        });
      });
    });
    
    test('Code blocks and JSON examples should be identical across languages', () => {
      const extractCodeBlocks = (content) => {
        const codeBlockRegex = /```[\s\S]*?```/g;
        return content.match(codeBlockRegex) || [];
      };
      
      protocolModules.forEach(module => {
        const englishPath = path.join(docsDir, 'en', `${module}.md`);
        
        if (!global.testUtils.fileExists(englishPath)) return;
        
        const englishContent = fs.readFileSync(englishPath, 'utf-8');
        const englishCodeBlocks = extractCodeBlocks(englishContent);
        
        supportedLanguages.forEach(lang => {
          if (lang === 'en') return;
          
          const translatedPath = path.join(docsDir, lang, `${module}.md`);
          
          if (global.testUtils.fileExists(translatedPath)) {
            const translatedContent = fs.readFileSync(translatedPath, 'utf-8');
            const translatedCodeBlocks = extractCodeBlocks(translatedContent);
            
            // 代码块数量应该相同
            expect(translatedCodeBlocks.length).toBe(englishCodeBlocks.length);
            
            // 代码块内容应该相同（忽略注释中的翻译）
            englishCodeBlocks.forEach((englishBlock, index) => {
              if (translatedCodeBlocks[index]) {
                // 提取JSON内容进行比较
                const jsonRegex = /{[\s\S]*}/;
                const englishJson = englishBlock.match(jsonRegex);
                const translatedJson = translatedCodeBlocks[index].match(jsonRegex);
                
                if (englishJson && translatedJson) {
                  try {
                    const englishObj = JSON.parse(englishJson[0]);
                    const translatedObj = JSON.parse(translatedJson[0]);
                    
                    // 比较JSON结构（忽略描述性字段的翻译）
                    const compareStructure = (obj1, obj2, path = '') => {
                      Object.keys(obj1).forEach(key => {
                        if (typeof obj1[key] === 'object' && obj1[key] !== null) {
                          expect(obj2).toHaveProperty(key);
                          compareStructure(obj1[key], obj2[key], `${path}.${key}`);
                        } else if (!['description', 'title', 'name'].includes(key)) {
                          // 非描述性字段应该完全相同
                          expect(obj2[key]).toBe(obj1[key]);
                        }
                      });
                    };
                    
                    compareStructure(englishObj, translatedObj);
                  } catch (error) {
                    // JSON解析失败，跳过结构比较
                    console.warn(`Failed to parse JSON in ${lang}/${module}.md:`, error.message);
                  }
                }
              }
            });
          }
        });
      });
    });
  });
  
  describe('Translation Metadata', () => {
    test('Translation hash files should exist and be valid', () => {
      const hashFilePath = global.testUtils.getProjectPath('scripts', '.translation-hashes.json');
      
      if (global.testUtils.fileExists(hashFilePath)) {
        const hashData = global.testUtils.readJsonFile(hashFilePath);
        
        // 检查hash数据结构
        expect(typeof hashData).toBe('object');
        
        // 检查是否包含所有支持的语言
        supportedLanguages.forEach(lang => {
          if (lang !== 'en') {
            expect(hashData).toHaveProperty(lang);
          }
        });
      }
    });
    
    test('Translation quality reports should be accessible', () => {
      const reportsDir = global.testUtils.getProjectPath('docs');
      const reportFiles = global.testUtils.getFilesInDirectory(reportsDir)
        .filter(file => file.includes('translation-quality-report'));
      
      // 应该至少有一个翻译质量报告
      expect(reportFiles.length).toBeGreaterThan(0);
      
      // 检查报告文件格式
      reportFiles.forEach(reportFile => {
        const reportPath = path.join(reportsDir, reportFile);
        const content = fs.readFileSync(reportPath, 'utf-8');
        
        // 报告应该包含基本信息
        expect(content).toMatch(/翻译质量|Translation Quality/i);
        expect(content.trim().length).toBeGreaterThan(0);
      });
    });
  });
  
  describe('Language-Specific Validation', () => {
    test('Chinese documents should use appropriate punctuation', () => {
      const chineseLanguages = ['zh', 'tw'];
      
      chineseLanguages.forEach(lang => {
        protocolModules.forEach(module => {
          const docPath = path.join(docsDir, lang, `${module}.md`);
          
          if (global.testUtils.fileExists(docPath)) {
            const content = fs.readFileSync(docPath, 'utf-8');
            
            // 检查中文标点符号使用
            const hasChinesePunctuation = 
              content.includes('，') || 
              content.includes('。') || 
              content.includes('：') || 
              content.includes('；');
            
            const hasEnglishPunctuation = 
              content.includes(', ') || 
              content.includes('. ') || 
              content.includes(': ') || 
              content.includes('; ');
            
            // 中文文档应该主要使用中文标点
            if (hasChinesePunctuation || hasEnglishPunctuation) {
              // 这是一个软检查，记录但不强制失败
              if (hasEnglishPunctuation && !hasChinesePunctuation) {
                console.warn(
                  `${lang}/${module}.md may need punctuation localization`
                );
              }
            }
          }
        });
      });
    });
  });
});