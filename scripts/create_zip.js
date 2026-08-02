const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const zipPath = path.join(rootDir, 'real-estate-portal.zip');

console.log('📦 Packaging Real Estate Portal into ZIP archive for Windows distribution...');

if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

try {
  // Use PowerShell Compress-Archive or tar on Windows
  const psCommand = `powershell -ExecutionPolicy Bypass -Command "Get-ChildItem -Path '${rootDir}' -Exclude 'node_modules','.git','dist','real-estate-portal.zip' | Compress-Archive -DestinationPath '${zipPath}' -Force"`;
  
  execSync(psCommand, { stdio: 'inherit', cwd: rootDir });
  console.log(`\n🎉 SUCCESS! Created archive: real-estate-portal.zip`);
  console.log(`📁 File Location: ${zipPath}`);
} catch (error) {
  console.error('Error generating zip archive via PowerShell:', error.message);
}
