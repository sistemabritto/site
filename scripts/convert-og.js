const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '..', 'public', 'og-image.svg');
const pngPath = path.join(__dirname, '..', 'public', 'og-image.png');

async function convert() {
  try {
    const svgBuffer = fs.readFileSync(svgPath);
    
    await sharp(svgBuffer)
      .resize(1200, 630)
      .png({ quality: 95, compressionLevel: 6 })
      .toFile(pngPath);
    
    const stats = fs.statSync(pngPath);
    console.log(`✅ OG Image PNG gerada com sucesso!`);
    console.log(`   Caminho: ${pngPath}`);
    console.log(`   Tamanho: ${(stats.size / 1024).toFixed(1)} KB`);
    console.log(`   Dimensões: 1200x630`);
  } catch (err) {
    console.error('❌ Erro ao converter:', err.message);
    process.exit(1);
  }
}

convert();
