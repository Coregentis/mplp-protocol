const { jsonschema2md } = require('@adobe/jsonschema2md');
const fs = require('fs');
const path = require('path');

// 配置
const SCHEMAS_DIR = path.join(__dirname, '..', 'schemas');
const OUTPUT_DIR = path.join(__dirname, '..', 'docs', 'schemas');

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 读取所有 schema 文件
const schemaFiles = fs.readdirSync(SCHEMAS_DIR)
  .filter(file => file.endsWith('.schema.json'))
  .map(file => path.join(SCHEMAS_DIR, file));

console.log(`Found ${schemaFiles.length} schema files`);

// 转换每个 schema 文件
schemaFiles.forEach(schemaFile => {
  console.log(`Processing: ${path.basename(schemaFile)}`);
  
  try {
    const schema = JSON.parse(fs.readFileSync(schemaFile, 'utf8'));
    
    const result = jsonschema2md(schema, {
      includeReadme: true
    });
    
    // 从返回的对象中提取 markdown 内容
    let markdown;
    if (typeof result === 'string') {
      markdown = result;
    } else if (result && typeof result === 'object' && result.markdown) {
      if (Array.isArray(result.markdown)) {
        // 提取每个元素的 content 属性
        markdown = result.markdown
          .map(item => item && item.content ? item.content : String(item))
          .join('\n\n');
      } else if (typeof result.markdown === 'string') {
        markdown = result.markdown;
      } else {
        markdown = JSON.stringify(result.markdown, null, 2);
      }
    } else if (Array.isArray(result)) {
      // 如果是数组，连接所有元素
      markdown = result.join('\n');
    } else if (result && typeof result === 'object') {
      // 其他对象情况
      markdown = JSON.stringify(result, null, 2);
    } else {
      markdown = String(result);
    }
    
    const outputFile = path.join(OUTPUT_DIR, path.basename(schemaFile, '.schema.json') + '.md');
    fs.writeFileSync(outputFile, markdown);
    console.log(`Generated: ${outputFile} (${markdown.length} characters)`);
  } catch (error) {
    console.error(`Error processing ${path.basename(schemaFile)}:`, error.message);
  }
});

if (schemaFiles.length === 0) {
  console.log('No schema files found');
}

console.log('Schema documentation generation completed!');