const fs = require('fs');
const path = require('path');

const schemaDir = path.join(__dirname, '../schemas');
const outputPath = path.join(__dirname, '../docs/schema-graph.mmd');

const files = fs.readdirSync(schemaDir).filter(f => f.endsWith('.json'));
const references = [];

files.forEach((file) => {
  const fullPath = path.join(schemaDir, file);
  const raw = fs.readFileSync(fullPath, 'utf-8');
  const schema = JSON.parse(raw);
  const moduleName = file.replace('.schema.json', '').replace('.json', '');

  if (schema.properties) {
    for (const [key, prop] of Object.entries(schema.properties)) {
      if (prop.$ref || (prop.items && prop.items.$ref)) {
        const refPath = prop.$ref || prop.items.$ref;
        const refTarget = path.basename(refPath, '.json').replace('.schema', '');
        references.push(`${moduleName} --> ${refTarget}`);
      }
    }
  }
});

const uniqueRefs = [...new Set(references)];
const mermaidGraph = `graph TD\n${uniqueRefs.map(r => '  ' + r).join('\n')}\n`;

// Ensure docs directory exists
const docsDir = path.dirname(outputPath);
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

fs.writeFileSync(outputPath, mermaidGraph, 'utf-8');
console.log('✅ schema-graph.mmd generated!');