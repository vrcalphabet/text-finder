import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const patchDir = path.resolve(__dirname, '../crx-patch');

console.log('dist/manifest.jsonを読み込み中...');
const manifestFile = path.resolve(distDir, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));

manifest.content_scripts[0].js.unshift('assets/css-injection.js');

const stylePaths = manifest.content_scripts[0].css;
if (!stylePaths) {
  console.log('パッチの必要はありません');
  process.exit(0);
}

manifest.web_accessible_resources[0].resources.push(...stylePaths);
delete manifest.content_scripts[0].css;

console.log('css-injection.jsをdist/assetsに書込中...');
const sourceFile = path.resolve(patchDir, 'css-injection.js');
const targetFile = path.resolve(distDir, 'assets/css-injection.js');
let source = fs.readFileSync(sourceFile, 'utf8');
source += `s(${JSON.stringify(stylePaths)});\n`;
fs.writeFileSync(targetFile, source);

console.log('dist/manifest.jsonを書換中...');
fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2));

console.log('パッチが完了しました');