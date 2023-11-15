const fs = require('fs');
const execAsync = require('./exec');

async function main() {
  const { stdout, stderr } = await execAsync('git diff --name-status --staged');
  const files = stdout.split('\n').filter(Boolean).map(f => f.split('\t').pop());
  const jsons = files.filter(f => f.endsWith('.json') && f !== 'package.json');
  const errors = [];
  for (const json of jsons) {
    const content = fs.readFileSync(json, 'utf-8');
    const parsed = JSON.stringify(JSON.parse(content), null, 2);
    if (content !== parsed) {
      errors.push(`File ${json} is not formatted`);
    }
  }
  if (errors.length === 0) {
    console.log('All files well formatted');
    return 0;
  }
  console.log(errors.map(e => `- ${e}`).join('\n'));
  return 1;
}

main().then(code => {
  process.exit(code);
});
