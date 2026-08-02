const { spawn } = require('child_process');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const isWin = process.platform === 'win32';

console.log('🚀 Starting Real Estate Portal Full-Stack Development Servers...');

// Start Express Backend Server
const serverCmd = isWin ? 'cmd.exe' : 'node';
const serverArgs = isWin ? ['/c', 'node', 'server/index.js'] : ['server/index.js'];

const serverProcess = spawn(serverCmd, serverArgs, {
  cwd: rootDir,
  stdio: 'inherit',
  shell: true
});

// Start Vite Client
const clientCmd = isWin ? 'cmd.exe' : 'npm';
const clientArgs = isWin ? ['/c', 'npm', '--prefix', 'client', 'run', 'dev'] : ['--prefix', 'client', 'run', 'dev'];

const clientProcess = spawn(clientCmd, clientArgs, {
  cwd: rootDir,
  stdio: 'inherit',
  shell: true
});

process.on('SIGINT', () => {
  serverProcess.kill();
  clientProcess.kill();
  process.exit();
});
