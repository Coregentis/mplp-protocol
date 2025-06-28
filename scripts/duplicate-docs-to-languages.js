const fs = require('fs');
const path = require('path');

const languages = ['zh', 'tw', 'jp', 'kr', 'es', 'fr', 'de', 'it', 'ru'];
const sourceDir = path.join(__dirname, '../docs/schemas');

languages.forEach((lang) => {
  const targetDir = path.join(__dirname, `../docs/${lang}/schemas`);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.readdirSync(sourceDir).forEach((file) => {
    const sourceFile = path.join(sourceDir, file);
    const targetFile = path.join(targetDir, file);
    if (!fs.existsSync(targetFile)) {
      const content = fs.readFileSync(sourceFile, 'utf8');
      const translated = `<!-- ${lang.toUpperCase()} Translation Placeholder -->\n\n${content}`;
      fs.writeFileSync(targetFile, translated, 'utf8');
    }
  });
});

console.log('Schema documentation duplication completed!');