import fs from 'fs';
import path from 'path';

const srcHero = `C:\\Users\\kanya salve\\.gemini\\antigravity-ide\\brain\\071a75cd-1e66-47df-84c2-3cc9ef22a641\\krivan_hero_banner_1790872733237.jpg`;
const srcProduct = `C:\\Users\\kanya salve\\.gemini\\antigravity-ide\\brain\\071a75cd-1e66-47df-84c2-3cc9ef22a641\\kaizen_k_3d_render_1790872857947.jpg`;

const destDirBanners = path.join('..', 'frontend', 'public', 'assets', 'images', 'banners');
const destDirProducts = path.join('..', 'frontend', 'public', 'assets', 'images', 'products');

if (!fs.existsSync(destDirBanners)) fs.mkdirSync(destDirBanners, { recursive: true });
if (!fs.existsSync(destDirProducts)) fs.mkdirSync(destDirProducts, { recursive: true });

try {
  if (fs.existsSync(srcHero)) {
    fs.copyFileSync(srcHero, path.join(destDirBanners, 'hero-field-cinematic.jpg'));
    console.log('✅ Hero banner copied');
  }
  if (fs.existsSync(srcProduct)) {
    fs.copyFileSync(srcProduct, path.join(destDirProducts, 'kaizen-k-3d.jpg'));
    console.log('✅ 3D Product render copied');
  }
} catch (e) {
  console.error('Error copying:', e);
}
