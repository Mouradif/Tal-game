const fs = require('fs');
const path = require('path');

async function main() {
  const dataDir = path.join(__dirname, '..', 'data');
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
  const jsons = files.filter(f => f.endsWith('.json'));
  for (const json of jsons) {
    const content = fs.readFileSync(path.join(dataDir, json), 'utf-8');
    const parsed = JSON.stringify(JSON.parse(content), null, 2);
    fs.writeFileSync(path.join(dataDir, json), parsed);
    console.log(json, 'Written');
  }
}

main().then(code => {
  process.exit(code);
});
