const fs = require('fs');
const path = require('path');
const tilesets = require('../data/Tilesets.json');

const used = new Set();
for (const tileset of tilesets) {
  if (!tileset) continue;
  for (const name of tileset.tilesetNames) {
    used.add(name);
  }
}

const tilePath = path.join(__dirname, '..', 'img', 'tilesets');
const files = fs.readdirSync(tilePath);

for (const file of files) {
  if (!used.has(file.replace(/.png$/, ''))) {
    const filePath = path.join(tilePath, file);
    fs.unlinkSync(filePath);
    console.log('Deleted', filePath);
  }
}

console.log('Done');
