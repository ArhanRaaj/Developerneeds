const { spawn } = require('child_process');

const child = spawn('npx', ['next', 'dev'], { shell: true });

child.stdout.on('data', (data) => console.log(`STDOUT: ${data}`));
child.stderr.on('data', (data) => console.error(`STDERR: ${data}`));

child.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
