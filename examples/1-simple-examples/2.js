const fs = require('fs');

const res = fs.readFile('asyncvsparallelism/big.json', {
  encoding: 'UTF-8'
}, (err, data) => {
  console.log('err');
  console.log('data');
});

console.log(res);
console.log('Done');
