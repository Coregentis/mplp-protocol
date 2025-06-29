const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const exampleDir = path.join(__dirname, '../examples');
const schemaDir = path.join(__dirname, '../schemas');

const ajv = new Ajv({ 
  allErrors: true,
  strict: false,
  validateFormats: false
});
addFormats(ajv);

const exampleFiles = fs.readdirSync(exampleDir).filter(f => f.endsWith('.example.json'));

let hasErrors = false;

exampleFiles.forEach(file => {
  try {
    console.log(`Processing ${file}...`);
    const examplePath = path.join(exampleDir, file);
    const schemaName = file.replace('.example.json', '.schema.json');
    const schemaPath = path.join(schemaDir, schemaName);

    console.log(`  Reading example: ${examplePath}`);
    console.log(`  Reading schema: ${schemaPath}`);

    if (!fs.existsSync(schemaPath)) {
      console.error(`❌ Schema file not found: ${schemaPath}`);
      hasErrors = true;
      return;
    }

    const example = JSON.parse(fs.readFileSync(examplePath, 'utf-8'));
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));

    // Remove $schema field to avoid compatibility issues with AJV
    if (schema.$schema) {
      delete schema.$schema;
    }

    console.log(`  Compiling schema for ${schemaName}...`);
    const validate = ajv.compile(schema);
    const valid = validate(example);

    if (!valid) {
      console.error(`❌ ${file} is invalid:`);
      console.error(validate.errors);
      hasErrors = true;
    } else {
      console.log(`✅ ${file} is valid`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`);
    console.error(error.message);
    hasErrors = true;
  }
});

console.log(`\nValidation completed. hasErrors: ${hasErrors}`);

if (hasErrors) {
  console.log('❌ Some validations failed.');
  process.exit(1);
} else {
  console.log('✅ All validations passed!');
  process.exit(0);
}