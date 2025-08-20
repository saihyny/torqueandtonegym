#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Performance Optimization Check');
console.log('==================================');

// Check if dist folder exists
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.log('❌ No build found. Run "npm run build" first.');
  process.exit(1);
}

// Analyze bundle sizes
const assetsPath = path.join(distPath, 'assets');
if (fs.existsSync(assetsPath)) {
  let totalSize = 0;
  let jsSize = 0;
  let cssSize = 0;

  console.log('\n📦 Bundle Analysis:');
  console.log('-------------------');

  // Check JS files
  const jsPath = path.join(assetsPath, 'js');
  if (fs.existsSync(jsPath)) {
    const jsFiles = fs.readdirSync(jsPath);
    jsFiles.forEach(file => {
      const filePath = path.join(jsPath, file);
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);

      jsSize += stats.size;
      totalSize += stats.size;
      console.log(`📄 ${file}: ${sizeKB} KB`);
    });
  }

  // Check CSS files
  const cssPath = path.join(assetsPath, 'css');
  if (fs.existsSync(cssPath)) {
    const cssFiles = fs.readdirSync(cssPath);
    cssFiles.forEach(file => {
      const filePath = path.join(cssPath, file);
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);

      cssSize += stats.size;
      totalSize += stats.size;
      console.log(`🎨 ${file}: ${sizeKB} KB`);
    });
  }
  
  console.log('\n📊 Summary:');
  console.log(`Total Bundle Size: ${(totalSize / 1024).toFixed(2)} KB`);
  console.log(`JavaScript: ${(jsSize / 1024).toFixed(2)} KB`);
  console.log(`CSS: ${(cssSize / 1024).toFixed(2)} KB`);
  
  // Performance recommendations
  console.log('\n💡 Performance Status:');
  if (jsSize / 1024 > 1000) {
    console.log('⚠️  JavaScript bundle is large (>1MB). Consider code splitting.');
  } else if (jsSize / 1024 > 500) {
    console.log('⚡ JavaScript bundle is moderate. Good optimization applied.');
  } else {
    console.log('✅ JavaScript bundle is optimized (<500KB).');
  }
  
  if (totalSize / 1024 > 2000) {
    console.log('⚠️  Total bundle size is large (>2MB). Consider asset optimization.');
  } else {
    console.log('✅ Total bundle size is reasonable.');
  }
}

// Check for optimization features
console.log('\n🔧 Optimization Features:');
console.log('-------------------------');

// Check vite config
const viteConfigPath = path.join(__dirname, 'vite.config.ts');
if (fs.existsSync(viteConfigPath)) {
  const viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
  
  if (viteConfig.includes('manualChunks')) {
    console.log('✅ Code splitting enabled');
  } else {
    console.log('❌ Code splitting not configured');
  }
  
  if (viteConfig.includes('minify')) {
    console.log('✅ Minification enabled');
  } else {
    console.log('❌ Minification not configured');
  }
  
  if (viteConfig.includes('terser')) {
    console.log('✅ Advanced minification (Terser) enabled');
  }
}

// Check for lazy loading
const indexPath = path.join(__dirname, 'src', 'pages', 'Index.tsx');
if (fs.existsSync(indexPath)) {
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  if (indexContent.includes('lazy(')) {
    console.log('✅ Lazy loading implemented');
  } else {
    console.log('❌ Lazy loading not implemented');
  }
}

// Check for optimized imports
const iconsPath = path.join(__dirname, 'src', 'lib', 'icons.ts');
if (fs.existsSync(iconsPath)) {
  console.log('✅ Optimized icon imports configured');
} else {
  console.log('❌ Icon imports not optimized');
}

console.log('\n🎯 Next Steps:');
console.log('1. Test the application with Lighthouse');
console.log('2. Monitor Core Web Vitals in production');
console.log('3. Consider implementing service worker for caching');
console.log('4. Optimize images with WebP format');

console.log('\n✨ Performance optimization complete!');
