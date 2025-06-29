const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

describe('Schema Validation Tests', () => {
  let ajv, schemasDir, examplesDir;
  
  beforeAll(() => {
    schemasDir = global.testUtils.getProjectPath('schemas');
    examplesDir = global.testUtils.getProjectPath('examples');
    
    ajv = new Ajv({ 
      allErrors: true,
      strict: false,
      validateFormats: false
    });
    addFormats(ajv);
  });
  
  describe('Schema Files Validation', () => {
    test('All schema files should exist', () => {
      const expectedSchemas = [
        'Confirm.schema.json',
        'Context.schema.json', 
        'Delivery.schema.json',
        'Execute.schema.json',
        'Learn.schema.json',
        'Plan.schema.json',
        'Role.schema.json',
        'Test.schema.json',
        'Trace.schema.json',
        'Workflow.schema.json'
      ];
      
      expectedSchemas.forEach(schemaFile => {
        const schemaPath = path.join(schemasDir, schemaFile);
        expect(global.testUtils.fileExists(schemaPath))
          .toBe(true);
      });
    });
    
    test('All schema files should be valid JSON', () => {
      const schemaFiles = global.testUtils.getFilesInDirectory(schemasDir, '.json')
        .filter(file => file !== 'index.json');
      
      schemaFiles.forEach(schemaFile => {
        const schemaPath = path.join(schemasDir, schemaFile);
        expect(() => {
          global.testUtils.readJsonFile(schemaPath);
        }).not.toThrow();
      });
    });
    
    test('All schemas should be valid JSON Schema format', () => {
      const schemaFiles = global.testUtils.getFilesInDirectory(schemasDir, '.json')
        .filter(file => file !== 'index.json');
      
      schemaFiles.forEach(schemaFile => {
        const schemaPath = path.join(schemasDir, schemaFile);
        const schema = global.testUtils.readJsonFile(schemaPath);
        
        // 基本JSON Schema属性检查
        expect(schema).toHaveProperty('$schema');
        expect(schema).toHaveProperty('type');
        expect(schema).toHaveProperty('title');
        expect(schema).toHaveProperty('description');
        
        // 验证schema可以被AJV编译
        expect(() => {
          const testSchema = { ...schema };
          delete testSchema.$schema; // 移除$schema以避免兼容性问题
          ajv.compile(testSchema);
        }).not.toThrow();
      });
    });
  });
  
  describe('Example Files Validation', () => {
    test('All example files should exist', () => {
      const expectedExamples = [
        'Confirm.example.json',
        'Context.example.json',
        'Delivery.example.json', 
        'Execute.example.json',
        'Learn.example.json',
        'Plan.example.json',
        'Role.example.json',
        'Test.example.json',
        'Trace.example.json',
        'Workflow.example.json'
      ];
      
      expectedExamples.forEach(exampleFile => {
        const examplePath = path.join(examplesDir, exampleFile);
        expect(global.testUtils.fileExists(examplePath))
          .toBe(true);
      });
    });
    
    test('All example files should be valid JSON', () => {
      const exampleFiles = global.testUtils.getFilesInDirectory(examplesDir, '.json');
      
      exampleFiles.forEach(exampleFile => {
        const examplePath = path.join(examplesDir, exampleFile);
        expect(() => {
          global.testUtils.readJsonFile(examplePath);
        }).not.toThrow();
      });
    });
    
    test('All examples should validate against their schemas', () => {
      const exampleFiles = global.testUtils.getFilesInDirectory(examplesDir, '.example.json');
      
      exampleFiles.forEach(exampleFile => {
        const examplePath = path.join(examplesDir, exampleFile);
        const schemaFile = exampleFile.replace('.example.json', '.schema.json');
        const schemaPath = path.join(schemasDir, schemaFile);
        
        // 确保对应的schema文件存在
        expect(global.testUtils.fileExists(schemaPath))
          .toBe(true);
        
        const example = global.testUtils.readJsonFile(examplePath);
        const schema = global.testUtils.readJsonFile(schemaPath);
        
        // 移除$schema字段以避免兼容性问题
        const testSchema = { ...schema };
        delete testSchema.$schema;
        
        const validate = ajv.compile(testSchema);
        const isValid = validate(example);
        
        if (!isValid) {
          console.error(`Validation errors for ${exampleFile}:`, validate.errors);
        }
        
        expect(isValid).toBe(true);
      });
    });
  });
  
  describe('Schema Index Validation', () => {
    test('schemas/index.json should exist and be valid', () => {
      const indexPath = path.join(schemasDir, 'index.json');
      expect(global.testUtils.fileExists(indexPath)).toBe(true);
      
      const index = global.testUtils.readJsonFile(indexPath);
      expect(index).toHaveProperty('schemas');
      expect(Array.isArray(index.schemas)).toBe(true);
    });
    
    test('All schemas should be listed in index.json', () => {
      const indexPath = path.join(schemasDir, 'index.json');
      const index = global.testUtils.readJsonFile(indexPath);
      
      const schemaFiles = global.testUtils.getFilesInDirectory(schemasDir, '.schema.json');
      const indexedSchemas = index.schemas.map(s => s.file || s.name + '.schema.json');
      
      schemaFiles.forEach(schemaFile => {
        expect(indexedSchemas).toContain(schemaFile);
      });
    });
  });
});