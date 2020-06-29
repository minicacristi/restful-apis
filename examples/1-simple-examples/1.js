const path = require('path');

console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname, './1.js'))
console.log(process.pid);
console.log(process.versions.node);
process.stdout.write('Test local \n');

// Intervals
const interval = setInterval(() => {
  // this is a callback
  console.log('called forever if not cleared');
}, 100)

setTimeout(() => {
  console.log('Done');
  clearInterval(interval);
}, 1000)


// Event listenter
process.on('exit', () => {
  console.log('done')
});
